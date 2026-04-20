/**
 * Distribute Candies
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var distributeCandies = function (candyType) {
  const uniqueCandySet = new Set();

  for (const currentCandyId of candyType) {
    uniqueCandySet.add(currentCandyId);
  }

  const totalCandiesAvailable = candyType.length;
  const allowedCandiesToEat = totalCandiesAvailable / 2;
  const countOfUniqueTypes = uniqueCandySet.size;

  const maximumDifferentCandies = Math.min(
    countOfUniqueTypes,
    allowedCandiesToEat,
  );

  return maximumDifferentCandies;
};
