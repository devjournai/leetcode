/**
 * Split A String In Balanced Strings
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
