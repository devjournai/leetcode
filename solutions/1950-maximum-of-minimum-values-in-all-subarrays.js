/**
 * Maximum Of Minimum Values In All Subarrays
 * Intuition: The minimum value of any subarray is determined by one of the elements within it. If an element `x` at `nums[i]` is the minimum in a subarray, it must be because all elements to its left and right within that subarray are greater than or equal to `x`. We can find the maximum possible range `[L, R]` where `nums[i]` is the minimum using a monotonic stack. For `nums[i]`, this range defines the maximum length `len = R - L - 1` for which `nums[i]` can be the minimum. `nums[i]` then becomes a candidate for the answer for length `len`. Because a subarray of length `len` contains subarrays of all smaller lengths, the answer for a shorter length must be at least as great as the answer for a longer length.
 * Approach: 1. Use a monotonic stack to determine for each element `nums[i]`, the index of the first element to its left that is strictly smaller (`leftBoundaryIndexes`). 2. Use another monotonic stack (iterating backwards) to determine for each `nums[i]`, the index of the first element to its right that is strictly smaller (`rightBoundaryIndexes`). 3. Initialize an array `finalAnswer` of size `n` with zeros. For each `nums[i]`, calculate `maxPossibleLength = rightBoundaryIndexes[i] - leftBoundaryIndexes[i] - 1`. Update `finalAnswer[maxPossibleLength - 1]` with `Math.max(finalAnswer[maxPossibleLength - 1], nums[i])`. This populates `finalAnswer[k]` with the maximum minimum value found for subarrays of *exact* length `k+1`. 4. Iterate `finalAnswer` from `n-2` down to `0`, updating `finalAnswer[k] = Math.max(finalAnswer[k], finalAnswer[k+1])`. This ensures that `finalAnswer[k]` holds the maximum minimum value for subarrays of length *at least* `k+1`, satisfying the non-increasing property.
 * Dry Run: nums = [3, 1, 2, 5, 4], n = 5
 * 1. leftBoundaryIndexes:
 *    i=0, nums[0]=3: stack=[], leftBoundaryIndexes[0]=-1. stack=[0]
 *    i=1, nums[1]=1: stack=[0], nums[0]>=nums[1], pop 0. stack=[]. leftBoundaryIndexes[1]=-1. stack=[1]
 *    i=2, nums[2]=2: stack=[1], nums[1]<nums[2]. leftBoundaryIndexes[2]=1. stack=[1,2]
 *    i=3, nums[3]=5: stack=[1,2], nums[2]<nums[3]. leftBoundaryIndexes[3]=2. stack=[1,2,3]
 *    i=4, nums[4]=4: stack=[1,2,3], nums[3]>=nums[4], pop 3. stack=[1,2]. nums[2]<nums[4]. leftBoundaryIndexes[4]=2. stack=[1,2,4]
 *    leftBoundaryIndexes = [-1, -1, 1, 2, 2]
 * 2. rightBoundaryIndexes:
 *    i=4, nums[4]=4: stack=[], rightBoundaryIndexes[4]=5. stack=[4]
 *    i=3, nums[3]=5: stack=[4], nums[4]<nums[3]. rightBoundaryIndexes[3]=4. stack=[4,3]
 *    i=2, nums[2]=2: stack=[4,3], nums[3]>=nums[2], pop 3. stack=[4]. nums[4]>=nums[2], pop 4. stack=[]. rightBoundaryIndexes[2]=5. stack=[2]
 *    i=1, nums[1]=1: stack=[2], nums[2]>=nums[1], pop 2. stack=[]. rightBoundaryIndexes[1]=5. stack=[1]
 *    i=0, nums[0]=3: stack=[1], nums[1]<nums[0]. rightBoundaryIndexes[0]=1. stack=[1,0]
 *    rightBoundaryIndexes = [1, 5, 5, 4, 5]
 * 3. Populating finalAnswer (size 5, init [0,0,0,0,0]):
 *    i=0, nums[0]=3: maxPossibleLength=rightBoundaryIndexes[0]-leftBoundaryIndexes[0]-1 = 1-(-1)-1 = 1. finalAnswer[0]=max(0,3)=3.
 *    i=1, nums[1]=1: maxPossibleLength=rightBoundaryIndexes[1]-leftBoundaryIndexes[1]-1 = 5-(-1)-1 = 5. finalAnswer[4]=max(0,1)=1.
 *    i=2, nums[2]=2: maxPossibleLength=rightBoundaryIndexes[2]-leftBoundaryIndexes[2]-1 = 5-1-1 = 3. finalAnswer[2]=max(0,2)=2.
 *    i=3, nums[3]=5: maxPossibleLength=rightBoundaryIndexes[3]-leftBoundaryIndexes[3]-1 = 4-2-1 = 1. finalAnswer[0]=max(3,5)=5.
 *    i=4, nums[4]=4: maxPossibleLength=rightBoundaryIndexes[4]-leftBoundaryIndexes[4]-1 = 5-2-1 = 2. finalAnswer[1]=max(0,4)=4.
 *    finalAnswer = [5, 4, 2, 0, 1]
 * 4. Propagating maximums:
 *    lengthUpdateIterIndex=3 (for length 4): finalAnswer[3]=max(finalAnswer[3], finalAnswer[4]) = max(0,1)=1.
 *    lengthUpdateIterIndex=2 (for length 3): finalAnswer[2]=max(finalAnswer[2], finalAnswer[3]) = max(2,1)=2.
 *    lengthUpdateIterIndex=1 (for length 2): finalAnswer[1]=max(finalAnswer[1], finalAnswer[2]) = max(4,2)=4.
 *    lengthUpdateIterIndex=0 (for length 1): finalAnswer[0]=max(finalAnswer[0], finalAnswer[1]) = max(5,4)=5.
 *    finalAnswer = [5, 4, 2, 1, 1]
 *    Return [5, 4, 2, 1, 1]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findMaximums = function (nums) {
  const numCount = nums.length;
  const finalAnswer = new Array(numCount);
  const leftBoundaryIndexes = new Array(numCount);
  const rightBoundaryIndexes = new Array(numCount);
  const processingStack = [];

  for (let leftIterIndex = 0; leftIterIndex < numCount; leftIterIndex++) {
    const currentNumber = nums[leftIterIndex];
    while (
      processingStack.length > 0 &&
      nums[processingStack[processingStack.length - 1]] >= currentNumber
    ) {
      processingStack.pop();
    }
    leftBoundaryIndexes[leftIterIndex] =
      processingStack.length > 0
        ? processingStack[processingStack.length - 1]
        : -1;
    processingStack.push(leftIterIndex);
  }

  processingStack.length = 0;

  for (
    let rightIterIndex = numCount - 1;
    rightIterIndex >= 0;
    rightIterIndex--
  ) {
    const numberFromRight = nums[rightIterIndex];
    while (
      processingStack.length > 0 &&
      nums[processingStack[processingStack.length - 1]] >= numberFromRight
    ) {
      processingStack.pop();
    }
    rightBoundaryIndexes[rightIterIndex] =
      processingStack.length > 0
        ? processingStack[processingStack.length - 1]
        : numCount;
    processingStack.push(rightIterIndex);
  }

  finalAnswer.fill(0);

  for (
    let populateIterIndex = 0;
    populateIterIndex < numCount;
    populateIterIndex++
  ) {
    const lengthOfMaxSubarray =
      rightBoundaryIndexes[populateIterIndex] -
      leftBoundaryIndexes[populateIterIndex] -
      1;
    finalAnswer[lengthOfMaxSubarray - 1] = Math.max(
      finalAnswer[lengthOfMaxSubarray - 1],
      nums[populateIterIndex]
    );
  }

  for (
    let lengthUpdateIterIndex = numCount - 2;
    lengthUpdateIterIndex >= 0;
    lengthUpdateIterIndex--
  ) {
    finalAnswer[lengthUpdateIterIndex] = Math.max(
      finalAnswer[lengthUpdateIterIndex],
      finalAnswer[lengthUpdateIterIndex + 1]
    );
  }

  return finalAnswer;
};
