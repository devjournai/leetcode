/**
 * Predict the Winner
 * Intuition: This is a game theory problem involving two players making optimal choices. Such problems can often be solved using dynamic programming or a minimax approach, as players aim to maximize their outcome while anticipating the opponent's moves. We can define a state to represent the maximum score difference the current player can achieve from a given subarray.
 * Approach: 1. We define a 1D DP array, `scoreDifferences`, where `scoreDifferences[j]` will store the maximum score difference the current player can achieve from the subarray `nums[leftIndex...j]`. This is a space-optimized approach based on a 2D DP table `dp[leftIndex][rightIndex]`.
 * 2. We iterate `leftIndex` from `nums.length - 1` down to `0`. This ensures that when we calculate `scoreDifferences[rightIndex]` for a given `leftIndex`, the necessary results for smaller subarrays (i.e., `dp[leftIndex + 1][rightIndex]` and `dp[leftIndex][rightIndex - 1]`) are already computed and available in the `scoreDifferences` array.
 * 3. For the base case where `leftIndex` equals `rightIndex` (a subarray with a single element), the current player simply takes that number, so `scoreDifferences[leftIndex]` is initialized with `nums[leftIndex]`.
 * 4. For each `leftIndex`, we iterate `rightIndex` from `leftIndex + 1` up to `nums.length - 1`.
 * 5. In each turn, the current player has two optimal choices:
 *    a. Take `nums[leftIndex]`: The player adds `nums[leftIndex]` to their score. The opponent then plays on the subarray `nums[leftIndex + 1...rightIndex]`. The opponent will play optimally to maximize their own score, which means minimizing the current player's score difference. Thus, this choice contributes `nums[leftIndex] - scoreDifferences[rightIndex]` (where `scoreDifferences[rightIndex]` effectively holds `dp[leftIndex + 1][rightIndex]` from the previous outer loop iteration).
 *    b. Take `nums[rightIndex]`: The player adds `nums[rightIndex]` to their score. The opponent then plays on `nums[leftIndex...rightIndex - 1]`. This choice contributes `nums[rightIndex] - scoreDifferences[rightIndex - 1]` (where `scoreDifferences[rightIndex - 1]` effectively holds `dp[leftIndex][rightIndex - 1]` computed in the current outer loop iteration).
 * 6. The current player chooses the option that maximizes their score difference. So, `scoreDifferences[rightIndex]` is updated to `Math.max(nums[leftIndex] - scoreDifferences[rightIndex], nums[rightIndex] - scoreDifferences[rightIndex - 1])`.
 * 7. After the loops complete, `scoreDifferences[nums.length - 1]` will hold the maximum score difference Player 1 can achieve for the entire `nums` array (`nums[0...nums.length - 1]`).
 * 8. Return `true` if this final score difference is greater than or equal to `0`, indicating Player 1 can win or tie; otherwise, return `false`.
 * Dry Run: nums = [1, 5]
 * lengthOfNums = 2
 * scoreDifferences = [0, 0] (initialized)
 *
 * leftIndex = 1 (nums.length - 1):
 *   scoreDifferences[1] = nums[1] (which is 5)
 *   scoreDifferences = [0, 5]
 *   Inner loop rightIndex from 2 to 1 (does not run)
 *
 * leftIndex = 0 (nums.length - 2):
 *   scoreDifferences[0] = nums[0] (which is 1)
 *   scoreDifferences = [1, 5]
 *   Inner loop rightIndex from 1 to 1:
 *     rightIndex = 1:
 *       // current scoreDifferences[1] is 5 (representing dp[1][1])
 *       // current scoreDifferences[0] is 1 (representing dp[0][0])
 *       scoreDifferences[1] = Math.max(nums[0] - scoreDifferences[1], nums[1] - scoreDifferences[0])
 *       scoreDifferences[1] = Math.max(1 - 5, 5 - 1)
 *       scoreDifferences[1] = Math.max(-4, 4)
 *       scoreDifferences[1] = 4
 *       scoreDifferences = [1, 4]
 *
 * End of loops.
 * Return scoreDifferences[lengthOfNums - 1] >= 0
 * Return scoreDifferences[1] >= 0
 * Return 4 >= 0, which is true.
 * Time Complexity: O(N^2), where N is the length of the `nums` array. This is due to the nested loops, each iterating up to N times.
 * Space Complexity: O(N), where N is the length of the `nums` array. This is for the `scoreDifferences` array.
 */
var predictTheWinner = function (nums) {
  const lengthOfNums = nums.length;
  const scoreDifferences = new Array(lengthOfNums).fill(0);

  for (let leftIndex = lengthOfNums - 1; leftIndex >= 0; leftIndex--) {
    scoreDifferences[leftIndex] = nums[leftIndex];
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < lengthOfNums;
      rightIndex++
    ) {
      const takeLeft = nums[leftIndex] - scoreDifferences[rightIndex];
      const takeRight = nums[rightIndex] - scoreDifferences[rightIndex - 1];
      scoreDifferences[rightIndex] = Math.max(takeLeft, takeRight);
    }
  }

  return scoreDifferences[lengthOfNums - 1] >= 0;
};
