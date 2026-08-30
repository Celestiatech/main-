// GENERATED FILE - do not edit by hand.
// Rebuilt from docs/locations/all-cities.csv. To change the target list,
// edit the generator and re-run it rather than editing this file.

export interface CityTarget {
  /** Display name, e.g. "Bengaluru". */
  city: string;
  /** URL segment, e.g. "bengaluru". */
  slug: string;
  /** State, emirate, governorate, nation - whatever the country uses. */
  region: string;
  /** The local word for that division, used in page copy. */
  regionType: string;
  country: string;
}

export const CITY_TARGETS: CityTarget[] = [
  { city: "Mumbai", slug: "mumbai", region: "Maharashtra", regionType: "state", country: "India" },
  { city: "Delhi", slug: "delhi", region: "Delhi", regionType: "national capital territory", country: "India" },
  { city: "Bengaluru", slug: "bengaluru", region: "Karnataka", regionType: "state", country: "India" },
  { city: "Hyderabad", slug: "hyderabad", region: "Telangana", regionType: "state", country: "India" },
  { city: "Chennai", slug: "chennai", region: "Tamil Nadu", regionType: "state", country: "India" },
  { city: "Kolkata", slug: "kolkata", region: "West Bengal", regionType: "state", country: "India" },
  { city: "Pune", slug: "pune", region: "Maharashtra", regionType: "state", country: "India" },
  { city: "Ahmadabad", slug: "ahmadabad", region: "Gujarat", regionType: "state", country: "India" },
  { city: "Jaipur", slug: "jaipur", region: "Rajasthan", regionType: "state", country: "India" },
  { city: "Surat", slug: "surat", region: "Gujarat", regionType: "state", country: "India" },
  { city: "Lucknow", slug: "lucknow", region: "Uttar Pradesh", regionType: "state", country: "India" },
  { city: "Chandigarh", slug: "chandigarh", region: "Chandigarh", regionType: "union territory", country: "India" },
  { city: "Indore", slug: "indore", region: "Madhya Pradesh", regionType: "state", country: "India" },
  { city: "Nagpur", slug: "nagpur", region: "Maharashtra", regionType: "state", country: "India" },
  { city: "Bhopal", slug: "bhopal", region: "Madhya Pradesh", regionType: "state", country: "India" },
  { city: "Kochi", slug: "kochi", region: "Kerala", regionType: "state", country: "India" },
  { city: "Coimbatore", slug: "coimbatore", region: "Tamil Nadu", regionType: "state", country: "India" },
  { city: "Visakhapatnam", slug: "visakhapatnam", region: "Andhra Pradesh", regionType: "state", country: "India" },
  { city: "Thiruvananthapuram", slug: "thiruvananthapuram", region: "Kerala", regionType: "state", country: "India" },
  { city: "Gurugram", slug: "gurugram", region: "Haryana", regionType: "state", country: "India" },
  { city: "Ludhiana", slug: "ludhiana", region: "Punjab", regionType: "state", country: "India" },
  { city: "Patna", slug: "patna", region: "Bihar", regionType: "state", country: "India" },
  { city: "Bhubaneshwar", slug: "bhubaneshwar", region: "Odisha", regionType: "state", country: "India" },
  { city: "Guwahati", slug: "guwahati", region: "Assam", regionType: "state", country: "India" },
  { city: "New York City", slug: "new-york-city", region: "New York", regionType: "state", country: "United States" },
  { city: "Los Angeles", slug: "los-angeles", region: "California", regionType: "state", country: "United States" },
  { city: "Chicago", slug: "chicago", region: "Illinois", regionType: "state", country: "United States" },
  { city: "Houston", slug: "houston", region: "Texas", regionType: "state", country: "United States" },
  { city: "Phoenix", slug: "phoenix", region: "Arizona", regionType: "state", country: "United States" },
  { city: "Dallas", slug: "dallas", region: "Texas", regionType: "state", country: "United States" },
  { city: "San Francisco", slug: "san-francisco", region: "California", regionType: "state", country: "United States" },
  { city: "Austin", slug: "austin", region: "Texas", regionType: "state", country: "United States" },
  { city: "Seattle", slug: "seattle", region: "Washington", regionType: "state", country: "United States" },
  { city: "Boston", slug: "boston", region: "Massachusetts", regionType: "state", country: "United States" },
  { city: "Atlanta", slug: "atlanta", region: "Georgia", regionType: "state", country: "United States" },
  { city: "Miami", slug: "miami", region: "Florida", regionType: "state", country: "United States" },
  { city: "London", slug: "london", region: "England", regionType: "nation", country: "United Kingdom" },
  { city: "Manchester", slug: "manchester", region: "England", regionType: "nation", country: "United Kingdom" },
  { city: "Birmingham", slug: "birmingham", region: "England", regionType: "nation", country: "United Kingdom" },
  { city: "Leeds", slug: "leeds", region: "England", regionType: "nation", country: "United Kingdom" },
  { city: "Glasgow", slug: "glasgow", region: "Scotland", regionType: "nation", country: "United Kingdom" },
  { city: "Edinburgh", slug: "edinburgh", region: "Scotland", regionType: "nation", country: "United Kingdom" },
  { city: "Sydney", slug: "sydney", region: "New South Wales", regionType: "state", country: "Australia" },
  { city: "Melbourne", slug: "melbourne", region: "Victoria", regionType: "state", country: "Australia" },
  { city: "Brisbane", slug: "brisbane", region: "Queensland", regionType: "state", country: "Australia" },
  { city: "Perth", slug: "perth", region: "Western Australia", regionType: "state", country: "Australia" },
  { city: "Adelaide", slug: "adelaide", region: "South Australia", regionType: "state", country: "Australia" },
  { city: "Canberra", slug: "canberra", region: "Australian Capital Territory", regionType: "state", country: "Australia" },
  { city: "Dubai", slug: "dubai", region: "Dubai", regionType: "emirate", country: "United Arab Emirates" },
  { city: "Abu Dhabi", slug: "abu-dhabi", region: "Abu Dhabi", regionType: "emirate", country: "United Arab Emirates" },
  { city: "Sharjah", slug: "sharjah", region: "Sharjah", regionType: "emirate", country: "United Arab Emirates" },
  { city: "Riyadh", slug: "riyadh", region: "Riyadh", regionType: "province", country: "Saudi Arabia" },
  { city: "Jeddah", slug: "jeddah", region: "Makkah", regionType: "province", country: "Saudi Arabia" },
  { city: "Doha", slug: "doha", region: "Doha", regionType: "municipality", country: "Qatar" },
  { city: "Kuwait City", slug: "kuwait-city", region: "Al Asimah", regionType: "governorate", country: "Kuwait" },
  { city: "Manama", slug: "manama", region: "Capital", regionType: "governorate", country: "Bahrain" },
  { city: "Muscat", slug: "muscat", region: "Muscat", regionType: "governorate", country: "Oman" },
  { city: "Amman", slug: "amman", region: "Amman", regionType: "governorate", country: "Jordan" },
  { city: "Cairo", slug: "cairo", region: "Cairo", regionType: "governorate", country: "Egypt" },
];

export function getCityBySlug(slug: string): CityTarget | undefined {
  return CITY_TARGETS.find((entry) => entry.slug === slug);
}

/** Other cities in the same country, for internal linking between pages. */
export function getNearbyCities(target: CityTarget, limit = 6): CityTarget[] {
  return CITY_TARGETS.filter(
    (entry) => entry.country === target.country && entry.slug !== target.slug
  ).slice(0, limit);
}
