/**
 * Maximum Square Area By Removing Fences From A Field
 *
 * Intuition:
 *
 * We have horizontal fences and vertical fences.
 *
 * The boundaries of the field are also fences:
 *
 *     Horizontal: 1 and m
 *     Vertical:   1 and n
 *
 * ------------------------------------------------------------
 *
 * To create a square, we need:
 *
 *     height === width
 *
 * So we need to find the largest distance that can be created
 * between two horizontal fences AND between two vertical fences.
 *
 * ------------------------------------------------------------
 *
 * Step 1:
 *
 * Add the field boundaries to both fence arrays.
 *
 * Example:
 *
 *     hFences = [2,4]
 *     m = 5
 *
 *     allHFences = [1,2,4,5]
 *
 * ------------------------------------------------------------
 *
 * Step 2:
 *
 * Generate every possible distance between two horizontal
 * fences.
 *
 * Store these distances in a Set.
 *
 * For example:
 *
 *     [1,2,4,5]
 *
 * Possible distances:
 *
 *     1,3,4,2,3,1
 *
 * We only need unique distances, so a Set is used.
 *
 * ------------------------------------------------------------
 *
 * Step 3:
 *
 * Generate every possible distance between two vertical fences.
 *
 * If the distance also exists in the horizontal Set, then that
 * distance can be used as the side of a square.
 *
 * Keep the maximum such distance.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * Horizontal distances:
 *
 *     {1,2,3,4}
 *
 * Vertical distances:
 *
 *     {1,2,5}
 *
 * Common distances:
 *
 *     {1,2}
 *
 * Maximum square side:
 *
 *     2
 *
 * Area:
 *
 *     2 * 2 = 4
 *
 * ------------------------------------------------------------
 *
 * If no common distance exists, return -1.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(H² + V²)
 * Space Complexity: O(H²)
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
