/**
 * Count of Substrings Containing Every Vowel and K Consonants II
 * Intuition: Same as 3305, but n is larger so the sliding-window difference of “at most k” and “at most k-1” must stay linear.
 * Approach: 1. Count windows with every vowel and at most k consonants. 2. Subtract the same count for k-1. 3. Track last-seen positions of a,e,i,o,u so all qualifying left bounds can be added in O(1).
 * Dry Run: word = "ieaouqqieaouq", k = 1
 *   - Windows that contain all vowels and exactly one consonant contribute 3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countOfSubstrings = function (word, k) {
  const vowelsSet = new Set(["a", "e", "i", "o", "u"]);

  const isVowel = (c) => vowelsSet.has(c);

  const substringsWithAtMost = (limit) => {
    if (limit < 0) {
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
