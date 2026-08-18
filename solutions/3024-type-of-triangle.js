/**
 * Type Of Triangle
 * Intuition: First, ensure the given side lengths can actually form a triangle using the triangle inequality theorem. If not, it's "none". If a valid triangle can be formed, classify it by comparing side lengths: equilateral (all equal), isosceles (exactly two equal), or scalene (all different). Sorting the side lengths simplifies the triangle inequality check and subsequent classification.
 * Approach: 1. Extract the three side lengths from the input array. 2. Sort these side lengths in non-decreasing order to easily apply the triangle inequality and side comparisons. 3. Check if the sum of the two smallest sides is less than or equal to the largest side. If so, return "none". 4. Otherwise, proceed to classify the triangle: if all three sorted sides are equal, it's "equilateral". Else if at least two of the sorted sides are equal (specifically, the first two or the last two, due to sorting), it's "isosceles". 5. If none of the above conditions are met, it's "scalene".
 * Dry Run:
 *   Input: nums = [3, 4, 5]
 *   1. sideOne = 3, sideTwo = 4, sideThree = 5.
 *   2. sortedSides = [3, 4, 5].
 *   3. smallestSide = 3, middleSide = 4, largestSide = 5.
 *   4. Check triangle inequality: (smallestSide + middleSide <= largestSide) => (3 + 4 <= 5) => (7 <= 5) is false. So it's a valid triangle.
 *   5. Classify:
 *      - (smallestSide === middleSide && middleSide === largestSide) => (3 === 4 && 4 === 5) is false.
 *      - Else if (smallestSide === middleSide || middleSide === largestSide) => (3 === 4 || 4 === 5) is false.
 *      - Else branch executes: typeResult = 'scalene'.
 *   6. Return 'scalene'.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var triangleType = function (nums) {
  const firstDimension = nums[0];
  const secondDimension = nums[1];
  const thirdDimension = nums[2];

  const orderedDimensions = [
    firstDimension,
    secondDimension,
    thirdDimension,
  ].sort((dimA, dimB) => dimA - dimB);

  const shortestLength = orderedDimensions[0];
  const midLength = orderedDimensions[1];
  const longestLength = orderedDimensions[2];

  if (shortestLength + midLength <= longestLength) {
    return "none";
  }

  let finalTriangleClassification;

  if (shortestLength === midLength && midLength === longestLength) {
    finalTriangleClassification = "equilateral";
  } else if (shortestLength === midLength || midLength === longestLength) {
    finalTriangleClassification = "isosceles";
  } else {
    finalTriangleClassification = "scalene";
  }

  return finalTriangleClassification;
};
