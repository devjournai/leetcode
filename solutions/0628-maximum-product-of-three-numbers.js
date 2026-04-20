/**
 * Maximum Product Of Three Numbers
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumProduct = function (nums) {
  let largestOne = -Infinity;
  let largestTwo = -Infinity;
  let largestThree = -Infinity;

  let smallestOne = Infinity;
  let smallestTwo = Infinity;

  for (const currentNumberValue of nums) {
    if (currentNumberValue > largestOne) {
      largestThree = largestTwo;
      largestTwo = largestOne;
      largestOne = currentNumberValue;
    } else if (currentNumberValue > largestTwo) {
      largestThree = largestTwo;
      largestTwo = currentNumberValue;
    } else if (currentNumberValue > largestThree) {
      largestThree = currentNumberValue;
    }

    if (currentNumberValue < smallestOne) {
      smallestTwo = smallestOne;
      smallestOne = currentNumberValue;
    } else if (currentNumberValue < smallestTwo) {
      smallestTwo = currentNumberValue;
    }
  }

  const firstProductOption = largestOne * largestTwo * largestThree;
  const secondProductOption = smallestOne * smallestTwo * largestOne;

  return Math.max(firstProductOption, secondProductOption);
};
