/**
 * Longest Balanced Substring I
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
