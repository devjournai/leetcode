/**
 * Number Of Burgers With No Waste Of Ingredients
 * Intuition: Jumbo uses 4 tomatoes and 1 cheese, small uses 2 and 1. Then jumbo = (tomato - 2*cheese)/2 and small = cheese - jumbo, all non-negative integers.
 * Approach: 1. potentialJumboNumerator = tomatoSlices - 2*cheeseSlices; fail if negative or odd. 2. jumbo = numerator/2, small = cheese - jumbo; fail if small < 0. 3. Return [jumbo, small].
 * Dry Run: tomatoSlices=16, cheeseSlices=7
 *   numerator=16-14=2, jumbo=1, small=6. Return [1,6].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numOfBurgers = function (tomatoSlices, cheeseSlices) {
  const potentialJumboNumerator = tomatoSlices - 2 * cheeseSlices;

  if (potentialJumboNumerator < 0) {
    return [];
  }

  if (potentialJumboNumerator % 2 !== 0) {
    return [];
  }

  const calculatedJumboCount = potentialJumboNumerator / 2;

  const calculatedSmallCount = cheeseSlices - calculatedJumboCount;

  if (calculatedSmallCount < 0) {
    return [];
  }

  return [calculatedJumboCount, calculatedSmallCount];
};
