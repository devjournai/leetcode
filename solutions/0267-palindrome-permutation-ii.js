/**
 * Palindrome Permutation II
 * Time Complexity: O(N + (N/2)! * N/2)
 * Space Complexity: O(N)
 */
var generatePalindromes = function (s) {
  const charFrequencies = new Map();
  for (const singleCharacter of s) {
    charFrequencies.set(
      singleCharacter,
      (charFrequencies.get(singleCharacter) || 0) + 1,
    );
  }

  let oddFrequencyCounter = 0;
  let centerCharacter = "";
  const firstHalfChars = [];

  for (const [keyCharEntry, valueCountEntry] of charFrequencies) {
    if (valueCountEntry % 2 !== 0) {
      oddFrequencyCounter++;
      centerCharacter = keyCharEntry;
    }
    for (
      let characterAppendIndex = 0;
      characterAppendIndex < Math.floor(valueCountEntry / 2);
      characterAppendIndex++
    ) {
      firstHalfChars.push(keyCharEntry);
    }
  }

  if (oddFrequencyCounter > 1) {
    return [];
  }

  const palindromeResults = new Set();

  firstHalfChars.sort();

  function permuteHalf(currentHalfPermutation, usedCharStatus) {
    if (currentHalfPermutation.length === firstHalfChars.length) {
      const currentHalfString = currentHalfPermutation.join("");
      const reversedHalfChars = [...currentHalfPermutation].reverse().join("");
      const completePalindrome =
        currentHalfString + centerCharacter + reversedHalfChars;
      palindromeResults.add(completePalindrome);
      return;
    }

    for (
      let selectionIndex = 0;
      selectionIndex < firstHalfChars.length;
      selectionIndex++
    ) {
      if (
        usedCharStatus[selectionIndex] ||
        (selectionIndex > 0 &&
          firstHalfChars[selectionIndex] ===
            firstHalfChars[selectionIndex - 1] &&
          !usedCharStatus[selectionIndex - 1])
      ) {
        continue;
      }

      usedCharStatus[selectionIndex] = true;
      currentHalfPermutation.push(firstHalfChars[selectionIndex]);
      permuteHalf(currentHalfPermutation, usedCharStatus);
      currentHalfPermutation.pop();
      usedCharStatus[selectionIndex] = false;
    }
  }

  permuteHalf([], new Array(firstHalfChars.length).fill(false));

  return Array.from(palindromeResults);
};
