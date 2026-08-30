/**
 * AI Writing Pattern Detector (rule-based, dependency-free)
 * Measures stylometric and structural patterns commonly seen in
 * templated / predictable writing and returns an explainable score.
 * Deterministic, local-only.
 */

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "then", "else", "to", "of", "in", "on", "at", "for", "with", "by", "from",
  "as", "is", "are", "was", "were", "be", "been", "being", "it", "its", "this", "that", "these", "those", "i", "you",
  "we", "they", "he", "she", "my", "your", "our", "their", "me", "him", "her", "them", "not", "no", "yes", "do", "does",
  "did", "have", "has", "had", "can", "could", "should", "would", "will", "may", "might", "about", "into", "through",
  "during", "before", "after", "above", "below", "over", "under", "again", "further", "more", "most", "some", "such",
  "only", "own", "same", "so", "than", "too", "very", "also", "because", "while", "where", "when", "what", "which",
  "who", "why", "how",
]);

const BUZZWORDS = new Set([
  "digital", "world", "online", "presence", "website", "essential", "business", "businesses", "sizes", "implement",
  "effective", "strategies", "strategy", "visibility", "consistent", "traffic", "focusing", "focus", "content",
  "quality", "seo", "search", "engine", "ranking", "rank", "authority", "metric", "metrics", "domain", "page",
  "results", "audience", "customers", "engagement", "optimization", "optimize", "experience", "achieve", "long-term",
  "success", "sustainable", "growth", "improve", "drive", "strong", "important", "key", "robust", "comprehensive",
  "enhance", "evaluate", "predicts", "potential", "individual", "better", "identify", "areas", "improvement",
  "compare", "performance", "competitors", "reliable", "provides", "instant", "insights", "easier", "plan",
  "campaigns", "prioritize", "efforts", "analyzing", "researching", "discover", "opportunities", "informed",
  "decisions", "presence",
]);

const TEMPLATE_PHRASES = [
  "in today", "in today’s", "in today's", "digital world", "online presence", "businesses of all sizes",
  "it is important to", "effective strategies", "improve visibility", "drive consistent traffic", "long-term success",
  "sustainable growth", "user experience", "content quality", "search engine optimization", "essential seo tool",
  "helps website owners", "digital agencies", "evaluate the authority", "metric that predicts", "likely to rank",
  "search engine results", "ranking potential", "by checking these metrics", "you can better understand",
  "identify areas for improvement", "compare your performance", "reliable da pa checker", "provides instant insights",
  "making it easier to", "effective link-building", "prioritize seo efforts", "whether you're analyzing",
  "researching competitors", "high-authority backlink opportunities", "make informed decisions",
  "improve your online presence",
];

