/**
 * Partial Function With Placeholders
 * Intuition: The core idea is to create a new function that acts as a wrapper. When this wrapper is called, it first reconstructs the final list of arguments by filling in placeholders from its own inputs, and then appends any remaining inputs. Finally, it calls the original function with this fully constructed argument list.
 * Approach:
 * 1. Define the outer `partial` function which accepts the original function `fn` and initial arguments `args`.
 * 2. Return an inner function from `partial`. This inner function will accept an arbitrary number of `restArgs` (arguments passed to the partially applied function).
 * 3. Inside the inner function, create a mutable copy of the `args` array to avoid modifying the original. This will be our `resultantArguments`.
 * 4. Initialize a cursor `inputArgumentCursor` to track which `restArgs` element to use next.
 * 5. Iterate through the `resultantArguments`. If an element is a placeholder `_` and there are still available `restArgs` (checked by `inputArgumentCursor`), replace the placeholder with the next `restArgs` element and advance the `inputArgumentCursor`.
 * 6. After filling all possible placeholders, iterate through any remaining `restArgs` elements (from `inputArgumentCursor` onwards) and append them to the `resultantArguments` array.
 * 7. Call the original function `fn` using the spread operator (`...`) with the fully prepared `resultantArguments` array, and return its result.
 * Dry Run:
 * fn = (a, b, c) => a + b + c
 * initialArgs = [1, '_', 3]
 *
 * partialFn = partial(fn, initialArgs)
 *
 * Call partialFn(2, 4)
 * 1. `additionalArguments` = `[2, 4]`
 * 2. `resultantArguments` = `[1, '_', 3]` (copy of `initialArgs`)
 * 3. `inputArgumentCursor` = `0`
 *
 * Placeholder filling (for loop):
 * - `processedArgumentIndex` = `0`: `resultantArguments[0]` is `1` (not `_`).
 * - `processedArgumentIndex` = `1`: `resultantArguments[1]` is `_`. `inputArgumentCursor` (`0`) < `additionalArguments.length` (`2`).
 *   - `resultantArguments[1]` becomes `additionalArguments[0]` which is `2`.
 *   - `resultantArguments` is now `[1, 2, 3]`.
 *   - `inputArgumentCursor` increments to `1`.
 * - `processedArgumentIndex` = `2`: `resultantArguments[2]` is `3` (not `_`).
 *
 * Append remaining arguments (while loop):
 * 1. `furtherArgumentCursor` is initialized to `inputArgumentCursor` which is `1`.
 * 2. `furtherArgumentCursor` (`1`) < `additionalArguments.length` (`2`):
 *    - `resultantArguments.push(additionalArguments[1])` which is `4`.
 *    - `resultantArguments` is now `[1, 2, 3, 4]`.
 *    - `furtherArgumentCursor` increments to `2`.
 * 3. `furtherArgumentCursor` (`2`) is NOT < `additionalArguments.length` (`2`). Loop ends.
 *
 * Return: `originalFunction(...resultantArguments)` which is `fn(1, 2, 3, 4)`.
 * Time Complexity: O(M + N)
 * Space Complexity: O(M + N)
 */
var partial = function (originalFunction, initialArgs) {
  return function (...additionalArguments) {
    const resultantArguments = [...initialArgs];
    let inputArgumentCursor = 0;

    for (
      let processedArgumentIndex = 0;
      processedArgumentIndex < resultantArguments.length;
      processedArgumentIndex++
    ) {
      if (
        resultantArguments[processedArgumentIndex] === "_" &&
        inputArgumentCursor < additionalArguments.length
      ) {
        resultantArguments[processedArgumentIndex] =
          additionalArguments[inputArgumentCursor];
        inputArgumentCursor++;
      }
    }

    let furtherArgumentCursor = inputArgumentCursor;
    while (furtherArgumentCursor < additionalArguments.length) {
      resultantArguments.push(additionalArguments[furtherArgumentCursor]);
      furtherArgumentCursor++;
    }

    return originalFunction(...resultantArguments);
  };
};
