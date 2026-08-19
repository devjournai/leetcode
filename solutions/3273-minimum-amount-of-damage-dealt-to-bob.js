/**
 * Minimum Amount of Damage Dealt to Bob
 * Intuition: Every enemy deals damage each second until it dies. Killing i before j is better iff damage[i]/time[i] is larger: Bob should face the highest damage-per-second-to-kill enemies first.
 * Approach: 1. time[i] = ceil(health[i] / power). 2. Sort enemies by damage/time descending. 3. While an enemy is being killed, add (sum of remaining damages) * its time, then drop that enemy's damage from the sum.
 * Dry Run:
 *   power = 4, damage = [1, 2, 3, 4], health = [4, 5, 6, 8]
 *   Times 1, 2, 2, 2. Kill the 4-damage enemy first (ratio 2), then 3, then 2, then 1.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var minDamage = function (power, damage, health) {
  let ans = 0;
  let sumDamage = 0;
  const enemies = [];

  for (let i = 0; i < damage.length; i++) {
    sumDamage += damage[i];
    enemies.push({
      damage: damage[i],
      timeTakenDown: Math.ceil(health[i] / power),
    });
  }

  enemies.sort(
    (a, b) => b.damage * a.timeTakenDown - a.damage * b.timeTakenDown
  );

  for (const enemy of enemies) {
    ans += sumDamage * enemy.timeTakenDown;
    sumDamage -= enemy.damage;
  }

  return ans;
};
