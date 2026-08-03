/**
 * Minimum Array Length After Pair Removals
 *
 * Intuition:
 * We can remove a pair only when:
 *
 *      nums[i] < nums[j]
 *
 * Since the array is already sorted, we always want to match a smaller
 * element from the left half with a larger element from the right half.
 *
 * A greedy two-pointer strategy produces the maximum number of removable
 * pairs.
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * Let:
 *
 *      left  = first half of the array
 *      right = second half of the array
 *
 * We try to pair every left element with the smallest possible valid right
 * element.
 *
 * If:
 *
 *      nums[left] < nums[right]
 *
 * we remove this pair.
 *
 * Otherwise,
 *
 *      right++
 *
 * because this right element cannot pair with the current left element.
 *
 * Maximizing removable pairs minimizes the remaining array length.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize:
 *
 *      left = 0
 *      right = ceil(n / 2)
 *
 * 2. While both pointers are inside the array:
 *
 *      If nums[left] < nums[right]:
 *
 *          pair found
 *          left++
 *          right++
 *          pairs++
 *
 *      Else:
 *
 *          right++
 *
 * 3. Remaining length:
 *
 *      n - 2 * pairs
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2,3,4,4,4]
 *
 * left = 0
 * right = 3
 *
 * Pair:
 *
 *      2 < 4
 *
 * pairs = 1
 *
 * left = 1
 * right = 4
 *
 * Pair:
 *
 *      3 < 4
 *
 * pairs = 2
 *
 * Remaining:
 *
 *      5 - 4 = 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var minLengthAfterRemovals = function (nums) {
  const n = nums.length;

  let left = 0;
  let right = Math.ceil(n / 2);

  let pairs = 0;

  while (left < Math.floor(n / 2) && right < n) {
    if (nums[left] < nums[right]) {
      pairs++;
      left++;
      right++;
    } else {
      right++;
    }
  }

  return n - 2 * pairs;
};
