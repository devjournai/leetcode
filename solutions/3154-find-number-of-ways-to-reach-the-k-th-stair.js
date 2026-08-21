/**
 * Find Number of Ways to Reach the K-th Stair
 * Intuition: After `jump` jump operations the position is 2^jump - down. Downs cannot be consecutive, so they occupy jump + 1 slots (before/after jumps). Count C(jump + 1, down) for every jump whose down = 2^jump - k is between 0 and jump + 1.
 * Approach: 1. Precompute combinations up to 30 via Pascal's triangle. 2. For jump from 0 to 29, down = 2^jump - k. 3. If down is a valid slot count, add C(jump + 1, down).
 * Dry Run: k = 2
 * - jump = 1: down = 2 - 2 = 0 -> C(2, 0) = 1
 * - jump = 2: down = 4 - 2 = 2 -> C(3, 2) = 3
 * - Other jumps are invalid. Answer = 4
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var waysToReachStair = function (k) {
  const MAX_JUMP = 29;
  const comb = Array.from({ length: MAX_JUMP + 2 }, () =>
    new Array(MAX_JUMP + 2).fill(0)
  );
  for (let i = 0; i <= MAX_JUMP + 1; i++) {
    comb[i][0] = 1;
  }
  for (let i = 1; i <= MAX_JUMP + 1; i++) {
    for (let j = 1; j <= MAX_JUMP + 1; j++) {
      comb[i][j] = comb[i - 1][j] + comb[i - 1][j - 1];
    }
  }

  let answer = 0;
  for (let jump = 0; jump <= MAX_JUMP; jump++) {
    const down = (1 << jump) - k;
    if (down < 0 || down > jump + 1) {
      continue;
    }
    answer += comb[jump + 1][down];
  }
  return answer;
};
