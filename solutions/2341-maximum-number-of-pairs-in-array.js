/**
 * Maximum Number Of Pairs In Array
 * Intuition: To maximize pairs, we need to count the occurrences of each number. Every two occurrences of a number form one pair, and any single leftover occurrence contributes to the remainder.
 * Approach: 1. Initialize a frequency map to store counts of each number. 2. Iterate through the input array `nums`, populating the frequency map. 3. Initialize `totalPairsFormed` and `totalLeftovers` to zero. 4. Iterate through the values (counts) in the frequency map. For each count, calculate how many pairs it can form (`count / 2` floored) and how many leftovers it contributes (`count % 2`). 5. Accumulate these into `totalPairsFormed` and `totalLeftovers`. 6. Return an array `[totalPairsFormed, totalLeftovers]`.
 * Dry Run: nums = [1,3,2,1,3,2,2]
 *   1. frequencyMap: {}
 *   2. Iterate nums:
 *      - 1: frequencyMap = {1: 1}
 *      - 3: frequencyMap = {1: 1, 3: 1}
 *      - 2: frequencyMap = {1: 1, 3: 1, 2: 1}
 *      - 1: frequencyMap = {1: 2, 3: 1, 2: 1}
 *      - 3: frequencyMap = {1: 2, 3: 2, 2: 1}
 *      - 2: frequencyMap = {1: 2, 3: 2, 2: 2}
 *      - 2: frequencyMap = {1: 2, 3: 2, 2: 3}
 *   3. totalPairsFormed = 0, totalLeftovers = 0
 *   4. Iterate frequencyMap values (2, 2, 3):
 *      - currentCount = 2 (for num 1):
 *        - pairsFromNumber = Math.floor(2 / 2) = 1
 *        - leftoversFromNumber = 2 % 2 = 0
 *        - totalPairsFormed = 0 + 1 = 1
 *        - totalLeftovers = 0 + 0 = 0
 *      - currentCount = 2 (for num 3):
 *        - pairsFromNumber = Math.floor(2 / 2) = 1
 *        - leftoversFromNumber = 2 % 2 = 0
 *        - totalPairsFormed = 1 + 1 = 2
 *        - totalLeftovers = 0 + 0 = 0
 *      - currentCount = 3 (for num 2):
 *        - pairsFromNumber = Math.floor(3 / 2) = 1
 *        - leftoversFromNumber = 3 % 2 = 1
 *        - totalPairsFormed = 2 + 1 = 3
 *        - totalLeftovers = 0 + 1 = 1
 *   5. Return [3, 1]
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var numberOfPairs = function (nums) {
  const frequencyTracker = new Map();

  for (const numValue of nums) {
    frequencyTracker.set(numValue, (frequencyTracker.get(numValue) || 0) + 1);
  }

  let pairCount = 0;
  let remainderCount = 0;

  for (const currentCount of frequencyTracker.values()) {
    const pairsFromValue = Math.floor(currentCount / 2);
    const remainderFromValue = currentCount % 2;
    pairCount += pairsFromValue;
    remainderCount += remainderFromValue;
  }

  return [pairCount, remainderCount];
};
