/**
 * Minimize The Maximum Difference Of Pairs
 * Intuition: The problem asks for the "minimum of the maximums", which is a strong indicator for binary search on the answer. If we can form `p` pairs with a maximum difference `X`, we can also do it with any difference `Y > X`. This monotonicity allows binary search. To efficiently check if a given maximum difference `X` is achievable, we sort the array and greedily form pairs with differences `<= X`.
 * Approach:
 * 1. Sort the input array `nums` in ascending order. This ensures that adjacent elements are the best candidates for forming pairs with small differences.
 * 2. Determine the search space for the binary search. The minimum possible maximum difference is 0 (if `p` pairs can be formed from identical numbers or if `p` is 0), and the maximum possible maximum difference is `nums[n-1] - nums[0]` (the largest possible difference in the array). Let `lowerBound` be 0 and `upperBound` be `nums[n-1] - nums[0]`.
 * 3. Perform a binary search within this range. In each iteration, calculate `currentMidValue = Math.floor((lowerBound + upperBound) / 2)`.
 * 4. Call a helper function, `checkIfPairsPossible`, passing `currentMidValue`, the number of desired pairs `p`, and the sorted `nums` array along with its length. This function will determine if it's possible to form at least `p` pairs such that the absolute difference of each pair is no more than `currentMidValue`.
 * 5. Inside `checkIfPairsPossible`:
 * Initialize `currentPairCount` to 0.
 * Initialize `currentSearchIndex` to 0.
 * Iterate through the sorted `arrayToCheck` using a `while` loop. The loop continues as long as `currentSearchIndex` is within bounds (up to `arrayLengthForCheck - 1` to ensure `currentSearchIndex + 1` is valid) and `currentPairCount` is less than `requiredPairCount`.
 * If `arrayToCheck[currentSearchIndex + 1] - arrayToCheck[currentSearchIndex]` is less than or equal to `candidateDifference`, we can form a pair. Increment `currentPairCount` and advance `currentSearchIndex` by 2 (as both elements are now used).
 * Otherwise (if the difference is too large), we cannot form a pair with `arrayToCheck[currentSearchIndex]` and `arrayToCheck[currentSearchIndex + 1]`. We advance `currentSearchIndex` by 1 to try to form a pair starting from `arrayToCheck[currentSearchIndex + 1]`.
 * Return `true` if `currentPairCount` is greater than or equal to `requiredPairCount`, otherwise `false`.
 * 6. Back in the binary search:
 * If `checkIfPairsPossible` returns `true`, it means `currentMidValue` is a possible maximum difference. We store `currentMidValue` as a potential `minimumMaxDifference` and try to find an even smaller difference by setting `upperBound = currentMidValue - 1`.
 * If `checkIfPairsPossible` returns `false`, `currentMidValue` is too small. We need a larger maximum difference, so set `lowerBound = currentMidValue + 1`.
 * 7. The binary search continues until `lowerBound > upperBound`. The final `minimumMaxDifference` will hold the smallest possible maximum difference.
 * 8. Return `minimumMaxDifference`.
 * Dry Run: nums = [10,1,2,7,1,3], p = 2
 * 1. Sorted nums: [1,1,2,3,7,10]. lengthOfArray = 6.
 * 2. lowerBound = 0, upperBound = 10 - 1 = 9. minimumMaxDifference = 0.
 * 3. Iteration 1:
 * currentMidValue = floor((0+9)/2) = 4.
 * checkIfPairsPossible(4, 2, [1,1,2,3,7,10], 6):
 * currentPairCount = 0, currentSearchIndex = 0.
 * While loop (0 < 5 && 0 < 2):
 * nums[1]-nums[0] = 1-1 = 0 <= 4. currentPairCount = 1. currentSearchIndex = 2.
 * While loop (2 < 5 && 1 < 2):
 * nums[3]-nums[2] = 3-2 = 1 <= 4. currentPairCount = 2. currentSearchIndex = 4.
 * While loop (4 < 5 && 2 < 2) is false. Exit.
 * Returns true (2 >= 2).
 * Back in minimizeMax: minimumMaxDifference = 4. upperBound = 4 - 1 = 3.
 * 4. Iteration 2:
 * lowerBound = 0, upperBound = 3. currentMidValue = floor((0+3)/2) = 1.
 * checkIfPairsPossible(1, 2, [1,1,2,3,7,10], 6):
 * currentPairCount = 0, currentSearchIndex = 0.
 * While loop (0 < 5 && 0 < 2):
 * nums[1]-nums[0] = 1-1 = 0 <= 1. currentPairCount = 1. currentSearchIndex = 2.
 * While loop (2 < 5 && 1 < 2):
 * nums[3]-nums[2] = 3-2 = 1 <= 1. currentPairCount = 2. currentSearchIndex = 4.
 * While loop (4 < 5 && 2 < 2) is false. Exit.
 * Returns true (2 >= 2).
 * Back in minimizeMax: minimumMaxDifference = 1. upperBound = 1 - 1 = 0.
 * 5. Iteration 3:
 * lowerBound = 0, upperBound = 0. currentMidValue = floor((0+0)/2) = 0.
 * checkIfPairsPossible(0, 2, [1,1,2,3,7,10], 6):
 * currentPairCount = 0, currentSearchIndex = 0.
 * While loop (0 < 5 && 0 < 2):
 * nums[1]-nums[0] = 1-1 = 0 <= 0. currentPairCount = 1. currentSearchIndex = 2.
 * While loop (2 < 5 && 1 < 2):
 * nums[3]-nums[2] = 3-2 = 1 > 0. currentSearchIndex = 3.
 * While loop (3 < 5 && 1 < 2):
 * nums[4]-nums[3] = 7-3 = 4 > 0. currentSearchIndex = 4.
 * While loop (4 < 5 && 1 < 2):
 * nums[5]-nums[4] = 10-7 = 3 > 0. currentSearchIndex = 5.
 * While loop (5 < 5 && 1 < 2) is false. Exit.
 * Returns false (1 >= 2 is false).
 * Back in minimizeMax: lowerBound = 0 + 1 = 1.
 * 6. Iteration 4:
 * lowerBound = 1, upperBound = 0. Loop condition `lowerBound <= upperBound` (1 <= 0) is false. Exit loop.
 * Final minimumMaxDifference = 1.
 * Time Complexity: O(N log N + N log D)
 * Space Complexity: O(log N)
 */
