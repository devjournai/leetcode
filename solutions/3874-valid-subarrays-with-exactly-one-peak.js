/**
 * Valid Subarrays With Exactly One Peak
 * Intuition: We first traverse the array to find all peak positions and store them in a list $\textit{peaks}$. For each peak position, we calculate the left and right boundaries centered at the peak with a distance not exceeding $k$. Note that if there are multiple peaks, we need to ensure the calculated subarray does not contain other peaks. Then, based on the left and right boundaries, we calculate the number of valid subarrays centered at each peak and accumulate it into the answer. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array.
 * Approach: We first traverse the array to find all peak positions and store them in a list $\textit{peaks}$. For each peak position, we calculate the left and right boundaries centered at the peak with a distance not exceeding $k$. Note that if there are multiple peaks, we need to ensure the calculated subarray does not contain other peaks. Then, based on the left and right boundaries, we calculate the number of valid subarrays centered at each peak and accumulate it into the answer. The time complexity is $O(n)$, and the space complexity is $O(n)$, where $n$ is the length of the array.
 * Dry Run: Input: nums = [1,3,2], k = 1 => Output: 4
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var validSubarrays = function (nums, k) {
  const n = nums.length;
  const peaks = [];

  for (let i = 1; i < n - 1; i++) {
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
      peaks.push(i);
    }
  }

  let ans = 0;
  for (let j = 0; j < peaks.length; j++) {
    const p = peaks[j];

    let leftMin = Math.max(p - k, 0);
    if (j > 0) {
      leftMin = Math.max(leftMin, peaks[j - 1] + 1);
    }

    let rightMax = Math.min(p + k, n - 1);
    if (j < peaks.length - 1) {
      rightMax = Math.min(rightMax, peaks[j + 1] - 1);
    }

    ans += (p - leftMin + 1) * (rightMax - p + 1);
  }

  return ans;
};
