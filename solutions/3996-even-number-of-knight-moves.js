/**
 * Even Number of Knight Moves
 * Intuition: Each knight move has an offset of (pm 1, pm 2) or (pm 2, pm 1), so the change in the coordinate sum x + y is always odd. In other words, every move flips the color of the square (black/white distinguished by (x + y) bmod 2).
 * Approach: Each knight move has an offset of (pm 1, pm 2) or (pm 2, pm 1), so the change in the coordinate sum x + y is always odd. In other words, every move flips the color of the square (black/white distinguished by (x + y) bmod 2). Therefore: - After an even number of moves, the start and target have the same color; - After an odd number of moves, the start and target have different colors.
 * Dry Run: Input: start = [1,1], target = [2,2]. Output: true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var canReach = function (start, target) {
  return (start[0] + start[1]) % 2 === (target[0] + target[1]) % 2;
};
