/**
 * Equal Sum Arrays With Minimum Number Of Operations
 * Time Complexity: O((N + M) log (N + M))
 * Space Complexity: O(N + M)
 */
var minOperations = function (nums1, nums2) {
  let firstSumCalculation = 0;
  for (let valueA of nums1) {
    firstSumCalculation += valueA;
  }

  let secondSumCalculation = 0;
  for (let valueB of nums2) {
    secondSumCalculation += valueB;
  }

  let activeArrayOne = nums1;
  let activeArrayTwo = nums2;
  let activeSumOne = firstSumCalculation;
  let activeSumTwo = secondSumCalculation;

  if (activeSumOne < activeSumTwo) {
    [activeArrayOne, activeArrayTwo] = [activeArrayTwo, activeArrayOne];
    [activeSumOne, activeSumTwo] = [activeSumTwo, activeSumOne];
  }

  if (
    activeArrayOne.length > activeArrayTwo.length * 6 ||
    activeArrayTwo.length > activeArrayOne.length * 6
  ) {
    return -1;
  }

  let currentDifference = activeSumOne - activeSumTwo;
  let operationCounter = 0;
  let allPotentialChanges = [];

  for (let elementValueOne of activeArrayOne) {
    allPotentialChanges.push(elementValueOne - 1);
  }

  for (let elementValueTwo of activeArrayTwo) {
    allPotentialChanges.push(6 - elementValueTwo);
  }

  allPotentialChanges.sort((a, b) => b - a);

  let changeIndex = 0;
  while (currentDifference > 0 && changeIndex < allPotentialChanges.length) {
    let highestChange = allPotentialChanges[changeIndex];
    currentDifference -= highestChange;
    operationCounter++;
    changeIndex++;
  }

  return operationCounter;
};
