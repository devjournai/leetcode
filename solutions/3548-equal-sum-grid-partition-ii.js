/**
 * Equal Sum Grid Partition II
 * Time Complexity: O(m * n + MAX_VAL)
 * Space Complexity: O(m * n + MAX_VAL)
 */
var canPartitionGrid = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const prefixSum = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      prefixSum[r + 1][c + 1] =
        grid[r][c] +
        prefixSum[r][c + 1] +
        prefixSum[r + 1][c] -
        prefixSum[r][c];
    }
  }

  const getRectSum = (r1, c1, r2, c2) => {
    if (r1 > r2 || c1 > c2) return 0;
    return (
      prefixSum[r2 + 1][c2 + 1] -
      prefixSum[r1][c2 + 1] -
      prefixSum[r2 + 1][c1] +
      prefixSum[r1][c1]
    );
  };

  const MAX_VAL = 100000;
  const minR = Array(MAX_VAL + 1).fill(m);
  const maxR = Array(MAX_VAL + 1).fill(-1);
  const minC = Array(MAX_VAL + 1).fill(n);
  const maxC = Array(MAX_VAL + 1).fill(-1);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const val = grid[r][c];
      minR[val] = Math.min(minR[val], r);
      maxR[val] = Math.max(maxR[val], r);
      minC[val] = Math.min(minC[val], c);
      maxC[val] = Math.max(maxC[val], c);
    }
  }

  const valueExistsInRectangle = (val, r1, c1, r2, c2) => {
    if (val < 1 || val > MAX_VAL || minR[val] === m) {
      return false;
    }
    return (
      maxR[val] >= r1 && minR[val] <= r2 && maxC[val] >= c1 && minC[val] <= c2
    );
  };

  const canDiscountFromSection = (targetValue, Rs, Cs, Re, Ce) => {
    const H = Re - Rs + 1;
    const W = Ce - Cs + 1;

    if (H === 1 && W === 1) {
      return false;
    }

    if (H > 1 && W > 1) {
      return valueExistsInRectangle(targetValue, Rs, Cs, Re, Ce);
    } else if (H === 1) {
      return grid[Rs][Cs] === targetValue || grid[Rs][Ce] === targetValue;
    } else {
      return grid[Rs][Cs] === targetValue || grid[Re][Cs] === targetValue;
    }
  };

  for (let k = 0; k < m - 1; k++) {
    const r1 = 0,
      c1 = 0,
      r2 = k,
      c2 = n - 1;
    const r3 = k + 1,
      c3 = 0,
      r4 = m - 1,
      c4 = n - 1;

    const sum1 = getRectSum(r1, c1, r2, c2);
    const sum2 = getRectSum(r3, c3, r4, c4);

    if (sum1 === sum2) {
      return true;
    }

    const diff = sum1 - sum2;
    const targetValue = Math.abs(diff);

    if (targetValue > 0) {
      if (diff > 0) {
        if (canDiscountFromSection(targetValue, r1, c1, r2, c2)) {
          return true;
        }
      } else {
        if (canDiscountFromSection(targetValue, r3, c3, r4, c4)) {
          return true;
        }
      }
    }
  }

  for (let k = 0; k < n - 1; k++) {
    const r1 = 0,
      c1 = 0,
      r2 = m - 1,
      c2 = k;
    const r3 = 0,
      c3 = k + 1,
      r4 = m - 1,
      c4 = n - 1;

    const sum1 = getRectSum(r1, c1, r2, c2);
    const sum2 = getRectSum(r3, c3, r4, c4);

    if (sum1 === sum2) {
      return true;
    }

    const diff = sum1 - sum2;
    const targetValue = Math.abs(diff);

    if (targetValue > 0) {
      if (diff > 0) {
        if (canDiscountFromSection(targetValue, r1, c1, r2, c2)) {
          return true;
        }
      } else {
        if (canDiscountFromSection(targetValue, r3, c3, r4, c4)) {
          return true;
        }
      }
    }
  }

  return false;
};
