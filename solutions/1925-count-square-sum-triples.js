/**
 * Count Square Sum Triples
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var countTriples = function (n) {
  let tripleCount = 0;

  for (let hypotenuseValue = 1; hypotenuseValue <= n; hypotenuseValue++) {
    for (let firstLeg = 1; firstLeg < hypotenuseValue; firstLeg++) {
      const squareOfSecondLeg =
        hypotenuseValue * hypotenuseValue - firstLeg * firstLeg;
      const secondLeg = Math.sqrt(squareOfSecondLeg);

      if (Number.isInteger(secondLeg) && secondLeg <= n) {
        tripleCount++;
      }
    }
  }

  return tripleCount;
};
