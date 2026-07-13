/**
 * To Be Or Not To Be
 * Intuition: The problem requires building a testing utility similar to `expect` in frameworks like Jest. The core idea is to capture an initial value and provide methods to assert conditions against it, throwing specific errors if the assertions fail.
 * Approach: 1. Define the `expect` function, which takes an `initialValue` and serves as a closure to capture this value. 2. Return an object from `expect` containing two methods: `toBe` and `notToBe`. 3. Implement `toBe`: it takes a `comparisonValue`, checks if `initialValue` strictly equals `comparisonValue`. If true, it returns `true`; otherwise, it throws an `Error` with the message "Not Equal". 4. Implement `notToBe`: it takes an `anotherComparisonValue`, checks if `initialValue` strictly does not equal `anotherComparisonValue`. If true, it returns `true`; otherwise, it throws an `Error` with the message "Equal".
 * Dry Run:
 * Input: expect(5)
 * 1. `expect` is called with `initialValue` = 5.
 * 2. It returns an object with `toBe` and `notToBe` methods, both closing over `initialValue` = 5.
 *
 * Test Case 1: expect(5).toBe(5)
 * 1. `toBe` method is called with `comparisonValue` = 5.
 * 2. Inside `toBe`, the condition `initialValue === comparisonValue` (5 === 5) evaluates to `true`.
 * 3. The method returns `true`.
 *
 * Test Case 2: expect(5).toBe(null)
 * 1. `toBe` method is called with `comparisonValue` = null.
 * 2. Inside `toBe`, the condition `initialValue === comparisonValue` (5 === null) evaluates to `false`.
 * 3. The `else` block executes, throwing `new Error("Not Equal")`.
 *
 * Test Case 3: expect(5).notToBe(null)
 * 1. `notToBe` method is called with `anotherComparisonValue` = null.
 * 2. Inside `notToBe`, the condition `initialValue !== anotherComparisonValue` (5 !== null) evaluates to `true`.
 * 3. The method returns `true`.
 *
 * Test Case 4: expect(5).notToBe(5)
 * 1. `notToBe` method is called with `anotherComparisonValue` = 5.
 * 2. Inside `notToBe`, the condition `initialValue !== anotherComparisonValue` (5 !== 5) evaluates to `false`.
 * 3. The `else` block executes, throwing `new Error("Equal")`.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var expect = function (initialValue) {
  return {
    toBe: function (comparisonValue) {
      if (initialValue === comparisonValue) {
        return true;
      } else {
        throw new Error("Not Equal");
      }
    },
    notToBe: function (anotherComparisonValue) {
      if (initialValue !== anotherComparisonValue) {
        return true;
      } else {
        throw new Error("Equal");
      }
    },
  };
};
