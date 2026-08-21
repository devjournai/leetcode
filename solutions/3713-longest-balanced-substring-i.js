/**
 * Longest Balanced Substring I
 * Intuition: A substring is balanced when every character that appears does so the same number of times. Brute all start/end pairs with a 26-count array.
 * Approach: 1. For each start i reset counts. 2. Extend j, increment s[j]. 3. Scan 26 buckets: all nonzero counts equal ⇒ update max length.
 * Dry Run: s = "abb". [0,0] "a" ok len 1; [0,1] a:1 b:1 ok len 2; [1,2] "bb" ok len 2. Answer 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var longestBalanced = function (s) {
  const n = s.length;
  let maxLength = 0;

  for (let i = 0; i < n; i++) {
    const charCounts = new Array(26).fill(0);

    for (let j = i; j < n; j++) {
      const charCode = s.charCodeAt(j) - 97;
      charCounts[charCode]++;

      let isBalanced = true;
      let firstCharCount = -1;

      for (let k = 0; k < 26; k++) {
        if (charCounts[k] > 0) {
          if (firstCharCount === -1) {
            firstCharCount = charCounts[k];
          } else if (charCounts[k] !== firstCharCount) {
            isBalanced = false;
            break;
          }
        }
      }

      if (isBalanced) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
};
