/**
 * Check If Object Instance Of Class
 * Intuition: The fundamental concept of an "instance of a class" in JavaScript is directly tied to the prototype chain. If the prototype of the specified `classFunction` is found anywhere within the prototype chain of the given `obj`, then `obj` is considered an instance of `classFunction`.
 * Approach: 1. Validate initial conditions: If `obj` is `null` or `undefined`, or if `classFunction` is not a callable function, it cannot be an instance, so return `false`. 2. Obtain the immediate prototype of `obj` using `Object.getPrototypeOf()`. Also, get the `prototype` property of `classFunction`. 3. Iterate through `obj`'s prototype chain: In a loop, compare the current prototype in `obj`'s chain with `classFunction.prototype`. If they match, return `true`. If not, move up to the next prototype in the chain until `null` is reached. If `null` is reached without a match, return `false`.
 * Dry Run: checkIfInstanceOf(new Set(), Object)
 *   1. The input `obj` (a new Set instance) is not `null` or `undefined`. The input `classFunction` (`Object`) is a function.
 *   2. `currentObjectPrototype` is initialized to `Object.getPrototypeOf(new Set())`, which evaluates to `Set.prototype`.
 *   3. `targetPrototype` is initialized to `Object.prototype`.
 *   4. The `while` loop begins:
 *      a. **Iteration 1**: `currentObjectPrototype` (`Set.prototype`) is not `null`. `Set.prototype === targetPrototype` (`Object.prototype`) is `false`. `currentObjectPrototype` is updated to `Object.getPrototypeOf(Set.prototype)`, which evaluates to `Object.prototype`.
 *      b. **Iteration 2**: `currentObjectPrototype` (`Object.prototype`) is not `null`. `currentObjectPrototype` (`Object.prototype`) `=== targetPrototype` (`Object.prototype`) is `true`.
 *      c. The function immediately returns `true`.
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (
    obj === null ||
    obj === undefined ||
    typeof classFunction !== "function"
  ) {
    return false;
  }

  let currentObjectPrototype = Object.getPrototypeOf(obj);
  let targetClassPrototype = classFunction.prototype;

  while (currentObjectPrototype !== null) {
    if (currentObjectPrototype === targetClassPrototype) {
      return true;
    }
    currentObjectPrototype = Object.getPrototypeOf(currentObjectPrototype);
  }

  return false;
};
