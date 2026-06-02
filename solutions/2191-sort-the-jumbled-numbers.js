/**
 * Sort The Jumbled Numbers
 * Intuition: To sort numbers based on their custom mapped values while preserving relative order for equal mapped values, we need to pair each original number with its mapped value and original index. This auxiliary data allows for custom sorting logic.
 * Approach: 1. Create an array of objects, where each object stores the original number, its calculated mapped value, and its initial index in the input array. 2. Iterate through the input `nums` array to populate this new array: for each number, convert it to its mapped value by replacing each digit according to the `mapping` array. Handle the `0` case separately. For positive numbers, extract digits, map them, store them in a temporary structure, then reconstruct the mapped number. 3. Sort the array of objects first by their mapped values in ascending order. If two mapped values are equal, use their original indices to maintain stable sorting. 4. Finally, extract the original numbers from the sorted array of objects to form the result array.
 * Dry Run:
 * mapping = [8,9,4,0,1,2,3,7,5,6]
 * nums = [991, 338, 33]
 *
 * 1. Initialize `mappedCollection = []`
 * 2. Iterate through `nums`:
 *    - `idxCounter = 0`, `currentOriginalNum = 991`:
 *      - `processingNum = 991`. Not `0`.
 *      - `temporaryDigitStorage = []`.
 *      - `while (processingNum > 0)` (extract and map digits):
 *        - `991`: `lastDigit = 1`, `mappedReplacement = mapping[1] = 9`. `temporaryDigitStorage = [9]`. `processingNum = 99`.
 *        - `99`: `lastDigit = 9`, `mappedReplacement = mapping[9] = 6`. `temporaryDigitStorage = [9, 6]`. `processingNum = 9`.
 *        - `9`: `lastDigit = 9`, `mappedReplacement = mapping[9] = 6`. `temporaryDigitStorage = [9, 6, 6]`. `processingNum = 0`.
 *      - `resultantMappedValue = 0`.
 *      - `while (temporaryDigitStorage.length > 0)` (reconstruct mapped number):
 *        - `pop 6`: `resultantMappedValue = 0 * 10 + 6 = 6`. `temporaryDigitStorage = [9, 6]`.
 *        - `pop 6`: `resultantMappedValue = 6 * 10 + 6 = 66`. `temporaryDigitStorage = [9]`.
 *        - `pop 9`: `resultantMappedValue = 66 * 10 + 9 = 669`. `temporaryDigitStorage = []`.
 *      - `currentMappedVal = 669`.
 *      - `mappedCollection.push({ originalEntry: 991, transformedEntry: 669, initialIndex: 0 })`.
 *
 *    - `idxCounter = 1`, `currentOriginalNum = 338`:
 *      - `processingNum = 338`. Not `0`.
 *      - `temporaryDigitStorage = []`.
 *      - `while (processingNum > 0)`:
 *        - `338`: `lastDigit = 8`, `mappedReplacement = mapping[8] = 5`. `temporaryDigitStorage = [5]`. `processingNum = 33`.
 *        - `33`: `lastDigit = 3`, `mappedReplacement = mapping[3] = 0`. `temporaryDigitStorage = [5, 0]`. `processingNum = 3`.
 *        - `3`: `lastDigit = 3`, `mappedReplacement = mapping[3] = 0`. `temporaryDigitStorage = [5, 0, 0]`. `processingNum = 0`.
 *      - `resultantMappedValue = 0`.
 *      - `while (temporaryDigitStorage.length > 0)`:
 *        - `pop 0`: `resultantMappedValue = 0 * 10 + 0 = 0`. `temporaryDigitStorage = [5, 0]`.
 *        - `pop 0`: `resultantMappedValue = 0 * 10 + 0 = 0`. `temporaryDigitStorage = [5]`.
 *        - `pop 5`: `resultantMappedValue = 0 * 10 + 5 = 5`. `temporaryDigitStorage = []`.
 *      - `currentMappedVal = 5`.
 *      - `mappedCollection.push({ originalEntry: 338, transformedEntry: 5, initialIndex: 1 })`.
 *
 *    - `idxCounter = 2`, `currentOriginalNum = 33`:
 *      - `processingNum = 33`. Not `0`.
 *      - `temporaryDigitStorage = []`.
 *      - `while (processingNum > 0)`:
 *        - `33`: `lastDigit = 3`, `mappedReplacement = mapping[3] = 0`. `temporaryDigitStorage = [0]`. `processingNum = 3`.
 *        - `3`: `lastDigit = 3`, `mappedReplacement = mapping[3] = 0`. `temporaryDigitStorage = [0, 0]`. `processingNum = 0`.
 *      - `resultantMappedValue = 0`.
 *      - `while (temporaryDigitStorage.length > 0)`:
 *        - `pop 0`: `resultantMappedValue = 0 * 10 + 0 = 0`. `temporaryDigitStorage = [0]`.
 *        - `pop 0`: `resultantMappedValue = 0 * 10 + 0 = 0`. `temporaryDigitStorage = []`.
 *      - `currentMappedVal = 0`.
 *      - `mappedCollection.push({ originalEntry: 33, transformedEntry: 0, initialIndex: 2 })`.
 *
 *    `mappedCollection` is now:
 *    `[
 *      { originalEntry: 991, transformedEntry: 669, initialIndex: 0 },
 *      { originalEntry: 338, transformedEntry: 5, initialIndex: 1 },
 *      { originalEntry: 33, transformedEntry: 0, initialIndex: 2 }
 *    ]`
 * 3. Sort `mappedCollection`:
 *    - Sorts by `transformedEntry` primarily, then by `initialIndex`.
 *    - Result after sorting:
 *    `[
 *      { originalEntry: 33, transformedEntry: 0, initialIndex: 2 },
 *      { originalEntry: 338, transformedEntry: 5, initialIndex: 1 },
 *      { originalEntry: 991, transformedEntry: 669, initialIndex: 0 }
 *    ]`
 *
 * 4. Map back to original numbers:
 *    `transformedOutput = [33, 338, 991]`
 *
 * 5. Return `transformedOutput`.
 *
 * Time Complexity: O(N * (L + log N))
 * Space Complexity: O(N)
 */
