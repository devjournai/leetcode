/**
 * Partition Array Into Three Parts With Equal Sum
 * Intuition: Three equal parts exist only if the total is divisible by 3. Greedily cut whenever a running sum hits total/3.
 * Approach: 1. Sum the array; if not divisible by 3, false. 2. Scan, adding to a running sum. 3. Each time it equals the target, increment parts and reset. 4. True if at least three parts were found (leftover zeros can form extra cuts).
 * Dry Run: arr = [0,2,1,-6,6,-7,9,1,2,0,1].
 *   - Total 9, target 3. Cuts after prefixes summing to 3, then 3, then 3. parts >= 3 -> true.
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
