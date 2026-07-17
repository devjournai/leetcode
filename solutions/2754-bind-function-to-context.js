/**
 * Bind Function To Context
 * Intuition: Functions in JavaScript implicitly carry a 'this' context. To change this context permanently for a function's future invocations, we can create a new function that 'remembers' the desired context and original function, then uses a method like 'apply' to call the original function with the stored context and any runtime arguments.
 * Approach: 1. Capture the original function (`this`) into a local variable. 2. Create and return a new anonymous function. 3. Inside this new function, use the `apply` method of the captured original function. 4. Pass the `obj` provided to `bindPolyfill` as the 'this' context for `apply`. 5. Pass the `arguments` (which are the arguments given to the new anonymous function) to `apply` to forward them to the original function.
 * Dry Run:
 * function multiply(factor) { return this.value * factor; }
 * const dataObject = { value: 10 };
 *
 * 1. `multiply.bindPolyfill(dataObject)` is called.
 *    - `originalFunction` gets `multiply`.
 *    - `boundContext` gets `dataObject` (`{ value: 10 }`).
 *    - An anonymous function (`newlyBoundFunction`) is created and returned, closing over `originalFunction` and `boundContext`.
 *    - `const boundMultiplier = newlyBoundFunction;`
 *
 * 2. `boundMultiplier(5)` is called.
 *    - Inside `newlyBoundFunction`:
 *      - `invocationArguments` is `[5]`.
 *      - `originalFunction.apply(boundContext, invocationArguments)` is executed.
 *      - This translates to `multiply.apply({ value: 10 }, [5])`.
 *      - Inside `multiply`:
 *        - `this` is `{ value: 10 }`.
 *        - `factor` is `5`.
 *        - `return this.value * factor;` evaluates to `10 * 5`, which is `50`.
 *      - The `newlyBoundFunction` returns `50`.
 *    - `const result = 50;`
 *    - `result` is `50`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
Function.prototype.bindPolyfill = function (obj) {
  const originalFunction = this;
  const boundContext = obj;

  return function () {
    const invocationArguments = arguments;
    return originalFunction.apply(boundContext, invocationArguments);
  };
};