var sortJumbled = function (mapping, nums) {
  const mappedCollection = [];

  for (let idxCounter = 0; idxCounter < nums.length; ++idxCounter) {
    const currentOriginalNum = nums[idxCounter];
    let currentMappedVal = 0;
    let processingNum = currentOriginalNum;

    if (processingNum === 0) {
      currentMappedVal = mapping[0];
    } else {
      const temporaryDigitStorage = [];
      let numberCopyForExtraction = processingNum;
      while (numberCopyForExtraction > 0) {
        const lastDigit = numberCopyForExtraction % 10;
        const mappedReplacement = mapping[lastDigit];
        temporaryDigitStorage.push(mappedReplacement);
        numberCopyForExtraction = Math.floor(numberCopyForExtraction / 10);
      }

      let resultantMappedValue = 0;
      while (temporaryDigitStorage.length > 0) {
        const nextDigitToAppend = temporaryDigitStorage.pop();
        resultantMappedValue = resultantMappedValue * 10 + nextDigitToAppend;
      }
      currentMappedVal = resultantMappedValue;
    }

    mappedCollection.push({
      originalEntry: currentOriginalNum,
      transformedEntry: currentMappedVal,
      initialIndex: idxCounter,
    });
  }

  mappedCollection.sort((itemA, itemB) => {
    if (itemA.transformedEntry !== itemB.transformedEntry) {
      return itemA.transformedEntry - itemB.transformedEntry;
    }
    return itemA.initialIndex - itemB.initialIndex;
  });

  const transformedOutput = mappedCollection.map(
    (element) => element.originalEntry,
  );

  return transformedOutput;
};
