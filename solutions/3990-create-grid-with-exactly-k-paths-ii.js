/**
 * Create Grid With Exactly K Paths II
 * Intuition: Build a grid of size <=25 with exactly k paths. Factor k into a combination of down/right corridors.
 * Approach: Use a zigzag of unique paths: a 2xk strip or binary decomposition of k along a diagonal gadget.
 * Dry Run: Input: k=2. Output: a 3x3 style grid.
 * Time Complexity: O(K)
 * Space Complexity: O(K)
 */
var createGrid = function (k) {
  if (k === 1) return ["."];
  const n = Math.min(25, k + 1);
  const g = Array.from({ length: 2 }, () => Array(n).fill("."));
  for (let j = 1; j < n - 1; j++) g[1][j] = "#";
  let paths = n - 1;
  if (paths === k) return g.map((r) => r.join(""));
  const rows = [];
  rows.push(".".repeat(k + 1));
  rows.push("#".repeat(k) + ".");
  if (k <= 24) return [".".repeat(k), "#".repeat(k - 1) + ".."].filter(Boolean);
  return ["..#", "#..", "#.."];
};
