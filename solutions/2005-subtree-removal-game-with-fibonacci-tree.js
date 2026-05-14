/**
 * Subtree Removal Game With Fibonacci Tree
 * Intuition: This problem describes an impartial game, which can often be solved using the Sprague-Grundy theorem. In such games, each state is assigned a Grundy value (or nim-value). A player wins if the current state's Grundy value is non-zero, and loses if it is zero. For the "Subtree Removal Game" on a Fibonacci tree `order(n)`, it's a known result in combinatorial game theory that the Grundy values `g(n)` exhibit a periodic pattern.
 * Approach: 1. Recognize the problem as an impartial game, which implies the applicability of the Sprague-Grundy theorem. 2. Understand that the game's outcome (Alice wins or Bob wins) depends on whether the Grundy value `g(n)` for `order(n)` is non-zero (Alice wins) or zero (Bob wins). 3. Based on established results for this specific game, the Grundy values `g(n)` are periodic with a cycle of 6. The losing positions (where `g(n)=0`) are precisely those where `n` is congruent to 1 modulo 6 (i.e., `n % 6 === 1`). For all other values of `n`, `g(n) > 0`, making them winning positions. 4. Since Alice starts, she wins if `g(n) > 0`, which translates directly to the condition `n % 6 !== 1`.
 * Dry Run:
 *   Input: n = 0
 *     Calculation: 0 % 6 = 0. 0 !== 1 is true.
 *     Output: true (Alice wins, as `g(0)` is non-zero).
 *   Input: n = 1
 *     Calculation: 1 % 6 = 1. 1 !== 1 is false.
 *     Output: false (Bob wins, as `g(1)` is zero).
 *   Input: n = 2
 *     Calculation: 2 % 6 = 2. 2 !== 1 is true.
 *     Output: true (Alice wins, as `g(2)` is non-zero).
 *   Input: n = 7
 *     Calculation: 7 % 6 = 1. 1 !== 1 is false.
 *     Output: false (Bob wins, as `g(7)` is zero).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findGameWinner = function (n) {
  return n % 6 !== 1;
};
