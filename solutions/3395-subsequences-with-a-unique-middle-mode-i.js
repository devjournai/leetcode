/**
 * Subsequences with a Unique Middle Mode I
 * Intuition: For a length-5 subsequence the middle value `a = nums[i]` must be the unique mode. Fix `i` as the middle and count ways to pick 2 left and 2 right so `a` occurs strictly more often than every other value.
 * Approach: 1. Maintain frequency maps left of `i` and right of `i`. 2. Add combinations where `a` appears 5, 4, 3, or 2 times (the unique-mode cases). 3. For frequency 2, subtract invalid patterns where some `b` ties or beats `a` using `calc`.
 * Dry Run: nums = [1,1,1,1,1]. Only [a a] a [a a], C(2,2)*C(2,2)=1 subsequence, unique mode 1.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */

var subsequencesWithMiddleMode = function (nums) {
  const MOD = 1000000007;
  const n = nums.length;
  let answer = 0;
  const leftCounts = new Map();
  const rightCounts = new Map();

  const addCount = (countMap, key, delta) => {
    const nextCount = (countMap.get(key) || 0) + delta;
    if (nextCount === 0) {
      countMap.delete(key);
    } else {
      countMap.set(key, nextCount);
    }
  };

  for (let index = 0; index < 2; index++) {
    addCount(leftCounts, nums[index], 1);
  }
  for (let index = 2; index < n; index++) {
    addCount(rightCounts, nums[index], 1);
  }

  const nC2 = (value) => {
    return ((value * (value - 1)) / 2) % MOD;
  };

  const calcUniqueModeTwo = (modeValue, other1, other2, count1, count2) => {
    let remainingWays = (other1 * nC2(other2)) % MOD;

    for (const [otherValue, countOnSide1] of count1) {
      if (otherValue === modeValue) {
        continue;
      }
      const countOnSide2 = count2.get(otherValue) || 0;
      remainingWays =
        (remainingWays - ((countOnSide1 * nC2(countOnSide2)) % MOD) + MOD) %
        MOD;
      remainingWays =
        (remainingWays -
          ((((countOnSide1 * countOnSide2) % MOD) * (other2 - countOnSide2)) %
            MOD) +
          MOD) %
        MOD;
    }

    for (const [otherValue, countOnSide2] of count2) {
      if (otherValue === modeValue) {
        continue;
      }
      const countOnSide1 = count1.get(otherValue) || 0;
      remainingWays =
        (remainingWays -
          (((other1 - countOnSide1) * nC2(countOnSide2)) % MOD) +
          MOD) %
        MOD;
    }

    return remainingWays;
  };

  for (let middleIndex = 2; middleIndex < n - 2; middleIndex++) {
    const modeValue = nums[middleIndex];
    addCount(rightCounts, modeValue, -1);

    const leftCount = leftCounts.get(modeValue) || 0;
    const rightCount = rightCounts.get(modeValue) || 0;
    const leftOther = middleIndex - leftCount;
    const rightOther = n - 1 - middleIndex - rightCount;

    answer = (answer + nC2(leftCount) * nC2(rightCount)) % MOD;
    answer =
      (answer + ((nC2(leftCount) * rightCount) % MOD) * rightOther) % MOD;
    answer = (answer + ((leftCount * leftOther) % MOD) * nC2(rightCount)) % MOD;
    answer = (answer + nC2(leftCount) * nC2(rightOther)) % MOD;
    answer = (answer + nC2(leftOther) * nC2(rightCount)) % MOD;
    answer =
      (answer +
        ((((leftCount * leftOther) % MOD) * rightCount) % MOD) * rightOther) %
      MOD;
    answer =
      (answer +
        leftCount *
          calcUniqueModeTwo(
            modeValue,
            leftOther,
            rightOther,
            leftCounts,
            rightCounts
          )) %
      MOD;
    answer =
      (answer +
        rightCount *
          calcUniqueModeTwo(
            modeValue,
            rightOther,
            leftOther,
            rightCounts,
            leftCounts
          )) %
      MOD;

    addCount(leftCounts, modeValue, 1);
  }

  return answer % MOD;
};
