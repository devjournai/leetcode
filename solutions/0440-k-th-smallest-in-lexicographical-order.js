/**
 * K Th Smallest In Lexicographical Order
 * Time Complexity: O((log N)^2)
 * Space Complexity: O(1)
 */
var findKthNumber = function (n, k) {
  let lexicalTarget = 1;
  let remainingSteps = k - 1;

  while (remainingSteps > 0) {
    let currentPrefixCount = 0;
    let initialRangeBoundary = lexicalTarget;
    let finalRangeBoundary = lexicalTarget + 1;

    while (initialRangeBoundary <= n) {
      currentPrefixCount += Math.min(n + 1, finalRangeBoundary) - initialRangeBoundary;

      if (initialRangeBoundary > Math.floor(n / 10)) {
        break;
      }
      initialRangeBoundary *= 10;
      finalRangeBoundary *= 10;
    }

    if (currentPrefixCount <= remainingSteps) {
      lexicalTarget++;
      remainingSteps -= currentPrefixCount;
    } else {
      lexicalTarget *= 10;
      remainingSteps--;
    }
  }

  return lexicalTarget;
};