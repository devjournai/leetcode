/**
 * Count Substrings Divisible By Last Digit
 * Intuition: A substring ending at the current digit is divisible by that digit iff its numeric value mod digit is 0. Track, for every divisor 1..9, how many prefixes have each remainder, then append the new digit.
 * Approach: 1. dp[d][r] = count of substrings so far with value % d == r. 2. On digit x, new remainders are (old*10+x)%d, plus the singleton x. 3. Add dp[x][0] to the answer (skip x=0 since division by zero is invalid and those substrings do not count).
 * Dry Run: s = "129". "1" 1%1=0; "2" 2%2=0; "12" 12%2=0; "9" 9%9=0; "29" 29%9=2; "129" 129%9=3. Answer 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var countSubstrings = function (s) {
  let answer = 0;
  let dp = Array.from({ length: 10 }, () => new Array(10).fill(0));

  for (const character of s) {
    const digit = Number(character);
    const nextDp = Array.from({ length: 10 }, () => new Array(10).fill(0));
    for (let divisor = 1; divisor <= 9; divisor++) {
      for (let remainder = 0; remainder < divisor; remainder++) {
        nextDp[divisor][(remainder * 10 + digit) % divisor] +=
          dp[divisor][remainder];
      }
      nextDp[divisor][digit % divisor]++;
    }
    dp = nextDp;
    if (digit !== 0) {
      answer += dp[digit][0];
    }
  }
  return answer;
};