const BOILERPLATE_REGEX = [
  /\bin today(?:'|’)?s?\b/i,
  /\bit is (?:important|essential|crucial|vital) to\b/i,
  /\bis an? (?:essential|reliable|powerful|valuable|important)\b/i,
  /\b(?:tool|solution|platform|service) that helps\b/i,
  /\bhelps (?:website owners|businesses|marketers|teams|users|companies)\b/i,
  /\bevaluate the (?:authority|quality|performance|effectiveness)\b/i,
  /\bmetric that predicts\b/i,
  /\b(can|could|may|might|will)\s+help\b/i,
  /\byou can (?:better )?(?:understand|improve|identify|compare|discover)\b/i,
  /\bby (?:focusing|focussing) on\b/i,
  /\bby (?:checking|using|analyzing|reviewing)\b/i,
  /\bidentify areas for improvement\b/i,
  /\bcompare your performance\b/i,
  /\bprovides (?:instant|valuable|actionable|clear)\s+(?:insights|results|data|feedback)\b/i,
  /\bmaking it easier to\b/i,
  /\bprioritize (?:seo )?efforts\b/i,
  /\bwhether you(?:'|’)?re\b/i,
  /\bresearching competitors\b/i,
  /\bmake informed decisions\b/i,
  /\bimprove your online presence\b/i,
  /\b(long[- ]term|sustainable)\s+(success|growth|results)\b/i,
  /\bdrive (?:consistent|more|increased)\s+(traffic|results|growth)\b/i,
  /\bimprove (?:visibility|performance|efficiency|outcomes)\b/i,
  /\bthese days\b/i,
  /\b(it(?:'|’)?s) not just\b/i,
  /\byou actually\b/i,
  /\bcomes down to\b/i,
  /\bmaking sure\b/i,
  /\btends to\b/i,
  /\bbasically\b/i,
];

const SECOND_PERSON = new Set(["you", "you're", "your", "yours", "you've", "you'll", "you’d", "you’re"]);

const COACHING_REGEX = [
  /\byou need to\b/i,
  /\byou(?:'|’)?re\b/i,
  /\bmake sure\b/i,
  /\bdo that\b/i,
  /\bcomes down to\b/i,
  /\bfocus on\b/i,
  /\bthat usually\b/i,
  /\bnot just\b/i,
];

const PROMPTY_REGEX = [
  /\bcould you\b/i,
  /\blook over my code\b/i,
  /\bgive me tips\b/i,
  /\bif you need more (?:information|context)\b/i,
  /\bask me\b/i,
  /\bkey questions\b/i,
  /\bupload\b/i,
  /\bif it makes sense\b/i,
  /\bcreate something we can look at together\b/i,
  /\bthanks for your help\b/i,
  /\blet me know\b/i,
];

const ABSTRACT_SUFFIXES = ["tion", "sion", "ment", "ity", "ness", "ance", "ence", "ship", "ism", "ability", "ibility"];

const normalizeWhitespace = (text: unknown) => String(text || "").replace(/\r\n/g, "\n");

const splitSentencesWithOffsets = (text: string) => {
  const full = normalizeWhitespace(text);
  if (!full.trim()) return [];
  const out: { text: string; start: number; end: number }[] = [];
  const re = /[^.!?]+[.!?]+|[^.!?]+$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(full))) {
    const raw = match[0];
    const sentence = raw.trim();
    if (!sentence) continue;
    const innerStart = raw.indexOf(sentence);
    const start = match.index + (innerStart < 0 ? 0 : innerStart);
    out.push({ text: sentence, start, end: start + sentence.length });
  }
  return out;
};

const tokenizeWordsWithOffsets = (text: string) => {
  const full = normalizeWhitespace(text);
  const out: { token: string; start: number; end: number }[] = [];
  const re = /[A-Za-z0-9']+/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(full))) {
    const token = match[0];
    out.push({ token, start: match.index, end: match.index + token.length });
  }
  return out;
};

const toLower = (s: unknown) => String(s || "").toLowerCase();

const computeMean = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

const computeStd = (arr: number[]) => {
  if (!arr.length) return 0;
  const mean = computeMean(arr);
  const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
};

const ngramCounts = (words: string[], n: number) => {
  const map = new Map<string, number>();
  if (words.length < n) return map;
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n).join(" ");
    map.set(gram, (map.get(gram) || 0) + 1);
  }
  return map;
};

const repetitionRateFromCounts = (counts: Map<string, number>, totalNgrams: number) => {
  if (totalNgrams <= 0) return 0;
  let repeated = 0;
  for (const c of counts.values()) {
    if (c > 1) repeated += c - 1;
  }
  return repeated / totalNgrams;
};

const shannonEntropy = (freqMap: Map<string, number>) => {
  let total = 0;
  for (const c of freqMap.values()) total += c;
  if (!total) return 0;
  let h = 0;
  for (const c of freqMap.values()) {
    const p = c / total;
    h -= p * Math.log(p);
  }
  return h;
};

const normalizedEntropy = (freqMap: Map<string, number>) => {
  const vocab = freqMap.size || 1;
  const h = shannonEntropy(freqMap);
  const maxH = Math.log(vocab);
  return maxH > 0 ? clamp01(h / maxH) : 0;
};

const vocabularyEngine = ({ wordCount, uniqueCount, hapaxCount }: { wordCount: number; uniqueCount: number; hapaxCount: number }) => {
  const ttr = wordCount ? uniqueCount / wordCount : 0;
  const hapaxRatio = uniqueCount ? hapaxCount / uniqueCount : 0;
  const ttrRisk = clamp01((0.48 - ttr) / 0.25);
  const hapaxRisk = clamp01((0.55 - hapaxRatio) / 0.35);
  return clamp01(0.6 * ttrRisk + 0.4 * hapaxRisk);
};

const repetitionEngine = ({ bigramRepeatRate, trigramRepeatRate, topWordShare }: { bigramRepeatRate: number; trigramRepeatRate: number; topWordShare: number }) => {
  const biRisk = clamp01((bigramRepeatRate - 0.04) / 0.18);
  const triRisk = clamp01((trigramRepeatRate - 0.01) / 0.12);
  const topRisk = clamp01((topWordShare - 0.16) / 0.24);
  return clamp01(0.45 * biRisk + 0.35 * triRisk + 0.2 * topRisk);
};

const structureEngine = ({ sentenceLengths }: { sentenceLengths: number[] }) => {
  if (!sentenceLengths.length) return 0;
  const mean = computeMean(sentenceLengths);
  const sd = computeStd(sentenceLengths);
  const cv = mean > 0 ? sd / mean : 0;
  const baseRisk = clamp01((0.45 - cv) / 0.35);
  const sampleFactor = 0.4 + 0.6 * clamp01((sentenceLengths.length - 3) / 7);
  return clamp01(baseRisk * sampleFactor);
};

const predictabilityEngine = ({ wordFreq, normalizedH, bigramRepeatRate }: { wordFreq: Map<string, number>; normalizedH: number; bigramRepeatRate: number }) => {
  const entropyRisk = 1 - normalizedH;
  const total = Array.from(wordFreq.values()).reduce((a, b) => a + b, 0) || 1;
  let maxShare = 0;
  for (const c of wordFreq.values()) maxShare = Math.max(maxShare, c / total);
  const maxRisk = clamp01((maxShare - 0.06) / 0.12);
  const repRisk = clamp01((bigramRepeatRate - 0.03) / 0.2);
  return clamp01(0.55 * entropyRisk + 0.25 * repRisk + 0.2 * maxRisk);
};

const stopwordEngine = ({ stopwordRatio }: { stopwordRatio: number }) => {
  const high = clamp01((stopwordRatio - 0.62) / 0.18);
  const low = clamp01((0.33 - stopwordRatio) / 0.18);
  return clamp01(Math.max(high, low));
};

const sentencePatternEngine = ({ startersRepeatRate, starterDiversity }: { startersRepeatRate: number; starterDiversity: number }) => {
  const repeatRisk = clamp01((startersRepeatRate - 0.12) / 0.5);
  const diversityRisk = clamp01((0.55 - starterDiversity) / 0.45);
  return clamp01(0.6 * repeatRisk + 0.4 * diversityRisk);
};

const genericityEngine = ({ buzzwordDensity, phraseHitRate, abstractSuffixRatio, specificityScore }: { buzzwordDensity: number; phraseHitRate: number; abstractSuffixRatio: number; specificityScore: number }) => {
  const buzzRisk = clamp01((buzzwordDensity - 0.055) / 0.12);
  const phraseRisk = clamp01((phraseHitRate - 0.12) / 0.35);
  const abstractRisk = clamp01((abstractSuffixRatio - 0.14) / 0.18);
  const lowSpecificityRisk = clamp01((0.35 - specificityScore) / 0.35);
  return clamp01(0.3 * buzzRisk + 0.24 * phraseRisk + 0.24 * abstractRisk + 0.22 * lowSpecificityRisk);
};

const boilerplateEngine = ({ boilerplateDensity }: { boilerplateDensity: number }) => {
  return clamp01((boilerplateDensity - 0.22) / 0.55);
};

const sentenceSimilarityEngine = ({ avgSentenceJaccard }: { avgSentenceJaccard: number }) => {
  return clamp01((avgSentenceJaccard - 0.22) / 0.35);
};

const discourseEngine = ({ discourseRate, specificityScore }: { discourseRate: number; specificityScore: number }) => {
  const base = clamp01((discourseRate - 0.22) / 0.55);
  const lowSpec = clamp01((0.28 - specificityScore) / 0.28);
  return clamp01(base * (0.35 + 0.65 * lowSpec));
};

const coachingToneEngine = ({ secondPersonRatio, coachingRate, specificityScore }: { secondPersonRatio: number; coachingRate: number; specificityScore: number }) => {
  const secondRisk = clamp01((secondPersonRatio - 0.06) / 0.2);
  const coachRisk = clamp01((coachingRate - 0.18) / 0.55);
  const base = clamp01(0.55 * secondRisk + 0.45 * coachRisk);
  const lowSpec = clamp01((0.3 - specificityScore) / 0.3);
  return clamp01(base * (0.45 + 0.55 * lowSpec));
};

type Metrics = {
  ttr: number;
  bigramRepeatRate: number;
  trigramRepeatRate: number;
  sentenceCv: number;
  normalizedEntropy: number;
  stopwordRatio: number;
  startersRepeatRate: number;
  starterDiversity: number;
  buzzwordDensity: number;
  phraseHitRate: number;
  abstractSuffixRatio: number;
  specificityScore: number;
  boilerplateDensity: number;
  avgSentenceJaccard: number;
  discourseRate: number;
  coachingRate: number;
  secondPersonRatio: number;
  promptyScore: number;
  wordCount: number;
};

type Engines = {
  vocabulary: number;
  repetition: number;
  structure: number;
  predictability: number;
  stopwords: number;
  sentence_pattern: number;
  genericity: number;
  boilerplate: number;
  sentence_similarity: number;
  discourse: number;
  coaching: number;
  prompty: number;
};

type Pattern = { name: string; detected: boolean; score: number; weight: number };

const buildPatterns = (metrics: Metrics, engines: Engines): Pattern[] => {
  const patterns: Pattern[] = [];

  patterns.push({
    name: "Limited word variety",
    detected: metrics.ttr < 0.42,
    score: clamp01((0.42 - metrics.ttr) / 0.22),
    weight: 0.16,
  });

  patterns.push({
    name: "Repeated word pairs",
    detected: metrics.bigramRepeatRate > 0.09,
    score: clamp01((metrics.bigramRepeatRate - 0.09) / 0.2),
    weight: 0.14,
  });
  patterns.push({
    name: "Repeated phrases",
    detected: metrics.trigramRepeatRate > 0.04,
    score: clamp01((metrics.trigramRepeatRate - 0.04) / 0.16),
    weight: 0.14,
  });

  patterns.push({
    name: "Similar sentence lengths",
    detected: metrics.sentenceCv < 0.28,
    score: clamp01((0.28 - metrics.sentenceCv) / 0.22),
    weight: 0.14,
  });

  patterns.push({
    name: "Too predictable",
    detected: metrics.normalizedEntropy < 0.72,
    score: clamp01((0.72 - metrics.normalizedEntropy) / 0.35),
    weight: 0.14,
  });

  patterns.push({
    name: "Unusual word choice",
    detected: engines.stopwords > 0.55,
    score: engines.stopwords,
    weight: 0.1,
  });

  patterns.push({
    name: "Many sentences start the same way",
    detected: metrics.startersRepeatRate > 0.22,
    score: clamp01((metrics.startersRepeatRate - 0.22) / 0.55),
    weight: 0.1,
  });

  patterns.push({
    name: "Similar sentence beginnings",
    detected: metrics.starterDiversity < 0.45,
    score: clamp01((0.45 - metrics.starterDiversity) / 0.35),
    weight: 0.08,
  });

  patterns.push({
    name: "Too many buzzwords",
    detected: metrics.buzzwordDensity > 0.065,
    score: clamp01((metrics.buzzwordDensity - 0.065) / 0.16),
    weight: 0.1,
  });
  patterns.push({
    name: "Overly abstract language",
    detected: metrics.abstractSuffixRatio > 0.18,
    score: clamp01((metrics.abstractSuffixRatio - 0.18) / 0.25),
    weight: 0.1,
  });
  patterns.push({
    name: "Template-like sentences",
    detected: metrics.phraseHitRate > 0.2,
    score: clamp01((metrics.phraseHitRate - 0.2) / 0.6),
    weight: 0.1,
  });
  patterns.push({
    name: "Lacks specific details",
    detected: metrics.specificityScore < 0.25,
    score: clamp01((0.25 - metrics.specificityScore) / 0.25),
    weight: 0.16,
  });

  patterns.push({
    name: "Generic filler phrases",
    detected: metrics.boilerplateDensity > 0.28,
    score: clamp01((metrics.boilerplateDensity - 0.18) / 0.42),
    weight: 0.12,
  });

  patterns.push({
    name: "Sales/marketing template style",
    detected: metrics.boilerplateDensity > 0.32 && metrics.buzzwordDensity > 0.06 && metrics.specificityScore < 0.4,
    score: clamp01(
      (clamp01((metrics.boilerplateDensity - 0.22) / 0.58) +
        clamp01((metrics.buzzwordDensity - 0.045) / 0.14) +
        clamp01((0.4 - metrics.specificityScore) / 0.4)) /
        3
    ),
    weight: 0.2,
  });

  patterns.push({
    name: "Reads like AI instructions",
    detected: metrics.promptyScore > 0.34,
    score: clamp01(metrics.promptyScore),
    weight: 0.12,
  });

  patterns.push({
    name: "Sentences too similar",
    detected: engines.sentence_similarity > 0.55,
    score: engines.sentence_similarity,
    weight: 0.08,
  });

  patterns.push({
    name: "Scripted conversational tone",
    detected: metrics.discourseRate > 0.28 && metrics.specificityScore < 0.3,
    score: clamp01((metrics.discourseRate - 0.22) / 0.45),
    weight: 0.14,
  });

  patterns.push({
    name: "Generic advice style",
    detected:
      metrics.specificityScore < 0.25 && (metrics.boilerplateDensity > 0.35 || engines.discourse > 0.35),
    score: clamp01(
      (clamp01((0.25 - metrics.specificityScore) / 0.25) +
        clamp01((metrics.boilerplateDensity - 0.25) / 0.5) +
        engines.discourse) /
        3
    ),
    weight: 0.18,
  });

  patterns.push({
    name: "Direct coaching tone",
    detected: engines.coaching > 0.35 && metrics.specificityScore < 0.3,
    score: engines.coaching,
    weight: 0.16,
  });

  return patterns;
};

export type SentenceResult = {
  text: string;
  start: number;
  end: number;
  ai: number;
  label: "AI" | "Human" | "Mixed";
};

export type AiDetectionData = {
  Model: string;
  Version: string;
  AI: number;
  Human: number;
  Label: "AI" | "Human" | "Mixed";
  pattern_summary: { total_patterns_checked: number; patterns_detected: number; confidence: number };
  patterns: Pattern[];
  engines: Omit<Engines, "prompty">;
  Chunks: string[];
  chunks: {
    text: string;
    startSpan: number;
    endSpan: number;
    type: "AI" | "HUMAN";
    aiScore: number;
    humanParaphrasedScore: number;
    aiParaphrasedScore: number;
    isFailed: boolean;
    explainer: unknown;
  }[];
  Sentences: SentenceResult[];
  explanation: string[];
};

export function detectAIPatterns(text: string): AiDetectionData {
  const inputText = normalizeWhitespace(text);
  const sentences = splitSentencesWithOffsets(inputText);
  const tokens = tokenizeWordsWithOffsets(inputText);

  const wordsLower = tokens.map((t) => toLower(t.token));
  const wordCount = wordsLower.length;
  const wordFreq = new Map<string, number>();
  let stopwordCount = 0;
  let secondPersonCount = 0;
  for (const w of wordsLower) {
    wordFreq.set(w, (wordFreq.get(w) || 0) + 1);
    if (STOPWORDS.has(w)) stopwordCount++;
    if (SECOND_PERSON.has(w)) secondPersonCount++;
  }
  const uniqueCount = wordFreq.size;
  let hapaxCount = 0;
  for (const c of wordFreq.values()) if (c === 1) hapaxCount++;

  const buzzwordHits = wordsLower.filter((w) => BUZZWORDS.has(w)).length;
  const buzzwordDensity = wordCount ? buzzwordHits / wordCount : 0;

  const lowerText = inputText.toLowerCase();
  const phraseHits = TEMPLATE_PHRASES.reduce((sum, p) => sum + (lowerText.includes(p) ? 1 : 0), 0);
  const phraseDensityBase = Math.max(2, Math.min(8, wordCount / 20));
  const phraseHitRate = clamp01(phraseHits / phraseDensityBase);

  const abstractHits = wordsLower.filter((w) => ABSTRACT_SUFFIXES.some((suf) => w.endsWith(suf))).length;
  const abstractSuffixRatio = wordCount ? abstractHits / wordCount : 0;

  const hasNumbers = /(\d)/.test(inputText) ? 1 : 0;
  const hasUrlOrEmail = /(https?:\/\/|www\.|@\w+)/i.test(inputText) ? 1 : 0;
  const sentenceStartSet = new Set(sentences.map((s) => s.start));
  const properMidSentence = tokens.filter((t) => /^[A-Z]/.test(t.token) && !sentenceStartSet.has(t.start)).length;
  const properMidRatio = wordCount ? properMidSentence / wordCount : 0;
  const specificityScore = clamp01(0.55 * hasNumbers + 0.25 * hasUrlOrEmail + 0.2 * clamp01(properMidRatio / 0.04));

  const boilerplateHits = BOILERPLATE_REGEX.reduce((sum, re) => sum + (re.test(inputText) ? 1 : 0), 0);
  const boilerplateDensityBase = Math.max(2, Math.min(8, wordCount / 18));
  const boilerplateDensity = clamp01(boilerplateHits / boilerplateDensityBase);

  const discourseRate = boilerplateDensity;
  const coachingHits = COACHING_REGEX.reduce((sum, re) => sum + (re.test(inputText) ? 1 : 0), 0);
  const coachingRate = COACHING_REGEX.length ? coachingHits / COACHING_REGEX.length : 0;
  const secondPersonRatio = wordCount ? secondPersonCount / wordCount : 0;

  const promptyHits = PROMPTY_REGEX.reduce((sum, re) => sum + (re.test(inputText) ? 1 : 0), 0);
  const promptyScore = clamp01(promptyHits / 3);

  const sentenceWordLengths = sentences.map((s) => {
    const ws = s.text.toLowerCase().replace(/[^a-z0-9\s']/g, " ").split(/\s+/).filter(Boolean);
    return ws.length;
  });

  const bigrams = ngramCounts(wordsLower, 2);
  const trigrams = ngramCounts(wordsLower, 3);

  const totalBigrams = Math.max(0, wordCount - 1);
  const totalTrigrams = Math.max(0, wordCount - 2);
  const bigramRepeatRate = repetitionRateFromCounts(bigrams, totalBigrams);
  const trigramRepeatRate = repetitionRateFromCounts(trigrams, totalTrigrams);

  let maxCount = 0;
  for (const c of wordFreq.values()) maxCount = Math.max(maxCount, c);
  const topWordShare = wordCount ? maxCount / wordCount : 0;

  const starterCounts = new Map<string, number>();
  for (const s of sentences) {
    const ws = s.text.toLowerCase().replace(/[^a-z0-9\s']/g, " ").split(/\s+/).filter(Boolean);
    const key = ws.slice(0, 3).join(" ");
    if (!key) continue;
    starterCounts.set(key, (starterCounts.get(key) || 0) + 1);
  }
  const starterTotal = Array.from(starterCounts.values()).reduce((a, b) => a + b, 0) || 1;
  let starterRepeats = 0;
  for (const c of starterCounts.values()) if (c > 1) starterRepeats += c - 1;
  const startersRepeatRate = starterRepeats / starterTotal;
  const starterDiversity = starterCounts.size / (sentences.length || 1);

  const stopwordRatio = wordCount ? stopwordCount / wordCount : 0;
  const ttr = wordCount ? uniqueCount / wordCount : 0;
  const normalizedH = normalizedEntropy(wordFreq);

  const meanLen = computeMean(sentenceWordLengths);
  const sdLen = computeStd(sentenceWordLengths);
  const sentenceCv = meanLen > 0 ? sdLen / meanLen : 0;

  const contentSets = sentences.slice(0, 80).map((s) => {
    const ws = s.text
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, " ")
      .split(/\s+/)
      .filter((w) => w && !STOPWORDS.has(w) && w.length >= 4);
    return new Set(ws);
  });
  let jaccardSum = 0;
  let jaccardPairs = 0;
  for (let i = 0; i < contentSets.length; i++) {
    for (let j = i + 1; j < contentSets.length; j++) {
      const a = contentSets[i];
      const b = contentSets[j];
      if (!a.size || !b.size) continue;
      let inter = 0;
      for (const w of a) if (b.has(w)) inter++;
      const union = a.size + b.size - inter;
      if (union <= 0) continue;
      jaccardSum += inter / union;
      jaccardPairs++;
    }
  }
  const avgSentenceJaccard = jaccardPairs ? jaccardSum / jaccardPairs : 0;

  const engines: Engines = {
    vocabulary: vocabularyEngine({ wordCount, uniqueCount, hapaxCount }),
    repetition: repetitionEngine({ bigramRepeatRate, trigramRepeatRate, topWordShare }),
    structure: structureEngine({ sentenceLengths: sentenceWordLengths }),
    predictability: predictabilityEngine({ wordFreq, normalizedH, bigramRepeatRate }),
    stopwords: stopwordEngine({ stopwordRatio }),
    sentence_pattern: sentencePatternEngine({ startersRepeatRate, starterDiversity }),
    genericity: genericityEngine({ buzzwordDensity, phraseHitRate, abstractSuffixRatio, specificityScore }),
    boilerplate: boilerplateEngine({ boilerplateDensity }),
    sentence_similarity: sentenceSimilarityEngine({ avgSentenceJaccard }),
    discourse: discourseEngine({ discourseRate, specificityScore }),
    coaching: coachingToneEngine({ secondPersonRatio, coachingRate, specificityScore }),
    prompty: promptyScore,
  };

  const metrics: Metrics = {
    wordCount,
    ttr,
    bigramRepeatRate,
    trigramRepeatRate,
    sentenceCv,
    normalizedEntropy: normalizedH,
    stopwordRatio,
    startersRepeatRate,
    starterDiversity,
    buzzwordDensity,
    phraseHitRate,
    abstractSuffixRatio,
    specificityScore,
    boilerplateDensity,
    avgSentenceJaccard,
    discourseRate,
    coachingRate,
    secondPersonRatio,
    promptyScore,
  };

  const patterns = buildPatterns(metrics, engines);
  const totalPatternWeight = patterns.reduce((a, p) => a + p.weight, 0) || 1;
  const patternConfidence =
    patterns.reduce((a, p) => a + p.weight * (p.detected ? p.score : 0), 0) / totalPatternWeight;

  const engineValues = Object.values(engines).slice(0, 11);
  const engineAvg = engineValues.length ? computeMean(engineValues) : 0;

  const confidence = clamp01(0.78 * patternConfidence + 0.22 * engineAvg);

  const lengthPenalty = clamp01((wordCount - 18) / 42);
  const baseCluster = clamp01((engines.genericity + engines.boilerplate + engines.discourse + engines.coaching) / 4);
  const templateCluster = clamp01(0.6 * baseCluster + 0.4 * engines.prompty);
  const combined = clamp01(confidence + (1 - confidence) * templateCluster * 0.9);
  const buzzwordSignal = clamp01((buzzwordDensity - 0.04) / 0.14);
  const detectorStyleCluster = clamp01(
    0.34 * engines.genericity +
      0.26 * engines.boilerplate +
      0.15 * engines.structure +
      0.1 * engines.sentence_similarity +
      0.1 * (1 - specificityScore) +
      0.05 * buzzwordSignal
  );
  const phraseBoilerplateSignal = clamp01((phraseHitRate + boilerplateDensity) / 1.2);
  const polishedTemplateCluster = clamp01(detectorStyleCluster + phraseBoilerplateSignal * 0.25 + engines.prompty * 0.35);
  const calibratedScore = Math.max(
    combined * 1.35,
    polishedTemplateCluster * 1.34,
    (0.45 * combined + 0.55 * polishedTemplateCluster) * 1.45
  );
  const aiScore01 = clamp01(calibratedScore) * (0.7 + 0.3 * lengthPenalty);
  const aiPercent = Math.round(clamp01(aiScore01) * 100);
  const humanPercent = 100 - aiPercent;

  const label = aiPercent >= 70 ? "AI" : aiPercent <= 30 ? "Human" : "Mixed";

  const explanation = patterns
    .filter((p) => p.detected)
    .sort((a, b) => b.weight * b.score - a.weight * a.score)
    .slice(0, 6)
    .map((p) => p.name);

  const globalTemplateBoost = templateCluster;
  const globalBoilerplateBoost = engines.boilerplate;

  const sentenceResults: SentenceResult[] = sentences.map((s) => {
    const sTokens = tokenizeWordsWithOffsets(s.text);
    const sWords = sTokens.map((t) => toLower(t.token));
    const sFreq = new Map<string, number>();
    let sStop = 0;
    for (const w of sWords) {
      sFreq.set(w, (sFreq.get(w) || 0) + 1);
      if (STOPWORDS.has(w)) sStop++;
    }
    const sUnique = sFreq.size;
    const sHapax = Array.from(sFreq.values()).filter((c) => c === 1).length;
    const sStopRatio = sWords.length ? sStop / sWords.length : 0;

    const sBigrams = ngramCounts(sWords, 2);
    const sTrigrams = ngramCounts(sWords, 3);
    const sBiRepeat = repetitionRateFromCounts(sBigrams, Math.max(0, sWords.length - 1));
    const sTriRepeat = repetitionRateFromCounts(sTrigrams, Math.max(0, sWords.length - 2));
    const sEntropy = normalizedEntropy(sFreq);

    const sBuzzHits = sWords.filter((w) => BUZZWORDS.has(w)).length;
    const sBuzzDensity = sWords.length ? sBuzzHits / sWords.length : 0;
    const sLower = s.text.toLowerCase();
    const sPhraseHits = TEMPLATE_PHRASES.reduce((sum, p) => sum + (sLower.includes(p) ? 1 : 0), 0);
    const sPhraseHitRate = clamp01(sPhraseHits / Math.max(1, Math.min(4, sWords.length / 16)));
    const sAbstractHits = sWords.filter((w) => ABSTRACT_SUFFIXES.some((suf) => w.endsWith(suf))).length;
    const sAbstractRatio = sWords.length ? sAbstractHits / sWords.length : 0;
    const sHasNumbers = /(\d)/.test(s.text) ? 1 : 0;
    const sHasUrlOrEmail = /(https?:\/\/|www\.|@\w+)/i.test(s.text) ? 1 : 0;
    const sSentenceStartSet = new Set([0]);
    const sProperMidSentence = sTokens.filter((t) => /^[A-Z]/.test(t.token) && !sSentenceStartSet.has(t.start)).length;
    const sProperMidRatio = sWords.length ? sProperMidSentence / sWords.length : 0;
    const sSpecificityScore = clamp01(0.55 * sHasNumbers + 0.25 * sHasUrlOrEmail + 0.2 * clamp01(sProperMidRatio / 0.04));

    const sAvg =
      (vocabularyEngine({ wordCount: sWords.length, uniqueCount: sUnique, hapaxCount: sHapax }) +
        repetitionEngine({ bigramRepeatRate: sBiRepeat, trigramRepeatRate: sTriRepeat, topWordShare: 0 }) +
        predictabilityEngine({ wordFreq: sFreq, normalizedH: sEntropy, bigramRepeatRate: sBiRepeat }) +
        stopwordEngine({ stopwordRatio: sStopRatio })) /
      4;
    const sGen = genericityEngine({
      buzzwordDensity: sBuzzDensity,
      phraseHitRate: sPhraseHitRate,
      abstractSuffixRatio: sAbstractRatio,
      specificityScore: sSpecificityScore,
    });
    const globalBoost = 0.18 * globalTemplateBoost + 0.18 * globalBoilerplateBoost + 0.28 * polishedTemplateCluster;
    const multiplier = polishedTemplateCluster >= 0.62 ? 1.24 : 1.1;
    const ai = clamp01((0.45 * sAvg + 0.55 * sGen + globalBoost) * multiplier);
    return {
      text: s.text,
      start: s.start,
      end: s.end,
      ai,
      label: (ai >= 0.6 ? "AI" : ai <= 0.25 ? "Human" : "Mixed") as SentenceResult["label"],
    };
  });

  const chunks = sentenceResults.map((s) => ({
    text: s.text,
    startSpan: s.start,
    endSpan: s.end,
    type: (String(s.label).toUpperCase() === "AI" ? "AI" : "HUMAN") as "AI" | "HUMAN",
    aiScore: s.ai >= 0.6 ? s.ai : 0,
    humanParaphrasedScore: 0,
    aiParaphrasedScore: 0,
    isFailed: false,
    explainer: s.ai >= 0.6 ? { modelID: "w3tech-local-heuristic-1.0", is_reliable: false } : null,
  }));

  const Chunks = [...sentenceResults]
    .filter((s) => s.ai >= 0.6)
    .sort((a, b) => b.ai - a.ai)
    .slice(0, 12)
    .map((s) => s.text);

  return {
    Model: "W3Tech AI Content Checker Heuristic 1.0",
    Version: "1.0",
    AI: aiPercent,
    Human: humanPercent,
    Label: label,
    pattern_summary: {
      total_patterns_checked: patterns.length,
      patterns_detected: patterns.filter((p) => p.detected).length,
      confidence: clamp01(patternConfidence),
    },
    patterns,
    engines: {
      vocabulary: engines.vocabulary,
      repetition: engines.repetition,
      structure: engines.structure,
      predictability: engines.predictability,
      stopwords: engines.stopwords,
      sentence_pattern: engines.sentence_pattern,
      genericity: engines.genericity,
      boilerplate: engines.boilerplate,
      sentence_similarity: engines.sentence_similarity,
      discourse: engines.discourse,
      coaching: engines.coaching,
    },
    Chunks,
    chunks,
    Sentences: sentenceResults,
    explanation,
  };
}

const clampPercent = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function detectAIContentHeuristic(text: string, mode: "balanced" | "aggressive" | "conservative") {
  const inputText = String(text || "");
  if (!inputText.trim()) {
    return {
      Model: "W3Tech AI Content Checker Heuristic 1.0",
      Mode: mode,
      Label: "No text",
      AI: 0,
      Human: 100,
      Chunks: [] as string[],
      totalSentences: 0,
      totalAiSentences: 0,
      totalHumanSentences: 0,
      Sentences: [] as SentenceResult[],
      explanation: [] as string[],
    };
  }

  const data = detectAIPatterns(inputText);
  const currentAI = typeof data.AI === "number" ? data.AI : 0;
  let nextAI = currentAI;
  if (mode === "aggressive") nextAI = currentAI + (100 - currentAI) * 0.14;
  if (mode === "conservative") nextAI = currentAI * 0.82;

  const aiPercent = clampPercent(nextAI);
  const sentenceScale = currentAI ? aiPercent / currentAI : aiPercent / 100;
  const Sentences = data.Sentences.map((s) => {
    const ai = clamp01(s.ai * sentenceScale);
    return {
      ...s,
      ai,
      label: (ai >= 0.6 ? "AI" : ai <= 0.25 ? "Human" : "Mixed") as SentenceResult["label"],
    };
  });

  return {
    ...data,
    Mode: mode,
    AI: aiPercent,
    Human: 100 - aiPercent,
    Label: data.Label,
    Sentences,
    Chunks: Sentences.filter((s) => s.ai >= 0.6)
      .sort((a, b) => b.ai - a.ai)
      .slice(0, 12)
      .map((s) => s.text),
    totalSentences: Sentences.length,
    totalAiSentences: Sentences.filter((s) => s.ai >= 0.6).length,
    totalHumanSentences: Sentences.filter((s) => s.ai < 0.6).length,
  };
}