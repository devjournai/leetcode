/**
 * Merge Close Characters II
 * Intuition: We use a hash table last to record the last occurrence position of each character in the answer string. We iterate over each character in s from left to right. Let cur be the current length of the answer. If the character has appeared before and the difference between cur and its last occurrence is at most k, we skip it; otherwise, we append the character to the answer and update its position in the hash table.
 * Approach: We use a hash table last to record the last occurrence position of each character in the answer string. We iterate over each character in s from left to right. Let cur be the current length of the answer. If the character has appeared before and the difference between cur and its last occurrence is at most k, we skip it; otherwise, we append the character to the answer and update its position in the hash table. Each merge always removes the right character, so the positions in the answer are exactly the indices in the current string. This greedy process is equivalent to repeatedly performing the required merge operations.
 * Dry Run: Input: s = "abca", k = 3. Output: "abc".
 * Time Complexity: O(n)
 * Space Complexity: O(|Sigma|)
 */
var mergeCharacters = function (s, k) {
  const last = new Map();
  const ans = [];
  for (const c of s) {
    const cur = ans.length;
    if (last.has(c) && cur - last.get(c) <= k) {
      continue;
    }
    ans.push(c);
    last.set(c, cur);
  }
  return ans.join("");
};
