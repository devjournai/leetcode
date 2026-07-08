/**
 * Curry
 * Intuition: The fundamental concept of currying involves transforming a function that takes multiple arguments into a sequence of functions, each taking a single argument. This transformation implies that we need to accumulate arguments across these sequential calls. The process continues until enough arguments have been gathered to execute the original function. If not enough arguments are present, a new function is returned, which itself is capable of collecting further arguments.
 * Approach: 1. Determine the arity (number of expected arguments) of the original function `fn` using `fn.length`. This value will act as the threshold for execution. 2. Create a recursive helper function, `argumentCollector`, which will serve as the curried function itself. This function accepts all arguments accumulated so far in the current call chain via rest parameters `...receivedParameters`. 3. Inside `argumentCollector`, compare the `receivedParameters.length` with the stored arity. 4. If `receivedParameters.length` is greater than or equal to the arity, it means enough arguments have been collected. In this case, invoke `fn` with `...receivedParameters` and return its result directly. 5. If `receivedParameters.length` is less than the arity, it means more arguments are needed. Return a new arrow function, `nextStageFunction`. This `nextStageFunction` will encapsulate the `receivedParameters` in its closure. 6. When `nextStageFunction` is called, it receives its own arguments (`...additionalArguments`). It then combines these `additionalArguments` with the `receivedParameters` (from its closure) to form `combinedArguments`. 7. `nextStageFunction` then recursively calls `argumentCollector` with these `combinedArguments`, effectively continuing the argument collection process. 8. The `curry` function initially returns `argumentCollector` to start the currying process.
 * Dry Run:
 * Input: fn = (a, b, c) => a + b + c;
 * curriedSum = curry(fn);
 *
 * 1. `curry(fn)` is called.
 *    - `originalFunctionArity` is set to `3` (from `fn.length`).
 *    - `argumentCollector` function is defined and returned.
 *    - `curriedSum` now references `argumentCollector`.
 *
 * 2. `curriedSum(1)` is called. This invokes `argumentCollector(1)`.
 *    - `receivedParameters` is `[1]`.
 *    - `receivedParameters.length` (1) is not `>= originalFunctionArity` (3).
 *    - A new function `nextStageFunction` is created and returned. This function has access to `receivedParameters = [1]` via closure.
 *    - `curriedSum` now references this `nextStageFunction`.
 *
 * 3. `curriedSum(2)` is called. This invokes the `nextStageFunction` (from step 2) with `2`.
 *    - `additionalArguments` is `[2]`.
 *    - `receivedParameters` (from closure) is `[1]`.
 *    - `combinedArguments` becomes `[1].concat([2])` which is `[1, 2]`.
 *    - `argumentCollector([1, 2])` is recursively called.
 *      - `receivedParameters` is `[1, 2]`.
 *      - `receivedParameters.length` (2) is not `>= originalFunctionArity` (3).
 *      - A *new* `nextStageFunction` is created and returned. This function has access to `receivedParameters = [1, 2]`.
 *      - This new `nextStageFunction` is returned by the previous `nextStageFunction(2)`.
 *    - `curriedSum` now references this *new* `nextStageFunction`.
 *
 * 4. `curriedSum(3)` is called. This invokes the *new* `nextStageFunction` (from step 3) with `3`.
 *    - `additionalArguments` is `[3]`.
 *    - `receivedParameters` (from closure) is `[1, 2]`.
 *    - `combinedArguments` becomes `[1, 2].concat([3])` which is `[1, 2, 3]`.
 *    - `argumentCollector([1, 2, 3])` is recursively called.
 *      - `receivedParameters` is `[1, 2, 3]`.
 *      - `receivedParameters.length` (3) IS `>= originalFunctionArity` (3).
 *      - `fn(...receivedParameters)` is executed: `fn(1, 2, 3)` which returns `6`.
 *      - `6` is returned.
 *    - This `6` is returned by the `nextStageFunction(3)`.
 *
 * Output: `6`.
 *
 * Example with batch arguments: `curriedSum(1, 2)(3)`
 *
 * 1. `curry(fn)` is called (same as above).
 * 2. `curriedSum(1, 2)` is called. This invokes `argumentCollector(1, 2)`.
 *    - `receivedParameters` is `[1, 2]`.
 *    - `receivedParameters.length` (2) is not `>= originalFunctionArity` (3).
 *    - A new `nextStageFunction` is created and returned, holding `receivedParameters = [1, 2]`.
 *    - The expression `curriedSum(1, 2)` evaluates to this `nextStageFunction`.
 *
 * 3. The returned `nextStageFunction` is immediately invoked with `(3)`.
 *    - `additionalArguments` is `[3]`.
 *    - `receivedParameters` (from closure) is `[1, 2]`.
 *    - `combinedArguments` becomes `[1, 2].concat([3])` which is `[1, 2, 3]`.
 *    - `argumentCollector([1, 2, 3])` is recursively called.
 *      - `receivedParameters` is `[1, 2, 3]`.
 *      - `receivedParameters.length` (3) IS `>= originalFunctionArity` (3).
 *      - `fn(1, 2, 3)` returns `6`.
 *      - `6` is returned.
 *
 * Output: `6`.
 *
 * Time Complexity: O(N^2 + X)
 * Space Complexity: O(N + Y)
 */
var curry = function (fn) {
  const originalFunctionArity = fn.length;

  const argumentCollector = function (...receivedParameters) {
    if (receivedParameters.length >= originalFunctionArity) {
      return fn(...receivedParameters);
    } else {
      const nextStageFunction = (...additionalArguments) => {
        const combinedArguments =
          receivedParameters.concat(additionalArguments);
        return argumentCollector(...combinedArguments);
      };
      return nextStageFunction;
    }
  };
  return argumentCollector;
};
