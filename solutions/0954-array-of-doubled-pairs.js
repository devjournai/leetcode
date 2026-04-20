/**
 * Array Of Doubled Pairs
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var canReorderDoubled = function (arr) {
  const numberFrequencies = new Map();

  for (const currentNumber of arr) {
    numberFrequencies.set(
      currentNumber,
      (numberFrequencies.get(currentNumber) || 0) + 1,
    );
  }

  const sortedArrayAbsolute = [...arr];

  sortedArrayAbsolute.sort((firstVal, secondVal) => {
    const absoluteFirst = Math.abs(firstVal);
    const absoluteSecond = Math.abs(secondVal);
    const differenceOfAbsolutes = absoluteFirst - absoluteSecond;
    return differenceOfAbsolutes;
  });

  for (const candidateNumber of sortedArrayAbsolute) {
    const currentCount = numberFrequencies.get(candidateNumber);
    if (currentCount === 0) {
      continue;
    }

    const targetDouble = candidateNumber * 2;
    const targetDoubleCount = numberFrequencies.get(targetDouble);

    if (targetDoubleCount === undefined || targetDoubleCount === 0) {
      return false;
    }

    numberFrequencies.set(candidateNumber, currentCount - 1);
    numberFrequencies.set(targetDouble, targetDoubleCount - 1);
  }

  return true;
};
