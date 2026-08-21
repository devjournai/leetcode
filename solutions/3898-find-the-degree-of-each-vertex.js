/**
 * Find the Degree of Each Vertex
 * Intuition: We can directly simulate the process of computing the degree of each vertex. For each vertex $i$, we traverse its corresponding row $\text{matrix}[i]$ and count the number of elements equal to 1, which is exactly the degree of vertex $i$. The time complexity is $O(n^2)$, where $n$ is the number of vertices in the graph. Ignoring the space consumed by the answer array, the space complexity is $O(1)$.
 * Approach: We can directly simulate the process of computing the degree of each vertex. For each vertex $i$, we traverse its corresponding row $\text{matrix}[i]$ and count the number of elements equal to 1, which is exactly the degree of vertex $i$. The time complexity is $O(n^2)$, where $n$ is the number of vertices in the graph. Ignoring the space consumed by the answer array, the space complexity is $O(1)$.
 * Dry Run: Input: matrix = [[0,1,1],[1,0,1],[1,1,0]] => Output: [2,2,2]
 * Time Complexity: O(O(n^2))
 * Space Complexity: O(O(1))
 */
var findDegrees = function (matrix) {
  const n = matrix.length;
  const ans = Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
    for (const x of matrix[i]) {
      ans[i] += x;
    }
  }
  return ans;
};
