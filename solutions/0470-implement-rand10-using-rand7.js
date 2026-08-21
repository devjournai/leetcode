/**
 * Implement Rand10 Using Rand7
 * Intuition: Two independent `rand7()` rolls make a uniform integer in 1..49. Keeping only 1..40 gives 4 full groups of 10, so `(value % 10) + 1` is uniform in 1..10; values 41..49 are rejected and the pair is rerolled.
 * Approach: 1. Loop forever. 2. `intermediateValue = (rollOne - 1) * 7 + rollTwo` ∈ [1, 49]. 3. If it is ≤ 40, return `(intermediateValue % 10) + 1`; otherwise retry.
 * Dry Run: rolls (2, 3) → (2-1)*7+3 = 10 ≤ 40 → (10 % 10)+1 = 1.
 *   - rolls (7, 7) → 49 > 40 → reject and roll again.
 *   - rolls (6, 5) → 40 → (40 % 10)+1 = 1.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var rand10 = function () {
  while (true) {
    let rollOne = rand7();
    let rollTwo = rand7();

    let intermediateValue = (rollOne - 1) * 7 + rollTwo;

    if (intermediateValue <= 40) {
      let finalOutput = (intermediateValue % 10) + 1;
      return finalOutput;
    }
  }
};
