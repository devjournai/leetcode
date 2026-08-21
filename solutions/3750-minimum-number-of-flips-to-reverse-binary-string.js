/**
 * Minimum Number of Flips to Reverse Binary String
 * Intuition: We first convert the integer n into a binary string s. Then we use two pointers to traverse from both ends of the string towards the center, counting the number of positions where the characters differ, denoted as cnt. Since each flip can only affect one bit, the total number of flips is cnt \times 2.
 * Approach: The time complexity is O(\log n) and the space complexity is O(\log n), where n is the input integer.
 * Dry Run: Input n = 7. Output 0.
 * Time Complexity: O(\log n)
 * Space Complexity: O(\log n)
 */
var minimumFlips = function (n) {
  const s = n.toString(2);
  const m = s.length;
  let cnt = 0;
  for (let i = 0; i < m / 2; i++) {
    if (s[i] !== s[m - i - 1]) {
      cnt++;
    }
  }
  return cnt * 2;
};