var minimizeMax = function (nums, p) {
  nums.sort((a, b) => a - b);
  const lengthOfArray = nums.length;

  let lowerBound = 0;
  let upperBound = nums[lengthOfArray - 1] - nums[0];
  let minimumMaxDifference = 0;

  while (lowerBound <= upperBound) {
    const currentMidValue = Math.floor((lowerBound + upperBound) / 2);
    if (checkIfPairsPossible(currentMidValue, p, nums, lengthOfArray)) {
      minimumMaxDifference = currentMidValue;
      upperBound = currentMidValue - 1;
    } else {
      lowerBound = currentMidValue + 1;
    }
  }

  return minimumMaxDifference;

  function checkIfPairsPossible(
    candidateDifference,
    requiredPairCount,
    arrayToCheck,
    arrayLengthForCheck,
  ) {
    let currentPairCount = 0;
    let currentSearchIndex = 0;

    while (
      currentSearchIndex < arrayLengthForCheck - 1 &&
      currentPairCount < requiredPairCount
    ) {
      if (
        arrayToCheck[currentSearchIndex + 1] -
          arrayToCheck[currentSearchIndex] <=
        candidateDifference
      ) {
        currentPairCount++;
        currentSearchIndex += 2;
      } else {
        currentSearchIndex += 1;
      }
    }
    return currentPairCount >= requiredPairCount;
  }
};
