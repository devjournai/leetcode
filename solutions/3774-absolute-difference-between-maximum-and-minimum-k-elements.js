/**
 * Absolute Difference Between Maximum and Minimum K Elements
 * Intuition: We first sort the array \textit{nums}. Then we calculate the sum of the first k elements and the sum of the last k elements in the array, and finally return the difference between them.
 * Approach: The time complexity is O(n \times \log n), and the space complexity is O(\log n), where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [5,2,2,4], k = 2. Output 5.
 * Time Complexity: O(n \times \log n)
 * Space Complexity: O(\log n)
 */
var absDifference = function (nums, k){
    nums.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0; i < k; ++i) {
        ans += nums.at(-i - 1)! - nums[i];
    }
    return ans;
}
