/**
 * Minimum Cost to Convert String I
 *
 * Intuition:
 *
 * We need to convert `source` into `target`.
 *
 * For every position:
 *
 *     source[i] -> target[i]
 *
 * We can perform character transformations using:
 *
 *     original[i] -> changed[i]
 *
 * with the corresponding cost.
 *
 * A transformation can also be performed through intermediate
 * characters.
 *
 * Example:
 *
 *     a -> b = 5
 *     b -> c = 3
 *
 * Then:
 *
 *     a -> c = 8
 *
 * Therefore, this is a shortest-path problem where:
 *
 *     Each lowercase character = a node.
 *     Each transformation = a directed edge.
 *
 * Since there are only 26 characters, Floyd-Warshall is ideal.
 *
 * ------------------------------------------------------------
 *
 * Step 1:
 *
 * Create a 26 x 26 matrix.
 *
 *     charMap[a][b]
 *
 * represents the minimum cost to transform character `a`
 * directly or indirectly into character `b`.
 *
 * Initially:
 *
 *     charMap[i][i] = 0
 *
 * because converting a character into itself costs nothing.
 *
 * All other values start as Infinity.
 *
 * ------------------------------------------------------------
 *
 * Step 2:
 *
 * Add the given transformations.
 *
 * Multiple transformations between the same characters may exist.
 *
 * Example:
 *
 *     a -> b = 5
 *     a -> b = 2
 *
 * We only keep:
 *
 *     a -> b = 2
 *
 * ------------------------------------------------------------
 *
 * Step 3:
 *
 * Run Floyd-Warshall.
 *
 * For every intermediate character:
 *
 *     middle
 *
 * check whether:
 *
 *     start -> middle -> end
 *
 * is cheaper than the currently known:
 *
 *     start -> end
 *
 * ------------------------------------------------------------
 *
 * Step 4:
 *
 * Traverse source and target together.
 *
 * If:
 *
 *     source[i] === target[i]
 *
 * no operation is required.
 *
 * Otherwise:
 *
 *     cost += shortestCost[source[i]][target[i]]
 *
 * If the conversion is impossible, return -1.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * source = "abc"
 * target = "bcd"
 *
 * Suppose:
 *
 *     a -> b = 2
 *     b -> c = 3
 *     c -> d = 4
 *
 * Then:
 *
 *     a -> b = 2
 *     b -> c = 3
 *     c -> d = 4
 *
 * Total:
 *
 *     2 + 3 + 4 = 9
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(N + A³)
 * Space Complexity: O(A²)
 */
var minimumCost = function (source, target, original, changed, cost) {
  const alphabetSize = 26;
  const charMap = new Array(alphabetSize)
    .fill()
    .map(() => new Array(alphabetSize).fill(Infinity));

  for (
    let currentCharIndex = 0;
    currentCharIndex < alphabetSize;
    currentCharIndex++
  ) {
    charMap[currentCharIndex][currentCharIndex] = 0;
  }

  for (
    let transformationIndex = 0;
    transformationIndex < original.length;
    transformationIndex++
  ) {
    const originChar = original[transformationIndex].charCodeAt(0) - 97;
    const destChar = changed[transformationIndex].charCodeAt(0) - 97;
    const currentChangeCost = cost[transformationIndex];
    charMap[originChar][destChar] = Math.min(
      charMap[originChar][destChar],
      currentChangeCost,
    );
  }

  for (let middleChar = 0; middleChar < alphabetSize; middleChar++) {
    for (let startChar = 0; startChar < alphabetSize; startChar++) {
      for (let endChar = 0; endChar < alphabetSize; endChar++) {
        if (
          charMap[startChar][middleChar] !== Infinity &&
          charMap[middleChar][endChar] !== Infinity
        ) {
          charMap[startChar][endChar] = Math.min(
            charMap[startChar][endChar],
            charMap[startChar][middleChar] + charMap[middleChar][endChar],
          );
        }
      }
    }
  }

  let accumulatedCost = 0;
  for (
    let stringPosition = 0;
    stringPosition < source.length;
    stringPosition++
  ) {
    if (source[stringPosition] !== target[stringPosition]) {
      const sourceCharAscii = source[stringPosition].charCodeAt(0) - 97;
      const targetCharAscii = target[stringPosition].charCodeAt(0) - 97;

      const specificConversionCost = charMap[sourceCharAscii][targetCharAscii];
      if (specificConversionCost === Infinity) {
        return -1;
      }
      accumulatedCost += specificConversionCost;
    }
  }

  return accumulatedCost;
};
