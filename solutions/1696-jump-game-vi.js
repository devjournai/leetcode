/**
 * Jump Game Vi
 * Intuition: `dp[i] = nums[i] + max(dp[i-k..i-1])`. A monotonic decreasing deque of indices stores candidates for that window max in O(1).
 * Approach: 1. `dynamicProgrammingScores[0] = nums[0]`; deque holds 0. 2. For each `currentPosition`, drop indices `< currentPosition-k`, take front as max, then pop back while last dp ≤ current dp, push i. 3. Return `dynamicProgrammingScores[n-1]`.
 * Dry Run: nums = [1,-1,-2,4,-7,3], k = 2
 * dp: 1; 1-1=0; 0-2=-2; 0+4=4; 4-7=-3; 4+3=7. Answer 7.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxResult = function (nums, k) {
  const arraySize = nums.length;
  const dynamicProgrammingScores = new Array(arraySize).fill(0);
  const indexTrackingQueue = [];

  dynamicProgrammingScores[0] = nums[0];
  indexTrackingQueue.push(0);

  for (
    let currentPosition = 1;
    currentPosition < arraySize;
    currentPosition++
  ) {
    while (
      indexTrackingQueue.length > 0 &&
      indexTrackingQueue[0] < currentPosition - k
    ) {
      indexTrackingQueue.shift();
    }

    dynamicProgrammingScores[currentPosition] =
      nums[currentPosition] + dynamicProgrammingScores[indexTrackingQueue[0]];

    while (
      indexTrackingQueue.length > 0 &&
      dynamicProgrammingScores[currentPosition] >=
        dynamicProgrammingScores[
          indexTrackingQueue[indexTrackingQueue.length - 1]
        ]
    ) {
      indexTrackingQueue.pop();
    }

    indexTrackingQueue.push(currentPosition);
  }

  return dynamicProgrammingScores[arraySize - 1];
};
