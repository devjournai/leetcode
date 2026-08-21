/**
 * Top K Frequent Words
 * Intuition: Count frequencies, then sort unique words by count descending and lexicographic ascending, then take the first k.
 * Approach: 1. Fill `wordFrequencyMap`. 2. Sort `frequencyEntriesArray` with `secondFrequency - firstFrequency` else `localeCompare`. 3. `slice(0,k)` and map to words.
 * Dry Run: words=["i","love","leetcode","i","love","coding"], k=2. counts i:2 love:2 leetcode:1 coding:1. Sorted i, love, coding, leetcode → ["i","love"].
 * Time Complexity: O(S + U log U * L)
 * Space Complexity: O(S)
 */
var topKFrequent = function (words, k) {
  let wordFrequencyMap = new Map();
  for (let currentWord of words) {
    let currentCount = wordFrequencyMap.get(currentWord) || 0;
    wordFrequencyMap.set(currentWord, currentCount + 1);
  }

  let frequencyEntriesArray = [...wordFrequencyMap.entries()];

  frequencyEntriesArray.sort((firstEntry, secondEntry) => {
    let firstFrequency = firstEntry[1];
    let secondFrequency = secondEntry[1];
    let firstString = firstEntry[0];
    let secondString = secondEntry[0];

    if (firstFrequency !== secondFrequency) {
      return secondFrequency - firstFrequency;
    } else {
      return firstString.localeCompare(secondString);
    }
  });

  let topKSortedEntries = frequencyEntriesArray.slice(0, k);

  let resultWords = topKSortedEntries.map((entryItem) => entryItem[0]);

  return resultWords;
};
