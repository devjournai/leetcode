/**
 * Counter Ii
 * Intuition: The problem requires creating a stateful counter where an initial value is provided, and the counter's state can be manipulated (incremented, decremented, or reset) by specific methods. This setup is a classic use case for closures in JavaScript, where the inner functions (increment, decrement, reset) can "remember" and modify variables from their lexical environment (the outer createCounter function) even after the outer function has finished execution.
 * Approach: 1. Define the `createCounter` function that accepts an `initValue` parameter. 2. Inside `createCounter`, declare a variable, `currentCount`, initialized to `initValue`, to hold the current mutable state of the counter. 3. Declare another variable, `savedInitialValue`, also initialized to `initValue`, to store the original starting value, which will be used for the `reset` operation. 4. Return an object containing three distinct methods: `increment`, `decrement`, and `reset`. 5. The `increment` method will add `1` to `currentCount` and then return its new value. 6. The `decrement` method will subtract `1` from `currentCount` and then return its new value. 7. The `reset` method will reassign `savedInitialValue` back to `currentCount` and then return its new value.
 * Dry Run:
 * Input: createCounter(5)
 * 1. `createCounter(5)` is called.
 *    - `initValue` is 5.
 *    - `currentCount` is initialized to 5.
 *    - `savedInitialValue` is initialized to 5.
 *    - An object `counterInstance` is returned, containing `increment`, `decrement`, and `reset` methods.
 *
 * 2. Call `counterInstance.increment()`:
 *    - `currentCount` becomes `5 + 1 = 6`.
 *    - The method returns `6`.
 *    - Internal state: `currentCount` = 6, `savedInitialValue` = 5.
 *
 * 3. Call `counterInstance.increment()`:
 *    - `currentCount` becomes `6 + 1 = 7`.
 *    - The method returns `7`.
 *    - Internal state: `currentCount` = 7, `savedInitialValue` = 5.
 *
 * 4. Call `counterInstance.decrement()`:
 *    - `currentCount` becomes `7 - 1 = 6`.
 *    - The method returns `6`.
 *    - Internal state: `currentCount` = 6, `savedInitialValue` = 5.
 *
 * 5. Call `counterInstance.reset()`:
 *    - `currentCount` is set to `savedInitialValue` (which is 5).
 *    - The method returns `5`.
 *    - Internal state: `currentCount` = 5, `savedInitialValue` = 5.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var createCounter = function (initialValueProvided) {
  let currentCountValue = initialValueProvided;
  let storedInitialReference = initialValueProvided;

  return {
    increment: function () {
      currentCountValue = currentCountValue + 1;
      return currentCountValue;
    },
    decrement: function () {
      currentCountValue = currentCountValue - 1;
      return currentCountValue;
    },
    reset: function () {
      currentCountValue = storedInitialReference;
      return currentCountValue;
    },
  };
};
