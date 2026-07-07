/**
 * Counter
 * Intuition: A function needs to maintain an internal state that persists across multiple calls. Closures are a fundamental JavaScript concept for achieving this, allowing an inner function to "remember" and modify variables from its outer (enclosing) scope even after the outer function has finished executing.
 * Approach: 1. Define an outer function `createCounter` that accepts the initial number `n`. 2. Inside `createCounter`, declare a variable `counterValueStorage` and initialize it with the input `n`. This variable will hold the current count. 3. Return an anonymous function (a closure). 4. Inside this returned closure, use the post-increment operator (`++`) on `counterValueStorage`. This operator returns the current value of `counterValueStorage` *before* incrementing it, perfectly matching the requirement to return `n`, then `n+1`, `n+2`, etc.
 * Dry Run: Given `n = 5`.
 * 1. `createCounter(5)` is called.
 * 2. `counterValueStorage` is initialized to `5`.
 * 3. An anonymous function, let's call it `myCounter`, is returned.
 * 4. First call: `myCounter()`. `counterValueStorage` is `5`. The post-increment `counterValueStorage++` returns `5`, and then `counterValueStorage` becomes `6`. The function returns `5`.
 * 5. Second call: `myCounter()`. `counterValueStorage` is `6`. The post-increment `counterValueStorage++` returns `6`, and then `counterValueStorage` becomes `7`. The function returns `6`.
 * 6. Third call: `myCounter()`. `counterValueStorage` is `7`. The post-increment `counterValueStorage++` returns `7`, and then `counterValueStorage` becomes `8`. The function returns `7`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var createCounter = function (n) {
  let counterValueStorage = n;
  return function () {
    return counterValueStorage++;
  };
};
