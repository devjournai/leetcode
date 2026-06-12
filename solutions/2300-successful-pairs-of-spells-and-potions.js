/**
 * Successful Pairs Of Spells And Potions
 * Intuition: To find the number of successful pairs for each spell efficiently, we need a way to quickly count potions that meet a product threshold. Sorting the potions allows for binary search to find the first potion that satisfies the condition, and all subsequent potions will also satisfy it.
 * Approach: 1. Initialize an empty array `successfulCounts` to store the results. 2. Sort the `potions` array in ascending order to enable binary search. 3. Iterate through each `currentSpellStrength` in the `spells` array along with its index. 4. For each `currentSpellStrength`, perform a binary search on the `sortedPotions` array. The goal of the binary search is to find the smallest index `firstQualifyingPotionIndex` such that `currentSpellStrength * sortedPotions[firstQualifyingPotionIndex]` is greater than or equal to `success`. 5. During the binary search, if `currentSpellStrength * sortedPotions[middlePoint] >= success`, it means `sortedPotions[middlePoint]` is a potential candidate, so we store `middlePoint` as `firstQualifyingPotionIndex` and try to find an even smaller index by searching the left half (`upperBound = middlePoint - 1`). 6. If `currentSpellStrength * sortedPotions[middlePoint] < success`, then `sortedPotions[middlePoint]` and all potions to its left are too small, so we search the right half (`lowerBound = middlePoint + 1`). 7. After the binary search, `firstQualifyingPotionIndex` will hold the index of the first potion that forms a successful pair, or `potions.length` if no potion is successful. 8. The number of successful potions for the current spell is `potions.length - firstQualifyingPotionIndex`. 9. Store this count in `successfulCounts` at the current spell's index. 10. Return the `successfulCounts` array.
 * Dry Run: spells = [5, 1, 3], potions = [1, 2, 3, 4, 5], success = 7
 * 1. `successfulCounts = []`
 * 2. `potions` becomes `[1, 2, 3, 4, 5]` (already sorted). `potionCount = 5`.
 * 3. Loop for `spellCurrentIndex = 0`: `currentSpellStrength = 5`.
 *    Binary search on `potions` for `successThreshold = 7 / 5 = 1.4`.
 *    `lowerBound = 0`, `upperBound = 4`, `firstQualifyingPotionIndex = 5`.
 *    - `middlePoint = 2`. `potions[2] = 3`. `potentialProduct = 5 * 3 = 15`. `15 >= 7`. `firstQualifyingPotionIndex = 2`. `upperBound = 1`.
 *    - `lowerBound = 0`, `upperBound = 1`. `middlePoint = 0`. `potions[0] = 1`. `potentialProduct = 5 * 1 = 5`. `5 < 7`. `lowerBound = 1`.
 *    - `lowerBound = 1`, `upperBound = 1`. `middlePoint = 1`. `potions[1] = 2`. `potentialProduct = 5 * 2 = 10`. `10 >= 7`. `firstQualifyingPotionIndex = 1`. `upperBound = 0`.
 *    - Loop ends (`lowerBound > upperBound`).
 *    For `currentSpellStrength = 5`, `firstQualifyingPotionIndex = 1`.
 *    `successfulCounts[0] = 5 - 1 = 4`.
 * 4. Loop for `spellCurrentIndex = 1`: `currentSpellStrength = 1`.
 *    Binary search on `potions` for `successThreshold = 7 / 1 = 7`.
 *    `lowerBound = 0`, `upperBound = 4`, `firstQualifyingPotionIndex = 5`.
 *    - `middlePoint = 2`. `potions[2] = 3`. `potentialProduct = 1 * 3 = 3`. `3 < 7`. `lowerBound = 3`.
 *    - `lowerBound = 3`, `upperBound = 4`. `middlePoint = 3`. `potions[3] = 4`. `potentialProduct = 1 * 4 = 4`. `4 < 7`. `lowerBound = 4`.
 *    - `lowerBound = 4`, `upperBound = 4`. `middlePoint = 4`. `potions[4] = 5`. `potentialProduct = 1 * 5 = 5`. `5 < 7`. `lowerBound = 5`.
 *    - Loop ends (`lowerBound > upperBound`).
 *    For `currentSpellStrength = 1`, `firstQualifyingPotionIndex = 5`.
 *    `successfulCounts[1] = 5 - 5 = 0`.
 * 5. Loop for `spellCurrentIndex = 2`: `currentSpellStrength = 3`.
 *    Binary search on `potions` for `successThreshold = 7 / 3 = 2.33...`.
 *    `lowerBound = 0`, `upperBound = 4`, `firstQualifyingPotionIndex = 5`.
 *    - `middlePoint = 2`. `potions[2] = 3`. `potentialProduct = 3 * 3 = 9`. `9 >= 7`. `firstQualifyingPotionIndex = 2`. `upperBound = 1`.
 *    - `lowerBound = 0`, `upperBound = 1`. `middlePoint = 0`. `potions[0] = 1`. `potentialProduct = 3 * 1 = 3`. `3 < 7`. `lowerBound = 1`.
 *    - `lowerBound = 1`, `upperBound = 1`. `middlePoint = 1`. `potions[1] = 2`. `potentialProduct = 3 * 2 = 6`. `6 < 7`. `lowerBound = 2`.
 *    - Loop ends (`lowerBound > upperBound`).
 *    For `currentSpellStrength = 3`, `firstQualifyingPotionIndex = 2`.
 *    `successfulCounts[2] = 5 - 2 = 3`.
 * 6. Return `successfulCounts = [4, 0, 3]`.
 * Time Complexity: O(M log M + N log M)
 * Space Complexity: O(N)
 */
var successfulPairs = function (spells, potions, success) {
  const successfulCounts = [];
  potions.sort((firstPotion, secondPotion) => firstPotion - secondPotion);

  const potionCount = potions.length;
  const spellCount = spells.length;

  for (
    let spellCurrentIndex = 0;
    spellCurrentIndex < spellCount;
    spellCurrentIndex++
  ) {
    const currentSpellStrength = spells[spellCurrentIndex];
    let lowerBound = 0;
    let upperBound = potionCount - 1;
    let firstQualifyingPotionIndex = potionCount;

    while (lowerBound <= upperBound) {
      const middlePoint = Math.floor((lowerBound + upperBound) / 2);
      const potionStrengthAtIndex = potions[middlePoint];
      const potentialProduct = currentSpellStrength * potionStrengthAtIndex;

      if (potentialProduct >= success) {
        firstQualifyingPotionIndex = middlePoint;
        upperBound = middlePoint - 1;
      } else {
        lowerBound = middlePoint + 1;
      }
    }
    successfulCounts[spellCurrentIndex] =
      potionCount - firstQualifyingPotionIndex;
  }

  return successfulCounts;
};
