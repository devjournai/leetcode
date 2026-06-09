/**
 * Minimum Number Of Keypresses
 * Intuition: Characters appearing more frequently should be assigned to key positions that require fewer presses to minimize total keypresses. The first position on any button requires 1 press, the second 2 presses, and the third 3 presses. Since there are 9 buttons, 9 characters can get 1-press, 9 characters can get 2-press, and 9 characters can get 3-press.
 * Approach: 1. Count the frequency of each character in the input string. 2. Collect these frequencies into an array and sort them in descending order. 3. Iterate through the sorted frequencies, assigning them to key positions: the first 9 highest frequencies go to 1-press slots, the next 9 go to 2-press slots, and any remaining go to 3-press slots. Calculate the total keypresses based on each character's frequency multiplied by its assigned press cost.
 * Dry Run: s = "banana"
 *   1. characterCounts = {'b': 1, 'a': 3, 'n': 2}
 *   2. allCounts = [1, 3, 2] (order from Map iteration may vary)
 *      descendingFrequencies = [3, 2, 1] (for 'a', 'n', 'b' respectively after sorting)
 *   3. totalRequiredPresses = 0
 *      frequencyPointer = 0: frequencyValue = 3. currentKeyCost = Math.floor(0 / 9) + 1 = 1. totalRequiredPresses = 0 + (3 * 1) = 3
 *      frequencyPointer = 1: frequencyValue = 2. currentKeyCost = Math.floor(1 / 9) + 1 = 1. totalRequiredPresses = 3 + (2 * 1) = 5
 *      frequencyPointer = 2: frequencyValue = 1. currentKeyCost = Math.floor(2 / 9) + 1 = 1. totalRequiredPresses = 5 + (1 * 1) = 6
 *   4. Return 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumKeypresses = function (s) {
  const characterCounts = new Map();
  for (const currentItem of s) {
    const initialCount = characterCounts.get(currentItem) || 0;
    characterCounts.set(currentItem, initialCount + 1);
  }

  const allCounts = Array.from(characterCounts.values());
  const descendingFrequencies = allCounts.sort((freqA, freqB) => freqB - freqA);

  let totalRequiredPresses = 0;
  for (
    let frequencyPointer = 0;
    frequencyPointer < descendingFrequencies.length;
    frequencyPointer++
  ) {
    const frequencyValue = descendingFrequencies[frequencyPointer];
    const currentKeyCost = Math.floor(frequencyPointer / 9) + 1;
    totalRequiredPresses += frequencyValue * currentKeyCost;
  }

  return totalRequiredPresses;
};
