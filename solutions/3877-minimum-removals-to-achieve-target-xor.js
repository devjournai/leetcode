/**
 * Minimum Removals to Achieve Target XOR
 * Intuition: We define a 2D array $f$, where $f[i][j]$ represents the maximum number of elements we can select from the first $i$ elements such that their XOR sum equals $j$. Initially, $f[0][0] = 0$ and all other $f[0][j]$ are negative infinity. For each element $nums[i - 1]$, we can choose not to use it, in which case $f[i][j]$ equals $f[i - 1][j]$; or we can choose to use it, in which case $f[i][j]$ equals $f[i - 1][j \oplus nums[i - 1]] + 1$. Thus, the transition equation is: $$ \begin{aligned} f[i][j] = \max(f[i - 1][j], f[i - 1][j \oplus nums[i - 1]] + 1) \end{aligned} $$ Finally, if $f[n][target]$ is less than $0$, it means the target XOR value cannot be achieved, and we return $-1$; otherwise, we return $n - f[n][target]$, which is the number of elements that need to be removed. The time complexity is $O(n \times 2^m)$ and the space complexity is $O(n \times 2^m)$, where $n$ is the length of ...
 * Approach: We define a 2D array $f$, where $f[i][j]$ represents the maximum number of elements we can select from the first $i$ elements such that their XOR sum equals $j$. Initially, $f[0][0] = 0$ and all other $f[0][j]$ are negative infinity. For each element $nums[i - 1]$, we can choose not to use it, in which case $f[i][j]$ equals $f[i - 1][j]$; or we can choose to use it, in which case $f[i][j]$ equals $f[i - 1][j \oplus nums[i - 1]] + 1$. Thus, the transition equation is: $$ \begin{aligned} f[i][j] = \max(f[i - 1][j], f[i - 1][j \oplus nums[i - 1]] + 1) \end{aligned} $$ Finally, if $f[n][target]$ is less than $0$, it means the target XOR value cannot be achieved, and we return $-1$; otherwise, we return $n - f[n][target]$, which is the number of elements that need to be removed. The time complexity is $O(n \times 2^m)$ and the space complexity is $O(n \times 2^m)$, where $n$ is the length of ...
 * Dry Run: Input: nums = [1,2,3], target = 2 => Output: 1
 * Time Complexity: O(O(n * 2^m))
 * Space Complexity: O(O(n * 2^m))
 */
var minRemovals = function (nums, target) {
    let mx = Math.max(...nums);

    let m = 0;
    while (1 << m <= mx) {
        m++;
    }
    if (1 << m <= target) {
        return -1;
    }

    const n = nums.length;
    const f = Array.from({ length + 1 }, () => Array(1 << m).fill(-Infinity));

    f[0][0] = 0;

    for (let i = 1; i <= n; i++) {
        const x = nums[i - 1];
        for (let j = 0; j < 1 << m; j++) {
            f[i][j] = Math.max(f[i - 1][j], f[i - 1][j ^ x] + 1);
        }
    }

    if (f[n][target] < 0) {
        return -1;
    }
    return n - f[n][target];
}
