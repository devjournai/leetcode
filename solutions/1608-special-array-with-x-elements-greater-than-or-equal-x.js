/**
 * Special Array With X Elements Greater Than Or Equal X
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var specialArray = function (numbers) {
  const arraySize = numbers.length;

  for (let possibleX = 0; possibleX <= arraySize; possibleX++) {
    let countGreaterOrEqual = 0;
    for (let elementValue of numbers) {
      if (elementValue >= possibleX) {
        countGreaterOrEqual++;
      }
    }
    if (countGreaterOrEqual === possibleX) {
      return possibleX;
    }
  }

  return -1;
};
