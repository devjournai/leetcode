/**
 * Partition Array Into Three Parts With Equal Sum
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canThreePartsEqualSum = function (arr) {
  let initialTotal = 0;
  for (let currentNumber of arr) {
    initialTotal += currentNumber;
  }

  if (initialTotal % 3 !== 0) {
    return false;
  }

  const desiredPartSum = initialTotal / 3;
  let partsAccumulated = 0;
  let partRunningSum = 0;

  for (let arrayElement of arr) {
    partRunningSum += arrayElement;
    if (partRunningSum === desiredPartSum) {
      partsAccumulated++;
      partRunningSum = 0;
    }
  }

  return partsAccumulated >= 3;
};
