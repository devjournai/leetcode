/**
 * Tallest Billboard
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
          addedToTallerMaxHeight,
        ),
      );

      const shorterHeightValue = tallerHeightValue - differenceKey;
      const combinedShorterHeight = shorterHeightValue + currentRodLength;

      const addedToShorterDifference = Math.abs(
        tallerHeightValue - combinedShorterHeight,
      );
      const addedToShorterMaxHeight = Math.max(
        tallerHeightValue,
        combinedShorterHeight,
      );

      heightDifferencesMap.set(
        addedToShorterDifference,
        Math.max(
          heightDifferencesMap.get(addedToShorterDifference) || 0,
          addedToShorterMaxHeight,
        ),
      );
    });
  }

  return heightDifferencesMap.get(0) || 0;
};
