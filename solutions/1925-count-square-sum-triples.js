/**
 * Count Square Sum Triples
 * Intuition: Count ordered triples `(a,b,c)` with `1 ≤ a,b,c ≤ n` and `a² + b² = c²`. For each hypotenuse `c` and first leg `a`, check whether `c² - a²` is a perfect square `b` still in range (this counts both `(a,b,c)` and `(b,a,c)` when `a ≠ b`).
 * Approach: 1. Loop `hypotenuseValue` from 1 to `n`. 2. For each `firstLeg` in `[1, hypotenuse)`. 3. If `sqrt(c² - a²)` is an integer `≤ n`, increment `tripleCount`. 4. Return the count.
 * Dry Run: n = 5.
 *   - c=5, a=3 → 25-9=16, b=4 integer → count=1
 *   - c=5, a=4 → 25-16=9, b=3 integer → count=2. Others fail. Return 2.
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
