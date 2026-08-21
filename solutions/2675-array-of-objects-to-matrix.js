/**
 * Array Of Objects To Matrix
 * Intuition: Extract all possible deep paths from the input array elements to form column headers. Then, for each original element, find the value corresponding to each column path.
 * Approach:
 *   1. Define a helper function `isComposedType` to determine if a value is an object or an array (excluding null). This is crucial for navigating nested structures.
 *   2. Define a recursive helper function `extractAllPaths`. This function takes a nested object/array and returns all possible full paths within it.
 *      - If the current entity is a primitive (not a composed type), it indicates an end node, so it returns an array containing an empty string `['']` to represent the path to itself relative to its parent.
 *      - If it's a composed type (object or array), it iterates through its keys/indices. For each key/index, it recursively calls `extractAllPaths` for the child value. It then combines the current key/index with the paths returned by the recursive call to form full paths, concatenating them with a ".".
 *   3. Initialize a `Set` called `pathCollectorSet` to store all unique paths found across all elements of the input `arr`. Iterate through each `inputItem` in `arr` using `forEach`. For each `inputItem`, call `extractAllPaths` to get all its internal paths. Then, iterate through these `extractedPathsCollection` using a `for` loop and add each unique path to `pathCollectorSet`.
 *   4. Convert `pathCollectorSet` into an array, `finalColumnNames`, and sort it lexicographically. This array forms the header row of the matrix.
 *   5. Define a helper function `retrievePathValue`. This function takes an object/array and a path string, and attempts to find the corresponding value within the object.
 *      - It splits the `queryPath` string into `pathSegments`.
 *      - It then traverses the `targetData` using a `while` loop, moving `currentSubPointer` down the path segments as long as `currentSubPointer` is a `isComposedType`.
 *      - After traversal, it checks if all segments were successfully traversed and if the final `currentSubPointer` is a primitive value (not undefined and not a composed type itself). If any of these conditions fail (e.g., path leads to undefined, path is incomplete, or path targets an object/array at the end), it returns an empty string `""`. Otherwise, it returns the found value.
 *   6. Generate the data rows of the matrix. Use `Array.prototype.map` on the input `arr`. For each `currentSourceObject` in `arr`, create a new row:
 *      - Initialize an empty array `currentRowData`.
 *      - Iterate through `finalColumnNames` using a `for` loop. For each `currentPathString` (column name), call `retrievePathValue` with the `currentSourceObject` and `currentPathString` to get the `cellData`. Add `cellData` to `currentRowData`.
 *      - The `map` function collects these `currentRowData` arrays into `matrixResultRows`.
 *   7. Concatenate `finalColumnNames` (as the first row) with `matrixResultRows` to form the complete matrix and return it.
 * Dry Run:
 *   arr = [{"a": 1, "b": {"c": 2}}, {"a": 3}]
 *   1. `isComposedType` is defined.
 *   2. `extractAllPaths` is defined.
 *   3. `pathCollectorSet` is created.
 *      - `arr.forEach` (first use of `forEach`):
 *        - For `{"a": 1, "b": {"c": 2}}`:
 *          - `extractAllPaths({"a": 1, "b": {"c": 2}})`:
 *            - `currentKey`="a", `extractAllPaths(1)` returns `['']`. Paths: `["a"]`.
 *            - `currentKey`="b", `extractAllPaths({"c": 2})`:
 *              - `currentKey`="c", `extractAllPaths(2)` returns `['']`. Paths: `["c"]`.
 *            - Paths for "b": `["b.c"]`.
 *          - `extractedPathsCollection` for first item: `["a", "b.c"]`.
 *          - `for` loop (first use of `for` loop): Adds "a", "b.c" to `pathCollectorSet`.
 *        - For `{"a": 3}`:
 *          - `extractAllPaths({"a": 3})`:
 *            - `currentKey`="a", `extractAllPaths(3)` returns `['']`. Paths: `["a"]`.
 *          - `extractedPathsCollection` for second item: `["a"]`.
 *          - `for` loop: Adds "a" to `pathCollectorSet` (no change, already present).
 *   4. `finalColumnNames` = `Array.from(pathCollectorSet)` -> `["a", "b.c"]`. `sort()` -> `["a", "b.c"]`. This is the header row.
 *   5. `retrievePathValue` is defined.
 *   6. `matrixResultRows` = `arr.map` (first use of `map`):
 *      - For `{"a": 1, "b": {"c": 2}}`:
 *        - `currentRowData` = `[]`.
 *        - `for` loop (second use of `for` loop):
 *          - `currentPathString`="a": `retrievePathValue({"a": 1, "b": {"c": 2}}, "a")` -> `1`. `currentRowData`=`[1]`.
 *          - `currentPathString`="b.c": `retrievePathValue({"a": 1, "b": {"c": 2}}, "b.c")` -> `2`. `currentRowData`=`[1, 2]`.
 *        - Returns `[1, 2]`.
 *      - For `{"a": 3}`:
 *        - `currentRowData` = `[]`.
 *        - `for` loop:
 *          - `currentPathString`="a": `retrievePathValue({"a": 3}, "a")` -> `3`. `currentRowData`=`[3]`.
 *          - `currentPathString`="b.c": `retrievePathValue({"a": 3}, "b.c")` -> `""`. `currentRowData`=`[3, ""]`.
 *        - Returns `[3, ""]`.
 *      `matrixResultRows` = `[[1, 2], [3, ""]]`.
 *   7. Returns `[["a", "b.c"], [1, 2], [3, ""]]`.
 * Time Complexity: O(N * D * L + P log P * L + N * P * L_avg)
 * Space Complexity: O(P * L + N * P)
 */
