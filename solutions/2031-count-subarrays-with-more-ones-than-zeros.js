/**
 * Count Subarrays With More Ones Than Zeros
 * Intuition: Convert the problem into counting subarrays whose sum is strictly positive, where 1s contribute +1 and 0s contribute -1. This transforms the problem into finding pairs of prefix sums (currentPrefixSum, previousPrefixSum) such that currentPrefixSum - previousPrefixSum > 0, or currentPrefixSum > previousPrefixSum. A Fenwick tree (BIT) can efficiently count previous prefix sums that are less than the current prefix sum.
 * Approach: 1. Initialize a modulo constant and determine the array length. 2. Define an offset to shift negative balance values to non-negative indices suitable for a Fenwick tree. 3. Create a Fenwick tree array and its maximum index, along with helper functions `fenwickUpdateValue` and `fenwickQuerySum` to handle BIT operations (updating counts and querying prefix sums) efficiently. 4. Initialize `totalResultCount` to zero and `currentBalanceScore` to zero. 5. The balance of an empty prefix (0) occurs once, so update the Fenwick tree at `0 + offset` with a count of 1. 6. Iterate through each number in the input array. 7. For each number, update `currentBalanceScore` (+1 for 1, -1 for 0). 8. Query the Fenwick tree to find the sum of frequencies of all prefix sums strictly less than `currentBalanceScore`. This sum represents the number of valid subarrays ending at the current position. 9. Add this queried count to `totalResultCount`. 10. Update the Fenwick tree by incrementing the frequency of the `currentBalanceScore` at its mapped index. 11. After iterating through all numbers, return `totalResultCount`.
 * Dry Run: nums = [0, 1]
 * arrayLengthValue: 2, balanceOffsetValue: 2, moduloConstantValue: 1000000007.
 * fenwickTreeElements: new Array(5).fill(0), fenwickMaxIndexValue: 5.
 * totalResultCount: 0, currentBalanceScore: 0.
 * Call fenwickUpdateValue(0 + 2, 1) -> fenwickUpdateValue(2, 1).
 *   Inside fenwickUpdateValue: updateIndexParam = 2, updateDeltaParam = 1.
 *   currentWorkingIndex = 2. currentWorkingIndex becomes 3 (1-based).
 *   Loop: currentWorkingIndex (3) <= fenwickMaxIndexValue (5).
 *     fenwickTreeElements[3] = (fenwickTreeElements[3] + 1) % MOD = 1.
 *     currentWorkingIndex = 3 + (3 & -3) = 3 + 1 = 4.
 *   Loop: currentWorkingIndex (4) <= fenwickMaxIndexValue (5).
 *     fenwickTreeElements[4] = (fenwickTreeElements[4] + 1) % MOD = 1.
 *     currentWorkingIndex = 4 + (4 & -4) = 4 + 4 = 8.
 *   Loop: currentWorkingIndex (8) <= fenwickMaxIndexValue (5) is false. Loop ends.
 *   fenwickTreeElements: [0,0,0,1,1]. (Mapped balance 0 has count 1)
 *
 * mainLoopIndex = 0, currentArrayNumber = 0:
 *   currentBalanceScore = 0 - 1 = -1.
 *   queryIndexForFenwick = -1 + 2 - 1 = 0.
 *   Call previousBalancesCount = fenwickQuerySum(0).
 *     Inside fenwickQuerySum: queryIndexParam = 0.
 *     currentQueryPosition = 0. currentQueryPosition becomes 1 (1-based).
 *     currentQueryTotal = 0.
 *     Loop: currentQueryPosition (1) > 0.
 *       currentQueryTotal = (0 + fenwickTreeElements[1]) % MOD = 0.
 *       currentQueryPosition = 1 - (1 & -1) = 1 - 1 = 0.
 *     Loop: currentQueryPosition (0) > 0 is false. Loop ends.
 *     Returns 0.
 *   totalResultCount = (0 + 0) % MOD = 0.
 *   Call fenwickUpdateValue(-1 + 2, 1) -> fenwickUpdateValue(1, 1).
 *     Inside fenwickUpdateValue: updateIndexParam = 1, updateDeltaParam = 1.
 *     currentWorkingIndex = 1. currentWorkingIndex becomes 2 (1-based).
 *     Loop: currentWorkingIndex (2) <= fenwickMaxIndexValue (5).
 *       fenwickTreeElements[2] = (fenwickTreeElements[2] + 1) % MOD = 1.
 *       currentWorkingIndex = 2 + (2 & -2) = 2 + 2 = 4.
 *     Loop: currentWorkingIndex (4) <= fenwickMaxIndexValue (5).
 *       fenwickTreeElements[4] = (fenwickTreeElements[4] + 1) % MOD = (1 + 1) % MOD = 2.
 *       currentWorkingIndex = 4 + (4 & -4) = 4 + 4 = 8.
 *     Loop: currentWorkingIndex (8) <= fenwickMaxIndexValue (5) is false. Loop ends.
 *   fenwickTreeElements: [0,0,1,1,2]. (Mapped balance -1 has count 1)
 *
 * mainLoopIndex = 1, currentArrayNumber = 1:
 *   currentBalanceScore = -1 + 1 = 0.
 *   queryIndexForFenwick = 0 + 2 - 1 = 1.
 *   Call previousBalancesCount = fenwickQuerySum(1).
 *     Inside fenwickQuerySum: queryIndexParam = 1.
 *     currentQueryPosition = 1. currentQueryPosition becomes 2 (1-based).
 *     currentQueryTotal = 0.
 *     Loop: currentQueryPosition (2) > 0.
 *       currentQueryTotal = (0 + fenwickTreeElements[2]) % MOD = 1.
 *       currentQueryPosition = 2 - (2 & -2) = 2 - 2 = 0.
 *     Loop: currentQueryPosition (0) > 0 is false. Loop ends.
 *     Returns 1.
 *   totalResultCount = (0 + 1) % MOD = 1.
 *   Call fenwickUpdateValue(0 + 2, 1) -> fenwickUpdateValue(2, 1).
 *     Inside fenwickUpdateValue: updateIndexParam = 2, updateDeltaParam = 1.
 *     currentWorkingIndex = 2. currentWorkingIndex becomes 3 (1-based).
 *     Loop: currentWorkingIndex (3) <= fenwickMaxIndexValue (5).
 *       fenwickTreeElements[3] = (fenwickTreeElements[3] + 1) % MOD = (1 + 1) % MOD = 2.
 *       currentWorkingIndex = 3 + (3 & -3) = 3 + 1 = 4.
 *     Loop: currentWorkingIndex (4) <= fenwickMaxIndexValue (5).
 *       fenwickTreeElements[4] = (fenwickTreeElements[4] + 1) % MOD = (2 + 1) % MOD = 3.
 *       currentWorkingIndex = 4 + (4 & -4) = 4 + 4 = 8.
 *     Loop: currentWorkingIndex (8) <= fenwickMaxIndexValue (5) is false. Loop ends.
 *   fenwickTreeElements: [0,0,1,2,3]. (Mapped balance 0 has count 2)
 *
 * Returns totalResultCount: 1.
 * Valid subarrays: [1] at index 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var subarraysWithMoreZerosThanOnes = function (nums) {
  const moduloConstantValue = 1e9 + 7;
  const arrayLengthValue = nums.length;
  const balanceOffsetValue = arrayLengthValue;

  const fenwickMaxIndexValue = 2 * arrayLengthValue + 1;
  const fenwickTreeElements = new Array(fenwickMaxIndexValue + 1).fill(0);

  const fenwickUpdateValue = (updateIndexParam, updateDeltaParam) => {
    let currentWorkingIndex = updateIndexParam;
    currentWorkingIndex++;
    while (currentWorkingIndex <= fenwickMaxIndexValue) {
      fenwickTreeElements[currentWorkingIndex] =
        (fenwickTreeElements[currentWorkingIndex] + updateDeltaParam) %
        moduloConstantValue;
      currentWorkingIndex += currentWorkingIndex & -currentWorkingIndex;
    }
  };

  const fenwickQuerySum = (queryIndexParam) => {
    let currentQueryPosition = queryIndexParam;
    currentQueryPosition++;
    let currentQueryTotal = 0;
    while (currentQueryPosition > 0) {
      currentQueryTotal =
        (currentQueryTotal + fenwickTreeElements[currentQueryPosition]) %
        moduloConstantValue;
      currentQueryPosition -= currentQueryPosition & -currentQueryPosition;
    }
    return currentQueryTotal;
  };

  let totalResultCount = 0;
  let currentBalanceScore = 0;

  fenwickUpdateValue(0 + balanceOffsetValue, 1);

  for (
    let mainLoopIndex = 0;
    mainLoopIndex < arrayLengthValue;
    mainLoopIndex++
  ) {
    const currentArrayNumber = nums[mainLoopIndex];
    currentBalanceScore += currentArrayNumber === 1 ? 1 : -1;

    const queryIndexForFenwick = currentBalanceScore + balanceOffsetValue - 1;
    const previousBalancesCount = fenwickQuerySum(queryIndexForFenwick);

    totalResultCount =
      (totalResultCount + previousBalancesCount) % moduloConstantValue;

    fenwickUpdateValue(currentBalanceScore + balanceOffsetValue, 1);
  }

  return totalResultCount;
};
