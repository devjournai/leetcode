/**
* Interval Cancellation
* Intuition: Utilize JavaScript's built-in `setInterval` to repeatedly execute a function and `clearInterval` to stop its execution, ensuring an immediate initial call.
* Approach: 1. Immediately invoke the provided function `fn` with `args`. 2. Establish a repeating timer using `setInterval` to call `fn` with `args` at every `t` millisecond interval. 3. Store the identifier returned by `setInterval`. 4. Return a new function that, when called, uses `clearInterval` with the stored identifier to halt the repeating calls.
* Dry Run: fn = (num) => console.log(num * 2), args = [5], t = 50.
1. `cancellable((num) => console.log(num * 2), [5], 50)` is executed.
2. `fn(...args)` leads to `console.log(5 * 2)` which prints `10`.
3. `const intervalHandleReference = setInterval(() => fn(...args), t);` is called. `setInterval` is scheduled to call `fn(5)` every 50ms. `intervalHandleReference` holds a unique ID (e.g., 100).
4. The function `() => clearInterval(intervalHandleReference)` is returned. Let's call this `stopperFunction`.
5. If `stopperFunction` is called at 120ms:
- 0ms: `console.log(10)`
- 50ms: `console.log(10)`
- 100ms: `console.log(10)`
- 120ms: `stopperFunction()` is invoked, `clearInterval(100)` stops future calls.
* Time Complexity: O(1) for the setup of the cancellable function itself.
* Space Complexity: O(1) to store the interval identifier.
*/
var cancellable = function (fn, args, t) {
  fn(...args);
  const intervalHandleReference = setInterval(() => fn(...args), t);
  return () => clearInterval(intervalHandleReference);
};
