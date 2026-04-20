/**
 * Number Of Burgers With No Waste Of Ingredients
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
