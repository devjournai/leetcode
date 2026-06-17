/**
 * Count Number Of Bad Pairs
 * Intuition: Instead of counting bad pairs directly, which is complicated, it's easier to count good pairs and subtract them from the total number of possible pairs. A pair (i, j) with i < j is a good pair if j - i == nums[j] - nums[i], which can be rewritten as nums[j] - j == nums[i] - i. This means we can use a frequency map to count occurrences of `nums[k] - k` as we iterate through the array.
 * Approach: 1. Calculate the total number of possible pairs (i, j) where i < j in an array of length N, which is N * (N - 1) / 2. This will be our initial count of bad pairs. 2. Initialize an empty hash map (or frequency map) to store the counts of `nums[k] - k` encountered so far. 3. Iterate through the input array `nums` with an index `k`. 4. For each element `nums[k]`, calculate the difference `computedDifference = nums[k] - k`. 5. Check if `computedDifference` already exists in the frequency map. If it does, its value `previousFrequency` represents how many previous indices `i` satisfy `nums[i] - i == computedDifference`. These `i` values form "good" pairs with the current `k`. Subtract this `previousFrequency` from the running total of bad pairs. 6. Increment the count of `computedDifference` in the frequency map. 7. After iterating through all elements, the remaining count is the total number of bad pairs.
 * Dry Run: nums = [4, 2, 4, 3, 1]
 *   lengthOfArray = 5
 *   totalBadPairCount = 5 * (5 - 1) / 2 = 10
 *   differenceFrequencies = new Map()
 *
 *   currentPosition = 0, valueAtIndex = 4:
 *     computedDifference = 4 - 0 = 4
 *     previousFrequency = differenceFrequencies.get(4) || 0 = 0
 *     totalBadPairCount = 10 - 0 = 10
 *     differenceFrequencies.set(4, 1) => { 4: 1 }
 *
 *   currentPosition = 1, valueAtIndex = 2:
 *     computedDifference = 2 - 1 = 1
 *     previousFrequency = differenceFrequencies.get(1) || 0 = 0
 *     totalBadPairCount = 10 - 0 = 10
 *     differenceFrequencies.set(1, 1) => { 4: 1, 1: 1 }
 *
 *   currentPosition = 2, valueAtIndex = 4:
 *     computedDifference = 4 - 2 = 2
 *     previousFrequency = differenceFrequencies.get(2) || 0 = 0
 *     totalBadPairCount = 10 - 0 = 10
 *     differenceFrequencies.set(2, 1) => { 4: 1, 1: 1, 2: 1 }
 *
 *   currentPosition = 3, valueAtIndex = 3:
 *     computedDifference = 3 - 3 = 0
 *     previousFrequency = differenceFrequencies.get(0) || 0 = 0
 *     totalBadPairCount = 10 - 0 = 10
 *     differenceFrequencies.set(0, 1) => { 4: 1, 1: 1, 2: 1, 0: 1 }
 *
 *   currentPosition = 4, valueAtIndex = 1:
 *     computedDifference = 1 - 4 = -3
 *     previousFrequency = differenceFrequencies.get(-3) || 0 = 0
 *     totalBadPairCount = 10 - 0 = 10
 *     differenceFrequencies.set(-3, 1) => { 4: 1, 1: 1, 2: 1, 0: 1, -3: 1 }
 *
 *   Final totalBadPairCount = 10.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countBadPairs = function (nums) {
  const lengthOfArray = nums.length;
  let totalBadPairCount = (lengthOfArray * (lengthOfArray - 1)) / 2;
  const differenceFrequencies = new Map();

  for (
    let currentPosition = 0;
    currentPosition < lengthOfArray;
    currentPosition++
  ) {
    const valueAtIndex = nums[currentPosition];
    const computedDifference = valueAtIndex - currentPosition;
    const previousFrequency =
      differenceFrequencies.get(computedDifference) || 0;

    totalBadPairCount -= previousFrequency;
    differenceFrequencies.set(computedDifference, previousFrequency + 1);
  }

  return totalBadPairCount;
};
