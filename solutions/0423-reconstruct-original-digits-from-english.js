/**
 * Reconstruct Original Digits From English
 * Intuition: Some letters appear in only one digit word (z→0, w→2, u→4, x→6, g→8). Remaining digits are recovered by subtracting those unique counts from shared letters (h, f, s, o, n).
 * Approach: 1. Count letters a–z. 2. Set even unique digits, then 3/5/7, then 1 and 9 (`n` leftover / 2). 3. Repeat each digit index `digitCounts[i]` times into a string.
 * Dry Run: s = "owoztneoer".
 *   - z→1 zero, w→1 two, o leftover → 1 one. Output "012".
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var originalDigits = function (s) {
  const charFrequencies = new Array(26).fill(0);
  const asciiOffset = 97;

  for (const inputChar of s) {
    charFrequencies[inputChar.charCodeAt(0) - asciiOffset]++;
  }

  const digitCounts = new Array(10).fill(0);

  digitCounts[0] = charFrequencies["z".charCodeAt(0) - asciiOffset];
  digitCounts[2] = charFrequencies["w".charCodeAt(0) - asciiOffset];
  digitCounts[4] = charFrequencies["u".charCodeAt(0) - asciiOffset];
  digitCounts[6] = charFrequencies["x".charCodeAt(0) - asciiOffset];
  digitCounts[8] = charFrequencies["g".charCodeAt(0) - asciiOffset];

  digitCounts[3] =
    charFrequencies["h".charCodeAt(0) - asciiOffset] - digitCounts[8];
  digitCounts[5] =
    charFrequencies["f".charCodeAt(0) - asciiOffset] - digitCounts[4];
  digitCounts[7] =
    charFrequencies["s".charCodeAt(0) - asciiOffset] - digitCounts[6];

  digitCounts[1] =
    charFrequencies["o".charCodeAt(0) - asciiOffset] -
    digitCounts[0] -
    digitCounts[2] -
    digitCounts[4];
  digitCounts[9] =
    (charFrequencies["n".charCodeAt(0) - asciiOffset] -
      digitCounts[1] -
      digitCounts[7]) /
    2;

  const reconstructedDigits = digitCounts.reduce(
    (accumulatorString, currentCount, digitIndex) => {
      return accumulatorString + String(digitIndex).repeat(currentCount);
    },
    ""
  );

  return reconstructedDigits;
};
