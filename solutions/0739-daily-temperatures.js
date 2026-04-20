/**
 * Daily Temperatures
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
