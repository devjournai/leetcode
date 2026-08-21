/**
 * Palindrome Permutation II
 * Intuition: Palindromes are a permutation of the first half, an optional odd-count center, and the reversed half. If more than one odd count, none exist. Unique permutations of the half (skipping duplicate adjacent unused letters) plus a Set drop remaining duplicates.
 * Approach: 1. Count frequencies. 2. Track odd count and `centerCharacter`; push floor(count/2) copies into `firstHalfChars`. 3. If oddCount > 1, return []. 4. Sort the half and backtrack permutations, skipping used or duplicate-with-previous-unused. 5. At a full half, insert `half + center + reverse(half)` into a Set; return its array.
 * Dry Run: s = "aabb".
 *   - Half ['a','b'] (sorted). Perms ab and ba → "abba", "baab". Return those two.
 * Time Complexity: O(N + (N/2)! * N/2)
 * Space Complexity: O(N)
 */
var generatePalindromes = function (s) {
  const charFrequencies = new Map();
  for (const singleCharacter of s) {
    charFrequencies.set(
      singleCharacter,
      (charFrequencies.get(singleCharacter) || 0) + 1
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
