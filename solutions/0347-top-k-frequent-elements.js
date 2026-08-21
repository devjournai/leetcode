/**
 * Top K Frequent Elements
 * Intuition: Count frequencies, then bucket numbers by count (index = frequency). Scanning buckets from high to low yields the k most frequent values.
 * Approach: 1. Tally numsArray in a Map. 2. bucketCollection[freq] holds those elements; length is n + 1. 3. Walk frequencyIndex from the end, pushing elements until resultElements has kValue items. 4. Return the result.
 * Dry Run: numsArray = [1, 1, 1, 2, 2, 3], kValue = 2.
 *   - Frequencies 1→3, 2→2, 3→1. High buckets first collect 1 then 2.
 *   - Return [1, 2].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var topKFrequent = function (numsArray, kValue) {
  const frequencyCounter = new Map();

  for (const numValue of numsArray) {
    const currentCount = frequencyCounter.get(numValue) || 0;
    frequencyCounter.set(numValue, currentCount + 1);
  }

  const bucketCollection = new Array(numsArray.length + 1)
    .fill(null)
    .map(() => []);

  for (const [elementItem, elementFrequency] of frequencyCounter.entries()) {
    bucketCollection[elementFrequency].push(elementItem);
  }

  const resultElements = [];
  for (
    let frequencyIndex = bucketCollection.length - 1;
    frequencyIndex >= 0;
    frequencyIndex--
  ) {
    const elementsAtCurrentFrequency = bucketCollection[frequencyIndex];
    if (elementsAtCurrentFrequency.length > 0) {
      for (const elementToCollect of elementsAtCurrentFrequency) {
        if (resultElements.length < kValue) {
          resultElements.push(elementToCollect);
        } else {
          break;
        }
      }
    }
    if (resultElements.length === kValue) {
      break;
    }
  }

  return resultElements;
};
