/**
 * Maximum Total Subarray Value II
 * Intuition: This problem asks for the sum of the `k` largest values of `max(subarray) - min(subarray)`. This is a classic "sum of top K" problem, which can often be solved efficiently using a binary search approach on the value space.
 * Approach:
 *   1. Define a `calculateMetrics(threshold)` function: This function takes an integer `threshold` and returns an array `[count, sumActualValues]`.
 *      - `count`: The number of distinct non-empty subarrays `nums[l..r]` such that `max(nums[l..r]) - min(nums[l..r]) >= threshold`.
 *      - `sumActualValues`: The sum of `(max(nums[l..r]) - min(nums[l..r]))` for all such counted subarrays.
 *      This function is crucial and must run in `O(N)` time to meet the overall complexity requirements.
 *      The `O(N)` implementation uses a two-pointer sliding window (`j` for left, `i` for right) and two monotonic deques (`minDeque`, `maxDeque`).
 *      For each `i` (right pointer), we add `nums[i]` to the deques. Then, we advance `j` (left pointer) as long as the condition `max(nums[j..i]) - min(nums[j..i]) >= threshold` is met.
 *      The key insight for calculating the sum is that if the window `[j, i]` satisfies the condition, then for all subarrays `[p, i]` where `p` is from `j` to `min(maxDeque[0], minDeque[0])`, the `max` and `min` elements (and thus the value `max-min`) remain the same as for `[j, i]`. These subarrays contribute `(min(maxDeque[0], minDeque[0]) - j + 1)` to the count and sum. After accounting for these, `j` is advanced past the 'critical' index (`maxDeque[0]` or `minDeque[0]`) to continue finding new valid windows.
 *   2. Binary Search for `targetThreshold`: We perform a binary search for `targetThreshold` in the range `[0, 10^9]` (maximum possible value for `max-min`). The `targetThreshold` is defined such that there are at least `k` subarrays with value `>= targetThreshold`, but fewer than `k` subarrays with value `>= targetThreshold + 1`. This `targetThreshold` effectively represents the `k`-th largest value.
 *   3. Calculate Final Total Value:
 *     Once `targetThreshold` is found:
 *      - We get `[countGreater, sumGreater]` by calling `calculateMetrics(targetThreshold + 1)`. `countGreater` is the number of subarrays with value strictly greater than `targetThreshold`, and `sumGreater` is the sum of their actual `max-min` values.
 *      - The remaining `k - countGreater` subarrays must have a value exactly equal to `targetThreshold`.
 *      - The total maximum value is `sumGreater + (k - countGreater) * targetThreshold`.
 * Time Complexity: O(N * log(MAX_VAL))
 * Space Complexity: O(N)
 */
var maxTotalValue = function (nums, k) {
  const n = nums.length;
  const LOG = Math.floor(Math.log2(n)) + 1;

  const max_st = Array.from({ length: n }, () => new Int32Array(LOG));
  const min_st = Array.from({ length: n }, () => new Int32Array(LOG));

  for (let i = 0; i < n; i++) {
    max_st[i][0] = nums[i];
    min_st[i][0] = nums[i];
  }

  for (let j = 1; j < LOG; j++) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      max_st[i][j] = Math.max(
        max_st[i][j - 1],
        max_st[i + (1 << (j - 1))][j - 1],
      );
      min_st[i][j] = Math.min(
        min_st[i][j - 1],
        min_st[i + (1 << (j - 1))][j - 1],
      );
    }
  }

  function getVal(l, r) {
    if (l > r) return 0;
    const j = Math.floor(Math.log2(r - l + 1));
    const mx = Math.max(max_st[l][j], max_st[r - (1 << j) + 1][j]);
    const mn = Math.min(min_st[l][j], min_st[r - (1 << j) + 1][j]);
    return mx - mn;
  }

  class MaxHeap {
    constructor() {
      this.data = [];
    }
    push(val, l, r) {
      this.data.push({ val, l, r });
      this.up(this.data.length - 1);
    }
    pop() {
      if (this.data.length === 0) return null;
      const top = this.data[0];
      const bottom = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bottom;
        this.down(0);
      }
      return top;
    }
    up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.data[i].val > this.data[p].val) {
          const temp = this.data[i];
          this.data[i] = this.data[p];
          this.data[p] = temp;
          i = p;
        } else {
          break;
        }
      }
    }
    down(i) {
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let largest = i;
        if (this.data[left].val > this.data[largest].val) largest = left;
        if (right < len && this.data[right].val > this.data[largest].val)
          largest = right;
        if (largest !== i) {
          const temp = this.data[i];
          this.data[i] = this.data[largest];
          this.data[largest] = temp;
          i = largest;
        } else {
          break;
        }
      }
    }
  }

  const heap = new MaxHeap();

  heap.push(getVal(0, n - 1), 0, n - 1);

  let totalValue = 0;

  for (let i = 0; i < k; i++) {
    const top = heap.pop();
    if (!top) break;

    totalValue += top.val;
    const { l, r } = top;

    if (l + 1 <= r) {
      heap.push(getVal(l + 1, r), l + 1, r);
    }

    if (l === 0 && r - 1 >= l) {
      heap.push(getVal(l, r - 1), l, r - 1);
    }
  }

  return totalValue;
};
