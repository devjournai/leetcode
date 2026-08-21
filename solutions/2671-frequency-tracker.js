/**
 * Frequency Tracker
 *
 * Intuition:
 * We need to support three operations efficiently:
 *
 * • Add a number.
 * • Delete one occurrence of a number.
 * • Check whether any number appears exactly `frequency` times.
 *
 * Maintain two hash maps:
 *
 * 1. numberFrequency
 *      number → its current frequency
 *
 * 2. frequencyCount
 *      frequency → how many numbers currently have this frequency
 *
 * Whenever a number's frequency changes, update both maps accordingly.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * add(number):
 *
 * 1. Get the current frequency.
 *
 * 2. Decrease the count of the old frequency.
 *
 * 3. Increase the number's frequency.
 *
 * 4. Increase the count of the new frequency.
 *
 * -----------------------------------------------------------------------
 *
 * deleteOne(number):
 *
 * 1. If the number does not exist,
 *      do nothing.
 *
 * 2. Decrease the count of the old frequency.
 *
 * 3. Reduce the number's frequency.
 *
 * 4. If the new frequency is greater than zero,
 *      increase its count.
 *
 * -----------------------------------------------------------------------
 *
 * hasFrequency(frequency):
 *
 * Return whether at least one number has exactly
 * the given frequency.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * add(3)
 *
 * numberFrequency:
 *
 * 3 → 1
 *
 * frequencyCount:
 *
 * 1 → 1
 *
 * ----------------
 *
 * add(3)
 *
 * numberFrequency:
 *
 * 3 → 2
 *
 * frequencyCount:
 *
 * 1 → 0
 * 2 → 1
 *
 * ----------------
 *
 * hasFrequency(2)
 *
 * frequencyCount[2] = 1
 *
 * Return:
 *
 * true
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */

var FrequencyTracker = function () {
  this.numberFrequency = new Map();
  this.frequencyCount = new Map();
};

FrequencyTracker.prototype.add = function (number) {
  const oldFrequency = this.numberFrequency.get(number) || 0;

  if (oldFrequency > 0) {
    this.frequencyCount.set(
      oldFrequency,
      this.frequencyCount.get(oldFrequency) - 1
    );
  }

  const newFrequency = oldFrequency + 1;

  this.numberFrequency.set(number, newFrequency);

  this.frequencyCount.set(
    newFrequency,
    (this.frequencyCount.get(newFrequency) || 0) + 1
  );
};

FrequencyTracker.prototype.deleteOne = function (number) {
  const oldFrequency = this.numberFrequency.get(number) || 0;

  if (oldFrequency === 0) {
    return;
  }

  this.frequencyCount.set(
    oldFrequency,
    this.frequencyCount.get(oldFrequency) - 1
  );

  const newFrequency = oldFrequency - 1;

  if (newFrequency === 0) {
    this.numberFrequency.delete(number);
  } else {
    this.numberFrequency.set(number, newFrequency);

    this.frequencyCount.set(
      newFrequency,
      (this.frequencyCount.get(newFrequency) || 0) + 1
    );
  }
};

FrequencyTracker.prototype.hasFrequency = function (frequency) {
  return (this.frequencyCount.get(frequency) || 0) > 0;
};
