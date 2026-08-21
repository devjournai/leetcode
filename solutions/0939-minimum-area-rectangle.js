/**
 * Minimum Area Rectangle
 * Intuition: An axis-aligned rectangle is two distinct x-columns sharing at least two y’s. Area is |Δx|·|Δy| for each pair of shared y’s; take the min.
 * Approach: 1. Map x → Set of y. 2. For every pair of x-keys, collect common y’s. 3. If ≥2 common y’s, try all y pairs and update `minCalculatedArea`. 4. Return 0 if still Infinity.
 * Dry Run: points (1,1),(1,3),(3,1),(3,3) → x=1 and x=3 share y=1,3 → area 2*2=4.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minAreaRect = function (points) {
  const xCoordToYsMap = new Map();

  for (const singlePoint of points) {
    const currentXValue = singlePoint[0];
    const currentYValue = singlePoint[1];
    if (!xCoordToYsMap.has(currentXValue)) {
      xCoordToYsMap.set(currentXValue, new Set());
    }
    xCoordToYsMap.get(currentXValue).add(currentYValue);
  }

  let minCalculatedArea = Infinity;

  const distinctXCoords = Array.from(xCoordToYsMap.keys());
  const xCoordCount = distinctXCoords.length;

  for (let indexFirstX = 0; indexFirstX < xCoordCount; indexFirstX++) {
    const xValueOne = distinctXCoords[indexFirstX];
    const ySetOne = xCoordToYsMap.get(xValueOne);

    for (
      let indexSecondX = indexFirstX + 1;
      indexSecondX < xCoordCount;
      indexSecondX++
    ) {
      const xValueTwo = distinctXCoords[indexSecondX];
      const ySetTwo = xCoordToYsMap.get(xValueTwo);

      const commonYCandidates = [];
      for (const candidateYValue of ySetOne) {
        if (ySetTwo.has(candidateYValue)) {
          commonYCandidates.push(candidateYValue);
        }
      }

      const candidatesCount = commonYCandidates.length;
      if (candidatesCount >= 2) {
        for (
          let indexFirstY = 0;
          indexFirstY < candidatesCount;
          indexFirstY++
        ) {
          const yValueAlpha = commonYCandidates[indexFirstY];
          for (
            let indexSecondY = indexFirstY + 1;
            indexSecondY < candidatesCount;
            indexSecondY++
          ) {
            const yValueBeta = commonYCandidates[indexSecondY];

            const rectWidth = Math.abs(xValueOne - xValueTwo);
            const rectHeight = Math.abs(yValueAlpha - yValueBeta);
            const currentAreaResult = rectWidth * rectHeight;
            minCalculatedArea = Math.min(minCalculatedArea, currentAreaResult);
          }
        }
      }
    }
  }

  return minCalculatedArea === Infinity ? 0 : minCalculatedArea;
};
