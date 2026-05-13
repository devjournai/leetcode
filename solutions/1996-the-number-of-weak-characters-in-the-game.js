/**
 * The Number Of Weak Characters In The Game
 * Intuition: To identify weak characters efficiently, we need to structure the data such that checking the 'strictly greater attack' condition is straightforward. Sorting the characters primarily by descending attack ensures that when we process a character, any character with a strictly greater attack would have already been considered. For characters with equal attack, an ascending defense sort helps to correctly maintain the maximum defense seen from characters that could potentially make the current one weak.
 * Approach:
 * 1. Initialize a counter, `weakCharacterTotal`, to zero.
 * 2. Initialize `maxDefenseFound` to zero.
 * 3. Sort the input `properties` array. The primary sorting criterion is the attack value in descending order (higher attack comes first). If two characters have the same attack value, they are then sorted by their defense value in ascending order (lower defense comes first). This specific sort order is crucial.
 * 4. Iterate through the sorted `properties` array using a `for...of` loop. For each `characterInfo` (an array `[attack, defense]`) in the sorted list:
 *    a. Extract `currentDefenseScore` from `characterInfo`.
 *    b. If `currentDefenseScore` is strictly less than `maxDefenseFound`, it means there's a previously encountered character (or set of characters) that had a strictly greater attack (due to descending attack sort) and a defense value that contributed to `maxDefenseFound` (which is greater than `currentDefenseScore`). In this scenario, the current character is weak, so increment `weakCharacterTotal`.
 *    c. Update `maxDefenseFound` to be the maximum of its current value and `currentDefenseScore`.
 * 5. Return `weakCharacterTotal`.
 * Dry Run:
 * Input: properties = [[1,5],[10,4],[4,2]]
 * 1. weakCharacterTotal = 0, maxDefenseFound = 0
 * 2. Sorted properties (Attack Desc, Defense Asc for ties): [[10,4], [4,2], [1,5]]
 * 3. Iteration:
 *    a. characterInfo = [10,4]
 *       currentDefenseScore = 4. Is 4 < 0? No.
 *       maxDefenseFound = Math.max(0, 4) = 4.
 *    b. characterInfo = [4,2]
 *       currentDefenseScore = 2. Is 2 < 4? Yes. weakCharacterTotal becomes 1.
 *       maxDefenseFound = Math.max(4, 2) = 4.
 *    c. characterInfo = [1,5]
 *       currentDefenseScore = 5. Is 5 < 4? No.
 *       maxDefenseFound = Math.max(4, 5) = 5.
 * 4. Return weakCharacterTotal = 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var numberOfWeakCharacters = function (properties) {
  let weakCharacterTotal = 0;
  let maxDefenseFound = 0;

  properties.sort((characterA, characterB) => {
    const firstAttack = characterA[0];
    const secondAttack = characterB[0];
    const firstDefense = characterA[1];
    const secondDefense = characterB[1];

    if (firstAttack === secondAttack) {
      return firstDefense - secondDefense;
    }
    return secondAttack - firstAttack;
  });

  for (const characterInfo of properties) {
    const currentDefenseScore = characterInfo[1];
    if (currentDefenseScore < maxDefenseFound) {
      weakCharacterTotal++;
    }
    maxDefenseFound = Math.max(maxDefenseFound, currentDefenseScore);
  }

  return weakCharacterTotal;
};
