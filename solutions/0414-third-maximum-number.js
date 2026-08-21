/**
 * Third Maximum Number
 * Intuition: Track three strictly decreasing distinct values. Duplicates are skipped; if a true third never appears, return the largest.
 * Approach: 1. Init three slots to -Infinity. 2. Skip if `currentNumber` already occupies a slot. 3. Shift down when inserting into 1st/2nd/3rd. 4. If third is still -Infinity return `largestDistinct`, else the third.
 * Dry Run: nums = [3,2,1] → 3,2,1 all distinct. Return 1.
 *   nums = [2,2,3,1] → skip duplicate 2; third=1. Return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var thirdMax = function (nums) {
  let largestDistinct = Number.NEGATIVE_INFINITY;
  let secondLargestDistinct = Number.NEGATIVE_INFINITY;
  let thirdLargestDistinct = Number.NEGATIVE_INFINITY;

  let loopIndex = 0;
  let numbersCount = nums.length;

  while (loopIndex < numbersCount) {
    let currentNumber = nums[loopIndex];

    if (
      currentNumber === largestDistinct ||
      currentNumber === secondLargestDistinct ||
      currentNumber === thirdLargestDistinct
    ) {
      loopIndex++;
      continue;
    }

    if (currentNumber > largestDistinct) {
      thirdLargestDistinct = secondLargestDistinct;
      secondLargestDistinct = largestDistinct;
      largestDistinct = currentNumber;
    } else if (currentNumber > secondLargestDistinct) {
      thirdLargestDistinct = secondLargestDistinct;
      secondLargestDistinct = currentNumber;
    } else if (currentNumber > thirdLargestDistinct) {
      thirdLargestDistinct = currentNumber;
    }

    loopIndex++;
  }

  if (thirdLargestDistinct === Number.NEGATIVE_INFINITY) {
    return largestDistinct;
  } else {
    return thirdLargestDistinct;
  }
};
