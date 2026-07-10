/**
 * Sliding Subarray Beauty
 *
 * Intuition:
 * Every number lies in the small range:
 *
 *      [-50, 50]
 *
 * Instead of maintaining a balanced tree or sorting every window,
 * maintain the frequency of each value.
 *
 * For every sliding window, count the negative numbers from
 * -50 to -1 until reaching the x-th negative integer.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 * 1. Create a frequency array of size 101.
 * Index: value + 50
 * 2. Insert the first k elements into the frequency array.
 * 3. For every window:
 *      a. Find the x-th negative number.
 *
 *          Traverse:
 *
 *              -50 → -1
 *
 *          Accumulate frequencies.
 *
 *          Once the count reaches x,
 *          that value is the beauty.
 *
 *          If fewer than x negatives exist,
 *          beauty = 0.
 *
 *      b. Remove the left element.
 *
 *      c. Add the next right element.
 *
 * 4. Return the result.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [1,-1,-3,-2,3]
 *
 * k = 3
 *
 * x = 2
 *
 * ----------------
 * Window:
 *
 * [1,-1,-3]
 *
 * Negatives:
 *
 * -3
 * -1
 *
 * 2nd smallest:
 *
 * -1
 *
 * ----------------
 * Window:
 *
 * [-1,-3,-2]
 *
 * Negatives:
 *
 * -3
 * -2
 * -1
 *
 * 2nd smallest:
 *
 * -2
 *
 * ----------------
 * Window:
 *
 * [-3,-2,3]
 *
 * Negatives:
 *
 * -3
 * -2
 *
 * 2nd smallest:
 *
 * -2
 *
 * Answer:
 *
 * [-1,-2,-2]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × 50)
 * Space Complexity:  O(101)
 */

var getSubarrayBeauty = function (nums, k, x) {
  const frequency = new Array(101).fill(0);

  const answer = [];

  for (let i = 0; i < k; i++) {
    frequency[nums[i] + 50]++;
  }

  const getBeauty = () => {
    let count = 0;

    for (let value = -50; value < 0; value++) {
      count += frequency[value + 50];

      if (count >= x) {
        return value;
      }
    }

    return 0;
  };

  answer.push(getBeauty());

  for (let right = k; right < nums.length; right++) {
    frequency[nums[right - k] + 50]--;

    frequency[nums[right] + 50]++;

    answer.push(getBeauty());
  }

  return answer;
};
