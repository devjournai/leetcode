/**
 * Maximum Points After Enemy Battles
 * Intuition: Marking the cheapest enemy costs minEnergy and yields 1 point; every other enemy can be sacrificed for energy. All energy (start plus all but the cheapest) can be spent on that cheapest enemy.
 * Approach: 1. Find minEnergy. 2. If currentEnergy is smaller, return 0. 3. Otherwise return floor((currentEnergy + sum(energies) - minEnergy) / minEnergy).
 * Dry Run:
 *   enemyEnergies = [3, 2, 2], currentEnergy = 2
 *   minEnergy = 2, total usable = 2 + 3 + 2 + 2 - 2 = 7, points = 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumPoints = function (enemyEnergies, currentEnergy) {
  let minimumEnergy = Infinity;
  let energySum = 0;
  for (const enemyEnergy of enemyEnergies) {
    minimumEnergy = Math.min(minimumEnergy, enemyEnergy);
    energySum += enemyEnergy;
  }

  if (currentEnergy < minimumEnergy) {
    return 0;
  }
  return Math.floor(
    (currentEnergy + energySum - minimumEnergy) / minimumEnergy,
  );
};
