/**
 * Json Deep Equal
 * Intuition: Recursively compare the structure and values of two JSON entities. The comparison needs to handle primitives, null, arrays, and objects distinctly, checking for type consistency and deep equality of contents.
 * Approach: 1. Initially check for strict equality (===) which handles identical primitives (including NaN === NaN) and same object references. 2. Compare the fundamental types; if they are different (e.g., number vs string, or primitive vs object), they are not deeply equal, with specific considerations for 'null' which has 'object' type. 3. If both are primitives or null, their strict equality (checked in step 1) determines the result. 4. If both are objects, check if their array status differs (one is an array, the other is not); if so, they are not deeply equal. 5. If both are arrays, compare their lengths; if unequal, return false. Iterate through elements, recursively calling `areDeeplyEqual` for each pair. 6. If both are non-null plain objects, compare their key counts; if unequal, return false. Iterate through keys of one object, checking for key presence in the other and recursively calling `areDeeplyEqual` for the associated values.
 * Dry Run: o1 = {"a": 1, "b": [2, 3]}, o2 = {"a": 1, "b": [2, 3]}
 * 1. `areDeeplyEqual(o1, o2)` is called.
 * 2. `typeOfFirst` = 'object', `typeOfSecond` = 'object'. `typeOfFirst !== typeOfSecond` is false.
 * 3. `typeOfFirst !== 'object' || o1 === null` is false (`'object' !== 'object'` is false, `o1 === null` is false).
 * 4. `isFirstAnArray` = false, `isSecondAnArray` = false. `isFirstAnArray !== isSecondAnArray` is false.
 * 5. Enters `else` block for objects.
 * 6. `keysArrayOne` = `["a", "b"]`, `keysArrayTwo` = `["a", "b"]`. Lengths are equal (2).
 * 7. Loop starts (`keyIterator` = 0). `currentObjectKey` = "a".
 * 8. `Object.prototype.hasOwnProperty.call(o2, "a")` is true.
 * 9. Call `areDeeplyEqual(o1["a"], o2["a"])` -> `areDeeplyEqual(1, 1)`.
 * 10. Inside `areDeeplyEqual(1, 1)`: `typeOfFirst` = 'number', `typeOfSecond` = 'number'. `typeOfFirst !== typeOfSecond` is false. `typeOfFirst !== 'object' || o1 === null` is true. Returns `1 === 1` which is `true`.
 * 11. Loop continues (`keyIterator` = 1). `currentObjectKey` = "b".
 * 12. `Object.prototype.hasOwnProperty.call(o2, "b")` is true.
 * 13. Call `areDeeplyEqual(o1["b"], o2["b"])` -> `areDeeplyEqual([2, 3], [2, 3])`.
 * 14. Inside `areDeeplyEqual([2, 3], [2, 3])`: `typeOfFirst` = 'object', `typeOfSecond` = 'object'. `typeOfFirst !== typeOfSecond` is false. `typeOfFirst !== 'object' || o1 === null` is false. `isFirstAnArray` = true, `isSecondAnArray` = true. `isFirstAnArray !== isSecondAnArray` is false. Enters array block.
 * 15. `countFirstElements` = 2, `countSecondElements` = 2. Lengths are equal.
 * 16. Inner loop starts (`elementIndex` = 0). Call `areDeeplyEqual(2, 2)`. Returns `true`.
 * 17. Inner loop continues (`elementIndex` = 1). Call `areDeeplyEqual(3, 3)`. Returns `true`.
 * 18. Inner loop finishes. `areDeeplyEqual([2, 3], [2, 3])` returns `true`.
 * 19. Outer loop finishes. `areDeeplyEqual(o1, o2)` returns `true`.
 * Time Complexity: O(N),
 * Space Complexity: O(D)
 */
var areDeeplyEqual = function (o1, o2) {
  if (o1 === o2) {
    return true;
  }

  const typeOfFirstValue = typeof o1;
  const typeOfSecondValue = typeof o2;

  if (typeOfFirstValue !== typeOfSecondValue) {
    if (o1 === null || o2 === null) {
      if (o1 === null && typeOfSecondValue !== "object") return false;
      if (o2 === null && typeOfFirstValue !== "object") return false;
    } else {
      return false;
    }
  }

  if (typeOfFirstValue !== "object" || o1 === null) {
    return o1 === o2;
  }

  const isFirstValueAnArray = Array.isArray(o1);
  const isSecondValueAnArray = Array.isArray(o2);

  if (isFirstValueAnArray !== isSecondValueAnArray) {
    return false;
  }

  if (isFirstValueAnArray) {
    const lengthOfFirstArray = o1.length;
    const lengthOfSecondArray = o2.length;
    if (lengthOfFirstArray !== lengthOfSecondArray) {
      return false;
    }

    let currentElementIndex = 0;
    while (currentElementIndex < lengthOfFirstArray) {
      if (!areDeeplyEqual(o1[currentElementIndex], o2[currentElementIndex])) {
        return false;
      }
      currentElementIndex++;
    }
    return true;
  } else {
    const firstObjectKeys = Object.keys(o1);
    const secondObjectKeys = Object.keys(o2);

    if (firstObjectKeys.length !== secondObjectKeys.length) {
      return false;
    }

    let keyComparisonIndex = 0;
    const totalKeyCount = firstObjectKeys.length;
    while (keyComparisonIndex < totalKeyCount) {
      const currentKeyName = firstObjectKeys[keyComparisonIndex];
      if (!Object.prototype.hasOwnProperty.call(o2, currentKeyName)) {
        return false;
      }
      if (!areDeeplyEqual(o1[currentKeyName], o2[currentKeyName])) {
        return false;
      }
      keyComparisonIndex++;
    }
    return true;
  }
};
