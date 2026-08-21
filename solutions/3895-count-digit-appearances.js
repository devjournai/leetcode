/**
 * Count Digit Appearances
 * Intuition: We traverse each element in the array and count how many times $\textit{digit}$ appears. For each element, we can obtain each of its digits by repeatedly taking the modulo and dividing by 10, and compare each digit with $\textit{digit}$. If they are equal, we increment the answer by 1. Finally, return the answer. The time complexity is $O(n \times \log_{10} M)$, and the space complexity is $O(1)$. Here, $n$ and $M$ are the length of the array and the maximum value in the array, respectively.
 * Approach: We traverse each element in the array and count how many times $\textit{digit}$ appears. For each element, we can obtain each of its digits by repeatedly taking the modulo and dividing by 10, and compare each digit with $\textit{digit}$. If they are equal, we increment the answer by 1. Finally, return the answer. The time complexity is $O(n \times \log_{10} M)$, and the space complexity is $O(1)$. Here, $n$ and $M$ are the length of the array and the maximum value in the array, respectively.
 * Dry Run: Input: nums = [12,54,32,22], digit = 2 => Output: 4
 * Time Complexity: O(O(n * log_{10} M))
 * Space Complexity: O(O(1))
 */
var countDigitOccurrences = function (nums, digit) {
  let ans = 0;
  for (let x of nums) {
    for (; x; x = Math.floor(x / 10)) {
      if (x % 10 === digit) {
        ++ans;
      }
    }
  }
  return ans;
};
