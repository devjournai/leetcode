/**
 * Jump Game Vi
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
