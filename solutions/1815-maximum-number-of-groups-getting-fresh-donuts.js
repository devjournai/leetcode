/**
 * Maximum Number Of Groups Getting Fresh Donuts
 * Time Complexity: O(N + B^(B+1) * log(N))
 * Space Complexity: O(B^(B+1) * log(N)
 */
var maxHappyGroups = function (batchSize, groups) {
  const remainderGroupCounts = new Array(batchSize).fill(0);
  let totalInitialHappyGroups = 0;

  for (const currentGroupSize of groups) {
    remainderGroupCounts[currentGroupSize % batchSize]++;
  }

  totalInitialHappyGroups += remainderGroupCounts[0];
  remainderGroupCounts[0] = 0;

  const memoMap = new Map();

  function findMaxPossibleHappyGroups(
    currentRemainderConfiguration,
    currentLeftoverDonuts,
  ) {
    const memoizationKey =
      currentRemainderConfiguration.join(",") + "," + currentLeftoverDonuts;
    if (memoMap.has(memoizationKey)) {
      return memoMap.get(memoizationKey);
    }

    let maxCurrentHappy = 0;
    for (
      let currentRemainderType = 1;
      currentRemainderType < batchSize;
      currentRemainderType++
    ) {
      if (currentRemainderConfiguration[currentRemainderType] === 0) {
        continue;
      }

      currentRemainderConfiguration[currentRemainderType]--;

      let isCurrentGroupHappy = 0;
      if (currentLeftoverDonuts === 0) {
        isCurrentGroupHappy = 1;
      }

      const nextLeftoverDonuts =
        (currentLeftoverDonuts + currentRemainderType) % batchSize;
      maxCurrentHappy = Math.max(
        maxCurrentHappy,
        isCurrentGroupHappy +
          findMaxPossibleHappyGroups(
            currentRemainderConfiguration,
            nextLeftoverDonuts,
          ),
      );

      currentRemainderConfiguration[currentRemainderType]++;
    }

    memoMap.set(memoizationKey, maxCurrentHappy);
    return maxCurrentHappy;
  }

  return (
    totalInitialHappyGroups +
    findMaxPossibleHappyGroups(remainderGroupCounts, 0)
  );
};
