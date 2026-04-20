/**
 * Cherry Pickup
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var cherryPickup = function (grid) {
  const gridDimension = grid.length;
  const memoTable = Array.from({ length: gridDimension }, () =>
    Array.from({ length: gridDimension }, () =>
      new Array(2 * gridDimension - 1).fill(-Infinity),
    ),
  );

  if (grid[0][0] === -1) {
    return 0;
  }

  memoTable[0][0][0] = grid[0][0];

  for (
    let currentStep = 1;
    currentStep < 2 * gridDimension - 1;
    currentStep++
  ) {
    for (let firstPersonX = 0; firstPersonX < gridDimension; firstPersonX++) {
      const firstPersonY = currentStep - firstPersonX;

      if (firstPersonY < 0 || firstPersonY >= gridDimension) {
        continue;
      }

      if (grid[firstPersonX][firstPersonY] === -1) {
        continue;
      }
      for (
        let secondPersonX = 0;
        secondPersonX < gridDimension;
        secondPersonX++
      ) {
        const secondPersonY = currentStep - secondPersonX;

        if (secondPersonY < 0 || secondPersonY >= gridDimension) {
          continue;
        }
        if (grid[secondPersonX][secondPersonY] === -1) {
          continue;
        }

        let maximumPreviousCherries = -Infinity;

        const firstPersonPrevXOptions = [firstPersonX - 1, firstPersonX];
        const secondPersonPrevXOptions = [secondPersonX - 1, secondPersonX];

        for (const potentialFirstPersonPrevX of firstPersonPrevXOptions) {
          for (const potentialSecondPersonPrevX of secondPersonPrevXOptions) {
            if (
              potentialFirstPersonPrevX >= 0 &&
              potentialSecondPersonPrevX >= 0
            ) {
              const previousStateCherries =
                memoTable[potentialFirstPersonPrevX][
                  potentialSecondPersonPrevX
                ][currentStep - 1];
              if (previousStateCherries > -Infinity) {
                maximumPreviousCherries = Math.max(
                  maximumPreviousCherries,
                  previousStateCherries,
                );
              }
            }
          }
        }

        if (maximumPreviousCherries === -Infinity) {
          continue;
        }
        let currentCherriesCollected = grid[firstPersonX][firstPersonY];
        if (firstPersonX !== secondPersonX || firstPersonY !== secondPersonY) {
          currentCherriesCollected += grid[secondPersonX][secondPersonY];
        }

        memoTable[firstPersonX][secondPersonX][currentStep] =
          maximumPreviousCherries + currentCherriesCollected;
      }
    }
  }

  const finalAccumulatedCherries =
    memoTable[gridDimension - 1][gridDimension - 1][2 * gridDimension - 2];
  return finalAccumulatedCherries < 0 ? 0 : finalAccumulatedCherries;
};
