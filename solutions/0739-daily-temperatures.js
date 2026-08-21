/**
 * Daily Temperatures
 * Intuition: A monotonic decreasing stack of indices waits for the next warmer day. When a hotter temperature arrives, pop and write the index gap into `outputWaitTimes`.
 * Approach: 1. Zero-fill `outputWaitTimes`. 2. For each day, while the stack top is cooler, pop it and set wait = `currentIndex - poppedIndex`. 3. Push `currentIndex`. Unresolved days stay 0.
 * Dry Run: [73,74,75,71,69,72,76,73]. 73 waits 1, 74 waits 1, 75 waits 4 (to 76), 71 waits 2, 69 waits 1, 72 waits 1, last two 0.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var dailyTemperatures = function (temperatures) {
  const numberOfDays = temperatures.length;
  const outputWaitTimes = new Array(numberOfDays).fill(0);
  const dayIndexStack = [];

  for (let currentIndex = 0; currentIndex < numberOfDays; currentIndex++) {
    const currentTemperatureValue = temperatures[currentIndex];

    while (
      dayIndexStack.length > 0 &&
      temperatures[dayIndexStack[dayIndexStack.length - 1]] <
        currentTemperatureValue
    ) {
      const poppedIndex = dayIndexStack.pop();
      const waitingDuration = currentIndex - poppedIndex;
      outputWaitTimes[poppedIndex] = waitingDuration;
    }

    dayIndexStack.push(currentIndex);
  }

  return outputWaitTimes;
};
