/**
 * Trionic Array II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxSumTrionic = function (nums) {
  let n = nums.length;
  let inc1 = -Infinity;
  let dec = -Infinity;
  let inc2 = -Infinity;

  let maxSum = -Infinity;

  for (let i = 1; i < n; i++) {
    let curr = nums[i];
    let prev = nums[i - 1];

    let nextInc1 = -Infinity;
    let nextDec = -Infinity;
    let nextInc2 = -Infinity;

    if (curr > prev) {
      nextInc1 = Math.max(prev + curr, inc1 + curr);
      nextInc2 = Math.max(dec + curr, inc2 + curr);
    } else if (curr < prev) {
      nextDec = Math.max(inc1 + curr, dec + curr);
    }
    maxSum = Math.max(maxSum, nextInc2);
    inc1 = nextInc1;
    dec = nextDec;
    inc2 = nextInc2;
  }

  return maxSum;
};
