/**
 * Join Two Arrays By Id
 * Intuition: A hash map (or plain object in JavaScript) provides efficient O(1) average time complexity for storing and retrieving objects by their unique `id`. By processing the first array to establish initial entries and then the second array to either add new entries or merge with existing ones based on the `id`, we can correctly apply the override rules. Finally, converting the map's values into an array and sorting ensures the required output format.
 * Approach: 1. Initialize an empty `Map` called `idToRecordMap` to store the merged objects, using the `id` as the key.
 * 2. Iterate through each `objectFromArr1` in `arr1`. For each object, add it to `idToRecordMap` with its `id` as the key. This establishes the base objects from `arr1`.
 * 3. Iterate through each `objectFromArr2` in `arr2`.
 *    a. Check if `idToRecordMap` already contains an entry for `objectFromArr2.id`.
 *    b. If an entry exists (meaning the `id` was present in `arr1`), retrieve the `previousRecord` from the map. Create a `combinedRecord` by spreading `previousRecord` first, then spreading `objectFromArr2`. This ensures that properties present in `objectFromArr2` override those from `previousRecord`. Update the entry in `idToRecordMap` with this `combinedRecord`.
 *    c. If no entry exists, it means the `id` is unique to `arr2`. Directly add `objectFromArr2` to `idToRecordMap` with its `id` as the key.
 * 4. Convert all the values stored in `idToRecordMap` into a new array, let's call it `mapValuesArray`.
 * 5. Sort `mapValuesArray` in ascending order based on the `id` property of each object. This yields the `finalSortedArray`.
 * 6. Return `finalSortedArray`.
 * Dry Run:
 * arr1 = [{"id": 1, "valueA": "a1"}, {"id": 2, "valueB": "b1"}]
 * arr2 = [{"id": 1, "valueC": "c1", "valueA": "a2"}, {"id": 3, "valueD": "d1"}]
 *
 * 1. `idToRecordMap` = Map {}
 *
 * 2. Process `arr1`:
 *    - `objectFromArr1` = {"id": 1, "valueA": "a1"}:
 *      `idToRecordMap.set(1, {"id": 1, "valueA": "a1"})`
 *      `idToRecordMap` = Map {1 => {"id": 1, "valueA": "a1"}}
 *    - `objectFromArr1` = {"id": 2, "valueB": "b1"}:
 *      `idToRecordMap.set(2, {"id": 2, "valueB": "b1"})`
 *      `idToRecordMap` = Map {1 => {"id": 1, "valueA": "a1"}, 2 => {"id": 2, "valueB": "b1"}}
 *
 * 3. Process `arr2`:
 *    - `objectFromArr2` = {"id": 1, "valueC": "c1", "valueA": "a2"}:
 *      `idToRecordMap.has(1)` is true.
 *      `previousRecord` = {"id": 1, "valueA": "a1"}
 *      `combinedRecord` = {...previousRecord, ...objectFromArr2} = {"id": 1, "valueA": "a2", "valueC": "c1"}
 *      `idToRecordMap.set(1, {"id": 1, "valueA": "a2", "valueC": "c1"})`
 *      `idToRecordMap` = Map {1 => {"id": 1, "valueA": "a2", "valueC": "c1"}, 2 => {"id": 2, "valueB": "b1"}}
 *    - `objectFromArr2` = {"id": 3, "valueD": "d1"}:
 *      `idToRecordMap.has(3)` is false.
 *      `idToRecordMap.set(3, {"id": 3, "valueD": "d1"})`
 *      `idToRecordMap` = Map {1 => {"id": 1, "valueA": "a2", "valueC": "c1"}, 2 => {"id": 2, "valueB": "b1"}, 3 => {"id": 3, "valueD": "d1"}}
 *
 * 4. `mapValuesArray` = Array.from(`idToRecordMap.values()`)
 *    `mapValuesArray` = [{"id": 1, "valueA": "a2", "valueC": "c1"}, {"id": 2, "valueB": "b1"}, {"id": 3, "valueD": "d1"}]
 *
 * 5. Sort `mapValuesArray` by `id` to get `finalSortedArray`:
 *    `finalSortedArray` = [{"id": 1, "valueA": "a2", "valueC": "c1"}, {"id": 2, "valueB": "b1"}, {"id": 3, "valueD": "d1"}]
 *
 * Final Output: [{"id": 1, "valueA": "a2", "valueC": "c1"}, {"id": 2, "valueB": "b1"}, {"id": 3, "valueD": "d1"}]
 * Time Complexity: O((N + M) * K + U log U)
 * Space Complexity: O(U * K)
 */
var join = function (arr1, arr2) {
  const idToRecordMap = new Map();

  for (const objectFromArr1 of arr1) {
    idToRecordMap.set(objectFromArr1.id, { ...objectFromArr1 });
  }

  for (const objectFromArr2 of arr2) {
    if (idToRecordMap.has(objectFromArr2.id)) {
      const previousRecord = idToRecordMap.get(objectFromArr2.id);
      const combinedRecord = { ...previousRecord, ...objectFromArr2 };
      idToRecordMap.set(objectFromArr2.id, combinedRecord);
    } else {
      idToRecordMap.set(objectFromArr2.id, { ...objectFromArr2 });
    }
  }

  const mapValuesArray = Array.from(idToRecordMap.values());
  const finalSortedArray = mapValuesArray.sort(
    (recordA, recordB) => recordA.id - recordB.id,
  );

  return finalSortedArray;
};
