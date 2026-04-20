/**
 * Minimum Number Of Days To Eat N Oranges
 * Time Complexity: O(logN)
 * Space Complexity: O(logN)
 */
var minDays = function (initialQuantity) {
  const calculationCache = new Map();

  const determineMinimumDays = (remainingOranges) => {
    if (remainingOranges <= 1) {
      return remainingOranges;
    }

    const potentialCacheValue = calculationCache.get(remainingOranges);
    if (potentialCacheValue !== undefined) {
      return potentialCacheValue;
    }

    let pathOneDays =
      determineMinimumDays(Math.floor(remainingOranges / 2)) +
      (remainingOranges % 2) +
      1;
    let pathTwoDays =
      determineMinimumDays(Math.floor(remainingOranges / 3)) +
      (remainingOranges % 3) +
      1;

    let finalMinimum = Math.min(pathOneDays, pathTwoDays);
    calculationCache.set(remainingOranges, finalMinimum);
    return finalMinimum;
  };

  return determineMinimumDays(initialQuantity);
};
