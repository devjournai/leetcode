/**
 * Jump Game Viii
 * Intuition: The problem involves finding the minimum cost path with specific jump conditions that depend on intermediate elements. Monotonic stacks are ideal for efficiently finding previous elements that satisfy certain relative value conditions for a range. Two types of jumps (increasing/decreasing) necessitate two distinct monotonic stacks to optimize finding valid previous jump points.
 * Approach: 1. Initialize `minimumPathCosts` array of length `arrayLength` with `Infinity`, setting `minimumPathCosts[0]` to 0 as the starting point has no cost. 2. Create two empty arrays to serve as monotonic stacks: `ascValueStackIndices` (to store indices `j` such that `nums[j]` values are strictly increasing, useful for finding `j` for decreasing jumps to `i`) and `descValueStackIndices` (to store indices `j` such that `nums[j]` values are strictly decreasing, useful for finding `j` for increasing jumps to `i`). 3. Iterate through the `inputNumbers` array using `currentProcessingIndex` from `0` to `arrayLength - 1`. 4. For the `ascValueStackIndices` (which aids in identifying valid "decreasing jumps" `j -> i` where `nums[j] > nums[i]` and all intermediate `nums[k] >= nums[j]`): While the stack is not empty and the `nums` value at its top (`nums[ascValueStackIndices[ascValueStackIndices.length - 1]]`) is greater than `nums[currentProcessingIndex]`, pop the top index (`previousAscStackIndex`). Update `minimumPathCosts[currentProcessingIndex]` with `min(current value, minimumPathCosts[previousAscStackIndex] + jumpCosts[currentProcessingIndex])`. 5. Similarly, for `descValueStackIndices` (which aids in identifying valid "increasing jumps" `j -> i` where `nums[j] <= nums[i]` and all intermediate `nums[k] < nums[j]`): While the stack is not empty and the `nums` value at its top (`nums[descValueStackIndices[descValueStackIndices.length - 1]]`) is less than or equal to `nums[currentProcessingIndex]`, pop the top index (`previousDescStackIndex`). Update `minimumPathCosts[currentProcessingIndex]` with `min(current value, minimumPathCosts[previousDescStackIndex] + jumpCosts[currentProcessingIndex])`. 6. After processing potential jumps to `currentProcessingIndex` from both stacks, push `currentProcessingIndex` onto both `ascValueStackIndices` and `descValueStackIndices` to maintain their respective monotonic properties for future indices. 7. The final result is the value stored in `minimumPathCosts[arrayLength - 1]`.
 * Dry Run:
 * nums = [1, 5, 2, 8], costs = [10, 15, 20, 25]
 * arrayLength = 4
 * minimumPathCosts = [0, Infinity, Infinity, Infinity]
 * ascValueStackIndices = []
 * descValueStackIndices = []
 *
 * currentProcessingIndex = 0 (nums[0]=1, jumpCosts[0]=10)
 *   - ascValueStackIndices: No elements, no pops.
 *   - descValueStackIndices: No elements, no pops.
 *   - ascValueStackIndices.push(0) -> [0]
 *   - descValueStackIndices.push(0) -> [0]
 *   minimumPathCosts = [0, Infinity, Infinity, Infinity]
 *
 * currentProcessingIndex = 1 (nums[1]=5, jumpCosts[1]=15)
 *   - ascValueStackIndices (top is 0, nums[0]=1). Condition `nums[0] > nums[1]` (1 > 5) is false. No pop.
 *   - descValueStackIndices (top is 0, nums[0]=1). Condition `nums[0] <= nums[1]` (1 <= 5) is true.
 *     - previousDescStackIndex = descValueStackIndices.pop() -> 0. descValueStackIndices becomes [].
 *     - minimumPathCosts[1] = min(Infinity, minimumPathCosts[0] + jumpCosts[1]) = min(Infinity, 0 + 15) = 15.
 *   - ascValueStackIndices.push(1) -> [0, 1] (maintains 1 < 5)
 *   - descValueStackIndices.push(1) -> [1] (maintains decreasing, as 0 was popped because 1 <= 5, 5 is the first element)
 *   minimumPathCosts = [0, 15, Infinity, Infinity]
 *
 * currentProcessingIndex = 2 (nums[2]=2, jumpCosts[2]=20)
 *   - ascValueStackIndices (top is 1, nums[1]=5). Condition `nums[1] > nums[2]` (5 > 2) is true.
 *     - previousAscStackIndex = ascValueStackIndices.pop() -> 1. ascValueStackIndices becomes [0].
 *     - minimumPathCosts[2] = min(Infinity, minimumPathCosts[1] + jumpCosts[2]) = min(Infinity, 15 + 20) = 35.
 *   - ascValueStackIndices (top is 0, nums[0]=1). Condition `nums[0] > nums[2]` (1 > 2) is false. No more pops.
 *   - descValueStackIndices (top is 1, nums[1]=5). Condition `nums[1] <= nums[2]` (5 <= 2) is false. No pop.
 *   - ascValueStackIndices.push(2) -> [0, 2] (maintains 1 < 2)
 *   - descValueStackIndices.push(2) -> [1, 2] (maintains 5 > 2)
 *   minimumPathCosts = [0, 15, 35, Infinity]
 *
 * currentProcessingIndex = 3 (nums[3]=8, jumpCosts[3]=25)
 *   - ascValueStackIndices (top is 2, nums[2]=2). Condition `nums[2] > nums[3]` (2 > 8) is false. No pop.
 *   - descValueStackIndices (top is 2, nums[2]=2). Condition `nums[2] <= nums[3]` (2 <= 8) is true.
 *     - previousDescStackIndex = descValueStackIndices.pop() -> 2. descValueStackIndices becomes [1].
 *     - minimumPathCosts[3] = min(Infinity, minimumPathCosts[2] + jumpCosts[3]) = min(Infinity, 35 + 25) = 60.
 *   - descValueStackIndices (top is 1, nums[1]=5). Condition `nums[1] <= nums[3]` (5 <= 8) is true.
 *     - previousDescStackIndex = descValueStackIndices.pop() -> 1. descValueStackIndices becomes [].
 *     - minimumPathCosts[3] = min(60, minimumPathCosts[1] + jumpCosts[3]) = min(60, 15 + 25) = 40.
 *   - ascValueStackIndices.push(3) -> [0, 2, 3] (maintains 1 < 2 < 8)
 *   - descValueStackIndices.push(3) -> [3] (all previous elements popped by 8, as 8 is largest, or because they were smaller relative to 8)
 *   minimumPathCosts = [0, 15, 35, 40]
 *
 * Loop ends.
 * Return minimumPathCosts[3] which is 40.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minCost = function (nums, costs) {
  const arrayLength = nums.length;
  const minimumPathCosts = new Array(arrayLength).fill(Infinity);
  minimumPathCosts[0] = 0;

  const ascValueStackIndices = [];
  const descValueStackIndices = [];

  for (
    let currentProcessingIndex = 0;
    currentProcessingIndex < arrayLength;
    currentProcessingIndex++
  ) {
    while (
      ascValueStackIndices.length > 0 &&
      nums[ascValueStackIndices[ascValueStackIndices.length - 1]] >
        nums[currentProcessingIndex]
    ) {
      let previousAscStackIndex = ascValueStackIndices.pop();
      minimumPathCosts[currentProcessingIndex] = Math.min(
        minimumPathCosts[currentProcessingIndex],
        minimumPathCosts[previousAscStackIndex] + costs[currentProcessingIndex]
      );
    }

    while (
      descValueStackIndices.length > 0 &&
      nums[descValueStackIndices[descValueStackIndices.length - 1]] <=
        nums[currentProcessingIndex]
    ) {
      let previousDescStackIndex = descValueStackIndices.pop();
      minimumPathCosts[currentProcessingIndex] = Math.min(
        minimumPathCosts[currentProcessingIndex],
        minimumPathCosts[previousDescStackIndex] + costs[currentProcessingIndex]
      );
    }

    ascValueStackIndices.push(currentProcessingIndex);
    descValueStackIndices.push(currentProcessingIndex);
  }

  return minimumPathCosts[arrayLength - 1];
};
