/**
* Design Cancellable Function
* Intuition: The core idea is to continuously execute the generator, awaiting each yielded promise. Simultaneously, we need a mechanism to interrupt this waiting process if a cancellation signal arrives. Promise.race is perfectly suited for this, allowing us to wait for either the generator's promise to resolve or a dedicated "cancel" promise to reject, whichever happens first.
* Approach: 1. **Initialize Cancellation Mechanism**: Create an internal promise, `cancelWatchPromise`, whose `reject` function (`signalCancellation`) is captured. This `signalCancellation` function forms the basis of the `triggerCancellation` function exposed to the user. A `catch` handler is added to `cancelWatchPromise` to prevent unhandled promise rejections if it's rejected but not consumed. 2. **Execute Generator Asynchronously**: An `async` Immediately Invoked Function Expression (IIFE) is used to orchestrate the generator's execution, which will eventually return the `finalResultPromise`. 3. **Iterate Generator Steps**: Inside the IIFE, a `while` loop continues as long as the generator has not completed (`currentGeneratorStep.done` is false). 4. **Race for Resolution or Cancellation**: In each iteration, `await Promise.race([currentGeneratorStep.value, cancelWatchPromise])`. This asynchronously waits for either the promise yielded by the generator or the `cancelWatchPromise` to settle. 5. **Handle Outcomes**: A `try...catch` block surrounds the `await Promise.race` call. If it resolves, the resolved value (`yieldedValueOrCancellation`) is passed back into the generator via `generator.next()`. If it rejects (either due to a yielded promise rejecting or `cancelWatchPromise` rejecting with "Cancelled"), the `caughtIssue` is thrown back into the generator via `generator.throw()`. 6. **Final Resolution**: Once the generator completes (`currentGeneratorStep.done` is true), the `finalResultPromise` resolves with the generator's returned value.
* Dry Run: Input: `function* sampleGen() { yield new Promise(res => setTimeout(() => res(5), 100)); yield new Promise(res => setTimeout(() => res(10), 200)); return 15; }`
        1. `cancellable(sampleGen())` is called. `signalCancellation` (reject handle), `cancelWatchPromise`, `triggerCancellation` are set up. `cancelWatchPromise.catch(() => {})` is attached.
        2. `finalResultPromise` (the async IIFE) begins execution.
        3. `currentGeneratorStep = sampleGen.next()`. `currentGeneratorStep` is `{ value: Promise<resolved to 5 in 100ms>, done: false }`.
        4. Loop starts (`!currentGeneratorStep.done` is true).
        5. `try` block: `Promise.race([Promise<resolved to 5 in 100ms>, cancelWatchPromise])` is awaited.
        6. **Scenario A (No Cancellation):**
            * After 100ms, `Promise<resolved to 5 in 100ms>` resolves with `5`.
            * `yieldedValueOrCancellation` becomes `5`.
            * `currentGeneratorStep = sampleGen.next(5)`. `currentGeneratorStep` is `{ value: Promise<resolved to 10 in 200ms>, done: false }`.
            * Loop continues.
            * `await Promise.race([Promise<resolved to 10 in 200ms>, cancelWatchPromise])`.
            * After 200ms, `Promise<resolved to 10 in 200ms>` resolves with `10`.
            * `yieldedValueOrCancellation` becomes `10`.
            * `currentGeneratorStep = sampleGen.next(10)`. `currentGeneratorStep` is `{ value: 15, done: true }`.
            * Loop terminates.
            * `finalResultPromise` resolves with `currentGeneratorStep.value` (which is `15`).
            * Returns `[triggerCancellation, finalResultPromise (resolved with 15)]`.
        7. **Scenario B (Cancellation after 50ms):**
            * `await Promise.race([Promise<resolved to 5 in 100ms>, cancelWatchPromise])` is running.
            * At 50ms, `triggerCancellation()` is called externally. `signalCancellation("Cancelled")` is executed.
            * `cancelWatchPromise` rejects with "Cancelled". This wins the race.
            * The `catch (caughtIssue)` block is entered. `caughtIssue` is "Cancelled".
            * `currentGeneratorStep = sampleGen.throw("Cancelled")`. If `sampleGen` does not catch "Cancelled", this will cause `finalResultPromise` to reject with "Cancelled". If `sampleGen` catches it and yields a new promise or returns, the loop would continue or terminate accordingly, resolving `finalResultPromise` with the subsequent value.
* Time Complexity: O(N)
* Space Complexity: O(1)
*/
var cancellable = function (generator) {
  let signalCancellation;
  const cancelWatchPromise = new Promise((resolveInternal, rejectInternal) => {
    signalCancellation = rejectInternal;
  });

  cancelWatchPromise.catch(() => {});

  const triggerCancellation = () => {
    signalCancellation("Cancelled");
  };

  const finalResultPromise = (async () => {
    let currentGeneratorStep = generator.next();

    while (!currentGeneratorStep.done) {
      try {
        const yieldedValueOrCancellation = await Promise.race([
          currentGeneratorStep.value,
          cancelWatchPromise,
        ]);
        currentGeneratorStep = generator.next(yieldedValueOrCancellation);
      } catch (caughtIssue) {
        currentGeneratorStep = generator.throw(caughtIssue);
      }
    }
    return currentGeneratorStep.value;
  })();

  return [triggerCancellation, finalResultPromise];
};
