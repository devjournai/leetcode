/**
 * Strange Printer
 * Time Complexity: O(n^3)
 * Space Complexity: O(n^2)
 */
var strangePrinter = function (s) {
  const totalLength = s.length;
  if (totalLength === 0) {
    return 0;
  }

  const minTurns = new Array(totalLength)
    .fill(0)
    .map(() => new Array(totalLength).fill(0));

  for (let currentLength = 1; currentLength <= totalLength; currentLength++) {
    for (
      let startIndex = 0;
      startIndex <= totalLength - currentLength;
      startIndex++
    ) {
      const endIndex = startIndex + currentLength - 1;

      if (currentLength === 1) {
        minTurns[startIndex][endIndex] = 1;
      } else {
        minTurns[startIndex][endIndex] = minTurns[startIndex][endIndex - 1] + 1;

        for (let splitPoint = startIndex; splitPoint < endIndex; splitPoint++) {
          if (s[splitPoint] === s[endIndex]) {
            const valLeft = minTurns[startIndex][splitPoint];
            const valRight =
              splitPoint + 1 <= endIndex - 1
                ? minTurns[splitPoint + 1][endIndex - 1]
                : 0;
            const intermediateCost = valLeft + valRight;
            minTurns[startIndex][endIndex] = Math.min(
              minTurns[startIndex][endIndex],
              intermediateCost,
            );
          }
        }
      }
    }
  }

  return minTurns[0][totalLength - 1];
};
