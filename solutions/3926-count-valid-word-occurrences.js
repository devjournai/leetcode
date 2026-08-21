/**
 * Count Valid Word Occurrences
 * Intuition: First, we concatenate all strings in chunks to obtain a single string s.
 * Approach: First, we concatenate all strings in chunks to obtain a single string s. Since the first character of a valid word must be a lowercase English letter, we scan s from left to right. When we encounter a lowercase English letter, we continue scanning to the right. If we encounter a space or an invalid hyphen, it means we have found a word. We add this word to a hash table and count its occurrences. Finally, we iterate through each string in queries, look up its count in the hash table, and append the result to the answer array.
 * Dry Run: Input: chunks = ["hello wor","ld hello"], queries = ["hello","world","wor"]. Output: [2,1,0].
 * Time Complexity: O(n+m)
 * Space Complexity: O(1)
 */
var countWordOccurrences = function (chunks, queries) {
  const s = chunks.join("");
  const n = s.length;
  const cnt = new Map();
  let i = 0;
  while (i < n) {
    if (s[i] === " " || s[i] === "-") {
      i++;
      continue;
    }
    let j = i;
    while (
      j < n &&
      s[j] !== " " &&
      (s[j] !== "-" || (j + 1 < n && s[j + 1] !== " " && s[j + 1] !== "-"))
    ) {
      j++;
    }
    const word = s.substring(i, j);
    cnt.set(word, (cnt.get(word) || 0) + 1);
    i = j;
  }
  return queries.map((q) => cnt.get(q) || 0);
};
