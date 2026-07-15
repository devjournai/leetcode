/**
    * Add Two Promises
    * Intuition: To sum the results of two promises, we must first ensure both promises have successfully resolved. Once their individual numeric values are available, we can perform the addition.
    * Approach: 1. Declare the function as asynchronous to enable the use of the `await` keyword. 2. Use `await` to pause execution and wait for the first promise (`promise1`) to resolve, storing its value in a dedicated variable. 3. Subsequently, use `await` again to pause execution and wait for the second promise (`promise2`) to resolve, storing its value in another distinct variable. 4. Finally, return the sum of these two resolved numeric values. The `async` function implicitly wraps the return value in a Promise, which will resolve with this sum.
    * Dry Run:
    *   Input: `promise1 = Promise.resolve(5)`, `promise2 = Promise.resolve(10)`
    *   1. `addTwoPromises(Promise.resolve(5), Promise.resolve(10))` is invoked.
    *   2. Inside the `async` function:
    *      - `valueOne = await promise1;`
    *        - The function pauses. `promise1` resolves with `5`.
    *        - `valueOne` is assigned `5`.
    *        - The function resumes.
    *      - `valueTwo = await promise2;`
    *        - The function pauses. `promise2` resolves with `10`.
    *        - `valueTwo` is assigned `10`.
    *        - The function resumes.
    *      - `return valueOne + valueTwo;`
    *        - Calculates `5 + 10`, which is `15`.
    *        - The promise returned by `addTwoPromises` resolves with `15`.
    * Time Complexity: O(T1 + T2), where T1 is the resolution time of `promise1` and T2 is the resolution time of `promise2`. This is because `await promise2` will only begin its waiting period after `await promise1` has completely resolved.
    * Space Complexity: O(1), as only a fixed number of variables are used to store the resolved values and the sum, regardless of the promise resolution times.
*/ 
var addTwoPromises = async function(promise1, promise2) {
  const valueOne = await promise1;
  const valueTwo = await promise2;
  return valueOne + valueTwo;
};