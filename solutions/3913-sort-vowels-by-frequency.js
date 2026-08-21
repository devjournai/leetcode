/**
 * Sort Vowels by Frequency
 * Intuition: We can use a hash table cnt to record the frequency of each vowel. We also need a list vowels to store the vowels that appear in the string, ordered by their first occurrence.
 * Approach: We can use a hash table cnt to record the frequency of each vowel. We also need a list vowels to store the vowels that appear in the string, ordered by their first occurrence. We then sort the vowels list with a custom comparator: vowels are sorted in non-increasing order of their frequency. Finally, we traverse the string, replacing each vowel with the corresponding letter from the vowels list, and update the frequency in the hash table. When the frequency of a vowel becomes 0, we move the pointer in the vowels list forward by one.
 * Dry Run: Input: s = "leetcode". Output: "leetcedo".
 * Time Complexity: O(n+|Sigma|log|Sigma|)
 * Space Complexity: O(n+|Sigma|)
 */
var sortVowels = function (s) {
  const st = new Set("aeiou");
  const vowels = [];
  const cnt = new Map();
  for (const c of s) {
    if (!st.has(c)) {
      continue;
    }
    if (!cnt.has(c)) {
      vowels.push(c);
    }
    cnt.set(c, (cnt.get(c) || 0) + 1);
  }
  vowels.sort((a, b) => (cnt.get(b) || 0) - (cnt.get(a) || 0));
  const ans = s.split("");
  let i = 0;
  for (let k = 0; k < s.length; k++) {
    let c = s[k];
    if (!st.has(c)) {
      continue;
    }
    c = vowels[i];
    ans[k] = c;
    cnt.set(c, (cnt.get(c) || 0) - 1);
    if (cnt.get(c) === 0) {
      i++;
    }
  }
  return ans.join("");
};
