/**
 * Append K Integers With Minimal Sum
 * Intuition: To minimize the sum of K appended integers, we must select the smallest possible positive integers that are not already present in the input array `nums`. This strategy involves iterating through positive integers starting from 1 and adding them to our sum as long as they are not found in `nums` and we still need to append numbers.
 * Approach: 1. First, create a sorted list of unique numbers from the input `nums` array to facilitate efficient checking and processing. 2. Initialize a `BigInt` variable `finalSum` to store the total sum of appended integers, and `numbersNeeded` with the value of `k`. Also, initialize `currentPositiveInteger` to 1, representing the smallest positive integer we might append, and `numsIndex` to 0, for iterating through the sorted unique numbers. 3. Loop while `numbersNeeded` is greater than 0 and there are still elements to check in `uniqueNumbersSorted`. 4. Inside the loop, compare `currentPositiveInteger` with the element at `uniqueNumbersSorted[numsIndex]`. 5. If `currentPositiveInteger` is less than `uniqueNumbersSorted[numsIndex]`, it means there's a gap of numbers we can append. Calculate how many numbers are available in this gap (`uniqueNumbersSorted[numsIndex] - currentPositiveInteger`) and how many we actually need to append (`Math.min(numbersNeeded, availableCountInGap)`). Add the sum of this arithmetic progression to `finalSum`, decrement `numbersNeeded`, and update `currentPositiveInteger`. 6. If `currentPositiveInteger` is greater than or equal to `uniqueNumbersSorted[numsIndex]`, it means the current `uniqueNumbersSorted` element is in our way or has already been considered. We must skip this number by incrementing `currentPositiveInteger` to `uniqueNumbersSorted[numsIndex] + 1` and moving to the next unique number in `uniqueNumbersSorted` by incrementing `numsIndex`. 7. After the loop, if `numbersNeeded` is still greater than 0, it means we have exhausted all unique numbers from `nums` but still need to append more. Add the sum of the next `numbersNeeded` consecutive integers, starting from `currentPositiveInteger`, to `finalSum`. 8. Convert `finalSum` back to a `Number` and return it.
 * Dry Run: nums = [1, 4, 5], k = 3
 *   1. uniqueNumbersSorted = [1, 4, 5]
 *   2. finalSum = 0n, numbersNeeded = 3, currentPositiveInteger = 1, numsIndex = 0
 *   3. Loop (numbersNeeded=3 > 0 && numsIndex=0 < 3):
 *      - uniqueNumbersSorted[0] = 1
 *      - currentPositiveInteger (1) >= uniqueNumbersSorted[0] (1).
 *      - currentPositiveInteger = 1 + 1 = 2
 *      - numsIndex = 1
 *   4. Loop (numbersNeeded=3 > 0 && numsIndex=1 < 3):
 *      - uniqueNumbersSorted[1] = 4
 *      - currentPositiveInteger (2) < uniqueNumbersSorted[1] (4).
 *      - availableCountInGap = 4 - 2 = 2 (numbers 2, 3)
 *      - countToAppend = Math.min(3, 2) = 2
 *      - sumOfRange = (2n + (2n + 2n - 1n)) * 2n / 2n = (2n + 3n) * 2n / 2n = 5n
 *      - finalSum = 0n + 5n = 5n
 *      - numbersNeeded = 3 - 2 = 1
 *      - currentPositiveInteger = 2 + 2 = 4
 *   5. Loop (numbersNeeded=1 > 0 && numsIndex=1 < 3):
 *      - uniqueNumbersSorted[1] = 4 (still 4 because numsIndex wasn't incremented in previous step when adding a range) - Error in my dry run logic here, the current existing number should be based on the incremented index. I should increment the index in the case where `currentPositiveInteger >= uniqueNumbersSorted[numsIndex]` as it means we are skipping that value. My current plan correctly moves `numsIndex` only in the second case.
 *      - Let's retrace the `currentPositiveInteger >= uniqueNumbersSorted[numsIndex]` case: if currentPositiveInteger is 1 and uniqueSortedNumbers[0] is 1, then we increment currentPositiveInteger to 2 and increment numsIndex to 1. This means the next iteration will compare 2 with uniqueSortedNumbers[1] (which is 4). This part is fine.
 *      - The bug in my dry run simulation was in assuming `uniqueNumbersSorted[1]` was still 4 after processing the gap before 4. `numsIndex` was not incremented in the previous step, so it points to 4.
 *      - `currentPositiveInteger` is 4. `uniqueNumbersSorted[1]` is 4.
 *      - `currentPositiveInteger (4) >= uniqueNumbersSorted[1] (4)`.
 *      - currentPositiveInteger = 4 + 1 = 5
 *      - numsIndex = 1 + 1 = 2
 *   6. Loop (numbersNeeded=1 > 0 && numsIndex=2 < 3):
 *      - uniqueNumbersSorted[2] = 5
 *      - currentPositiveInteger (5) >= uniqueNumbersSorted[2] (5).
 *      - currentPositiveInteger = 5 + 1 = 6
 *      - numsIndex = 2 + 1 = 3
 *   7. Loop condition (numbersNeeded=1 > 0 && numsIndex=3 < 3) is false. Loop terminates.
 *   8. After loop, numbersNeeded (1) > 0.
 *      - sumOfRemaining = (BigInt(6) + BigInt(6 + 1 - 1)) * BigInt(1) / BigInt(2) = (6n + 6n) * 1n / 2n = 6n
 *      - finalSum = 5n + 6n = 11n
 *   9. Return Number(finalSum) = 11.
 *   Correct appended numbers for [1,4,5], k=3 should be 2, 3, 6. Sum = 2+3+6 = 11. Matches.
 * Time Complexity: O(N log N + K) - O(N log N)
 * Space Complexity: O(N)
 */
var minimalKSum = function (nums, k) {
  const uniqueNumbersSorted = [...new Set(nums)].sort(
    (valueA, valueB) => valueA - valueB,
  );
  let finalSum = BigInt(0);
  let numbersNeeded = k;
  let currentPositiveInteger = 1;
  let uniqueNumbersIndex = 0;

  while (numbersNeeded > 0 && uniqueNumbersIndex < uniqueNumbersSorted.length) {
    const currentExistingValue = uniqueNumbersSorted[uniqueNumbersIndex];

    if (currentPositiveInteger < currentExistingValue) {
      const availableRangeCount = currentExistingValue - currentPositiveInteger;
      const countToAppendInGap = Math.min(numbersNeeded, availableRangeCount);

      if (countToAppendInGap > 0) {
        const firstTerm = BigInt(currentPositiveInteger);
        const lastTerm = BigInt(
          currentPositiveInteger + countToAppendInGap - 1,
        );
        const termsCount = BigInt(countToAppendInGap);
        finalSum += ((firstTerm + lastTerm) * termsCount) / BigInt(2);
        numbersNeeded -= countToAppendInGap;
        currentPositiveInteger += countToAppendInGap;
      }
    } else {
      currentPositiveInteger = currentExistingValue + 1;
      uniqueNumbersIndex++;
    }
  }

  if (numbersNeeded > 0) {
    const startOfRemainingRange = BigInt(currentPositiveInteger);
    const endOfRemainingRange = BigInt(
      currentPositiveInteger + numbersNeeded - 1,
    );
    const remainingTermsCount = BigInt(numbersNeeded);
    finalSum +=
      ((startOfRemainingRange + endOfRemainingRange) * remainingTermsCount) /
      BigInt(2);
  }

  return Number(finalSum);
};
