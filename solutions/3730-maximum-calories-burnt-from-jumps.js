/**
 * Maximum Calories Burnt from Jumps
 * Intuition: According to the problem statement, the order of jumps affects the total calories burned. To maximize calorie consumption, we can use a greedy strategy by prioritizing jumps with the largest height differences.
 * Approach: Therefore, we can first sort the block heights, then start jumping from the highest block, then to the lowest block, and so on, until all blocks have been jumped on. The specific steps are as follows: 1. Sort the array \text{heights}. 1. Initialize the variable \text{pre} = 0 to represent the height of the previous block, and \text{ans} = 0 to represent the total calories burned. 1. Use two pointers: the left pointer \text{l} points to the beginning of the array, and the right pointer \text{r} points to the end of the array. 1. While \text{l} < \text{r}, do the following: 1. Calculate the calories burned from the previous block to the block pointed to by the right pointer and add it to \text{ans}. 1. Calculate the calories burned from the block pointed to by the right pointer to the block pointed to by the left pointer and add it to \text{ans}. 1. Update \text{pre} to the height of the block pointed to by the left pointer. 1. Move the left pointer one step to the right and the right pointer one step to the left. 1. Finally, calculate the calories burned from the previous block to the middle block and add it to \text{ans}. The time complexity is O(n \log n) and the space complexity is O(\log n), where n is the length of the array.
 * Dry Run: Input heights = [1,7,9]. Output 181.
 * Time Complexity: O(n \log n)
 * Space Complexity: O(\log n)
 */
var maxCaloriesBurnt = function (heights) {
  heights.sort((a, b) => a - b);
  let ans = 0;
  let pre = 0;
  let [l, r] = [0, heights.length - 1];
  while (l < r) {
    ans += (heights[r] - pre) ** 2;
    ans += (heights[l] - heights[r]) ** 2;
    pre = heights[l];
    l++;
    r--;
  }
  ans += (heights[r] - pre) ** 2;
  return ans;
};
