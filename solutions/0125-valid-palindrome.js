/**
 * Valid Palindrome
 * Intuition: Ignore non-alphanumeric characters and case; a palindrome means the remaining characters read the same inward from both ends.
 * Approach: 1. Two pointers at start and end. 2. Skip characters that fail /^[a-z0-9]$/i. 3. Compare lowercase versions; mismatch → false. 4. Step inward until pointers meet → true.
 * Dry Run: "A man, a plan, a canal: Panama". After skips, pairs A/a, m/m, … all match → true. "race a car" fails at e vs a.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isPalindrome = function (s) {
  let advanceLeft = 0;
  let retreatRight = s.length - 1;

  const isCharacterAlphanumeric = (testCharacter) => {
    return /^[a-z0-9]$/i.test(testCharacter);
  };

  while (advanceLeft < retreatRight) {
    while (
      advanceLeft < retreatRight &&
      !isCharacterAlphanumeric(s[advanceLeft])
    ) {
      advanceLeft++;
    }
    while (
      advanceLeft < retreatRight &&
      !isCharacterAlphanumeric(s[retreatRight])
    ) {
      retreatRight--;
    }

    if (advanceLeft >= retreatRight) {
      break;
    }

    const charAtBeginning = s[advanceLeft].toLowerCase();
    const charAtEnding = s[retreatRight].toLowerCase();

    if (charAtBeginning !== charAtEnding) {
      return false;
    }

    advanceLeft++;
    retreatRight--;
  }

  return true;
};
