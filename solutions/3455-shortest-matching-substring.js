/**
 * Shortest Matching Substring
 * Intuition: Pattern `p` is `prefix*middle*suffix`. The shortest match in `s` is the shortest window that contains those three pieces in order (each piece may be empty).
 * Approach: 1. Split `p` on the two `*` characters. 2. KMP-find every start index of prefix, middle, and suffix (`empty` matches at every index `0..n`). 3. Sweep three pointers: for each prefix start, take the earliest middle that starts at or after the prefix ends, then the earliest suffix after that middle. 4. Track `suffixEnd - prefixStart`. 5. Return the minimum length, or `-1`.
 * Dry Run: s = "abaacbaecebce", p = "ba*c*ce". Prefix "ba" at 0, middle "c" after that, suffix "ce" ending at 12 → window length 13; later "ba" at 4 with "c"/"ce" yields a shorter valid window. Empty pieces collapse to zero-width matches.
 * Time Complexity: O(|s| + |p|)
 * Space Complexity: O(|s| + |p|)
 */
function buildLps(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let prefixLength = 0;
  for (let index = 1; index < pattern.length; index++) {
    while (prefixLength > 0 && pattern[prefixLength] !== pattern[index]) {
      prefixLength = lps[prefixLength - 1];
    }
    if (pattern[prefixLength] === pattern[index]) {
      prefixLength++;
      lps[index] = prefixLength;
    }
  }
  return lps;
}

function findMatchStarts(text, pattern) {
  if (pattern.length === 0) {
    return Array.from({ length: text.length + 1 }, (_, index) => index);
  }

  const lps = buildLps(pattern);
  const starts = [];
  let matched = 0;
  for (let index = 0; index < text.length; index++) {
    while (matched > 0 && text[index] !== pattern[matched]) {
      matched = lps[matched - 1];
    }
    if (text[index] === pattern[matched]) {
      matched++;
    }
    if (matched === pattern.length) {
      starts.push(index - pattern.length + 1);
      matched = lps[matched - 1];
    }
  }
  return starts;
}

var shortestMatchingSubstring = function (s, p) {
  const firstStar = p.indexOf("*");
  const secondStar = p.indexOf("*", firstStar + 1);
  const prefix = p.slice(0, firstStar);
  const middle = p.slice(firstStar + 1, secondStar);
  const suffix = p.slice(secondStar + 1);

  const prefixStarts = findMatchStarts(s, prefix);
  const middleStarts = findMatchStarts(s, middle);
  const suffixStarts = findMatchStarts(s, suffix);

  let shortestLength = Infinity;
  let middleIndex = 0;
  let suffixIndex = 0;

  for (const prefixStart of prefixStarts) {
    const prefixEnd = prefixStart + prefix.length;
    while (
      middleIndex < middleStarts.length &&
      middleStarts[middleIndex] < prefixEnd
    ) {
      middleIndex++;
    }
    if (middleIndex === middleStarts.length) {
      break;
    }

    const middleEnd = middleStarts[middleIndex] + middle.length;
    while (
      suffixIndex < suffixStarts.length &&
      suffixStarts[suffixIndex] < middleEnd
    ) {
      suffixIndex++;
    }
    if (suffixIndex === suffixStarts.length) {
      break;
    }

    shortestLength = Math.min(
      shortestLength,
      suffixStarts[suffixIndex] + suffix.length - prefixStart
    );
  }

  return shortestLength === Infinity ? -1 : shortestLength;
};
