/**
 * Minimum Sum Of Mountain Triplets I
 * Intuition: A mountain triplet (i, j, k) requires nums[i] and nums[k] to be smaller than nums[j]. For a fixed middle element nums[j], we need to efficiently find the smallest nums[i] to its left and smallest nums[k] to its right that satisfy the condition.
 * Approach: 1. Precompute an array `leftSideMins` where `leftSideMins[x]` stores the minimum value among `nums[0]...nums[x-1]`. `leftSideMins[0]` is initialized to Infinity as there are no elements to its left. 2. Precompute an array `rightSideMins` where `rightSideMins[x]` stores the minimum value among `nums[x+1]...nums[length-1]`. `rightSideMins[length-1]` is initialized to Infinity as there are no elements to its right. 3. Iterate through `nums` from index 1 to `length-2` (potential middle elements `j`). 4. For each `nums[j]`, check if `leftSideMins[j] < nums[j]` and `rightSideMins[j] < nums[j]`. 5. If both conditions are met, calculate the sum `leftSideMins[j] + nums[j] + rightSideMins[j]` and update the overall minimum sum found so far. 6. If no such triplet is found after checking all possible `j`, return -1; otherwise, return the calculated minimum sum.
 * Dry Run: nums = [8, 6, 1, 5, 3]
 *   inputArrayLength = 5
 *   resultMinimumSum = Infinity
 *
 *   leftSideMins initialization and population:
 *     minValAccumulatorLeft = Infinity
 *     idxOne = 0: leftSideMins[0] = Infinity; minValAccumulatorLeft = Math.min(Infinity, nums[0]=8) = 8
 *     idxOne = 1: leftSideMins[1] = 8; minValAccumulatorLeft = Math.min(8, nums[1]=6) = 6
 *     idxOne = 2: leftSideMins[2] = 6; minValAccumulatorLeft = Math.min(6, nums[2]=1) = 1
 *     idxOne = 3: leftSideMins[3] = 1; minValAccumulatorLeft = Math.min(1, nums[3]=5) = 1
 *     idxOne = 4: leftSideMins[4] = 1; minValAccumulatorLeft = Math.min(1, nums[4]=3) = 1
 *     Result: leftSideMins = [Infinity, 8, 6, 1, 1]
 *
 *   rightSideMins initialization and population:
 *     minValFromRight = nums[inputArrayLength - 1] = nums[4] = 3
 *     rightSideMins[inputArrayLength - 1] = rightSideMins[4] = Infinity
 *     traversalPointer = 3: rightSideMins[3] = minValFromRight = 3; minValFromRight = Math.min(3, nums[3]=5) = 3
 *     traversalPointer = 2: rightSideMins[2] = minValFromRight = 3; minValFromRight = Math.min(3, nums[2]=1) = 1
 *     traversalPointer = 1: rightSideMins[1] = minValFromRight = 1; minValFromRight = Math.min(1, nums[1]=6) = 1
 *     traversalPointer = 0: rightSideMins[0] = minValFromRight = 1; minValFromRight = Math.min(1, nums[0]=8) = 1
 *     Result: rightSideMins = [1, 1, 3, 3, Infinity]
 *
 *   Finding minimum sum:
 *     centerIdx = 1 (nums[1]=6):
 *       valLeft = leftSideMins[1] = 8, valCenter = nums[1] = 6, valRight = rightSideMins[1] = 1
 *       Condition (8 < 6 && 1 < 6) is false (8 < 6 is false).
 *     centerIdx = 2 (nums[2]=1):
 *       valLeft = leftSideMins[2] = 6, valCenter = nums[2] = 1, valRight = rightSideMins[2] = 3
 *       Condition (6 < 1 && 3 < 1) is false (6 < 1 is false).
 *     centerIdx = 3 (nums[3]=5):
 *       valLeft = leftSideMins[3] = 1, valCenter = nums[3] = 5, valRight = rightSideMins[3] = 3
 *       Condition (1 < 5 && 3 < 5) is true.
 *       currentSumCandidate = valLeft + valCenter + valRight = 1 + 5 + 3 = 9.
 *       resultMinimumSum = Math.min(Infinity, 9) = 9.
 *
 *   Loop ends.
 *   Final resultMinimumSum = 9.
 *   Return 9.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumSum = function (nums) {
  const inputArrayLength = nums.length;
  let resultMinimumSum = Infinity;

  const leftSideMins = new Array(inputArrayLength).fill(Infinity);
  let minValAccumulatorLeft = Infinity;
  for (let idxOne = 0; idxOne < inputArrayLength; idxOne++) {
    leftSideMins[idxOne] = minValAccumulatorLeft;
    minValAccumulatorLeft = Math.min(minValAccumulatorLeft, nums[idxOne]);
  }

  const rightSideMins = new Array(inputArrayLength).fill(Infinity);
  let minValFromRight = nums[inputArrayLength - 1]; // Initialize with the last element for the second-to-last calculation
  rightSideMins[inputArrayLength - 1] = Infinity; // No elements to the right of the last element
  for (
    let traversalPointer = inputArrayLength - 2;
    traversalPointer >= 0;
    traversalPointer--
  ) {
    rightSideMins[traversalPointer] = minValFromRight;
    minValFromRight = Math.min(minValFromRight, nums[traversalPointer]);
  }

  for (let centerIdx = 1; centerIdx < inputArrayLength - 1; centerIdx++) {
    const valLeft = leftSideMins[centerIdx];
    const valCenter = nums[centerIdx];
    const valRight = rightSideMins[centerIdx];

    if (valLeft < valCenter && valRight < valCenter) {
      const currentSumCandidate = valLeft + valCenter + valRight;
      resultMinimumSum = Math.min(resultMinimumSum, currentSumCandidate);
    }
  }

  return resultMinimumSum === Infinity ? -1 : resultMinimumSum;
};
