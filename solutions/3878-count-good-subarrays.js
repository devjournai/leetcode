/**
 * Count Good Subarrays
 * Intuition: We can enumerate each element $\textit{nums}[i]$ as the bitwise OR result of a subarray, and count how many subarrays have a bitwise OR exactly equal to $\textit{nums}[i]$. If the bitwise OR of a subarray is $\textit{nums}[i]$, then every element in the subarray must satisfy: $$ \textit{nums}[k] \mid \textit{nums}[i] = \textit{nums}[i] $$ That is, every element in the subarray must be a subset of $\textit{nums}[i]$ (in terms of bits). We can use a monotonic stack to find the left boundary $l[i]$ and right boundary $r[i]$ for each element $\textit{nums}[i]$, such that all elements in the interval $(l[i], r[i])$ satisfy the above condition, while $\textit{nums}[l[i]]$ and $\textit{nums}[r[i]]$ do not. The number of subarrays with $\textit{nums}[i]$ as the bitwise OR result is then $(i - l[i]) \cdot (r[i] - i)$. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is ...
 * Approach: We can enumerate each element $\textit{nums}[i]$ as the bitwise OR result of a subarray, and count how many subarrays have a bitwise OR exactly equal to $\textit{nums}[i]$. If the bitwise OR of a subarray is $\textit{nums}[i]$, then every element in the subarray must satisfy: $$ \textit{nums}[k] \mid \textit{nums}[i] = \textit{nums}[i] $$ That is, every element in the subarray must be a subset of $\textit{nums}[i]$ (in terms of bits). We can use a monotonic stack to find the left boundary $l[i]$ and right boundary $r[i]$ for each element $\textit{nums}[i]$, such that all elements in the interval $(l[i], r[i])$ satisfy the above condition, while $\textit{nums}[l[i]]$ and $\textit{nums}[r[i]]$ do not. The number of subarrays with $\textit{nums}[i]$ as the bitwise OR result is then $(i - l[i]) \cdot (r[i] - i)$. The time complexity is $O(n)$ and the space complexity is $O(n)$, where $n$ is ...
 * Dry Run: Input: nums = [4,2,3] => Output: 4
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var countGoodSubarrays = function (nums) {
    const n = nums.length;

    const l = new Array(n).fill(-1);
    const stk = [];

    for (let i = 0; i < n; i++) {
        const x = nums[i];
        while (
            stk.length &&
            nums[stk[stk.length - 1]] < x &&
            (nums[stk[stk.length - 1]] | x) === x
        ) {
            stk.pop();
        }
        l[i] = stk.length ? stk[stk.length - 1] : -1;
        stk.push(i);
    }

    const r = new Array(n).fill(n);
    stk.length = 0;

    for (let i = n - 1; i >= 0; i--) {
        while (stk.length && (nums[stk[stk.length - 1]] | nums[i]) === nums[i]) {
            stk.pop();
        }
        r[i] = stk.length ? stk[stk.length - 1] ;
        stk.push(i);
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += (i - l[i]) * (r[i] - i);
    }
    return ans;
}
