/*
 * Downloads one photo per city landing page from Pixabay.
 *
 * Pixabay's Content License permits commercial use without attribution, which
 * is why this uses their API rather than pulling images out of a search engine
 * — publishing someone else's photo on a commercial site is infringement, and
 * an image search returns almost entirely copyrighted work.
 *
 * Writes:
 *   public/images/cities/<slug>.jpg
 *   src/lib/city-images.generated.ts   (slug -> path, plus photographer credit)
 *
 * Run: node scripts/download-city-images.js
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join('public', 'images', 'cities');
const MANIFEST = path.join('src', 'lib', 'city-images.generated.ts');
const CITY_DATA = path.join('src', 'lib', 'city-pages.ts');

function readKey() {
  const fromEnv = process.env.PIXABAY_API_KEY;
  if (fromEnv) return fromEnv.trim();

  // Fall back to .env so the script works without a dotenv dependency.
  const envFile = fs.readFileSync('.env', 'utf8');
  const match = envFile.match(/^PIXABAY_API_KEY=(.+)$/m);
  if (!match) throw new Error('PIXABAY_API_KEY not found in environment or .env');
  return match[1].trim();
}

/** Pulls the city list straight out of the generated TS file. */
function readCities() {
  const source = fs.readFileSync(CITY_DATA, 'utf8');
  const rows = [...source.matchAll(
    /\{ city: "([^"]+)", slug: "([^"]+)", region: "([^"]+)", regionType: "[^"]*", country: "([^"]+)" \}/g
  )];
  return rows.map((m) => ({ city: m[1], slug: m[2], region: m[3], country: m[4] }));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Tries progressively looser queries. "Jeddah skyline" beats "Jeddah" for a
 * usable hero image, but plenty of smaller cities only match their bare name.
 */
function queriesFor({ city, region, country }) {
  return [
    `${city} skyline`,
    `${city} city`,
    `${city}`,
    `${city} ${country}`,
    `${region} ${country}`,
  ];
}

/**
 * Pixabay happily answers "Bhopal skyline" with a generic skyline photo that
 * matched only the second word — which is how eight Indian cities ended up
 * sharing one image. A hit only counts if the place name is actually in its
 * tags: a mislabelled photo is worse than no photo at all.
 */
function mentionsPlace(hit, place) {
  const needle = place
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

  const haystack = `${hit.tags || ''}`.toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

async function search(key, query) {
  const url = new URL('https://pixabay.com/api/');
  url.searchParams.set('key', key);
  url.searchParams.set('q', query);
  url.searchParams.set('image_type', 'photo');
  url.searchParams.set('orientation', 'horizontal');
  url.searchParams.set('safesearch', 'true');
  url.searchParams.set('order', 'popular');
  url.searchParams.set('min_width', '1280');
  url.searchParams.set('per_page', '5');

  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Pixabay returned HTTP ${response.status} for "${query}"`);
  }

  const data = await response.json();
  return data.hits || [];
}

async function download(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`image download failed: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destination, buffer);
  return buffer.byteLength;
}

async function main() {
  const key = readKey();
  const cities = readCities();

  if (!cities.length) throw new Error(`no cities parsed from ${CITY_DATA}`);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`${cities.length} cities to fetch\n`);

  const manifest = [];
  const failures = [];
  let bytes = 0;

  for (const entry of cities) {
    const destination = path.join(OUT_DIR, `${entry.slug}.jpg`);

    if (fs.existsSync(destination)) {
      const existing = manifest.find((m) => m.slug === entry.slug);
      if (!existing) manifest.push({ ...entry, file: `/images/cities/${entry.slug}.jpg`, credit: 'Pixabay' });
      console.log(`${entry.city.padEnd(24)} already downloaded, skipping`);
      continue;
    }

    let hit = null;
    let usedQuery = '';

    for (const query of queriesFor(entry)) {
      try {
        const hits = await search(key, query);
        // The place has to be in the tags, or we are just relabelling a stock photo.
        const verified = hits.find(
          (candidate) => mentionsPlace(candidate, entry.city) || mentionsPlace(candidate, entry.region)
        );
        if (verified) {
          hit = verified;
          usedQuery = query;
          break;
        }
      } catch (error) {
        console.log(`${entry.city.padEnd(24)} search error: ${error.message}`);
      }
      await sleep(250);
    }

    if (!hit) {
      failures.push(entry.city);
      console.log(`${entry.city.padEnd(24)} no verified image - page will render without one`);
      continue;
    }

    try {
      const size = await download(hit.largeImageURL || hit.webformatURL, destination);
      bytes += size;
      manifest.push({
        ...entry,
        file: `/images/cities/${entry.slug}.jpg`,
        credit: hit.user || 'Pixabay',
        source: hit.pageURL,
        query: usedQuery,
      });
      console.log(`${entry.city.padEnd(24)} ok  ${(size / 1024).toFixed(0)} KB  (${usedQuery})`);
    } catch (error) {
      failures.push(entry.city);
      console.log(`${entry.city.padEnd(24)} download failed: ${error.message}`);
    }

    await sleep(300);
  }

  const entries = manifest
    .map(
      (m) =>
        `  "${m.slug}": { src: "${m.file}", alt: ${JSON.stringify(
          `${m.city}, ${m.country}`
        )}, credit: ${JSON.stringify(m.credit)} },`
    )
    .join('\n');

  fs.writeFileSync(
    MANIFEST,
    `// GENERATED FILE - do not edit by hand.
// Written by scripts/download-city-images.js. Images are from Pixabay, whose
// Content License allows commercial use without attribution; the credit field
// is kept so we can acknowledge photographers anyway.

export interface CityImage {
  src: string;
  alt: string;
  credit: string;
}

export const CITY_IMAGES: Record<string, CityImage> = {
${entries}
};

export function getCityImage(slug: string): CityImage | undefined {
  return CITY_IMAGES[slug];
}
`
  );

  console.log(`\ndownloaded ${manifest.length} images, ${(bytes / 1024 / 1024).toFixed(1)} MB total`);
  console.log(`manifest: ${MANIFEST}`);
  if (failures.length) console.log(`no image for: ${failures.join(', ')}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
