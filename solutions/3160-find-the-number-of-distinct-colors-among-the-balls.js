/**
 * Find The Number Of Distinct Colors Among The Balls
 * Intuition: Track the current color of each ball and the frequency of each color. After every coloring, the answer is the number of colors with positive frequency.
 * Approach: 1. Maintain ballToColor and colorFrequency maps. 2. For each query, decrement the old color if present, assign the new color, increment its frequency. 3. Push colorFrequency.size after each query.
 * Dry Run:
 *   limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]
 *   After each: 1, 2, 2, 3 distinct colors.
 * Time Complexity: O(Q)
 * Space Complexity: O(Q)
 */
var queryResults = function (limit, queries) {
  const ballToColor = new Map();
  const colorFrequency = new Map();
  const distinctCounts = [];

  for (const [ballIndex, newColor] of queries) {
    if (ballToColor.has(ballIndex)) {
      const previousColor = ballToColor.get(ballIndex);
      const previousFrequency = colorFrequency.get(previousColor) - 1;
      if (previousFrequency === 0) {
        colorFrequency.delete(previousColor);
      } else {
        colorFrequency.set(previousColor, previousFrequency);
      }
    }
    ballToColor.set(ballIndex, newColor);
    colorFrequency.set(newColor, (colorFrequency.get(newColor) || 0) + 1);
    distinctCounts.push(colorFrequency.size);
  }

  return distinctCounts;
};