var jsonToMatrix = function (arr) {
  function isComposedType(checkValue) {
    return checkValue !== null && typeof checkValue === "object";
  }

  function extractAllPaths(targetNode) {
    if (!isComposedType(targetNode)) {
      return [""];
    }

    const accumulatedPaths = [];
    const objectKeys = Object.keys(targetNode);
    for (let keyIterator = 0; keyIterator < objectKeys.length; keyIterator++) {
      const currentLevelKey = objectKeys[keyIterator];
      const nestedPaths = extractAllPaths(targetNode[currentLevelKey]);

      for (
        let nestedPathIterator = 0;
        nestedPathIterator < nestedPaths.length;
        nestedPathIterator++
      ) {
        const singleNestedPath = nestedPaths[nestedPathIterator];
        accumulatedPaths.push(
          singleNestedPath
            ? `${currentLevelKey}.${singleNestedPath}`
            : currentLevelKey
        );
      }
    }
    return accumulatedPaths;
  }

  function retrievePathValue(targetData, queryPath) {
    const pathSegments = queryPath.split(".");
    let currentSubPointer = targetData;
    let segmentCounter = 0;

    while (
      segmentCounter < pathSegments.length &&
      isComposedType(currentSubPointer)
    ) {
      currentSubPointer = currentSubPointer[pathSegments[segmentCounter]];
      segmentCounter++;
    }

    return segmentCounter < pathSegments.length ||
      isComposedType(currentSubPointer) ||
      currentSubPointer === undefined
      ? ""
      : currentSubPointer;
  }

  const pathCollectorSet = new Set();
  arr.forEach((inputItem) => {
    const extractedPathsCollection = extractAllPaths(inputItem);
    for (
      let pathLoopIndex = 0;
      pathLoopIndex < extractedPathsCollection.length;
      pathLoopIndex++
    ) {
      pathCollectorSet.add(extractedPathsCollection[pathLoopIndex]);
    }
  });

  const finalColumnNames = Array.from(pathCollectorSet).sort();

  const matrixResultRows = arr.map((currentSourceObject) => {
    const currentRowData = [];
    for (
      let columnScanIndex = 0;
      columnScanIndex < finalColumnNames.length;
      columnScanIndex++
    ) {
      const currentPathString = finalColumnNames[columnScanIndex];
      const cellData = retrievePathValue(
        currentSourceObject,
        currentPathString
      );
      currentRowData.push(cellData);
    }
    return currentRowData;
  });

  return [finalColumnNames, ...matrixResultRows];
};
