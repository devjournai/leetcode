/**
 * Create Hello World Function
 * Intuition: The problem requires a function that, when called, returns another function. This inner function must consistently yield the string "Hello World". This is a direct application of a closure where the outer function `createHelloWorld` defines and returns an anonymous function that always performs the single action of returning a fixed string.
 * Approach: 1. Define the outer function `createHelloWorld` as specified by the LeetCode signature. 2. Within `createHelloWorld`, use an anonymous arrow function as the return value. 3. Configure this anonymous arrow function to directly return the literal string "Hello World".
 * Dry Run: Input: Call `createHelloWorld()`. 1. The `createHelloWorld` function is invoked. 2. Inside `createHelloWorld`, an anonymous arrow function `() => 'Hello World'` is created. 3. This newly created function, let's name it `anotherFunction` for clarity, is returned by `createHelloWorld`. 4. If `anotherFunction()` is subsequently called, it executes its body `return 'Hello World'`, resulting in the output "Hello World".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var createHelloWorld = function () {
  return function () {
    return "Hello World";
  };
};
