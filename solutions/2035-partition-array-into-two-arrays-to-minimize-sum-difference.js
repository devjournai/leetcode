/**
  * Partition Array Into Two Arrays To Minimize Sum Difference
  * Intuition: This problem can be solved by splitting the array into two halves and using a "meet-in-the-middle" approach. We generate all possible subset sums for each half of the original array for every possible subset size. Then, for a given subset sum and size from the second half, we efficiently find a complementary sum from the first half that, when combined, minimizes the absolute difference between the total sum of the first partition and the total sum of the second partition.
  * Approach: 1. Calculate the overall sum of all elements in the input array `nums`. 2. Determine `halfLength`, which is half the length of `nums`. 3. Generate all possible subset sums for the first `halfLength` elements (the "first half"). Store these sums in a `Map` where keys are the number of elements in the subset (`subsetSize`) and values are arrays of sums, sorted in ascending order. 4. Iterate through all possible subsets of the second `halfLength` elements (the "second half"). For each subset, calculate its sum (`secondHalfCurrentSum`) and the number of elements it contains (`secondHalfCurrentSize`). 5. Calculate the `complementarySize` required from the first half to form a partition of `halfLength` elements (`halfLength - secondHalfCurrentSize`). 6. Calculate the `targetSumForFirstHalf` to minimize `| (firstHalfSum + secondHalfCurrentSum) - (overallSum - (firstHalfSum + secondHalfCurrentSum)) |`, which simplifies to minimizing `|2 * (firstHalfSum + secondHalfCurrentSum) - overallSum|`. This means `firstHalfSum` should be close to `(overallSum - 2 * secondHalfCurrentSum) / 2`. 7. Use a binary search function on the sorted list of sums from the `firstHalfCollections` for the `complementarySize` to find the sum closest to `targetSumForFirstHalf`. 8. Update the `minOverallDifference` by considering the sum found by binary search and potentially its immediate predecessor in the sorted list, calculating the absolute difference for each. 9. Return the `minOverallDifference`.
  * Dry Run: nums = [3,9,7,3], halfLength = 2
    overallSum = 22
    firstHalf: [3,9] (indices 0,1)
    secondHalf: [7,3] (indices 2,3)

    firstHalfCollections (map: size -> [sums]):
    For loop (currentMask from 0 to 2^2-1 = 3):
    - currentMask=0 (00): currentCount=0, currentSum=0. firstHalfCollections.get(0) -> [0]
    - currentMask=1 (01): currentCount=1, currentSum=nums[0]=3. firstHalfCollections.get(1) -> [3]
    - currentMask=2 (10): currentCount=1, currentSum=nums[1]=9. firstHalfCollections.get(1) -> [3,9]
    - currentMask=3 (11): currentCount=2, currentSum=nums[0]+nums[1]=12. firstHalfCollections.get(2) -> [12]

    Sorting firstHalfCollections:
    { 0: [0], 1: [3,9], 2: [12] }

    Second half loop (secondMask from 0 to 2^2-1 = 3):
    - secondMask=0 (00): secondHalfCurrentSize=0, secondHalfCurrentSum=0.
        complementarySize = 2 - 0 = 2.
        matchingFirstHalfSums = firstHalfCollections.get(2) = [12].
        targetSumForFirstHalf = (22 - 2 * 0) / 2 = 11.
        foundIndex = findClosestSumIndex([12], 11) -> 0 (points to 12).
        minOverallDifference = Math.min(Infinity, Math.abs(22 - 2 * (0 + 12))) = Math.min(Infinity, 2) = 2.

    - secondMask=1 (01): secondHalfCurrentSize=1, secondHalfCurrentSum=nums[2]=7.
        complementarySize = 2 - 1 = 1.
        matchingFirstHalfSums = firstHalfCollections.get(1) = [3,9].
        targetSumForFirstHalf = (22 - 2 * 7) / 2 = (22 - 14) / 2 = 4.
        foundIndex = findClosestSumIndex([3,9], 4) -> 1 (points to 9).
        minOverallDifference = Math.min(2, Math.abs(22 - 2 * (7 + 9))) = Math.min(2, 10) = 2.
        Check predecessor (index 0, value 3):
        minOverallDifference = Math.min(2, Math.abs(22 - 2 * (7 + 3))) = Math.min(2, 2) = 2.

    - secondMask=2 (10): secondHalfCurrentSize=1, secondHalfCurrentSum=nums[3]=3.
        complementarySize = 2 - 1 = 1.
        matchingFirstHalfSums = firstHalfCollections.get(1) = [3,9].
        targetSumForFirstHalf = (22 - 2 * 3) / 2 = (22 - 6) / 2 = 8.
        foundIndex = findClosestSumIndex([3,9], 8) -> 1 (points to 9).
        minOverallDifference = Math.min(2, Math.abs(22 - 2 * (3 + 9))) = Math.min(2, 2) = 2.
        Check predecessor (index 0, value 3):
        minOverallDifference = Math.min(2, Math.abs(22 - 2 * (3 + 3))) = Math.min(2, 10) = 2.

    - secondMask=3 (11): secondHalfCurrentSize=2, secondHalfCurrentSum=nums[2]+nums[3]=10.
        complementarySize = 2 - 2 = 0.
        matchingFirstHalfSums = firstHalfCollections.get(0) = [0].
        targetSumForFirstHalf = (22 - 2 * 10) / 2 = (22 - 20) / 2 = 1.
        foundIndex = findClosestSumIndex([0], 1) -> 0 (points to 0).
        minOverallDifference = Math.min(2, Math.abs(22 - 2 * (10 + 0))) = Math.min(2, 2) = 2.

    Final minOverallDifference = 2.

    * Time Complexity: O(n * 2^n)
    * Space Complexity: O(2^n)
*/
var minimumDifference = function (nums) {
  const halfLength = nums.length / 2;
  let minOverallDifference = Infinity;
  const overallSum = nums.reduce(
    (initialValue, numberValue) => initialValue + numberValue,
    0
  );
  const firstHalfCollections = new Map();

  for (let currentMask = 0; currentMask < 1 << halfLength; currentMask++) {
    let currentCount = 0;
    let currentSum = 0;

    for (let arrayIndex = 0; arrayIndex < halfLength; arrayIndex++) {
      if ((currentMask & (1 << arrayIndex)) !== 0) {
        currentCount++;
        currentSum += nums[arrayIndex];
      }
    }

    if (!firstHalfCollections.has(currentCount)) {
      firstHalfCollections.set(currentCount, []);
    }
    firstHalfCollections.get(currentCount).push(currentSum);
  }

  for (const [keyCount, sumsForCount] of firstHalfCollections) {
    sumsForCount.sort((valueA, valueB) => valueA - valueB);
  }

  const findClosestSumIndex = (collectionOfNumbers, binarySearchTarget) => {
    let leftPointer = 0;
    let rightPointer = collectionOfNumbers.length - 1;

    if (rightPointer < 0) return 0;

    while (leftPointer < rightPointer) {
      const middlePoint = Math.floor((leftPointer + rightPointer) / 2);

      if (collectionOfNumbers[middlePoint] < binarySearchTarget) {
        leftPointer = middlePoint + 1;
      } else {
        rightPointer = middlePoint;
      }
    }
    return leftPointer;
  };

  for (let secondMask = 0; secondMask < 1 << halfLength; secondMask++) {
    let secondHalfCurrentSize = 0;
    let secondHalfCurrentSum = 0;

    for (
      let secondArrayIndex = 0;
      secondArrayIndex < halfLength;
      secondArrayIndex++
    ) {
      if ((secondMask & (1 << secondArrayIndex)) !== 0) {
        secondHalfCurrentSize++;
        secondHalfCurrentSum += nums[halfLength + secondArrayIndex];
      }
    }

    const complementarySize = halfLength - secondHalfCurrentSize;
    const matchingFirstHalfSums = firstHalfCollections.get(complementarySize);

    if (!matchingFirstHalfSums) {
      continue;
    }

    const targetSumForFirstHalf = (overallSum - 2 * secondHalfCurrentSum) / 2;
    const foundIndex = findClosestSumIndex(
      matchingFirstHalfSums,
      targetSumForFirstHalf
    );

    if (foundIndex < matchingFirstHalfSums.length) {
      minOverallDifference = Math.min(
        minOverallDifference,
        Math.abs(
          overallSum -
            2 * (secondHalfCurrentSum + matchingFirstHalfSums[foundIndex])
        )
      );
    }

    if (foundIndex > 0) {
      minOverallDifference = Math.min(
        minOverallDifference,
        Math.abs(
          overallSum -
            2 * (secondHalfCurrentSum + matchingFirstHalfSums[foundIndex - 1])
        )
      );
    }
  }

  return minOverallDifference;
};
