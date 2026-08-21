/**
 * Left and Right Sum Differences
 * Intuition: The problem requires calculating prefix sums (sum of elements to the left) and suffix sums (sum of elements to the right) for each index, then finding the absolute difference between them.
 * Approach: 1. Initialize two arrays, one for left prefix sums and one for right suffix sums, both of the same length as the input array. 2. Populate the left prefix sums array by iterating from left to right, accumulating sums. The first element's left sum is 0. 3. Populate the right suffix sums array by iterating from right to left, accumulating sums. The last element's right sum is 0. 4. Create a result array and iterate through it, calculating the absolute difference between the corresponding left prefix sum and right suffix sum for each index.
 * Dry Run:
 * nums = [10, 4, 8, 3]
 * inputLength = 4
 *
 * 1. Initialize arrays:
 *    leftPrefixSums = [0, 0, 0, 0] (initialized to 0 for clarity, but technically undefined/empty)
 *    rightSuffixSums = [0, 0, 0, 0]
 *    outputArray = [0, 0, 0, 0]
 *
 * 2. Calculate Left Prefix Sums:
 *    leftPrefixSums[0] = 0
 *    currentAccumulatedSum = 0
 *
 *    indexCount = 1:
 *      currentAccumulatedSum = 0 + nums[0] = 10
 *      leftPrefixSums[1] = 10
 *    indexCount = 2:
 *      currentAccumulatedSum = 10 + nums[1] = 14
 *      leftPrefixSums[2] = 14
 *    indexCount = 3:
 *      currentAccumulatedSum = 14 + nums[2] = 22
 *      leftPrefixSums[3] = 22
 *    leftPrefixSums becomes: [0, 10, 14, 22]
 *
 * 3. Calculate Right Suffix Sums:
 *    rightSuffixSums[3] = 0
 *    currentReverseSum = 0
 *
 *    reverseIndex = 2:
 *      currentReverseSum = 0 + nums[3] = 3
 *      rightSuffixSums[2] = 3
 *    reverseIndex = 1:
 *      currentReverseSum = 3 + nums[2] = 11
 *      rightSuffixSums[1] = 11
 *    reverseIndex = 0:
 *      currentReverseSum = 11 + nums[1] = 15
 *      rightSuffixSums[0] = 15
 *    rightSuffixSums becomes: [15, 11, 3, 0]
 *
 * 4. Calculate Final Differences:
 *    diffIndex = 0: outputArray[0] = Math.abs(leftPrefixSums[0] - rightSuffixSums[0]) = Math.abs(0 - 15) = 15
 *    diffIndex = 1: outputArray[1] = Math.abs(leftPrefixSums[1] - rightSuffixSums[1]) = Math.abs(10 - 11) = 1
 *    diffIndex = 2: outputArray[2] = Math.abs(leftPrefixSums[2] - rightSuffixSums[2]) = Math.abs(14 - 3) = 11
 *    diffIndex = 3: outputArray[3] = Math.abs(leftPrefixSums[3] - rightSuffixSums[3]) = Math.abs(22 - 0) = 22
 *    outputArray becomes: [15, 1, 11, 22]
 *
 * 5. Return [15, 1, 11, 22].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var leftRightDifference = function (nums) {
  const arrayLength = nums.length;

  const leftPrefixSums = new Array(arrayLength).fill(0);
  const rightSuffixSums = new Array(arrayLength).fill(0);
  const answerResult = new Array(arrayLength);

  let runningLeftSum = 0;
  for (let indexForward = 0; indexForward < arrayLength; indexForward++) {
    leftPrefixSums[indexForward] = runningLeftSum;
    runningLeftSum += nums[indexForward];
  }

  let runningRightSum = 0;
  for (
    let indexBackward = arrayLength - 1;
    indexBackward >= 0;
    indexBackward--
  ) {
    rightSuffixSums[indexBackward] = runningRightSum;
    runningRightSum += nums[indexBackward];
  }

  for (
    let currentPosition = 0;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    answerResult[currentPosition] = Math.abs(
      leftPrefixSums[currentPosition] - rightSuffixSums[currentPosition]
    );
  }

  return answerResult;
};
