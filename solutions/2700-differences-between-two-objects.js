/**
 * Differences Between Two Objects
 * Intuition: Recursively compare structures at each level, identifying immediate discrepancies or delegating to nested comparisons.
 * Approach: 1. Establish base cases for identical values, type mismatches (primitives vs. objects, nulls), or array vs. object mismatches. These cases either return an empty object (no difference) or a two-element array representing the primitive difference. 2. For non-primitive, structurally similar objects or arrays, initialize an empty object to collect differences. 3. Iterate through the keys present in the first object. 4. For each key, if it also exists in the second object, recursively call the comparison function for their corresponding values. 5. If the recursive call returns a non-empty object (indicating nested differences) or an array (indicating a leaf-level difference), store this result in the collected differences object under the current key. 6. After iterating all relevant keys, return the collected differences.
 * Dry Run: objDiff({a: 1, b: {c: 2}}, {a: 1, b: {c: 3, d: 4}})
 *   - Initial Call: objDiff(objSource={a: 1, b: {c: 2}}, objTarget={a: 1, b: {c: 3, d: 4}})
 *   - Neither `objSource === objTarget` nor type/null/array-object mismatches apply.
 *   - `detectedDifferences = {}`
 *   - Loop `currentKey` in `objSource`:
 *     - `currentKey = 'a'`:
 *       - `propertyExistsInTarget` is true (both have 'a').
 *       - Recursive call: `comparisonOutcome = objDiff(objSource['a'], objTarget['a'])` which is `objDiff(1, 1)`.
 *         - Inside: `1 === 1` is true. Returns `{}`.
 *       - Back in main: `comparisonOutcome = {}`. `outcomeKeysCount = 0`, `outcomeIsArray = false`.
 *       - `(0 > 0 || false)` is false. Nothing added to `detectedDifferences` for 'a'.
 *     - `currentKey = 'b'`:
 *       - `propertyExistsInTarget` is true (both have 'b').
 *       - Recursive call: `comparisonOutcome = objDiff(objSource['b'], objTarget['b'])` which is `objDiff({c: 2}, {c: 3, d: 4})`.
 *         - Inside Nested Call: `nestedSource={c: 2}, nestedTarget={c: 3, d: 4}`
 *         - No base cases match. `nestedDifferences = {}`.
 *         - Loop `nestedKey` in `nestedSource`:
 *           - `nestedKey = 'c'`:
 *             - `nestedPropertyExistsInTarget` is true.
 *             - Innermost recursive call: `nestedOutcome = objDiff(nestedSource['c'], nestedTarget['c'])` which is `objDiff(2, 3)`.
 *               - Inside Innermost: `2 !== 3`. Returns `[2, 3]`.
 *             - Back in Nested: `nestedOutcome = [2, 3]`. `nestedOutcomeKeysCount = 0`, `nestedOutcomeIsArray = true`.
 *             - `(0 > 0 || true)` is true. `nestedDifferences['c'] = [2, 3]`.
 *           - Loop finishes for `nestedSource`.
 *         - Returns `nestedDifferences = {c: [2, 3]}`.
 *       - Back in main: `comparisonOutcome = {c: [2, 3]}`. `outcomeKeysCount = 1`, `outcomeIsArray = false`.
 *       - `(1 > 0 || false)` is true. `detectedDifferences['b'] = {c: [2, 3]}`.
 *   - Loop finishes for `objSource`.
 *   - Returns `detectedDifferences = {b: {c: [2, 3]}}`.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
function objDiff(objSource, objTarget) {
  if (objSource === objTarget) {
    return {};
  }

  const isSourceNull = objSource === null;
  const isTargetNull = objTarget === null;
  const areTypesDifferent = typeof objSource !== typeof objTarget;
  const isSourcePrimitive = typeof objSource !== "object";

  if (isSourceNull || isTargetNull || areTypesDifferent || isSourcePrimitive) {
    return [objSource, objTarget];
  }

  const isSourceAnArray = Array.isArray(objSource);
  const isTargetAnArray = Array.isArray(objTarget);

  if (isSourceAnArray !== isTargetAnArray) {
    return [objSource, objTarget];
  }

  const detectedDifferences = {};
  for (const currentKey in objSource) {
    const propertyExistsInTarget = Object.prototype.hasOwnProperty.call(
      objTarget,
      currentKey,
    );

    if (propertyExistsInTarget) {
      const comparisonOutcome = objDiff(
        objSource[currentKey],
        objTarget[currentKey],
      );
      const outcomeKeysCount = Object.keys(comparisonOutcome).length;
      const outcomeIsArray = Array.isArray(comparisonOutcome);

      if (outcomeKeysCount > 0 || outcomeIsArray) {
        detectedDifferences[currentKey] = comparisonOutcome;
      }
    }
  }

  return detectedDifferences;
}
