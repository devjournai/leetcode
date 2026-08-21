/**
 * Convert Number Words to Digits
 * Intuition: We first establish a mapping relationship between number words and their corresponding digits, recorded in array d, where d[i] represents the word corresponding to digit i.
 * Approach: Then we traverse the string s from left to right. For each position i, we enumerate the number words d[j] in order and check whether the substring starting from position i matches d[j]. If a match is found, we add digit j to the result and move position i forward by |d[j]| positions. Otherwise, we move position i forward by 1 position. We repeat this process until we have traversed the entire string s. Finally, we concatenate the digits in the result into a string and return it. The time complexity is O(n \times |d|) and the space complexity is O(|d|), where n is the length of string s and |d| is the number of digit words.
 * Dry Run: Input s = "onefourthree". Output "143".
 * Time Complexity: O(n \times |d|)
 * Space Complexity: O(|d|)
 */
var convertNumber = function (s) {
  const d = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const n = s.length;
  const ans = [];
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < d.length; ++j) {
      const t = d[j];
      const m = t.length;
      if (i + m <= n && s.substring(i, i + m) === t) {
        ans.push(j.toString());
        i += m - 1;
        break;
      }
    }
  }
  return ans.join("");
};
