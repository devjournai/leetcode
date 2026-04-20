/**
 * Probability Of A Two Boxes Having The Same Number Of Distinct Balls
 * Time Complexity: O(C(totalBalls/2 + numColors - 1, numColors - 1) * numColors)
 * Space Complexity: O(numColors + totalBalls/2)
 */
var getProbability = function (balls) {
  const totalBallQuantity = balls.reduce(
    (summation, currentCount) => summation + currentCount,
    0,
  );
  const halfQuantityTarget = totalBallQuantity / 2;
  const numberOfColors = balls.length;

  const factorialCache = new Array(halfQuantityTarget + 1);
  factorialCache[0] = 1;

  function computeFactorialValue(numberValue) {
    if (factorialCache[numberValue] !== undefined) {
      return factorialCache[numberValue];
    }
    let currentProduct = 1;
    for (let counter = 1; counter <= numberValue; ++counter) {
      currentProduct *= counter;
    }
    factorialCache[numberValue] = currentProduct;
    return currentProduct;
  }

  for (let factorIdx = 1; factorIdx <= halfQuantityTarget; ++factorIdx) {
    computeFactorialValue(factorIdx);
  }

  function calculateMultinomialCoefficient(distributionCounts, totalItems) {
    let numeratorProduct = factorialCache[totalItems];
    let denominatorProduct = 1;
    for (const individualCount of distributionCounts) {
      denominatorProduct *= factorialCache[individualCount];
    }
    return numeratorProduct / denominatorProduct;
  }

  function determineDistinctColorCount(configurationArray) {
    let distinctColorCounter = 0;
    for (const ballCountEntry of configurationArray) {
      if (ballCountEntry > 0) {
        distinctColorCounter++;
      }
    }
    return distinctColorCounter;
  }

  let totalPossibleArrangements = 0;
  let favorableArrangements = 0;

  const firstBoxConfiguration = new Array(numberOfColors).fill(0);

  function findDistributions(colorIndexIteration, currentFirstBoxTotalBalls) {
    if (currentFirstBoxTotalBalls > halfQuantityTarget) {
      return;
    }

    if (colorIndexIteration === numberOfColors) {
      if (currentFirstBoxTotalBalls === halfQuantityTarget) {
        const secondBoxConfiguration = new Array(numberOfColors);
        for (
          let colorIterator = 0;
          colorIterator < numberOfColors;
          ++colorIterator
        ) {
          secondBoxConfiguration[colorIterator] =
            balls[colorIterator] - firstBoxConfiguration[colorIterator];
        }

        const distinctCountFirst = determineDistinctColorCount(
          firstBoxConfiguration,
        );
        const distinctCountSecond = determineDistinctColorCount(
          secondBoxConfiguration,
        );

        const waysForFirstBox = calculateMultinomialCoefficient(
          firstBoxConfiguration,
          halfQuantityTarget,
        );
        const waysForSecondBox = calculateMultinomialCoefficient(
          secondBoxConfiguration,
          halfQuantityTarget,
        );

        const currentCombinationWays = waysForFirstBox * waysForSecondBox;

        totalPossibleArrangements += currentCombinationWays;
        if (distinctCountFirst === distinctCountSecond) {
          favorableArrangements += currentCombinationWays;
        }
      }
      return;
    }

    for (
      let currentColorsCount = 0;
      currentColorsCount <= balls[colorIndexIteration];
      ++currentColorsCount
    ) {
      if (
        currentFirstBoxTotalBalls + currentColorsCount <=
        halfQuantityTarget
      ) {
        firstBoxConfiguration[colorIndexIteration] = currentColorsCount;
        findDistributions(
          colorIndexIteration + 1,
          currentFirstBoxTotalBalls + currentColorsCount,
        );
      }
    }
    firstBoxConfiguration[colorIndexIteration] = 0;
  }

  findDistributions(0, 0);

  return favorableArrangements / totalPossibleArrangements;
};
