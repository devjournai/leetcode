/**
 * Profitable Schemes
 * Intuition: 0/1 knapsack over crimes: `schemeCounts[members][profit]` is ways to use exactly that many people and at least that profit (profit capped at `minProfit`). Iterate members and profit backward so each crime is used at most once.
 * Approach: 1. `schemeCounts[n+1][minProfit+1]`, seed `schemeCounts[0][0] = 1`. 2. For each crime (`requiredMembersForCrime`, `profitFromCrime`), loop members from n down to required, profit from minProfit down to 0. 3. Add ways from `members - required` at `max(0, profit - crimeProfit)`, mod 1e9+7. 4. Sum `schemeCounts[*][minProfit]` over all member counts.
 * Dry Run: n = 5, minProfit = 3, group = [2, 2], profit = [2, 3].
 *   - Empty scheme: [0][0]=1. After crime 0 (2 people, 2 profit): ways include 2 people with profit capped later. After crime 1, schemes hitting profit 3 with ≤5 people sum to 2.
 * Time Complexity: O(group.length * n * minProfit)
 * Space Complexity: O(n * minProfit)
 */
var profitableSchemes = function (n, minProfit, group, profit) {
  const moduloConstant = 1e9 + 7;

  const schemeCounts = Array.from({ length: n + 1 }, () =>
    new Array(minProfit + 1).fill(0)
  );

  schemeCounts[0][0] = 1;

  const totalCrimes = group.length;
  for (let crimeIndex = 0; crimeIndex < totalCrimes; crimeIndex++) {
    const requiredMembersForCrime = group[crimeIndex];
    const profitFromCrime = profit[crimeIndex];

    for (
      let currentMemberCount = n;
      currentMemberCount >= requiredMembersForCrime;
      currentMemberCount--
    ) {
      for (
        let achievedProfit = minProfit;
        achievedProfit >= 0;
        achievedProfit--
      ) {
        const previousProfitRequired = Math.max(
          0,
          achievedProfit - profitFromCrime
        );

        schemeCounts[currentMemberCount][achievedProfit] =
          (schemeCounts[currentMemberCount][achievedProfit] +
            schemeCounts[currentMemberCount - requiredMembersForCrime][
              previousProfitRequired
            ]) %
          moduloConstant;
      }
    }
  }

  let totalProfitableSchemes = 0;
  for (let finalMemberCount = 0; finalMemberCount <= n; finalMemberCount++) {
    totalProfitableSchemes =
      (totalProfitableSchemes + schemeCounts[finalMemberCount][minProfit]) %
      moduloConstant;
  }

  return totalProfitableSchemes;
};
