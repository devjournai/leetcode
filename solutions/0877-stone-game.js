/**
* Stone Game
* Intuition: Alice and Bob play optimally on an even number of piles, where the total sum of stones is odd. This specific setup guarantees that Alice always wins. The key insight is that Alice can always choose to collect either all the stones from even-indexed piles or all the stones from odd-indexed piles. Since the total sum of stones is odd, the sum of even-indexed piles cannot equal the sum of odd-indexed piles. Alice will pick the parity group that offers a higher total sum, thereby ensuring her score is strictly greater than Bob's.
* Approach: 1. Recognize that the game has an even number of piles, and Alice makes the first move. There are exactly `N/2` turns for Alice and `N/2` turns for Bob. 2. Define `sumOfEvenIndexedPiles` as `piles[0] + piles[2] + ... + piles[N-2]`. 3. Define `sumOfOddIndexedPiles` as `piles[1] + piles[3] + ... + piles[N-1]`. 4. Prove that Alice has a winning strategy by controlling the parity of the piles taken. On Alice's turn, she always faces a situation where the leftmost and rightmost piles have original indices of *different* parity (e.g., `piles[i]` where `i` is even, and `piles[j]` where `j` is odd). On Bob's turn, he always faces a situation where the leftmost and rightmost piles have original indices of the *same* parity. This means Bob is forced to take a pile of a certain parity, allowing Alice to consistently choose between an even-indexed and an odd-indexed pile. 5. Alice can thus decide which set of piles she wants to accumulate (either all even-indexed or all odd-indexed). She will choose the set with the larger total sum. 6. Since the problem states the total number of stones is odd, `sumOfEvenIndexedPiles` and `sumOfOddIndexedPiles` cannot be equal. One must be strictly greater than the other. 7. Therefore, Alice's optimal strategy allows her to always achieve a higher score than Bob, ensuring she wins.
* Dry Run: For `piles = [5, 3, 4, 5]` (N=4):
  1. Calculate `sumOfEvenIndexedPiles = piles[0] + piles[2] = 5 + 4 = 9`.
  2. Calculate `sumOfOddIndexedPiles = piles[1] + piles[3] = 3 + 5 = 8`.
  3. Total sum is `9 + 8 = 17` (odd), confirming `sumOfEvenIndexedPiles != sumOfOddIndexedPiles`.
  4. Alice compares `9` and `8`. Since `9 > 8`, Alice adopts the strategy to collect all even-indexed piles.
  5. Alice's turn 1 (piles: `[5, 3, 4, 5]`): Alice can choose `piles[0]` (value 5, even index) or `piles[3]` (value 5, odd index). To secure even-indexed piles, she takes `piles[0]`. Alice score: 5. Remaining: `[3, 4, 5]`.
  6. Bob's turn 1 (piles: `[3, 4, 5]` - original indices 1, 2, 3): Bob faces `piles[1]` (value 3, odd index) and `piles[3]` (value 5, odd index). Bob must take an odd-indexed pile. Let's say Bob takes `piles[1]`. Bob score: 3. Remaining: `[4, 5]`.
  7. Alice's turn 2 (piles: `[4, 5]` - original indices 2, 3): Alice faces `piles[2]` (value 4, even index) and `piles[3]` (value 5, odd index). She takes `piles[2]`. Alice score: 5 + 4 = 9. Remaining: `[5]`.
  8. Bob's turn 2 (piles: `[5]` - original index 3): Bob takes `piles[3]`. Bob score: 3 + 5 = 8. Remaining: `[]`.
  9. Final scores: Alice = 9, Bob = 8. Alice wins because 9 > 8.
  10. The game result is true.
* Time Complexity: O(1)
* Space Complexity: O(1)
*/
var stoneGame = function (piles) {
  return true;
};
