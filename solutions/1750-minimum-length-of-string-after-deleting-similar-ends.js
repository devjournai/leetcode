/**
 * Minimum Length Of String After Deleting Similar Ends
 * Intuition: While the first and last remaining characters match, delete that character from both ends (any prefix/suffix of it). Repeat until ends differ or the string is empty.
 * Approach: 1. Two pointers `currentLeft`/`currentRight`. 2. While ends equal, skip all of `matchingCharacter` from both sides. 3. Return remaining length `currentRight - currentLeft + 1` (or 0).
 * Dry Run: strInput = "aabccabba"
 * ends 'a': strip leading aa and trailing a → "bccabb"; ends b: strip b's → "cca"; ends a? no, 'c'!='a'. Length 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumLength = function (strInput) {
  let currentLeft = 0;
  let currentRight = strInput.length - 1;

  while (
    currentLeft < currentRight &&
    strInput[currentLeft] === strInput[currentRight]
  ) {
    const matchingCharacter = strInput[currentLeft];

    for (
      ;
      currentLeft <= currentRight &&
      strInput[currentLeft] === matchingCharacter;
    ) {
      currentLeft++;
    }

    for (
      ;
      currentLeft <= currentRight &&
      strInput[currentRight] === matchingCharacter;
    ) {
      currentRight--;
    }
  }

  return Math.max(0, currentRight - currentLeft + 1);
};
