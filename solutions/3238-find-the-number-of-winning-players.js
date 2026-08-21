/**
 * Find the Number of Winning Players
 * Intuition: Player i wins if they collected any single color more than i times. Count colors per player and compare the max frequency to the player index.
 * Approach: 1. Tally pick counts into an n by 11 grid (colors 0..10). 2. For each player i, if the max frequency of any color is > i, they win.
 * Dry Run: n = 4, pick = [[0, 0], [1, 0], [1, 0], [2, 1], [2, 1], [2, 0]]. Player 0 has 1 of color 0 (not > 0). Player 1 has 2 of color 0 (> 1). Player 2 has 2 of color 1 (> 2? no). Answer 1.
 * Time Complexity: O(n + |pick|)
 * Space Complexity: O(n)
 */
var winningPlayerCount = function (n, pick) {
  const maxColor = 10;
  const counts = Array.from({ length: n }, () => Array(maxColor + 1).fill(0));

  for (const [player, color] of pick) {
    counts[player][color]++;
  }

  let winners = 0;
  for (let player = 0; player < n; player++) {
    let maxCount = 0;
    for (const frequency of counts[player]) {
      maxCount = Math.max(maxCount, frequency);
    }
    if (maxCount > player) {
      winners++;
    }
  }

  return winners;
};
