/**
 * Custom Sort String
 * Intuition: Count letters in `tSourceString`, emit them in `sOrderString` order, then leftover a–z in alphabet order.
 * Approach: 1. Fill `characterFrequencies[26]` from `tSourceString`. 2. For each `s` char, push that many copies and zero the count. 3. Scan 0–25 and append remaining counts. 4. `join` `resultArray`.
 * Dry Run: s = "cba", t = "abcd". Counts a:1 b:1 c:1 d:1. Emit c,b,a then leftover d → "cbad".
 * Time Complexity: O(S_LEN + T_LEN)
 * Space Complexity: O(T_LEN)
 */
var customSortString = function (sOrderString, tSourceString) {
  const characterFrequencies = new Array(26).fill(0);
  const alphaCodeOffset = "a".charCodeAt(0);

  let tIndex = 0;
  const tSourceLength = tSourceString.length;
  while (tIndex < tSourceLength) {
    const currentTCharCode = tSourceString.charCodeAt(tIndex);
    const frequencyIndex = currentTCharCode - alphaCodeOffset;
    characterFrequencies[frequencyIndex]++;
    tIndex++;
  }

  const resultArray = [];
  let sIndex = 0;
  const sOrderLength = sOrderString.length;
  while (sIndex < sOrderLength) {
    const sCurrentCharCode = sOrderString.charCodeAt(sIndex);
    const sFrequencyIndex = sCurrentCharCode - alphaCodeOffset;
    let repetitionCount = characterFrequencies[sFrequencyIndex];
    while (repetitionCount > 0) {
      resultArray.push(String.fromCharCode(sCurrentCharCode));
      repetitionCount--;
    }
    characterFrequencies[sFrequencyIndex] = 0;
    sIndex++;
  }

  let alphaIndex = 0;
  const alphabetRange = 26;
  while (alphaIndex < alphabetRange) {
    const remainingCharAscii = alphaIndex + alphaCodeOffset;
    let remainingCharCount = characterFrequencies[alphaIndex];
    while (remainingCharCount > 0) {
      resultArray.push(String.fromCharCode(remainingCharAscii));
      remainingCharCount--;
    }
    alphaIndex++;
  }

  return resultArray.join("");
};
