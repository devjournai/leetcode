/**
 * Maximum Increasing Triplet Value
 * Intuition: To find the maximum value of nums[i] - nums[j] + nums[k] with i < j < k and nums[i] < nums[j] < nums[k], we can fix the middle element nums[j] and try to find the best possible nums[i] to its left and nums[k] to its right that satisfy the increasing conditions.
 * Approach:
 * 1. Precompute an array `leftMaximums` where `leftMaximums[j]` stores the maximum value of `nums[p]` for all `p < j`. This is a standard prefix maximum array.
 * 2. Precompute an array `rightMaximums` where `rightMaximums[j]` stores the maximum value of `nums[p]` for all `p > j`. This is a standard suffix maximum array.
 * 3. Initialize a variable `finalMaximumValue` to 0 (as the problem implies non-negative results for valid triplets and 0 if none exist).
 * 4. Iterate through the array `nums` with an index `middleElementIndex` from 1 to `arrayLength - 2` (as `nums[j]` needs at least one element before it and one after it).
 * 5. For each `middleElementIndex`, retrieve `leftCandidateValue = leftMaximums[middleElementIndex]` and `rightCandidateValue = rightMaximums[middleElementIndex]`.
 * 6. Check if `leftCandidateValue < nums[middleElementIndex]` and `rightCandidateValue > nums[middleElementIndex]`. These conditions ensure that `nums[j]` (the current middle element) is indeed greater than its best left candidate and smaller than its best right candidate, fulfilling `nums[i] < nums[j] < nums[k]`.
 * 7. If both conditions are met, calculate the `tripletSummation = leftCandidateValue - nums[middleElementIndex] + rightCandidateValue`.
 * 8. Update `finalMaximumValue = Math.max(finalMaximumValue, tripletSummation)`.
 * 9. After iterating through all possible middle elements, return `finalMaximumValue`.
 * Dry Run:
 * Input: nums = [1, 5, 2, 8, 3]
 * arrayLength = 5
 *
 * 1. Initialize leftMaximums:
 *    leftMaximums[0] = Number.MIN_SAFE_INTEGER
 *    iterLeft = 0: currentMaximumLeft = Number.MIN_SAFE_INTEGER
 *    iterLeft = 1: currentMaximumLeft = Math.max(Number.MIN_SAFE_INTEGER, nums[0]=1) = 1. leftMaximums[1] = 1.
 *    iterLeft = 2: currentMaximumLeft = Math.max(1, nums[1]=5) = 5. leftMaximums[2] = 5.
 *    iterLeft = 3: currentMaximumLeft = Math.max(5, nums[2]=2) = 5. leftMaximums[3] = 5.
 *    iterLeft = 4: currentMaximumLeft = Math.max(5, nums[3]=8) = 8. leftMaximums[4] = 8.
 *    leftMaximums = [MIN_INT, 1, 5, 5, 8]
 *
 * 2. Initialize rightMaximums:
 *    rightMaximums[4] = Number.MIN_SAFE_INTEGER
 *    iterRight = 4: currentMaximumRight = Number.MIN_SAFE_INTEGER
 *    iterRight = 3: currentMaximumRight = Math.max(Number.MIN_SAFE_INTEGER, nums[4]=3) = 3. rightMaximums[3] = 3.
 *    iterRight = 2: currentMaximumRight = Math.max(3, nums[3]=8) = 8. rightMaximums[2] = 8.
 *    iterRight = 1: currentMaximumRight = Math.max(8, nums[2]=2) = 8. rightMaximums[1] = 8.
 *    iterRight = 0: currentMaximumRight = Math.max(8, nums[1]=5) = 8. rightMaximums[0] = 8.
 *    rightMaximums = [8, 8, 8, 3, MIN_INT]
 *
 * 3. Initialize finalMaximumValue = 0.
 *
 * 4. Iterate middleElementIndex from 1 to 3:
 *    middleElementIndex = 1 (nums[1] = 5):
 *      leftCandidateValue = leftMaximums[1] = 1
 *      rightCandidateValue = rightMaximums[1] = 8
 *      Conditions: (1 < 5) AND (8 > 5) -> True
 *      tripletSummation = 1 - 5 + 8 = 4
 *      finalMaximumValue = Math.max(0, 4) = 4
 *
 *    middleElementIndex = 2 (nums[2] = 2):
 *      leftCandidateValue = leftMaximums[2] = 5
 *      rightCandidateValue = rightMaximums[2] = 8
 *      Conditions: (5 < 2) -> False. Skip.
 *
 *    middleElementIndex = 3 (nums[3] = 8):
 *      leftCandidateValue = leftMaximums[3] = 5
 *      rightCandidateValue = rightMaximums[3] = 3
 *      Conditions: (5 < 8) -> True, BUT (3 > 8) -> False. Skip.
 *
 * 5. Loop ends.
 * 6. Return finalMaximumValue = 4.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumTripletValue = function (nums) {
  const arrayLength = nums.length;
  if (arrayLength < 3) {
    return 0;
  }

  const leftMaximums = new Array(arrayLength);
  leftMaximums[0] = Number.MIN_SAFE_INTEGER;
  let currentMaximumLeft = Number.MIN_SAFE_INTEGER;
  for (let iterLeft = 0; iterLeft < arrayLength - 1; iterLeft++) {
    currentMaximumLeft = Math.max(currentMaximumLeft, nums[iterLeft]);
    leftMaximums[iterLeft + 1] = currentMaximumLeft;
  }

  const rightMaximums = new Array(arrayLength);
  rightMaximums[arrayLength - 1] = Number.MIN_SAFE_INTEGER;
  let currentMaximumRight = Number.MIN_SAFE_INTEGER;
  for (let iterRight = arrayLength - 1; iterRight > 0; iterRight--) {
    currentMaximumRight = Math.max(currentMaximumRight, nums[iterRight]);
    rightMaximums[iterRight - 1] = currentMaximumRight;
  }

  let finalMaximumValue = 0;

  for (
    let middleElementIndex = 1;
    middleElementIndex < arrayLength - 1;
    middleElementIndex++
  ) {
    const leftCandidateValue = leftMaximums[middleElementIndex];
    const rightCandidateValue = rightMaximums[middleElementIndex];
    const middleValue = nums[middleElementIndex];

    if (leftCandidateValue < middleValue && rightCandidateValue > middleValue) {
      const tripletSummation =
        leftCandidateValue - middleValue + rightCandidateValue;
      finalMaximumValue = Math.max(finalMaximumValue, tripletSummation);
    }
  }

  return finalMaximumValue;
};
