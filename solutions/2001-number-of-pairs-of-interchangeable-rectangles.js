/**
 * Number Of Pairs Of Interchangeable Rectangles
 * Intuition: Two rectangles are interchangeable if their width-to-height ratios are identical. To count pairs efficiently, we can determine the frequency of each unique ratio. If a specific ratio appears 'k' times, it contributes k * (k - 1) / 2 pairs to the total. A single pass can accumulate pairs by adding the current count of an existing ratio whenever a new rectangle with that ratio is encountered.
 * Approach: 1. Initialize a Map to store the frequency of each unique width-to-height ratio. 2. Initialize a counter for the total number of interchangeable pairs found. 3. Define a helper function to calculate the greatest common divisor (GCD) of two numbers using the Euclidean algorithm, which will be used to simplify ratios. 4. Iterate through each rectangle in the input array. 5. For each rectangle, extract its width and height. 6. Calculate the GCD of the width and height. 7. Divide both the width and height by their GCD to obtain the simplified numerator and denominator of the ratio. 8. Construct a unique string key for the ratio (e.g., "numerator/denominator"). 9. Check if this ratio key exists in the frequency map. If it does, increment the total pairs counter by the current frequency of this ratio in the map. Then, increment the frequency of this ratio in the map by one. If it doesn't exist, add it to the map with a frequency of one. 10. After processing all rectangles, return the total pairs counter.
 * Dry Run: rectangles = [[4,8],[3,6],[10,20]]
 * 1. ratioCountsMap = Map(), pairsAccumulator = 0
 * 2. getGcd function defined.
 * 3. Process [4,8]:
 *    - rectItemWidth = 4, rectItemHeight = 8
 *    - greatestCommonDivisor = getGcd(4, 8) = 4
 *    - numeratorSimplified = 4 / 4 = 1
 *    - denominatorSimplified = 8 / 4 = 2
 *    - ratioIdentifier = "1/2"
 *    - ratioCountsMap.has("1/2") is false.
 *    - ratioCountsMap.set("1/2", 1). Map: {"1/2": 1}
 * 4. Process [3,6]:
 *    - rectItemWidth = 3, rectItemHeight = 6
 *    - greatestCommonDivisor = getGcd(3, 6) = 3
 *    - numeratorSimplified = 3 / 3 = 1
 *    - denominatorSimplified = 6 / 3 = 2
 *    - ratioIdentifier = "1/2"
 *    - ratioCountsMap.has("1/2") is true.
 *    - existingCount = ratioCountsMap.get("1/2") = 1
 *    - pairsAccumulator += 1 (pairsAccumulator = 1)
 *    - ratioCountsMap.set("1/2", 1 + 1). Map: {"1/2": 2}
 * 5. Process [10,20]:
 *    - rectItemWidth = 10, rectItemHeight = 20
 *    - greatestCommonDivisor = getGcd(10, 20) = 10
 *    - numeratorSimplified = 10 / 10 = 1
 *    - denominatorSimplified = 20 / 10 = 2
 *    - ratioIdentifier = "1/2"
 *    - ratioCountsMap.has("1/2") is true.
 *    - existingCount = ratioCountsMap.get("1/2") = 2
 *    - pairsAccumulator += 2 (pairsAccumulator = 1 + 2 = 3)
 *    - ratioCountsMap.set("1/2", 2 + 1). Map: {"1/2": 3}
 * 6. End of iteration. Return pairsAccumulator = 3.
 * Time Complexity: O(N * log(max_dimension))
 * Space Complexity: O(N)
 */
var interchangeableRectangles = function (inputRectangles) {
  const ratioCountsMap = new Map();
  let pairsAccumulator = 0;

  const getGcd = (valueA, valueB) => {
    while (valueB !== 0) {
      let tempRemainder = valueA % valueB;
      valueA = valueB;
      valueB = tempRemainder;
    }
    return valueA;
  };

  for (const currentRectItem of inputRectangles) {
    const rectItemWidth = currentRectItem[0];
    const rectItemHeight = currentRectItem[1];

    const greatestCommonDivisor = getGcd(rectItemWidth, rectItemHeight);

    const numeratorSimplified = rectItemWidth / greatestCommonDivisor;
    const denominatorSimplified = rectItemHeight / greatestCommonDivisor;

    const ratioIdentifier = `${numeratorSimplified}/${denominatorSimplified}`;

    if (ratioCountsMap.has(ratioIdentifier)) {
      const existingCount = ratioCountsMap.get(ratioIdentifier);
      pairsAccumulator += existingCount;
      ratioCountsMap.set(ratioIdentifier, existingCount + 1);
    } else {
      ratioCountsMap.set(ratioIdentifier, 1);
    }
  }

  return pairsAccumulator;
};
