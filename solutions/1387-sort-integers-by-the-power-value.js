/**
 * Sort Integers By The Power Value
 * Intuition: Collatz power of x is steps to reach 1. Memoize those steps, sort [lo, hi] by power then by value, and pick the k-th.
 * Approach: 1. obtainPower(x): 0 if x==1; else 1 + power of x/2 or 3x+1, cached in a map. 2. Put every integer from lo to hi in an array. 3. Sort by power, then by number. 4. Return index k-1.
 * Dry Run: lo = 12, hi = 15, k = 2.
 *   - Powers: 12→9, 13→9, 14→17, 15→17. Sorted [12,13,14,15]. k=2 → 13.
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
