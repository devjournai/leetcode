/**
 * Minimize the Maximum Adjacent Element Difference
 * Intuition: Existing adjacent positives fix a lower bound on the answer. All `-1`s should be replaced by at most two values `x, y` near the min/max numbers that border a missing cell. Binary search the max adjacent gap `m` and try `x = minBorder + m`, `y = maxBorder - m`.
 * Approach: 1. Scan pairs: track `maxPositiveGap` between two known values, and min/max of values that touch a `-1`. 2. Binary search `m` in `[maxPositiveGap, ceil((mx-mn)/2)]`. 3. For each `m`, fill gaps with `{mn+m, mx-m}`: single `-1` uses one of them; longer gaps may switch once; leading/trailing gaps use one value. 4. Return the smallest feasible `m`.
 * Dry Run: nums = [1, -1, 5]. Borders 1 and 5, maxPositiveGap=0, search m. m=2 gives x=3,y=3 → [1,3,5] max adj 2. Answer 2.
 * Time Complexity: O(N log MAX)
 * Space Complexity: O(1)
 */
var minDifference = function (nums) {
  let maxPositiveGap = 0;
  let minBorder = 1000000000;
  let maxBorder = 0;

  for (let index = 1; index < nums.length; index++) {
    const previousValue = nums[index - 1];
    const currentValue = nums[index];
    if ((previousValue === -1) !== (currentValue === -1)) {
      const positiveValue = Math.max(previousValue, currentValue);
      minBorder = Math.min(minBorder, positiveValue);
      maxBorder = Math.max(maxBorder, positiveValue);
    } else {
      maxPositiveGap = Math.max(
        maxPositiveGap,
        Math.abs(previousValue - currentValue)
      );
    }
  }

  let low = maxPositiveGap;
  let high = Math.floor((maxBorder - minBorder + 1) / 2);

  const checkSingleGap = (leftValue, rightValue, maxGap, fillX, fillY) => {
    const gapWithX = Math.max(
      Math.abs(leftValue - fillX),
      Math.abs(rightValue - fillX)
    );
    const gapWithY = Math.max(
      Math.abs(leftValue - fillY),
      Math.abs(rightValue - fillY)
    );
    return Math.min(gapWithX, gapWithY) <= maxGap;
  };

  const checkMultipleGaps = (leftValue, rightValue, maxGap, fillX, fillY) => {
    const ax = Math.abs(leftValue - fillX);
    const ay = Math.abs(leftValue - fillY);
    const bx = Math.abs(rightValue - fillX);
    const by = Math.abs(rightValue - fillY);
    const xy = Math.abs(fillX - fillY);
    const gapAllX = Math.max(ax, bx);
    const gapAllY = Math.max(ay, by);
    const gapXToY = Math.max(ax, xy, by);
    const gapYToX = Math.max(ay, xy, bx);
    return Math.min(gapAllX, gapAllY, gapXToY, gapYToX) <= maxGap;
  };

  const checkBoundaryGaps = (borderValue, maxGap, fillX, fillY) => {
    return (
      Math.min(Math.abs(borderValue - fillX), Math.abs(borderValue - fillY)) <=
      maxGap
    );
  };

  const findFirstNumber = (startIndex, step) => {
    let cursor = startIndex;
    while (cursor >= 0 && cursor < nums.length && nums[cursor] === -1) {
      cursor += step;
    }
    return cursor >= 0 && cursor < nums.length ? nums[cursor] : -1;
  };

  const canAchieve = (maxGap, fillX, fillY) => {
    let gapLength = 0;
    let previousNumber = 0;

    for (const value of nums) {
      if (value === -1) {
        gapLength++;
        continue;
      }
      if (previousNumber > 0 && gapLength > 0) {
        if (
          gapLength === 1 &&
          !checkSingleGap(previousNumber, value, maxGap, fillX, fillY)
        ) {
          return false;
        }
        if (
          gapLength > 1 &&
          !checkMultipleGaps(previousNumber, value, maxGap, fillX, fillY)
        ) {
          return false;
        }
      }
      previousNumber = value;
      gapLength = 0;
    }

    if (nums[0] === -1) {
      const firstPositive = findFirstNumber(0, 1);
      if (
        firstPositive !== -1 &&
        !checkBoundaryGaps(firstPositive, maxGap, fillX, fillY)
      ) {
        return false;
      }
    }

    if (nums[nums.length - 1] === -1) {
      const lastPositive = findFirstNumber(nums.length - 1, -1);
      if (
        lastPositive !== -1 &&
        !checkBoundaryGaps(lastPositive, maxGap, fillX, fillY)
      ) {
        return false;
      }
    }

    return true;
  };

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (canAchieve(mid, minBorder + mid, maxBorder - mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
};
