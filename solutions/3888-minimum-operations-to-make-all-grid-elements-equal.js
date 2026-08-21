/**
 * Minimum Operations to Make All Grid Elements Equal
 * Intuition: Since the operation can only increase the value of elements, all elements in the final grid must be equal to some target value $T$, and $T \ge \max(\textit{grid})$. Start traversing the grid from the top-left corner $(0, 0)$. For any position $(i, j)$, if its current value is less than $T$, since subsequent operations (with a more rightward or downward position as the top-left corner) cannot cover $(i, j)$, it is necessary to perform $T - \text{current\_val}$ operations at the current position, each using $(i, j)$ as the top-left corner of a $k \times k$ increment operation. If each operation traverses the $k \times k$ region, the complexity will reach $O(m \cdot n \cdot k^2)$. We can use a 2D difference array $\textit{diff}$ to record the operations. By maintaining the 2D prefix sum of $\textit{diff}$ in real time, we can obtain the cumulative increment at the current position in $O(1)$...
 * Approach: Since the operation can only increase the value of elements, all elements in the final grid must be equal to some target value $T$, and $T \ge \max(\textit{grid})$. Start traversing the grid from the top-left corner $(0, 0)$. For any position $(i, j)$, if its current value is less than $T$, since subsequent operations (with a more rightward or downward position as the top-left corner) cannot cover $(i, j)$, it is necessary to perform $T - \text{current\_val}$ operations at the current position, each using $(i, j)$ as the top-left corner of a $k \times k$ increment operation. If each operation traverses the $k \times k$ region, the complexity will reach $O(m \cdot n \cdot k^2)$. We can use a 2D difference array $\textit{diff}$ to record the operations. By maintaining the 2D prefix sum of $\textit{diff}$ in real time, we can obtain the cumulative increment at the current position in $O(1)$...
 * Dry Run: Input: grid = [[3,3,5],[3,3,5]], k = 2 => Output: 2
 * Time Complexity: O(O(m * n))
 * Space Complexity: O(O(m * n))
 */
var minOperations = function (grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    let maxVal = grid[0][0];

    for (const row of grid) {
        for (const val of row) {
            maxVal = Math.max(maxVal, val);
        }
    }

    const check = (target) => {
        const diff = Array.from({ length + 2 }, () => Array(n + 2).fill(0));
        let totalOps = 0;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                diff[i][j] += diff[i - 1][j] + diff[i][j - 1] - diff[i - 1][j - 1];
                const curVal = grid[i - 1][j - 1] + diff[i][j];

                if (curVal > target) return -1;

                if (curVal < target) {
                    if (i + k - 1 > m || j + k - 1 > n) return -1;

                    const needed = target - curVal;
                    totalOps += needed;
                    diff[i][j] += needed;
                    diff[i + k][j] -= needed;
                    diff[i][j + k] -= needed;
                    diff[i + k][j + k] += needed;
                }
            }
        }

        return totalOps;
    };

    for (let t = maxVal; t <= maxVal + 1; t++) {
        const res = check(t);
        if (res !== -1) return res;
    }

    return -1;
}
