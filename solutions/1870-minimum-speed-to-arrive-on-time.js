/**
 * Minimum Speed To Arrive On Time
 * Time Complexity: O(numberOfTrains * log(maximumSearchSpeed))
 * Space Complexity: O(1)
 */
var minSpeedOnTime = function (dist, hour) {
  const numberOfTrains = dist.length;

  if (numberOfTrains - 1 >= hour && numberOfTrains > 1) {
    return -1;
  }

  let minAchievableSpeed = 1;
  let maxAchievableSpeed = 10000000;
  let lowestValidSpeed = -1;

  while (minAchievableSpeed <= maxAchievableSpeed) {
    const currentCheckSpeed = Math.floor(
      (minAchievableSpeed + maxAchievableSpeed) / 2,
    );

    let totalTimeAccumulated = 0;
    let distIterator = 0;

    for (distIterator = 0; distIterator < numberOfTrains - 1; distIterator++) {
      const currentSegmentDistance = dist[distIterator];
      totalTimeAccumulated += Math.ceil(
        currentSegmentDistance / currentCheckSpeed,
      );
    }

    const finalSegmentDistance = dist[numberOfTrains - 1];
    totalTimeAccumulated += finalSegmentDistance / currentCheckSpeed;

    if (totalTimeAccumulated <= hour) {
      lowestValidSpeed = currentCheckSpeed;
      maxAchievableSpeed = currentCheckSpeed - 1;
    } else {
      minAchievableSpeed = currentCheckSpeed + 1;
    }
  }

  return lowestValidSpeed;
};
