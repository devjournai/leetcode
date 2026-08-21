/**
 * Minimum Speed To Arrive On Time
 * Intuition: Time is monotone in speed. Binary-search speed; ceil every train except the last (no wait after the last).
 * Approach: 1. If even waiting n−1 hours already exceeds `hour`, return -1. 2. Search [1, 1e7]. 3. For mid speed, sum ceil(dist[i]/speed) for i<n-1 plus last/speed. 4. Record `lowestValidSpeed` when total ≤ hour.
 * Dry Run: dist=[1,3,2], hour=6. Speed 1 works (1+3+2=6). Return 1.
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
      (minAchievableSpeed + maxAchievableSpeed) / 2
    );

    let totalTimeAccumulated = 0;
    let distIterator = 0;

    for (distIterator = 0; distIterator < numberOfTrains - 1; distIterator++) {
      const currentSegmentDistance = dist[distIterator];
      totalTimeAccumulated += Math.ceil(
        currentSegmentDistance / currentCheckSpeed
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
