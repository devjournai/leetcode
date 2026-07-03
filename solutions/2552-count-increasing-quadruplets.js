/**
 * Count Increasing Quadruplets
 *
 * Intuition:
 * We need to count quadruplets (i, j, k, l) satisfying:
 *
 *      i < j < k < l
 *      nums[i] < nums[k] < nums[j] < nums[l]
 *
 * Instead of checking all four indices (O(N⁴)), fix the middle pair (j, k).
 *
 * For every pair (j, k) where nums[j] > nums[k]:
 *
 * • Count how many indices i < j satisfy:
 *      nums[i] < nums[k]
 *
 * • Count how many indices l > k satisfy:
 *      nums[l] > nums[j]
 *
 * Every valid left choice can pair with every valid right choice.
 *
 * Therefore,
 *
 *      contribution =
 *      leftCount × rightCount
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let n be the size of nums.
 *
 * 2. Maintain:
 *
 *      smallerBefore[x]
 *
 *      = number of elements before current j
 *        whose value is smaller than x.
 *
 * 3. Iterate j from left to right.
 *
 * 4. For every k > j:
 *
 *      If
 *          nums[j] > nums[k]
 *
 *      then
 *
 *          left =
 *              number of i < j
 *              where nums[i] < nums[k]
 *
 *          right =
 *              number of l > k
 *              where nums[l] > nums[j]
 *
 *          answer += left × right
 *
 * 5. Return the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 * [1,3,2,4,5]
 *
 * j = 1
 * nums[j]=3
 *
 * k = 2
 * nums[k]=2
 *
 * Since
 *
 * 3 > 2
 *
 * Left:
 *
 * i < 1
 *
 * nums[i] < 2
 *
 * {1}
 *
 * left = 1
 *
 * Right:
 *
 * l > 2
 *
 * nums[l] > 3
 *
 * {4,5}
 *
 * right = 2
 *
 * Contribution:
 *
 * 1 × 2 = 2
 *
 * Answer = 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(N)
 */

var countQuadruplets = function (nums) {
  const n = nums.length;

  let answer = 0;

  const smallerBefore = new Array(n).fill(0);

  for (let j = 1; j < n - 2; j++) {
    for (let value = nums[j - 1]; value < n; value++) {
      smallerBefore[value]++;
    }

    let greaterAfter = 0;

    for (let k = n - 1; k > j; k--) {
      if (nums[k] > nums[j]) {
        greaterAfter++;
      } else {
        answer += smallerBefore[nums[k] - 1] * greaterAfter;
      }
    }
  }

  return answer;
};
