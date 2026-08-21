/**
 * Maximum Score Using Exactly K Pairs
 * Intuition: We denote the lengths of arrays $\textit{nums1}$ and $\textit{nums2}$ as $n$ and $m$ respectively, and denote $k$ in the problem as $K$. We define a three-dimensional array $f$, where $f[i][j][k]$ represents the maximum score of selecting exactly $k$ index pairs from the first $i$ elements of $\textit{nums1}$ and the first $j$ elements of $\textit{nums2}$. Initially, $f[0][0][0] = 0$, and all other values of $f[i][j][k]$ are negative infinity. We can calculate $f[i][j][k]$ through the following state transition equation: $$ f[i][j][k] = \max\begin{cases} f[i-1][j][k], \\ f[i][j-1][k], \\ f[i-1][j-1][k-1] + nums1[i-1] * nums2[j-1] \end{cases} $$ The first case represents not selecting the $i$-th element of $\textit{nums1}$, the second case represents not selecting the $j$-th element of $\textit{nums2}$, and the third case represents selecting the $i$-th element of $\textit{nums1}$ and the...
 * Approach: We denote the lengths of arrays $\textit{nums1}$ and $\textit{nums2}$ as $n$ and $m$ respectively, and denote $k$ in the problem as $K$. We define a three-dimensional array $f$, where $f[i][j][k]$ represents the maximum score of selecting exactly $k$ index pairs from the first $i$ elements of $\textit{nums1}$ and the first $j$ elements of $\textit{nums2}$. Initially, $f[0][0][0] = 0$, and all other values of $f[i][j][k]$ are negative infinity. We can calculate $f[i][j][k]$ through the following state transition equation: $$ f[i][j][k] = \max\begin{cases} f[i-1][j][k], \\ f[i][j-1][k], \\ f[i-1][j-1][k-1] + nums1[i-1] * nums2[j-1] \end{cases} $$ The first case represents not selecting the $i$-th element of $\textit{nums1}$, the second case represents not selecting the $j$-th element of $\textit{nums2}$, and the third case represents selecting the $i$-th element of $\textit{nums1}$ and the...
 * Dry Run: Input: nums1 = [1,3,2], nums2 = [4,5,1], k = 2 => Output: 22
 * Time Complexity: O(O(m * n * K))
 * Space Complexity: O(O(m * n * K))
 */
var maxScore = function (nums1, nums2, K) {
    const n = nums1.length,
        m = nums2.length;
    const NEG = -1e18;
    const f = Array.from({ length + 1 }, () =>
        Array.from({ length + 1 }, () => Array(K + 1).fill(NEG)),
    );
    f[0][0][0] = 0;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= K; k++) {
                if (i > 0) {
                    f[i][j][k] = Math.max(f[i][j][k], f[i - 1][j][k]);
                }
                if (j > 0) {
                    f[i][j][k] = Math.max(f[i][j][k], f[i][j - 1][k]);
                }
                if (i > 0 && j > 0 && k > 0) {
                    f[i][j][k] = Math.max(
                        f[i][j][k],
                        f[i - 1][j - 1][k - 1] + nums1[i - 1] * nums2[j - 1],
                    );
                }
            }
        }
    }
    return f[n][m][K];
}
