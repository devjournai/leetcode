/**
 * Calculate Amount Paid In Taxes
 * Intuition: Tax is calculated in tiers. For each tier (bracket), we identify the portion of income that falls within that specific tier's range and apply its corresponding tax rate. We accumulate these taxed amounts until all income is processed or all brackets are exhausted.
 * Approach: 1. Initialize a variable `totalTaxPaidAmount` to zero to track the cumulative tax. 2. Initialize a variable `priorBracketUpperLimit` to zero, representing the upper bound of the income taxed by previous brackets. 3. Iterate through the `brackets` array using a standard `for` loop with an index. 4. In each iteration, extract the `currentBracketUpperLimit` and `currentBracketPercentage` from the current bracket data. 5. Check if the total `income` exceeds `priorBracketUpperLimit`. If not, it means all taxable income has already been accounted for in previous brackets, so we can exit the loop. 6. Calculate `currentTaxableSegment`: this is the portion of income falling within the current bracket. It is the minimum of `income` and `currentBracketUpperLimit`, minus `priorBracketUpperLimit`. 7. Convert `currentBracketPercentage` to a decimal `effectiveTaxRate`. 8. Add `currentTaxableSegment * effectiveTaxRate` to `totalTaxPaidAmount`. 9. Update `priorBracketUpperLimit` to `currentBracketUpperLimit` for the next iteration. 10. If, after processing the current bracket, the `income` is less than or equal to `currentBracketUpperLimit`, it means all the given `income` has been fully taxed, so we break the loop. 11. Return `totalTaxPaidAmount`.
 * Dry Run: brackets = [[10, 10], [20, 20]], income = 15
 * - totalTaxPaidAmount = 0
 * - priorBracketUpperLimit = 0
 * - loopLength = 2
 *
 * - Iteration 1 (bracketNumber = 0):
 *   - currentBracketData = [10, 10]
 *   - currentBracketUpperLimit = 10
 *   - currentBracketPercentage = 10
 *   - income (15) > priorBracketUpperLimit (0) is true.
 *   - currentTaxableSegment = Math.min(15, 10) - 0 = 10 - 0 = 10.
 *   - effectiveTaxRate = 10 / 100 = 0.1.
 *   - totalTaxPaidAmount = 0 + (10 * 0.1) = 1.
 *   - priorBracketUpperLimit = 10.
 *   - income (15) <= currentBracketUpperLimit (10) is false.
 *
 * - Iteration 2 (bracketNumber = 1):
 *   - currentBracketData = [20, 20]
 *   - currentBracketUpperLimit = 20
 *   - currentBracketPercentage = 20
 *   - income (15) > priorBracketUpperLimit (10) is true.
 *   - currentTaxableSegment = Math.min(15, 20) - 10 = 15 - 10 = 5.
 *   - effectiveTaxRate = 20 / 100 = 0.2.
 *   - totalTaxPaidAmount = 1 + (5 * 0.2) = 1 + 1 = 2.
 *   - priorBracketUpperLimit = 20.
 *   - income (15) <= currentBracketUpperLimit (20) is true. Break loop.
 *
 * - Return totalTaxPaidAmount = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var calculateTax = function (brackets, income) {
  let totalTaxPaidAmount = 0;
  let priorBracketUpperLimit = 0;

  let loopLength = brackets.length;

  for (let bracketNumber = 0; bracketNumber < loopLength; bracketNumber++) {
    let currentBracketData = brackets[bracketNumber];
    let currentBracketUpperLimit = currentBracketData[0];
    let currentBracketPercentage = currentBracketData[1];

    if (income > priorBracketUpperLimit) {
      let currentTaxableSegment =
        Math.min(income, currentBracketUpperLimit) - priorBracketUpperLimit;
      let effectiveTaxRate = currentBracketPercentage / 100;
      totalTaxPaidAmount += currentTaxableSegment * effectiveTaxRate;
      priorBracketUpperLimit = currentBracketUpperLimit;

      if (income <= currentBracketUpperLimit) {
        break;
      }
    } else {
      break;
    }
  }

  return totalTaxPaidAmount;
};
