/**
 * Function Composition
 * Intuition: Function composition requires applying a series of functions sequentially from right to left, starting with an initial input value. This can be achieved by iterating through the array of functions in reverse order, accumulating the result of each function application.
 * Approach: 1. Define the `compose` function that takes an array of `functions`. 2. Return a new anonymous function, which will serve as the composed function and accepts an `inputParameter`. 3. Inside this returned function, initialize a `finalValue` with the `inputParameter`. 4. Determine the total `functionCount` for iteration. 5. Implement a `for` loop that iterates backward from the last function in the `functions` array (index `functionCount - 1`) down to the first function (index `0`). 6. In each iteration, retrieve the `currentHandler` function from the `functions` array at the `indexPosition`. 7. Update `finalValue` by calling `currentHandler` with the current `finalValue` as its argument. 8. After the loop completes, return the `finalValue`. For an empty `functions` array, the loop will not execute, and `inputParameter` will be returned directly, correctly implementing the identity function.
 * Dry Run:
 *   Input: `functions = [(val) => val + 1, (val) => val * 2]`, `valuePassed = 5`
 *   1. `compose` is invoked with `functions` array `[(val) => val + 1, (val) => val * 2]`.
 *   2. `compose` returns a new anonymous `composedFunction`.
 *   3. `composedFunction(5)` is called. Inside, `inputParameter` is `5`.
 *   4. `finalValue` is initialized to `5`.
 *   5. `functionCount` is `2`.
 *   6. The `for` loop begins, iterating from `indexPosition = 1` down to `0`:
 *      - **Iteration 1**: `indexPosition = 1`.
 *        - `currentHandler` becomes `functions[1]` (which is `(val) => val * 2`).
 *        - `finalValue` is updated: `finalValue = currentHandler(finalValue)` => `(5) => 5 * 2`, so `finalValue` becomes `10`.
 *      - **Iteration 2**: `indexPosition = 0`.
 *        - `currentHandler` becomes `functions[0]` (which is `(val) => val + 1`).
 *        - `finalValue` is updated: `finalValue = currentHandler(finalValue)` => `(10) => 10 + 1`, so `finalValue` becomes `11`.
 *   7. The loop finishes.
 *   8. The `composedFunction` returns `finalValue`, which is `11`.
 *   This trace correctly yields `f(g(5)) = (5 * 2) + 1 = 11`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var compose = function (functions) {
  return function (inputParameter) {
    let finalValue = inputParameter;
    let functionCount = functions.length;

    for (
      let indexPosition = functionCount - 1;
      indexPosition >= 0;
      indexPosition--
    ) {
      let currentHandler = functions[indexPosition];
      finalValue = currentHandler(finalValue);
    }

    return finalValue;
  };
};
