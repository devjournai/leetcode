/**
 * Maximum Square Area By Removing Fences From A Field
 * Time Complexity: O((H + V)^2)
 * Space Complexity: O((H + V)^2)
 */
var maximizeSquareArea = function (m, n, hFences, vFences) {
  const MOD = 1000000000 + 7;

  const allHFences = [1, m, ...hFences];
  const allVFences = [1, n, ...vFences];

  allHFences.sort((a, b) => a - b);
  allVFences.sort((a, b) => a - b);

  const hDiffs = new Set();
  for (let i = 0; i < allHFences.length; i++) {
    for (let j = i + 1; j < allHFences.length; j++) {
      hDiffs.add(allHFences[j] - allHFences[i]);
    }
  }

  let maxSide = 0;

  for (let i = 0; i < allVFences.length; i++) {
    for (let j = i + 1; j < allVFences.length; j++) {
      const currentWidth = allVFences[j] - allVFences[i];
      if (hDiffs.has(currentWidth)) {
        maxSide = Math.max(maxSide, currentWidth);
      }
    }
  }

  if (maxSide === 0) {
    return -1;
  }

  const result = (BigInt(maxSide) * BigInt(maxSide)) % BigInt(MOD);

  return Number(result);
};
