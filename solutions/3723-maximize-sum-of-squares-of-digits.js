/**
 * Maximize Sum Of Squares Of Digits
 * Intuition: Digit squares grow with the digit, so use as many 9s as possible, then one remainder digit, then zeros to reach length num. Impossible if 9*num < sum.
 * Approach: If num*9 < sum return "". Else floor(sum/9) nines, remainder digit, pad zeros.
 * Dry Run: num = 2, sum = 3 → "30" (9s none, remainder 3, one zero).
 * Time Complexity: O(num)
 * Space Complexity: O(num)
 */
var maxSumOfSquares = function (num, sum) {
  if (num * 9 < sum) {
    return "";
  }
  const nines = Math.floor(sum / 9);
  const remainder = sum % 9;
  let answer = "9".repeat(nines);
  if (remainder > 0) {
    answer += String.fromCharCode(48 + remainder);
  }
  if (answer.length < num) {
    answer += "0".repeat(num - answer.length);
  }
  return answer;
};
