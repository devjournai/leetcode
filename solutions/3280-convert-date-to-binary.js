/**
 * Convert Date to Binary
 * Intuition: Split the date and write each decimal component in binary without leading zeros, keeping the dashes.
 * Approach: 1. Parse year, month, day. 2. Convert each with toString(2). 3. Join with '-'.
 * Dry Run:
 *   date = "2080-02-29" -> 2080=100000100000, 2=10, 29=11101 -> "100000100000-10-11101".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var convertDateToBinary = function (date) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));
  return `${year.toString(2)}-${month.toString(2)}-${day.toString(2)}`;
};
