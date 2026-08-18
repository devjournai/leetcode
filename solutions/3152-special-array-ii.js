/**
 * Special Array II
 * Intuition: A subarray is special iff every adjacent pair has opposite parity. Split the array into groups that break at equal-parity neighbors; a query [from, to] is special iff from and to share a group id.
 * Approach: 1. Build parityIds where the id increases whenever nums[i] has the same parity as nums[i - 1]. 2. For each query, push whether parityIds[from] equals parityIds[to].
 * Dry Run: nums = [4, 3, 1, 6], queries = [[0, 2], [2, 3]]
 * - parityIds: 0 (4), 0 (3), 1 (1 breaks with 3), 1 (6)
 * - [0, 2]: ids 0 vs 1 -> false
 * - [2, 3]: ids 1 vs 1 -> true
 * Time Complexity: O(n + q)
 * Space Complexity: O(n + q)
 */
var isArraySpecial = function (nums, queries) {
  const parityIds = new Array(nums.length);
  let id = 0;
  parityIds[0] = id;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] % 2 === nums[i - 1] % 2) {
      id++;
    }
    parityIds[i] = id;
  }

  return queries.map(([from, to]) => parityIds[from] === parityIds[to]);
};
