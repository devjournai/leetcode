/**
 * Shifting Letters Ii
 * Intuition: Applying multiple range updates on an array suggests using a difference array or prefix sum technique. Instead of directly modifying the string for each shift, we can track the net shift at each index efficiently.
 * Approach: 1. Initialize a `deltaShifts` array of the same length as the input string `s` with all elements set to zero. This array will store the change in total shift amount at each specific index.
 * 2. Iterate through each `shiftEntry` in the `shifts` array. For an entry `[startIndex, endIndex, shiftDirection]`:
 *    a. Determine `directionValue`: `1` for a forward shift (`shiftDirection === 1`) and `-1` for a backward shift (`shiftDirection === 0`).
 *    b. Add `directionValue` to `deltaShifts[startIndex]`. This marks the beginning of the shift effect.
 *    c. If `endIndex + 1` is a valid index within the string's bounds, subtract `directionValue` from `deltaShifts[endIndex + 1]`. This cancels out the shift effect beyond the specified `endIndex`.
 * 3. Initialize an empty array `finalStringParts` to store the characters of the resulting string and a `cumulativeShift` variable to `0`. Store the ASCII value of 'a' for character conversions.
 * 4. Iterate from `characterIndex = 0` up to `s.length - 1`:
 *    a. Update `cumulativeShift` by adding `deltaShifts[characterIndex]` to it.
 *    b. Normalize `cumulativeShift` to be within the `[0, 25]` range by taking it modulo 26. If the result is negative, add 26 to make it positive.
 *    c. Get the `originalCharCode` for the character `s[characterIndex]`.
 *    d. Convert `originalCharCode` to its 0-25 alphabet index: `normalizedOriginalCode = originalCharCode - alphaA`.
 *    e. Apply the `cumulativeShift` to `normalizedOriginalCode`, ensuring the result wraps around within 0-25: `shiftedNormalizedCode = (normalizedOriginalCode + cumulativeShift) % 26`.
 *    f. Convert `shiftedNormalizedCode` back to a character by adding `alphaA` and append it to `finalStringParts`.
 * 5. Join `finalStringParts` to form the final string and return it.
 * Dry Run: s = "abc", shifts = [[0,1,0],[1,2,1]]
 * stringLength = 3
 * deltaShifts = [0, 0, 0]
 * alphaA = 97 ('a')
 *
 * Process shifts:
 * 1. shiftEntry = [0, 1, 0] (shift 'a','b' backward)
 *    directionValue = -1
 *    deltaShifts[0] += -1  => deltaShifts = [-1, 0, 0]
 *    endIndex + 1 = 2 < 3. deltaShifts[2] -= -1 => deltaShifts[2] += 1 => deltaShifts = [-1, 0, 1]
 * 2. shiftEntry = [1, 2, 1] (shift 'b','c' forward)
 *    directionValue = 1
 *    deltaShifts[1] += 1  => deltaShifts = [-1, 1, 1]
 *    endIndex + 1 = 3 (not < 3).
 * Current deltaShifts = [-1, 1, 1]
 *
 * Process characters:
 * finalStringParts = []
 * cumulativeShift = 0
 *
 * characterIndex = 0: (s[0] = 'a')
 *   cumulativeShift = (0 + deltaShifts[0]) = (0 + -1) = -1
 *   cumulativeShift = (-1 % 26) = -1. Since negative, cumulativeShift = -1 + 26 = 25.
 *   originalCharCode = 'a'.charCodeAt(0) = 97
 *   normalizedOriginalCode = 97 - 97 = 0
 *   shiftedNormalizedCode = (0 + 25) % 26 = 25
 *   finalStringParts.push(String.fromCharCode(25 + 97)) => finalStringParts = ['z']
 *
 * characterIndex = 1: (s[1] = 'b')
 *   cumulativeShift = (25 + deltaShifts[1]) = (25 + 1) = 26
 *   cumulativeShift = (26 % 26) = 0.
 *   originalCharCode = 'b'.charCodeAt(0) = 98
 *   normalizedOriginalCode = 98 - 97 = 1
 *   shiftedNormalizedCode = (1 + 0) % 26 = 1
 *   finalStringParts.push(String.fromCharCode(1 + 97)) => finalStringParts = ['z', 'b']
 *
 * characterIndex = 2: (s[2] = 'c')
 *   cumulativeShift = (0 + deltaShifts[2]) = (0 + 1) = 1
 *   cumulativeShift = (1 % 26) = 1.
 *   originalCharCode = 'c'.charCodeAt(0) = 99
 *   normalizedOriginalCode = 99 - 97 = 2
 *   shiftedNormalizedCode = (2 + 1) % 26 = 3
 *   finalStringParts.push(String.fromCharCode(3 + 97)) => finalStringParts = ['z', 'b', 'd']
 *
 * Result: finalStringParts.join('') = "zbd"
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var shiftingLetters = function (s, shifts) {
  const stringLength = s.length;
  const deltaShifts = new Array(stringLength).fill(0);

  for (const shiftEntry of shifts) {
    const startIndex = shiftEntry[0];
    const endIndex = shiftEntry[1];
    const shiftDirection = shiftEntry[2];

    const directionValue = shiftDirection === 1 ? 1 : -1;

    deltaShifts[startIndex] += directionValue;
    if (endIndex + 1 < stringLength) {
      deltaShifts[endIndex + 1] -= directionValue;
    }
  }

  const finalStringParts = [];
  let cumulativeShift = 0;
  const alphaA = "a".charCodeAt(0);

  for (
    let characterIndex = 0;
    characterIndex < stringLength;
    characterIndex++
  ) {
    cumulativeShift += deltaShifts[characterIndex];
    cumulativeShift %= 26;
    if (cumulativeShift < 0) {
      cumulativeShift += 26;
    }

    const originalCharCode = s.charCodeAt(characterIndex);
    const normalizedOriginalCode = originalCharCode - alphaA;
    const shiftedNormalizedCode =
      (normalizedOriginalCode + cumulativeShift) % 26;
    const finalCharCode = shiftedNormalizedCode + alphaA;

    finalStringParts.push(String.fromCharCode(finalCharCode));
  }

  return finalStringParts.join("");
};
