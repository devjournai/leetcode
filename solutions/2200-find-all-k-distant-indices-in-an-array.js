/**
 * Find All K Distant Indices In An Array
 * Intuition: Instead of identifying k-distant indices for each key-occurrence on-the-fly, first locate all occurrences of the key. Then, for each identified key location, expand outwards by 'k' to determine the range of indices that are k-distant from it. Collect all these indices in a set to handle duplicates efficiently, and finally sort them.
 * Approach: 1. Iterate through the input array to find all indices where `nums[j]` equals `key`. Store these indices in a separate list. 2. Initialize an empty Set to store the unique k-distant indices. 3. For each index `j` found in step 1: a. Calculate the lower bound for k-distance as `max(0, j - k)`. b. Calculate the upper bound for k-distance as `min(nums.length - 1, j + k)`. c. Iterate from the lower bound to the upper bound, adding each index to the Set. 4. Convert the Set of k-distant indices to an array and sort it in increasing order.
 * Dry Run: nums = [3,4,5,1,2,3,6,7], key = 3, k = 2
 *   arrayLength = 8
 *   keyLocations = []
 *   Loop (currentPosition 0 to 7):
 *     currentPosition = 0, valueAtCurrentPosition = 3. keyLocations.push(0). keyLocations = [0]
 *     currentPosition = 5, valueAtCurrentPosition = 3. keyLocations.push(5). keyLocations = [0, 5]
 *   distantIndexTracker = new Set()
 *   Loop (keyLocationIndex 0 to 1):
 *     keyLocationIndex = 0, referenceIndex = 0
 *       lowerBound = Math.max(0, 0 - 2) = 0
 *       upperBound = Math.min(7, 0 + 2) = 2
 *       Loop (candidateIndex 0 to 2):
 *         candidateIndex = 0. distantIndexTracker.add(0). Set = {0}
 *         candidateIndex = 1. distantIndexTracker.add(1). Set = {0, 1}
 *         candidateIndex = 2. distantIndexTracker.add(2). Set = {0, 1, 2}
 *     keyLocationIndex = 1, referenceIndex = 5
 *       lowerBound = Math.max(0, 5 - 2) = 3
 *       upperBound = Math.min(7, 5 + 2) = 7
 *       Loop (candidateIndex 3 to 7):
 *         candidateIndex = 3. distantIndexTracker.add(3). Set = {0, 1, 2, 3}
 *         candidateIndex = 4. distantIndexTracker.add(4). Set = {0, 1, 2, 3, 4}
 *         candidateIndex = 5. distantIndexTracker.add(5). Set = {0, 1, 2, 3, 4, 5}
 *         candidateIndex = 6. distantIndexTracker.add(6). Set = {0, 1, 2, 3, 4, 5, 6}
 *         candidateIndex = 7. distantIndexTracker.add(7). Set = {0, 1, 2, 3, 4, 5, 6, 7}
 *   finalSortedIndices = Array.from(distantIndexTracker) = [0, 1, 2, 3, 4, 5, 6, 7]
 *   finalSortedIndices.sort() does nothing.
 *   Return [0, 1, 2, 3, 4, 5, 6, 7].
 * Time Complexity: O(N + M * k + N log N)
 * Space Complexity: O(N)
 */
var findKDistantIndices = function (nums, key, k) {
  const arrayLength = nums.length;
  const keyLocations = [];

  for (
    let currentPosition = 0;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    const valueAtCurrentPosition = nums[currentPosition];
    if (valueAtCurrentPosition === key) {
      keyLocations.push(currentPosition);
    }
  }

  const distantIndexTracker = new Set();

  for (
    let keyLocationIndex = 0;
    keyLocationIndex < keyLocations.length;
    keyLocationIndex++
  ) {
    const referenceIndex = keyLocations[keyLocationIndex];

    const lowerBound = Math.max(0, referenceIndex - k);
    const upperBound = Math.min(arrayLength - 1, referenceIndex + k);

    for (
      let candidateIndex = lowerBound;
      candidateIndex <= upperBound;
      candidateIndex++
    ) {
      distantIndexTracker.add(candidateIndex);
    }
  }

  const finalSortedIndices = Array.from(distantIndexTracker);
  finalSortedIndices.sort(
    (firstElement, secondElement) => firstElement - secondElement
  );

  return finalSortedIndices;
};
