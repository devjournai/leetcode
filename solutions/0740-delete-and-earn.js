/**
 * Delete And Earn
 * Intuition: Taking value `x` earns `x * count(x)` but forbids `x-1` and `x+1`. This is house-robber on buckets 0..10000 where adjacent buckets cannot both be taken.
 * Approach: 1. `aggregatedPoints[x] += x` for each num. 2. Walk the buckets with two variables: skip (`maxPointsPreviousOne`) vs take (`maxPointsPreviousTwo + currentPointsValue`). 3. Return the last skip value.
 * Dry Run: [3,4,2]. Points [0,0,2,3,4,...]. Take 2 then 4 (skip 3) → 6, which beats taking 3 alone.
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var deleteAndEarn = function (nums) {
  const maxNumberValue = 10000;
  const aggregatedPoints = new Array(maxNumberValue + 1).fill(0);

  for (const numberItem of nums) {
    aggregatedPoints[numberItem] += numberItem;
  }

  let maxPointsPreviousTwo = 0;
  let maxPointsPreviousOne = 0;

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < aggregatedPoints.length;
    currentNumberIndex++
  ) {
    const currentPointsValue = aggregatedPoints[currentNumberIndex];
    const temporaryMaxStore = maxPointsPreviousOne;
    maxPointsPreviousOne = Math.max(
      maxPointsPreviousOne,
      maxPointsPreviousTwo + currentPointsValue
    );
    maxPointsPreviousTwo = temporaryMaxStore;
  }

  return maxPointsPreviousOne;
};
