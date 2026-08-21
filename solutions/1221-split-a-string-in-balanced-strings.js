/**
 * Split A String In Balanced Strings
 * Intuition: A balanced piece is a prefix where #R equals #L; greedily cut every time the running balance returns to zero.
 * Approach: 1. +1 for R, -1 for L. 2. Whenever balance hits 0, increment the split count.
 * Dry Run: s="RLRRLLRLRL". Cuts after "RL", "RRLL", "RL", "RL" → 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var balancedStringSplit = function (s) {
  let balancedSubstringsCount = 0;
  let currentBalanceStatus = 0;

  for (const characterInstance of s) {
    if (characterInstance === "R") {
      currentBalanceStatus++;
    } else {
      currentBalanceStatus--;
    }

    if (currentBalanceStatus === 0) {
      balancedSubstringsCount++;
    }
  }

  return balancedSubstringsCount;
};
