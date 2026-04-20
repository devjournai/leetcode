/**
 * Top K Frequent Words
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
