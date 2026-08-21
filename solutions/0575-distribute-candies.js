/**
 * Distribute Candies
 * Intuition: She may eat n/2 candies and wants as many types as possible, so the answer is min(unique types, n/2).
 * Approach: 1. Insert all candy ids into a Set. 2. `allowedCandiesToEat = length/2`. 3. Return min(set size, allowed).
 * Dry Run: candyType = [1,1,2,2,3,3].
 *   - Unique 3, eat 3, min=3. [1,1,2,3] unique 3 eat 2 → 2.
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
    allowedCandiesToEat
  );

  return maximumDifferentCandies;
};
