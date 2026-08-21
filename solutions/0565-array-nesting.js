/**
 * Array Nesting
 * Intuition: `nums` is a permutation of 0..n-1, so the graph is disjoint cycles. The longest nest is the longest cycle; visit each index at most once by marking `visitedStatus`.
 * Approach: 1. For each unvisited `initialIndex`, walk `i = nums[i]` marking visited and counting length until a visited node. 2. Update `longestPathFound`. 3. Return it.
 * Dry Run: nums = [5,4,0,3,1,6,2].
 *   - From 0: 0→5→6→2→0 cycle length 4. Other starts are shorter or already visited. Return 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var arrayNesting = function (nums) {
  const totalElements = nums.length;
  const visitedStatus = new Array(totalElements).fill(false);
  let longestPathFound = 0;

  for (let initialIndex = 0; initialIndex < totalElements; initialIndex++) {
    if (visitedStatus[initialIndex]) {
      continue;
    }

    let currentPathLength = 0;
    let traversalIndex = initialIndex;

    while (!visitedStatus[traversalIndex]) {
      visitedStatus[traversalIndex] = true;
      currentPathLength++;
      traversalIndex = nums[traversalIndex];
    }
    longestPathFound = Math.max(longestPathFound, currentPathLength);
  }

  return longestPathFound;
};
