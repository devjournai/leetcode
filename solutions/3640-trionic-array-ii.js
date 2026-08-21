/**
 * Trionic Array II
 * Intuition: Track the best contiguous sum ending in each phase of a trionic shape: first ascent (inc1), descent (dec), second ascent (inc2). Adjacent equals cannot continue any phase.
 * Approach: 1. For each index i, if nums[i] > nums[i-1] start/extend inc1 from prev or prior inc1, and extend inc2 from dec or prior inc2. 2. If nums[i] < nums[i-1] extend dec from inc1 or prior dec. 3. Record max of nextInc2. Strict inequality only.
 * Dry Run: nums = [1, 4, 2, 5]. At 4: inc1=5. At 2: dec=7. At 5: inc2=12. Answer 12.
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
