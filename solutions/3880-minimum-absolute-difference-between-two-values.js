/**
 * Minimum Absolute Difference Between Two Values
 * Intuition: We use an array $\textit{last}$ of length $3$ to record the last occurrence index of digits $0$, $1$, and $2$. Initially, $\textit{last} = [-(n+1), -(n+1), -(n+1)]$. We iterate through the array $\textit{nums}$. For the current number $x$, if $x$ is not equal to $0$, we update the answer $\textit{ans} = \min(\textit{ans}, i - \textit{last}[3 - x])$, where $i$ is the index of the current number $x$. Then we update $\textit{last}[x] = i$. After the iteration, if $\textit{ans}$ is greater than the length of the array $\textit{nums}$, it means no valid index pair exists, so we return -1; otherwise, we return $\textit{ans}$. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(1)$.
 * Approach: We use an array $\textit{last}$ of length $3$ to record the last occurrence index of digits $0$, $1$, and $2$. Initially, $\textit{last} = [-(n+1), -(n+1), -(n+1)]$. We iterate through the array $\textit{nums}$. For the current number $x$, if $x$ is not equal to $0$, we update the answer $\textit{ans} = \min(\textit{ans}, i - \textit{last}[3 - x])$, where $i$ is the index of the current number $x$. Then we update $\textit{last}[x] = i$. After the iteration, if $\textit{ans}$ is greater than the length of the array $\textit{nums}$, it means no valid index pair exists, so we return -1; otherwise, we return $\textit{ans}$. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(1)$.
 * Dry Run: Input: nums = [1,0,0,2,0,1] => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var minAbsoluteDifference = function (nums) {
    const n = nums.length;
    let ans = n + 1;
    const last = Array(3).fill(-ans);

    for (let i = 0; i < n; ++i) {
        const x = nums[i];
        if (x) {
            ans = Math.min(ans, i - last[3 - x]);
            last[x] = i;
        }
    }

    return ans > n ? -1 ;
}
