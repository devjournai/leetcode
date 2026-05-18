/**
 * Two Out Of Three
 * Intuition: To find numbers present in at least two arrays, we can count the occurrences of each distinct number across all three arrays.
 * Approach: 1. Convert each input array into a Set to get distinct elements for each array. 2. Initialize a frequency map to store counts of numbers across these sets. 3. Iterate through each set using different control flow mechanisms, incrementing the count for each number in the frequency map. 4. Initialize an empty array for the results. 5. Iterate through the frequency map, adding numbers with a count of 2 or more to the result array.
 * Dry Run:
 *   nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
 *   1. distinctNumbers1 = {1, 2, 3}
 *      distinctNumbers2 = {2, 3}
 *      distinctNumbers3 = {3}
 *   2. tallyMap = {}
 *   3. Counting phase:
 *      - distinctNumbers1 (forEach):
 *        - numVal1 = 1: tallyMap = {1: 1}
 *        - numVal1 = 2: tallyMap = {1: 1, 2: 1}
 *        - numVal1 = 3: tallyMap = {1: 1, 2: 1, 3: 1}
 *      - distinctNumbers2 (for...of):
 *        - numVal2 = 2: tallyMap = {1: 1, 2: 2, 3: 1}
 *        - numVal2 = 3: tallyMap = {1: 1, 2: 2, 3: 2}
 *      - distinctNumbers3 (traditional for loop after Array.from):
 *        - arrayFromSet3 = [3]
 *        - numVal3 = 3: tallyMap = {1: 1, 2: 2, 3: 3}
 *   4. commonElements = []
 *   5. Filtering phase (forEach on tallyMap):
 *      - mapKey = 1, mapFreq = 1: 1 < 2, skip.
 *      - mapKey = 2, mapFreq = 2: 2 >= 2, commonElements.push(2). commonElements = [2]
 *      - mapKey = 3, mapFreq = 3: 3 >= 2, commonElements.push(3). commonElements = [2, 3]
 *   6. Return [2, 3].
 * Time Complexity: O(N1 + N2 + N3)
 * Space Complexity: O(N1 + N2 + N3)
 */
var twoOutOfThree = function (nums1, nums2, nums3) {
  const distinctNumbers1 = new Set(nums1);
  const distinctNumbers2 = new Set(nums2);
  const distinctNumbers3 = new Set(nums3);

  const tallyMap = new Map();

  distinctNumbers1.forEach((numVal1) => {
    tallyMap.set(numVal1, (tallyMap.get(numVal1) || 0) + 1);
  });

  for (const numVal2 of distinctNumbers2) {
    tallyMap.set(numVal2, (tallyMap.get(numVal2) || 0) + 1);
  }

  const arrayFromSet3 = Array.from(distinctNumbers3);
  for (let currentIdx = 0; currentIdx < arrayFromSet3.length; currentIdx++) {
    const numVal3 = arrayFromSet3[currentIdx];
    tallyMap.set(numVal3, (tallyMap.get(numVal3) || 0) + 1);
  }

  const commonElements = [];
  tallyMap.forEach((mapFreq, mapKey) => {
    if (mapFreq >= 2) {
      commonElements.push(mapKey);
    }
  });

  return commonElements;
};
