/**
 * Count of Substrings Containing Every Vowel and K Consonants I
 * Intuition: Exactly k consonants equals (at most k) minus (at most k-1). A two-pointer window can count substrings that keep every vowel and at most k consonants.
 * Approach: 1. `substringsWithAtMost(k)` slides right, tracking vowel counts and last-seen vowel indices. 2. Shrink from the left while consonants exceed k. 3. When all 5 vowels are present, add windows that start from l through the earliest last-seen vowel. 4. Return atMost(k) - atMost(k-1).
 * Dry Run: word = "aeiou", k = 0
 *   - Only the full string has all vowels and 0 consonants → 1
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countOfSubstrings = function (word, k) {
  const vowelsSet = new Set(["a", "e", "i", "o", "u"]);

  const isVowel = (c) => vowelsSet.has(c);

  const substringsWithAtMost = (limit) => {
    if (limit === -1) {
      return 0;
    }

    let res = 0;
    let vowels = 0;
    let uniqueVowels = 0;
    const vowelLastSeen = {};
    let l = 0;

    for (let r = 0; r < word.length; r++) {
      const c = word[r];
      if (isVowel(c)) {
        vowels++;
        if (vowelLastSeen[c] === undefined || vowelLastSeen[c] < l) {
          uniqueVowels++;
        }
        vowelLastSeen[c] = r;
      }
      while (r - l + 1 - vowels > limit) {
        if (isVowel(word[l])) {
          vowels--;
          if (vowelLastSeen[word[l]] === l) {
            uniqueVowels--;
          }
        }
        l++;
      }
      if (uniqueVowels === 5) {
        res +=
          Math.min(
            vowelLastSeen.a,
            vowelLastSeen.e,
            vowelLastSeen.i,
            vowelLastSeen.o,
            vowelLastSeen.u
          ) -
          l +
          1;
      }
    }

    return res;
  };

  return substringsWithAtMost(k) - substringsWithAtMost(k - 1);
};
