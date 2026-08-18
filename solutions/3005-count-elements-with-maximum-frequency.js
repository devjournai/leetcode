/**
 * Count Elements With Maximum Frequency
 * Intuition: To find the total frequency of elements that have the maximum frequency, we first need to determine what the maximum frequency is among all elements. Once the maximum frequency is known, we can then iterate through all elements or their frequencies again to sum up the frequencies of only those elements that match this maximum value.
 * Approach: 1. Traverse the input array to build a frequency map for each number. During this pass, store how many times each number appears.
 * 2. After building the frequency map, iterate through its values to find the single highest frequency observed among all numbers. This will be our maximum frequency.
 * 3. Finally, iterate through the entries of the frequency map. For each element's frequency, check if it equals the maximum frequency found in the previous step. If it does, add that element's frequency to a running total.
 * 4. Return the accumulated total frequency.
 * Dry Run: nums = [1,2,2,3,1,4]
 * 1. Initialize frequencyMap = new Map(), maximumFrequencyOverall = 0, totalElementsWithMaxFrequency = 0.
 * 2. First Pass (build frequencyMap):
 *    - nums[0]=1: frequencyMap.set(1, 1)
 *    - nums[1]=2: frequencyMap.set(2, 1)
 *    - nums[2]=2: frequencyMap.set(2, 2)
 *    - nums[3]=3: frequencyMap.set(3, 1)
 *    - nums[4]=1: frequencyMap.set(1, 2)
 *    - nums[5]=4: frequencyMap.set(4, 1)
 *    frequencyMap is now {1:2, 2:2, 3:1, 4:1}.
 * 3. Second Pass (find maximumFrequencyOverall):
 *    - Iterate frequencyMap.values(): 2, 2, 1, 1.
 *    - maximumFrequencyOverall becomes 2 (after processing the first '2'). It remains 2.
 * 4. Third Pass (calculate totalElementsWithMaxFrequency):
 *    - Iterate frequencyMap.entries():
 *    - [1, 2]: elementFrequency (2) === maximumFrequencyOverall (2). totalElementsWithMaxFrequency += 2 (now 2).
 *    - [2, 2]: elementFrequency (2) === maximumFrequencyOverall (2). totalElementsWithMaxFrequency += 2 (now 4).
 *    - [3, 1]: elementFrequency (1) !== maximumFrequencyOverall (2). No change.
 *    - [4, 1]: elementFrequency (1) !== maximumFrequencyOverall (2). No change.
 * 5. Return totalElementsWithMaxFrequency which is 4.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var maxFrequencyElements = function (nums) {
  const frequencyCollection = new Map();

  for (
    let currentPosition = 0;
    currentPosition < nums.length;
    ++currentPosition
  ) {
    const valueAtPosition = nums[currentPosition];
    const existingElementCount = frequencyCollection.get(valueAtPosition) || 0;
    const updatedElementCount = existingElementCount + 1;
    frequencyCollection.set(valueAtPosition, updatedElementCount);
  }

  let overallMaxFrequency = 0;
  for (const individualFrequency of frequencyCollection.values()) {
    if (individualFrequency > overallMaxFrequency) {
      overallMaxFrequency = individualFrequency;
    }
  }

  let finalSumOfFrequencies = 0;
  for (const [keyNumber, countOfNumber] of frequencyCollection.entries()) {
    if (countOfNumber === overallMaxFrequency) {
      finalSumOfFrequencies += countOfNumber;
    }
  }

  return finalSumOfFrequencies;
};
