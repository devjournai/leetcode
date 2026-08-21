/**
 * Find Kth Character in Expanded String
 * Intuition: We first split the string \textit{s} into multiple words by spaces. For each word \textit{w}, we can calculate the length it occupies in the expanded string \textit{t} as m=\frac{(1+|\textit{w}|)\cdot |\textit{w}|}{2}.
 * Approach: If k = m, it means the k-th character is a space, and we can directly return a space. If k > m, it means the k-th character is not in the expanded part of the current word. We subtract the expanded length m of the current word and the space length 1 from k, and continue processing the next word. Otherwise, the k-th character is in the expanded part of the current word. We can find the k-th character by simulating the expansion process: - Initialize a variable \textit{cur} = 0 to represent the number of characters that have been expanded so far. - Iterate through each character \textit{w}[i] of the word \textit{w}: - Increase \textit{cur} by i + 1. - If k < \textit{cur}, it means the k-th character is \textit{w}[i], and we return this character. The time complexity is O(n) and the space complexity is O(n), where n is the length of the string \textit{s}.
 * Dry Run: Input s = "hello world", k = 0. Output "h".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var kthCharacter = function (s, k) {
  for (const w of s.split(" ")) {
    const m = ((1 + w.length) * w.length) / 2;
    if (k === m) {
      return " ";
    }
    if (k > m) {
      k -= m + 1;
    } else {
      let cur = 0;
      for (let i = 0; ; ++i) {
        cur += i + 1;
        if (k < cur) {
          return w[i];
        }
      }
    }
  }
  return " ";
};
