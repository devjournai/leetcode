/**
 * Generate Circular Array Values
 * Intuition: A generator can maintain its internal state (current position) between calls. The `yield` keyword both returns a value and accepts an input for the next iteration, allowing us to update the current position based on a provided jump value using modular arithmetic for circularity.
 * Approach: 1. Initialize an internal position tracker with the given `startIndex`. 2. Enter an infinite loop to allow continuous generation. 3. Inside the loop, `yield` the value at the current position, simultaneously receiving any `jump` value passed to `gen.next()`. 4. If a `jump` value was provided (meaning it's not the initial call), update the current position using modular arithmetic `((currentPosition + jump) % arrayLength + arrayLength) % arrayLength` to correctly handle both positive and negative jumps, ensuring the index always remains within the array bounds and wraps around.
 * Dry Run: arr = [10, 20, 30], startIndex = 1
 * 1. `cycleGenerator([10,20,30], 1)` is called. `currentPosition` becomes `1`.
 * 2. `gen.next()` is called. `stepValue` is `undefined`. `yield arr[1]` (which is `20`). Generator pauses. Returns `20`.
 * 3. `gen.next(1)` is called. `stepValue` becomes `1`. Condition `stepValue !== undefined` is true. `currentPosition` updates: `((1 + 1) % 3 + 3) % 3` = `(2 % 3 + 3) % 3` = `(2 + 3) % 3` = `5 % 3` = `2`.
 * 4. Loop continues. `yield arr[2]` (which is `30`). Generator pauses. Returns `30`.
 * 5. `gen.next(-2)` is called. `stepValue` becomes `-2`. Condition `stepValue !== undefined` is true. `currentPosition` updates: `((2 + (-2)) % 3 + 3) % 3` = `(0 % 3 + 3) % 3` = `(0 + 3) % 3` = `3 % 3` = `0`.
 * 6. Loop continues. `yield arr[0]` (which is `10`). Generator pauses. Returns `10`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var cycleGenerator = function* (arr, startIndex) {
  let currentPosition = startIndex;
  const arrayLength = arr.length;

  for (;;) {
    const stepValue = yield arr[currentPosition];

    if (stepValue !== undefined) {
      const nextPotentialPosition = currentPosition + stepValue;
      currentPosition =
        ((nextPotentialPosition % arrayLength) + arrayLength) % arrayLength;
    }
  }
};
