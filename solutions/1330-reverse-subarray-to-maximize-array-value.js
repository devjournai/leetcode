/**
 * Reverse Subarray To Maximize Array Value
 * Intuition: The score is sum of adjacent |diffs|. One reverse changes at most two endpoints. Track interior pair extrema and prefix/suffix reverse gains.
 * Approach: 1. Sum original adjacent diffs; track min of pair-max and max of pair-min. 2. Candidate interior gain is 2*(maxMin-minMax). 3. For each adjacent pair, consider reversing onto nums[0] or nums[n-1]. 4. Add the best nonnegative gain.
 * Dry Run: nums = [2,3,1,5,4]. Original value 6; best reverse yields 10.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxValueAfterReverse = function (nums) {
  let initialValue = 0;
  let maximumPotentialGain = 0;
  let minimumAbsolutePairMax = Infinity;
  let maximumAbsolutePairMin = -Infinity;
  const arrayLength = nums.length;

  for (let currentIdx = 0; currentIdx < arrayLength - 1; currentIdx++) {
    initialValue += Math.abs(nums[currentIdx] - nums[currentIdx + 1]);
    minimumAbsolutePairMax = Math.min(
      minimumAbsolutePairMax,
      Math.max(nums[currentIdx], nums[currentIdx + 1])
    );
    maximumAbsolutePairMin = Math.max(
      maximumAbsolutePairMin,
      Math.min(nums[currentIdx], nums[currentIdx + 1])
    );
  }

  maximumPotentialGain = Math.max(
    0,
    2 * (maximumAbsolutePairMin - minimumAbsolutePairMax)
  );

  for (let outerIdx = 0; outerIdx < arrayLength - 1; outerIdx++) {
    const currentValue = nums[outerIdx];
    const nextValue = nums[outerIdx + 1];
    const firstElement = nums[0];
    const lastElement = nums[arrayLength - 1];

    const gainFromStartEdge =
      outerIdx > 0
        ? Math.abs(firstElement - nextValue) -
          Math.abs(currentValue - nextValue)
        : 0;
    const gainFromEndEdge =
      outerIdx < arrayLength - 2
        ? Math.abs(lastElement - currentValue) -
          Math.abs(currentValue - nextValue)
        : 0;

    maximumPotentialGain = Math.max(
      maximumPotentialGain,
      gainFromStartEdge,
      gainFromEndEdge
    );
  }

  return initialValue + maximumPotentialGain;
};
