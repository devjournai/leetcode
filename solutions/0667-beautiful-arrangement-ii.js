/**
 * Beautiful Arrangement II
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var constructArray = function (numberN, distinctCountK) {
  const arrangementArray = [];
  let currentLow = 1;
  let currentHigh = numberN;
  let totalElementsAdded = 0;

  while (distinctCountK > 0) {
    if (distinctCountK % 2 === 1) {
      arrangementArray.push(currentLow);
      currentLow++;
    } else {
      arrangementArray.push(currentHigh);
      currentHigh--;
    }
    distinctCountK--;
    totalElementsAdded++;
  }

  while (totalElementsAdded < numberN) {
    arrangementArray.push(currentLow);
    currentLow++;
    totalElementsAdded++;
  }

  return arrangementArray;
};
