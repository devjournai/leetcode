/**
 * Profitable Schemes
 * Time Complexity: O(group.length * n * minProfit)
 * Space Complexity: O(n * minProfit)
 */
var profitableSchemes = function (n, minProfit, group, profit) {
  const moduloConstant = 1e9 + 7;

  const schemeCounts = Array.from({ length: n + 1 }, () =>
    new Array(minProfit + 1).fill(0),
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
          achievedProfit - profitFromCrime,
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
