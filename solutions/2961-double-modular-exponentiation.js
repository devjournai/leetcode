/**
 * Double Modular Exponentiation
 * Intuition: The problem describes a nested modular exponentiation formula. The key is to evaluate the inner exponentiation `(a^b % 10)` first, and then use that intermediate result as the base for the outer exponentiation `(intermediateResult^c % m)`. Since the exponents and moduli are relatively small, a direct iterative approach for modular exponentiation is efficient enough.
 * Approach: 1. Initialize an empty array `goodIndicesCollector` to store the indices that satisfy the given condition. 2. Iterate through each set of variables `[ai, bi, ci, mi]` in the input `variables` array using a `for` loop, keeping track of the `currentVariableIndex`. 3. For each set, calculate the first modular exponentiation `(ai^bi) % 10`. This is done using a `while` loop, accumulating the result in `intermediateModTenResult` while applying the modulo at each step to prevent overflow and keep the numbers small. 4. Use `intermediateModTenResult` as the base to calculate the second modular exponentiation `(intermediateModTenResult^ci) % mi`. This is performed with a separate `while` loop, accumulating into `ultimateValue`, also applying modulo at each step. 5. Compare `ultimateValue` with the given `target`. If they are equal, add `currentVariableIndex` to `goodIndicesCollector`. 6. After processing all variable sets, return `goodIndicesCollector`.
 * Dry Run: variables = [[2,3,3,10], [3,3,3,1], [6,3,2,10]], target = 0
 * 1. goodIndicesCollector = []
 * 2. currentVariableIndex = 0; variables[0] = [2,3,3,10]
 *    primaryBase = 2, firstExponent = 3, secondExponent = 3, finalModulus = 10
 *    Calculate (2^3) % 10:
 *      intermediateModTenResult = 1
 *      firstLoopCounter = 0; while (0 < 3): intermediateModTenResult = (1 * 2) % 10 = 2; firstLoopCounter = 1
 *      firstLoopCounter = 1; while (1 < 3): intermediateModTenResult = (2 * 2) % 10 = 4; firstLoopCounter = 2
 *      firstLoopCounter = 2; while (2 < 3): intermediateModTenResult = (4 * 2) % 10 = 8; firstLoopCounter = 3
 *      Loop ends. intermediateModTenResult = 8.
 *    Calculate (8^3) % 10:
 *      ultimateValue = 1
 *      secondLoopCounter = 0; while (0 < 3): ultimateValue = (1 * 8) % 10 = 8; secondLoopCounter = 1
 *      secondLoopCounter = 1; while (1 < 3): ultimateValue = (8 * 8) % 10 = 64 % 10 = 4; secondLoopCounter = 2
 *      secondLoopCounter = 2; while (2 < 3): ultimateValue = (4 * 8) % 10 = 32 % 10 = 2; secondLoopCounter = 3
 *      Loop ends. ultimateValue = 2.
 *    ultimateValue (2) !== target (0).
 * 3. currentVariableIndex = 1; variables[1] = [3,3,3,1]
 *    primaryBase = 3, firstExponent = 3, secondExponent = 3, finalModulus = 1
 *    Calculate (3^3) % 10:
 *      intermediateModTenResult = 1 -> 3 -> 9 -> 27 % 10 = 7.
 *      intermediateModTenResult = 7.
 *    Calculate (7^3) % 1:
 *      ultimateValue = 1
 *      secondLoopCounter = 0; while (0 < 3): ultimateValue = (1 * 7) % 1 = 0; secondLoopCounter = 1
 *      secondLoopCounter = 1; while (1 < 3): ultimateValue = (0 * 7) % 1 = 0; secondLoopCounter = 2
 *      secondLoopCounter = 2; while (2 < 3): ultimateValue = (0 * 7) % 1 = 0; secondLoopCounter = 3
 *      Loop ends. ultimateValue = 0. (Any number modulo 1 is 0).
 *    ultimateValue (0) === target (0). goodIndicesCollector = [0, 1].
 * 4. currentVariableIndex = 2; variables[2] = [6,3,2,10]
 *    primaryBase = 6, firstExponent = 3, secondExponent = 2, finalModulus = 10
 *    Calculate (6^3) % 10:
 *      intermediateModTenResult = 1 -> 6 -> 36 % 10 = 6 -> 6 * 6 % 10 = 6.
 *      intermediateModTenResult = 6. (Powers of 6 always end in 6).
 *    Calculate (6^2) % 10:
 *      ultimateValue = 1
 *      secondLoopCounter = 0; while (0 < 2): ultimateValue = (1 * 6) % 10 = 6; secondLoopCounter = 1
 *      secondLoopCounter = 1; while (1 < 2): ultimateValue = (6 * 6) % 10 = 36 % 10 = 6; secondLoopCounter = 2
 *      Loop ends. ultimateValue = 6.
 *    ultimateValue (6) !== target (0).
 * 5. Loop ends.
 * Return [0, 1].
 * Time Complexity: O(N * (max(bi) + max(ci)))
 * Space Complexity: O(N)
 */
var getGoodIndices = function (variables, target) {
  const goodIndicesCollector = [];

  for (
    let currentVariableIndex = 0;
    currentVariableIndex < variables.length;
    currentVariableIndex++
  ) {
    const currentVariableSet = variables[currentVariableIndex];
    const primaryBase = currentVariableSet[0];
    const firstExponent = currentVariableSet[1];
    const secondExponent = currentVariableSet[2];
    const finalModulus = currentVariableSet[3];

    let intermediateModTenResult = 1;
    let firstLoopCounter = 0;
    while (firstLoopCounter < firstExponent) {
      intermediateModTenResult = (intermediateModTenResult * primaryBase) % 10;
      firstLoopCounter++;
    }

    let ultimateValue = 1;
    let secondLoopCounter = 0;
    while (secondLoopCounter < secondExponent) {
      ultimateValue = (ultimateValue * intermediateModTenResult) % finalModulus;
      secondLoopCounter++;
    }

    if (ultimateValue === target) {
      goodIndicesCollector.push(currentVariableIndex);
    }
  }

  return goodIndicesCollector;
};
