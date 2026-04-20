/**
 * Maximize Grid Happiness
 * Time Complexity: O(m * n * introvertsCount * extrovertsCount * 3^n)
 * Space Complexity: O(m * n * introvertsCount * extrovertsCount * 3^n)
 */
var getMaxGridHappiness = function (m, n, introvertsCount, extrovertsCount) {
  const memoizationMap = new Map();

  const introvertBaseHappinessValue = 120;
  const extrovertBaseHappinessValue = 40;
  const introvertSelfNeighborPenalty = -30;
  const extrovertSelfNeighborBonus = 20;

  const neighborImpactOnPersonIfSelfIsIntrovert = [0, -30, 20];
  const neighborImpactOnPersonIfSelfIsExtrovert = [0, -30, 20];

  const powersOfThreeList = new Array(n + 1);
  powersOfThreeList[0] = 1;
  for (let currentPowerIndex = 1; currentPowerIndex <= n; currentPowerIndex++) {
    powersOfThreeList[currentPowerIndex] =
      powersOfThreeList[currentPowerIndex - 1] * 3;
  }
  const upNeighborStateDivisor = powersOfThreeList[n - 1];
  const maximumStateValueBoundary = powersOfThreeList[n];

  function computeMaxHappiness(
    currentGridRow,
    currentGridColumn,
    remainingIntroverts,
    remainingExtroverts,
    priorConfigurationState,
  ) {
    if (
      currentGridRow === m ||
      (remainingIntroverts === 0 && remainingExtroverts === 0)
    ) {
      return 0;
    }
    if (currentGridColumn === n) {
      return computeMaxHappiness(
        currentGridRow + 1,
        0,
        remainingIntroverts,
        remainingExtroverts,
        priorConfigurationState,
      );
    }

    const uniqueStateIdentifier = `${currentGridRow},${currentGridColumn},${remainingIntroverts},${remainingExtroverts},${priorConfigurationState}`;
    if (memoizationMap.has(uniqueStateIdentifier)) {
      return memoizationMap.get(uniqueStateIdentifier);
    }

    const nextProfileConfiguration =
      (priorConfigurationState * 3) % maximumStateValueBoundary;
    let currentMaximumHappinessAchieved = computeMaxHappiness(
      currentGridRow,
      currentGridColumn + 1,
      remainingIntroverts,
      remainingExtroverts,
      nextProfileConfiguration,
    );

    if (remainingIntroverts > 0) {
      let placedIntrovertCurrentHappiness = introvertBaseHappinessValue;
      let happinessChangeFromNeighborReactions = 0;

      const leftCellOccupantTypeI =
        currentGridColumn > 0 ? priorConfigurationState % 3 : 0;
      const upCellOccupantTypeI =
        currentGridRow > 0
          ? Math.floor(priorConfigurationState / upNeighborStateDivisor) % 3
          : 0;

      if (leftCellOccupantTypeI !== 0) {
        placedIntrovertCurrentHappiness += introvertSelfNeighborPenalty;
        happinessChangeFromNeighborReactions +=
          neighborImpactOnPersonIfSelfIsIntrovert[leftCellOccupantTypeI];
      }
      if (upCellOccupantTypeI !== 0) {
        placedIntrovertCurrentHappiness += introvertSelfNeighborPenalty;
        happinessChangeFromNeighborReactions +=
          neighborImpactOnPersonIfSelfIsIntrovert[upCellOccupantTypeI];
      }

      const nextConfigurationWithIntrovert = nextProfileConfiguration + 1;
      currentMaximumHappinessAchieved = Math.max(
        currentMaximumHappinessAchieved,
        placedIntrovertCurrentHappiness +
          happinessChangeFromNeighborReactions +
          computeMaxHappiness(
            currentGridRow,
            currentGridColumn + 1,
            remainingIntroverts - 1,
            remainingExtroverts,
            nextConfigurationWithIntrovert,
          ),
      );
    }

    if (remainingExtroverts > 0) {
      let placedExtrovertCurrentHappiness = extrovertBaseHappinessValue;
      let anotherHappinessChangeFromNeighborReactions = 0;

      const leftCellOccupantTypeE =
        currentGridColumn > 0 ? priorConfigurationState % 3 : 0;
      const upCellOccupantTypeE =
        currentGridRow > 0
          ? Math.floor(priorConfigurationState / upNeighborStateDivisor) % 3
          : 0;

      if (leftCellOccupantTypeE !== 0) {
        placedExtrovertCurrentHappiness += extrovertSelfNeighborBonus;
        anotherHappinessChangeFromNeighborReactions +=
          neighborImpactOnPersonIfSelfIsExtrovert[leftCellOccupantTypeE];
      }
      if (upCellOccupantTypeE !== 0) {
        placedExtrovertCurrentHappiness += extrovertSelfNeighborBonus;
        anotherHappinessChangeFromNeighborReactions +=
          neighborImpactOnPersonIfSelfIsExtrovert[upCellOccupantTypeE];
      }

      const nextConfigurationWithExtrovert = nextProfileConfiguration + 2;
      currentMaximumHappinessAchieved = Math.max(
        currentMaximumHappinessAchieved,
        placedExtrovertCurrentHappiness +
          anotherHappinessChangeFromNeighborReactions +
          computeMaxHappiness(
            currentGridRow,
            currentGridColumn + 1,
            remainingIntroverts,
            remainingExtroverts - 1,
            nextConfigurationWithExtrovert,
          ),
      );
    }

    memoizationMap.set(uniqueStateIdentifier, currentMaximumHappinessAchieved);
    return currentMaximumHappinessAchieved;
  }
};
