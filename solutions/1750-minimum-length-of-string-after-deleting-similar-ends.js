/**
 * Minimum Length Of String After Deleting Similar Ends
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
