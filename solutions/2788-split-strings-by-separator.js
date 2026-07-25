/**
 * Split Strings By Separator
 * Intuition: The problem requires breaking down each input string based on a given separator character and then ensuring that any resulting empty string segments are discarded, while preserving the order of the non-empty segments.
 * Approach: 1. Initialize an empty array, `finalOutputArray`, to accumulate all valid split substrings. 2. Iterate through each string, `inputStringItem`, provided in the `words` array. 3. For each `inputStringItem`, apply the `String.prototype.split()` method using the `separator` character. This action generates an array of `splitSegments`. 4. Proceed to iterate through each `segmentString` within the `splitSegments` array. 5. If a `segmentString` is determined not to be an empty string, it is then added to the `finalOutputArray`. 6. Once all input words have been processed and their valid segments collected, `finalOutputArray` is returned.
 * Dry Run:
 * words = ["hello.world", ".code", "js.."]
 * separator = "."
 *
 * finalOutputArray = []
 *
 * 1. inputStringItem = "hello.world"
 *    splitSegments = "hello.world".split(".") => ["hello", "world"]
 *    - segmentString = "hello" => "hello" !== '' is true. finalOutputArray.push("hello") => ["hello"]
 *    - segmentString = "world" => "world" !== '' is true. finalOutputArray.push("world") => ["hello", "world"]
 *
 * 2. inputStringItem = ".code"
 *    splitSegments = ".code".split(".") => ["", "code"]
 *    - segmentString = "" => "" !== '' is false. (skip)
 *    - segmentString = "code" => "code" !== '' is true. finalOutputArray.push("code") => ["hello", "world", "code"]
 *
 * 3. inputStringItem = "js.."
 *    splitSegments = "js..".split(".") => ["js", "", ""]
 *    - segmentString = "js" => "js" !== '' is true. finalOutputArray.push("js") => ["hello", "world", "code", "js"]
 *    - segmentString = "" => "" !== '' is false. (skip)
 *    - segmentString = "" => "" !== '' is false. (skip)
 *
 * Return finalOutputArray => ["hello", "world", "code", "js"]
 * Time Complexity: O(TotalLength)
 * Space Complexity: O(TotalLength)
 */
var splitWordsBySeparator = function (words, separator) {
  const finalOutputArray = [];

  for (const inputStringItem of words) {
    const splitSegments = inputStringItem.split(separator);
    for (const segmentString of splitSegments) {
      if (segmentString !== "") {
        finalOutputArray.push(segmentString);
      }
    }
  }

  return finalOutputArray;
};
