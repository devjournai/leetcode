/**
 * Stone Game IV
 * Intuition: This is a classic impartial game theory problem. A player wins from a given number of stones `k` if they can make a move to a state `k - s*s` from which the *next* player (the opponent) loses. Conversely, a player loses if all possible moves lead to states from which the opponent wins. We can use dynamic programming to determine the winning/losing status for each number of stones from 0 to `n`.
 * Approach: 1. Initialize a boolean array `memoizationTable` of size `n + 1`. `memoizationTable[i]` will store `true` if the current player can win with `i` stones, and `false` otherwise. `memoizationTable[0]` implicitly represents a state where no moves can be made, so the player whose turn it is loses, hence `false`. 2. Iterate `currentStoneAmount` from `1` up to `n`. For each `currentStoneAmount`, iterate through possible square numbers `squareFactor * squareFactor` that can be removed, starting from `squareFactor = 1`. 3. Calculate `stonesRemaining` after removing `squareFactor * squareFactor` stones. If `memoizationTable[stonesRemaining]` is `false` (meaning the opponent would lose from that `stonesRemaining` state), then the current player can win from `currentStoneAmount` by making this move. 4. If a winning move is found, set `memoizationTable[currentStoneAmount]` to `true` and immediately break from the inner loop, as one winning move is sufficient. 5. The final answer, representing whether Alice (the first player) wins with `n` stones, is `memoizationTable[n]`.
 * Dry Run: n = 4
 * `memoizationTable` (size 5): `[F, F, F, F, F]`
 * `currentStoneAmount = 1`:
 *   `squareFactor = 1`: `1*1 = 1`. `stonesRemaining = 1 - 1 = 0`. `memoizationTable[0]` is `F`. So, `memoizationTable[1] = T`. Break.
 *   `memoizationTable`: `[F, T, F, F, F]`
 * `currentStoneAmount = 2`:
 *   `squareFactor = 1`: `1*1 = 1`. `stonesRemaining = 2 - 1 = 1`. `memoizationTable[1]` is `T`. (Opponent wins if 1 stone left).
 *   `squareFactor = 2`: `2*2 = 4 > 2`. Loop ends.
 *   `memoizationTable[2]` remains `F`.
 *   `memoizationTable`: `[F, T, F, F, F]`
 * `currentStoneAmount = 3`:
 *   `squareFactor = 1`: `1*1 = 1`. `stonesRemaining = 3 - 1 = 2`. `memoizationTable[2]` is `F`. So, `memoizationTable[3] = T`. Break.
 *   `memoizationTable`: `[F, T, F, T, F]`
 * `currentStoneAmount = 4`:
 *   `squareFactor = 1`: `1*1 = 1`. `stonesRemaining = 4 - 1 = 3`. `memoizationTable[3]` is `T`. (Opponent wins if 3 stones left).
 *   `squareFactor = 2`: `2*2 = 4`. `stonesRemaining = 4 - 4 = 0`. `memoizationTable[0]` is `F`. So, `memoizationTable[4] = T`. Break.
 *   `memoizationTable`: `[F, T, F, T, T]`
 * Return `memoizationTable[4]`, which is `true`.
 * Time Complexity: O(n * sqrt(n))
 * Space Complexity: O(n)
 */
var winnerSquareGame = function (n) {
  const memoizationTable = new Array(n + 1).fill(false);

  for (
    let currentStoneAmount = 1;
    currentStoneAmount <= n;
    currentStoneAmount++
  ) {
    for (
      let squareFactor = 1;
      squareFactor * squareFactor <= currentStoneAmount;
      squareFactor++
    ) {
      let subtractedQuantity = squareFactor * squareFactor;
      let stonesRemaining = currentStoneAmount - subtractedQuantity;
      if (!memoizationTable[stonesRemaining]) {
        memoizationTable[currentStoneAmount] = true;
        break;
      }
    }
  }

  return memoizationTable[n];
};
