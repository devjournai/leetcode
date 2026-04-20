/**
 * Generate A String With Characters That Have Odd Counts
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var generateTheString = function (n) {
  if (n % 2 === 1) {
    let firstResultString = "";
    firstResultString = "a".repeat(n);
    return firstResultString;
  } else {
    let secondResultString = "";
    secondResultString = "a".repeat(n - 1) + "b";
    return secondResultString;
  }
};
