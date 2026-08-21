/**
 * Apple Redistribution Into Boxes
 * Intuition: Use the largest boxes first so the total apple count is covered with as few boxes as possible.
 * Approach: Sum all apples, sort capacities descending, then greedily add boxes until capacity >= apples.
 * Dry Run: apples sum 10, capacities [9,8,6] -> take 9 then 8, two boxes.
 * Time Complexity: O(N + M log M)
 * Space Complexity: O(1)
 */
var minimumBoxes = function (apple, capacity) {
  let overallAppleCount = 0;
  for (
    let applePackIndex = 0;
    applePackIndex < apple.length;
    applePackIndex++
  ) {
    let currentAppleAmount = apple[applePackIndex];
    overallAppleCount += currentAppleAmount;
  }

  const descendingBoxCapacities = capacity.sort(
    (firstValueCapacity, secondValueCapacity) =>
      secondValueCapacity - firstValueCapacity
  );

  let currentCollectedCapacity = 0;
  let requiredBoxCount = 0;

  for (
    let boxIterationIndex = 0;
    boxIterationIndex < descendingBoxCapacities.length;
    boxIterationIndex++
  ) {
    if (currentCollectedCapacity < overallAppleCount) {
      let individualBoxCapacity = descendingBoxCapacities[boxIterationIndex];
      currentCollectedCapacity += individualBoxCapacity;
      requiredBoxCount++;
    } else {
      break;
    }
  }

  return requiredBoxCount;
};
