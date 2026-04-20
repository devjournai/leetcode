/**
 * Sort Integers By The Power Value
 * Time Complexity: O(M_max * L_max + (hi - lo) * log(hi - lo))
 * Space Complexity: O(M_max + L_max)
 */
var getKth = function (lo, hi, k) {
  const powerMemoizationMap = new Map();

  const obtainPower = (currentValue) => {
    if (currentValue === 1) {
      return 0;
    }
    if (powerMemoizationMap.has(currentValue)) {
      return powerMemoizationMap.get(currentValue);
    }

    let nextCalculationValue;
    if (currentValue % 2 === 0) {
      nextCalculationValue = currentValue / 2;
    } else {
      nextCalculationValue = 3 * currentValue + 1;
    }

    const calculatedPowerSteps = 1 + obtainPower(nextCalculationValue);
    powerMemoizationMap.set(currentValue, calculatedPowerSteps);
    return calculatedPowerSteps;
  };

  const numbersInConsideration = [];
  for (let currentIterator = lo; currentIterator <= hi; currentIterator++) {
    numbersInConsideration.push(currentIterator);
  }

  numbersInConsideration.sort((firstElement, secondElement) => {
    const powerForFirst = obtainPower(firstElement);
    const powerForSecond = obtainPower(secondElement);

    if (powerForFirst !== powerForSecond) {
      return powerForFirst - powerForSecond;
    }
    return firstElement - secondElement;
  });

  return numbersInConsideration[k - 1];
};
