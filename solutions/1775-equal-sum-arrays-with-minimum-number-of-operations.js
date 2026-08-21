/**
 * Equal Sum Arrays With Minimum Number Of Operations
 * Intuition: Values lie in 1..6, so the larger-sum array can decrease toward 1 and the smaller can increase toward 6. Greedily apply the largest available change until the gap closes (or prove it is impossible by length vs 6).
 * Approach: 1. Sum both arrays; swap so `activeSumOne >= activeSumTwo`. 2. If either length exceeds 6 times the other, return -1. 3. Collect decreases `value-1` and increases `6-value`, sort descending, and subtract until `currentDifference <= 0`. 4. Return `operationCounter`.
 * Dry Run: nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2].
 *   - Sums 21 vs 10, gap 11. Best changes include 5,4,... After three large decreases the sums can match → 3.
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
