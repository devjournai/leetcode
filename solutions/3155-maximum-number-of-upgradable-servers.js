/**
 * Maximum Number of Upgradable Servers
 * Intuition: For each network, selling unused servers funds upgrades. If x servers are upgraded, x * upgrade <= money + (count - x) * sell, so x = (money + count * sell) / (sell + upgrade), capped by count.
 * Approach: 1. For each index i, compute floor((money[i] + count[i] * sell[i]) / (sell[i] + upgrade[i])). 2. Take min with count[i].
 * Dry Run: count = [4], upgrade = [3], sell = [2], money = [4]
 * - x = (4 + 4 * 2) / (2 + 3) = 12 / 5 = 2
 * - min(4, 2) = 2
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxUpgrades = function (count, upgrade, sell, money) {
  return count.map((servers, i) => {
    const upgradable =
      (BigInt(money[i]) + BigInt(servers) * BigInt(sell[i])) /
      (BigInt(sell[i]) + BigInt(upgrade[i]));
    return Number(upgradable < BigInt(servers) ? upgradable : BigInt(servers));
  });
};
