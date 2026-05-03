/**
 * Sum Of All Subset Xor Totals
 * Time Complexity: O(2^N)
 * Space Complexity: O(N)
 */
var subsetXORSum = function (nums) {
  let accumulatedTotalXorSum = 0;

  const backtrackAndCalculate = (currentPosition, currentXorResult) => {
    if (currentPosition === nums.length) {
      accumulatedTotalXorSum += currentXorResult;
      return;
    }

    backtrackAndCalculate(currentPosition + 1, currentXorResult);

    const xorWithCurrentElement = currentXorResult ^ nums[currentPosition];
    backtrackAndCalculate(currentPosition + 1, xorWithCurrentElement);
  };

  backtrackAndCalculate(0, 0);

  return accumulatedTotalXorSum;
};
