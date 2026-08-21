/**
 * Count The Number Of Good Partitions
 * Intuition: A "good partition" requires that all occurrences of any specific number must reside within a single subarray of the partition. This means if a number appears at index 'i' and its last occurrence is at index 'j', then any partition boundary cannot exist between 'i' and 'j'. This defines mandatory contiguous blocks. We need to identify these minimum, non-overlapping blocks that cover all necessary ranges.
 * Approach: 1. First, create a map to store the last occurrence index for each unique number in the input array. This helps determine the minimum extent a partition segment must cover if it includes a particular number. 2. Iterate through the array again. Maintain a variable 'currentMaxReach' that tracks the furthest index any number in the *current* potential segment requires us to go. If the current iteration index 'i' exceeds 'currentMaxReach', it signifies that the previous mandatory segment has concluded, and a new independent segment begins, thus incrementing a segment counter. Always update 'currentMaxReach' with the maximum of its current value and the last occurrence index of the number at the current iteration 'nums[i]'. 3. Once all mandatory segments are identified (say, 'k' segments), there are 'k-1' possible places where a partition boundary can be introduced. Each of these positions can either have a partition or not, effectively doubling the number of ways. Therefore, the total number of good partitions is 2^(k-1). 4. Calculate 2^(k-1) modulo 10^9 + 7.
 * Dry Run: nums = [1, 2, 1, 3, 4, 3]
 *   1. Initialize moduloValue = 1e9 + 7.
 *   2. `lastOccurrenceMap`:
 *      - Iteration 1 (nums[0]=1): lastOccurrenceMap = {1:0}
 *      - Iteration 2 (nums[1]=2): lastOccurrenceMap = {1:0, 2:1}
 *      - Iteration 3 (nums[2]=1): lastOccurrenceMap = {1:2, 2:1} (updated 1's last occurrence)
 *      - Iteration 4 (nums[3]=3): lastOccurrenceMap = {1:2, 2:1, 3:3}
 *      - Iteration 5 (nums[4]=4): lastOccurrenceMap = {1:2, 2:1, 3:3, 4:4}
 *      - Iteration 6 (nums[5]=3): lastOccurrenceMap = {1:2, 2:1, 3:5, 4:4} (updated 3's last occurrence)
 *      Final lastOccurrenceMap: {1:2, 2:1, 3:5, 4:4}
 *   3. `segmentCounter` and `currentMaxReach`:
 *      - Initialize segmentCounter = 0, currentMaxReach = -1.
 *      - loopIndexTwo = 0 (nums[0]=1):
 *          0 > -1 is true. segmentCounter = 1.
 *          currentMaxReach = Math.max(-1, lastOccurrenceMap.get(1)) = Math.max(-1, 2) = 2.
 *      - loopIndexTwo = 1 (nums[1]=2):
 *          1 > 2 is false.
 *          currentMaxReach = Math.max(2, lastOccurrenceMap.get(2)) = Math.max(2, 1) = 2.
 *      - loopIndexTwo = 2 (nums[2]=1):
 *          2 > 2 is false.
 *          currentMaxReach = Math.max(2, lastOccurrenceMap.get(1)) = Math.max(2, 2) = 2.
 *      - loopIndexTwo = 3 (nums[3]=3):
 *          3 > 2 is true. segmentCounter = 2.
 *          currentMaxReach = Math.max(2, lastOccurrenceMap.get(3)) = Math.max(2, 5) = 5.
 *      - loopIndexTwo = 4 (nums[4]=4):
 *          4 > 5 is false.
 *          currentMaxReach = Math.max(5, lastOccurrenceMap.get(4)) = Math.max(5, 4) = 5.
 *      - loopIndexTwo = 5 (nums[5]=3):
 *          5 > 5 is false.
 *          currentMaxReach = Math.max(5, lastOccurrenceMap.get(3)) = Math.max(5, 5) = 5.
 *      Final segmentCounter = 2.
 *   4. Calculate `partitionAnswer`:
 *      - Initialize partitionAnswer = 1.
 *      - powerMultiplier = 1: 1 < segmentCounter (2) is true. partitionAnswer = (1 * 2) % moduloValue = 2.
 *      - powerMultiplier = 2: 2 < segmentCounter (2) is false. Loop ends.
 *      Final partitionAnswer = 2.
 *      The good partitions are: [[1,2,1,3,4,3]] and [[1,2,1], [3,4,3]].
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var numberOfGoodPartitions = function (nums) {
  const moduloValue = 1e9 + 7;
  const lastOccurrenceMap = new Map();
  const arrayLength = nums.length;

  for (let loopIndexOne = 0; loopIndexOne < arrayLength; loopIndexOne++) {
    lastOccurrenceMap.set(nums[loopIndexOne], loopIndexOne);
  }

  let segmentCounter = 0;
  let currentMaxReach = -1;

  for (let loopIndexTwo = 0; loopIndexTwo < arrayLength; loopIndexTwo++) {
    if (loopIndexTwo > currentMaxReach) {
      segmentCounter++;
    }
    currentMaxReach = Math.max(
      currentMaxReach,
      lastOccurrenceMap.get(nums[loopIndexTwo])
    );
  }

  let partitionAnswer = 1;
  for (
    let powerMultiplier = 1;
    powerMultiplier < segmentCounter;
    powerMultiplier++
  ) {
    partitionAnswer = (partitionAnswer * 2) % moduloValue;
  }

  return partitionAnswer;
};
