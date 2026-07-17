/**
 * Convert Json String To Object
 * Intuition: Parse the JSON string iteratively using a single pass. Maintain a stack to keep track of parent objects/arrays when diving into nested structures.
 * Approach:
 * 1. Initialize `parseIndex` to traverse the string, `contextStack` for nested structures, `currentObjectOrArray` to build the current container, and `potentialKey` for object keys.
 * 2. Iterate through the string using a `while` loop.
 * 3. Skip commas.
 * 4. If an opening bracket `[` or curly brace `{` is found:
 *    a. Create a new array or object.
 *    b. If `currentObjectOrArray` exists, push it onto `contextStack` and add the new container to `currentObjectOrArray` (as an element if array, or value for `potentialKey` if object).
 *    c. Set `currentObjectOrArray` to the new container.
 *    d. If `rootValue` is not yet set, establish it as the `newCollection`.
 * 5. If a closing bracket `]` or curly brace `}` is found:
 *    a. Pop the last container from `contextStack` to restore `currentObjectOrArray`.
 * 6. If none of the above (it's a primitive value):
 *    a. Determine the type (string, number, boolean, null) by inspecting characters.
 *    b. Parse the value and determine the `advanceToIndex` for the next character.
 *    c. After parsing, check if the character at `advanceToIndex` is a colon `:`. If so, the parsed value is a `potentialKey` for an object.
 *    d. Otherwise, the parsed value is a regular value. Add it to `currentObjectOrArray` (push to array, assign to `potentialKey` in object) or set it as `rootValue` if no `currentObjectOrArray` is active.
 * 7. Update `parseIndex` based on the characters consumed.
 * 8. Return `rootValue` after the loop completes.
 * Dry Run:
 * Input: `{"a":[1,true]}`
 * - Initialize: `stringLength=12`, `parseIndex=0`, `contextStack=[]`, `currentObjectOrArray=null`, `potentialKey=null`, `rootValue=null`
 * - `parseIndex=0`, `charAtCurrent='{'`: `newCollection={}`, `rootValue={} ` (first element), `currentObjectOrArray={} `, `parseIndex=1`.
 * - `parseIndex=1`, `charAtCurrent='"'`: Parses `"a"`. `parsedValueCandidate="a"`, `advanceToIndex=4`. `str[4]` is `':'`.
 *   `potentialKey="a"`, `parseIndex=5`.
 * - `parseIndex=5`, `charAtCurrent='['`: `newCollection=[]`. `contextStack.push({})` (currentObjectOrArray). `currentObjectOrArray["a"]=[]`. `currentObjectOrArray=[] ` (now refers to the array), `parseIndex=6`.
 * - `parseIndex=6`, `charAtCurrent='1'`: Parses `1`. `parsedValueCandidate=1`, `advanceToIndex=7`. `str[7]` is `,`. Not `:`.
 *   `Array.isArray(currentObjectOrArray)` is true. `currentObjectOrArray.push(1)` (array is `[1]`). `parseIndex=7`.
 * - `parseIndex=7`, `charAtCurrent=','`: `parseIndex=8`.
 * - `parseIndex=8`, `charAtCurrent='t'`: Parses `true`. `parsedValueCandidate=true`, `advanceToIndex=12`. `str[12]` is `}`. Not `:`.
 *   `Array.isArray(currentObjectOrArray)` is true. `currentObjectOrArray.push(true)` (array is `[1,true]`). `parseIndex=12`.
 * - `parseIndex=12`, `charAtCurrent=']'`: `contextStack.pop()` gives `{}`. `currentObjectOrArray={}` (back to the object). `parseIndex=13`.
 * - `parseIndex=13`, `charAtCurrent='}'`: `contextStack` is empty. `parseIndex=14`.
 * - `parseIndex=14`. Loop ends.
 * - Return `rootValue` which is `{"a":[1,true]}`.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var jsonParse = function (str) {
  let stringLength = str.length;
  let parseIndex = 0;
  let contextStack = [];
  let currentObjectOrArray = null;
  let potentialKey = null;
  let rootValue = null;

  while (parseIndex < stringLength) {
    let charAtCurrent = str[parseIndex];

    if (charAtCurrent === ",") {
      parseIndex++;
      continue;
    }

    if (charAtCurrent === "[" || charAtCurrent === "{") {
      let newCollection = null;
      if (charAtCurrent === "[") {
        newCollection = [];
      } else {
        newCollection = {};
      }

      if (rootValue === null) {
        rootValue = newCollection;
      }

      if (currentObjectOrArray !== null) {
        contextStack.push(currentObjectOrArray);
        if (Array.isArray(currentObjectOrArray)) {
          currentObjectOrArray.push(newCollection);
        } else if (potentialKey !== null) {
          currentObjectOrArray[potentialKey] = newCollection;
          potentialKey = null;
        }
      }
      currentObjectOrArray = newCollection;
      parseIndex++;
      continue;
    }

    if (charAtCurrent === "]" || charAtCurrent === "}") {
      if (contextStack.length > 0) {
        currentObjectOrArray = contextStack.pop();
      }
      parseIndex++;
      continue;
    }

    let parsedValueCandidate = null;
    let advanceToIndex = parseIndex;

    if (charAtCurrent === '"') {
      let startStringIndex = parseIndex + 1;
      let endStringIndex = startStringIndex;
      while (endStringIndex < stringLength && str[endStringIndex] !== '"') {
        endStringIndex++;
      }
      parsedValueCandidate = str.substring(startStringIndex, endStringIndex);
      advanceToIndex = endStringIndex + 1;
    } else if (
      charAtCurrent === "-" ||
      (charAtCurrent >= "0" && charAtCurrent <= "9")
    ) {
      let numberStartIndex = parseIndex;
      let numberEndIndex = parseIndex;
      while (
        numberEndIndex < stringLength &&
        ((str[numberEndIndex] >= "0" && str[numberEndIndex] <= "9") ||
          str[numberEndIndex] === ".")
      ) {
        numberEndIndex++;
      }
      parsedValueCandidate = Number(
        str.substring(numberStartIndex, numberEndIndex),
      );
      advanceToIndex = numberEndIndex;
    } else {
      if (str.substring(parseIndex, parseIndex + 4) === "true") {
        parsedValueCandidate = true;
        advanceToIndex = parseIndex + 4;
      } else if (str.substring(parseIndex, parseIndex + 5) === "false") {
        parsedValueCandidate = false;
        advanceToIndex = parseIndex + 5;
      } else if (str.substring(parseIndex, parseIndex + 4) === "null") {
        parsedValueCandidate = null;
        advanceToIndex = parseIndex + 4;
      }
    }

    if (str[advanceToIndex] === ":") {
      potentialKey = parsedValueCandidate;
      parseIndex = advanceToIndex + 1;
    } else {
      if (currentObjectOrArray === null) {
        rootValue = parsedValueCandidate;
      } else if (Array.isArray(currentObjectOrArray)) {
        currentObjectOrArray.push(parsedValueCandidate);
      } else if (potentialKey !== null) {
        currentObjectOrArray[potentialKey] = parsedValueCandidate;
        potentialKey = null;
      }
      parseIndex = advanceToIndex;
    }
  }

  return rootValue;
};
