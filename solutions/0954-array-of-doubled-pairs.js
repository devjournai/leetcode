/**
 * Array Of Doubled Pairs
 * Intuition: Pair each leftover value with twice itself. Process by increasing |x| so the smaller-magnitude partner is claimed before 2x.
 * Approach: 1. Count values in `numberFrequencies`. 2. Sort a copy by `Math.abs`. 3. For each unused `candidateNumber`, if `targetDouble = candidateNumber * 2` has count 0, fail; else decrement both counts. 4. Return true if every value paired.
 * Dry Run: arr = [4,-2,2,-4]. Sorted by abs: -2,2,-4,4. Pair -2 with -4, then 2 with 4. All counts hit 0. True.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var canReorderDoubled = function (arr) {
  const numberFrequencies = new Map();

  for (const currentNumber of arr) {
    numberFrequencies.set(
      currentNumber,
      (numberFrequencies.get(currentNumber) || 0) + 1
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
