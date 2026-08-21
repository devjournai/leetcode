/**
 * Tallest Billboard
 * Intuition: DP on height difference: `heightDifferencesMap` maps (taller − shorter) to the taller height. Each rod is unused, added to the taller side, or added to the shorter side.
 * Approach: 1. Seed map with difference 0 → height 0. 2. For each rod, snapshot previous states. 3. Add rod to taller: new diff `differenceKey + currentRodLength`, taller grows. 4. Add to shorter: new diff is `abs(taller − (shorter + rod))`, store max taller. 5. Return height at difference 0.
 * Dry Run: rods = [1,2,3,6]. After using 1,2,3 the two supports can both be 3 (diff 0, taller 3). Adding 6 unused keeps 3. Answer 6 if 6 vs 1+2+3.
 * Time Complexity: O(N * S)
 * Space Complexity: O(S)
 */
var tallestBillboard = function (rods) {
  const heightDifferencesMap = new Map();
  heightDifferencesMap.set(0, 0);

  for (const currentRodLength of rods) {
    const previousStatesSnapshot = new Map(heightDifferencesMap);

    previousStatesSnapshot.forEach((tallerHeightValue, differenceKey) => {
      const addedToTallerDifference = differenceKey + currentRodLength;
      const addedToTallerMaxHeight = tallerHeightValue + currentRodLength;
      heightDifferencesMap.set(
        addedToTallerDifference,
        Math.max(
          heightDifferencesMap.get(addedToTallerDifference) || 0,
          addedToTallerMaxHeight
        )
      );

      const shorterHeightValue = tallerHeightValue - differenceKey;
      const combinedShorterHeight = shorterHeightValue + currentRodLength;

      const addedToShorterDifference = Math.abs(
        tallerHeightValue - combinedShorterHeight
      );
      const addedToShorterMaxHeight = Math.max(
        tallerHeightValue,
        combinedShorterHeight
      );

      heightDifferencesMap.set(
        addedToShorterDifference,
        Math.max(
          heightDifferencesMap.get(addedToShorterDifference) || 0,
          addedToShorterMaxHeight
        )
      );
    });
  }

  return heightDifferencesMap.get(0) || 0;
};
