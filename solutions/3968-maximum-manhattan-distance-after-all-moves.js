/**
 * Maximum Manhattan Distance After All Moves
 * Intuition: We can use a variable x to record the vertical distance, a variable y to record the horizontal distance, and a variable z to record the number of replaceable moves.
 * Approach: We can use a variable x to record the vertical distance, a variable y to record the horizontal distance, and a variable z to record the number of replaceable moves. Then the final Manhattan distance is |x| + |y| + z.
 * Dry Run: Input: moves = "L_D_". Output: 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxDistance = function (moves) {
  let [x, y, z] = [0, 0, 0];
  for (const c of moves) {
    if (c === "U") {
      x -= 1;
    } else if (c === "D") {
      x += 1;
    } else if (c === "L") {
      y -= 1;
    } else if (c === "R") {
      y += 1;
    } else {
      z += 1;
    }
  }
  return Math.abs(x) + Math.abs(y) + z;
};
