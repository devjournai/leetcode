/**
 * Apple Redistribution Into Boxes
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
      secondValueCapacity - firstValueCapacity,
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
