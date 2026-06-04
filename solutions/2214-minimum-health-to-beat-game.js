/**
 * Minimum Health To Beat Game
 * Intuition: To minimize the initial health, we must maximize the health saved by using the armor optimally. The armor is most effective when applied to the level that causes the highest damage, reducing that damage by at most its value.
 * Approach: 1. Calculate the sum of all damage values to find the total health lost without any armor. 2. Identify the maximum single damage value among all levels. 3. Determine the actual damage reduction possible with armor by taking the minimum of the given armor value and the maximum single damage found. 4. Subtract this optimal damage reduction from the total damage. 5. Add 1 to the result to ensure health remains strictly greater than zero after the final level.
 * Dry Run: damage = [2, 7, 4], armor = 4
 * 1. totalDamageValue (sum of damage): 2 + 7 + 4 = 13.
 * 2. maximumLevelHealthLoss (max damage): Math.max(2, 7, 4) = 7.
 * 3. effectiveArmorProtection (min(armor, max_damage)): Math.min(4, 7) = 4.
 * 4. Net damage after armor: 13 - 4 = 9.
 * 5. Minimum starting health: 9 + 1 = 10.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumHealth = function (damage, armor) {
  const totalDamageValue = damage.reduce(
    (currentSum, currentDmg) => currentSum + currentDmg,
    0,
  );
  const maximumLevelHealthLoss = Math.max(...damage);
  const effectiveArmorProtection = Math.min(armor, maximumLevelHealthLoss);

  return totalDamageValue - effectiveArmorProtection + 1;
};
