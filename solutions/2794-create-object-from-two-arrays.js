/**
 * Create Object From Two Arrays
 * Intuition: Iterate through both arrays simultaneously, converting each key to a string. Use a separate data structure to track keys already added to the resulting object, ensuring only the first occurrence of any key is preserved.
 * Approach: 1. Initialize an empty object for the result and an empty Set to store stringified keys that have already been processed and added. 2. Use a while loop to iterate from the beginning of the `keysArr` up to its length. 3. Inside the loop, get the current key and value. 4. Convert the current key to its string representation. 5. Check if this stringified key is already present in the Set of seen keys. 6. If it's not present, add it to the Set and assign the key-value pair to the result object. 7. Increment the loop counter. 8. After the loop completes, return the constructed object.
 * Dry Run: keysArr = [1, "b", 1, "d"], valuesArr = ["one", "two", "three", "four"]
 * 1. resultObject = {}, processedKeys = new Set(), counter = 0
 * 2. counter = 0: currentRawKey = 1, currentValueEntry = "one". stringifiedKeyEntry = "1". "1" not in processedKeys. Add "1" to processedKeys. resultObject["1"] = "one". resultObject = {"1": "one"}. counter = 1.
 * 3. counter = 1: currentRawKey = "b", currentValueEntry = "two". stringifiedKeyEntry = "b". "b" not in processedKeys. Add "b" to processedKeys. resultObject["b"] = "two". resultObject = {"1": "one", "b": "two"}. counter = 2.
 * 4. counter = 2: currentRawKey = 1, currentValueEntry = "three". stringifiedKeyEntry = "1". "1" IS in processedKeys. Skip. counter = 3.
 * 5. counter = 3: currentRawKey = "d", currentValueEntry = "four". stringifiedKeyEntry = "d". "d" not in processedKeys. Add "d" to processedKeys. resultObject["d"] = "four". resultObject = {"1": "one", "b": "two", "d": "four"}. counter = 4.
 * 6. Loop ends as counter (4) is not less than keysArr.length (4).
 * 7. Return {"1": "one", "b": "two", "d": "four"}.
 * Time Complexity: O(N * L)
 * Space Complexity: O(N * L)
 */
var createObject = function (keysArr, valuesArr) {
  const resultObject = {};
  const processedKeys = new Set();
  let counter = 0;

  while (counter < keysArr.length) {
    const currentRawKey = keysArr[counter];
    const currentValueEntry = valuesArr[counter];
    const stringifiedKeyEntry = String(currentRawKey);

    if (!processedKeys.has(stringifiedKeyEntry)) {
      processedKeys.add(stringifiedKeyEntry);
      resultObject[stringifiedKeyEntry] = currentValueEntry;
    }
    counter++;
  }

  return resultObject;
};
