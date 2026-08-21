/**
 * Maximum Number Of Groups Getting Fresh Donuts
 * Intuition: Groups with size % batchSize === 0 are always happy. Remaining groups are a remainder multiset; DFS+memo over leftover donuts maximizes how many times leftover is 0 when a group arrives.
 * Approach: 1. Count remainders; add remainder-0 groups to `totalInitialHappyGroups`. 2. `findMaxPossibleHappyGroups` tries each leftover remainder type, marking happy if leftover is 0. 3. Recurse with updated leftover. 4. Add memoized extra happies to the initial count.
 * Dry Run: batchSize = 3, groups = [1,2,3,4,5,6].
 *   - Remainder 0: two groups (3,6). Remaining 1,2,4,5 can be ordered so two more start fresh → 4.
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
    currentLeftoverDonuts
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
            nextLeftoverDonuts
          )
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
