/**
 * Find Consecutive Integers from a Data Stream
 *
 * Intuition:
 * We only care whether the last `k` numbers are equal to the given `value`.
 * Instead of storing the last `k` elements, maintain the length of the current
 * consecutive streak of `value`.
 *
 * - If the incoming number equals `value`, increase the streak.
 * - Otherwise, reset the streak to 0.
 * - Whenever the streak becomes at least `k`, the last `k` numbers are all equal
 *   to `value`.
 *
 * Approach:
 * 1. Store:
 *      - target value
 *      - required length k
 *      - current consecutive count
 * 2. For every call to `consec(num)`:
 *      a. If `num == value`,
 *            increment the consecutive count.
 *      b. Otherwise,
 *            reset the count to 0.
 *      c. Return whether the count is at least `k`.
 *
 * Dry Run:
 *
 * Input:
 * value = 4
 * k = 3
 *
 * Stream:
 *
 * consec(4)
 * count = 1
 * 1 < 3
 * Return false
 *
 * -------------------
 *
 * consec(4)
 * count = 2
 * 2 < 3
 * Return false
 *
 * -------------------
 *
 * consec(4)
 * count = 3
 * 3 >= 3
 * Return true
 *
 * -------------------
 *
 * consec(3)
 * count = 0
 * Return false
 *
 * Outputs:
 * [false, false, true, false]
 *
 * Time Complexity: O(1) per operation
 * Space Complexity: O(1)
 */

var DataStream = function (value, k) {
  this.value = value;
  this.k = k;
  this.count = 0;
};

DataStream.prototype.consec = function (num) {
  if (num === this.value) {
    this.count++;
  } else {
    this.count = 0;
  }

  return this.count >= this.k;
};
