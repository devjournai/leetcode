/**
 * Find Words Containing Character
 * Intuition: The problem requires identifying words within a list that contain a specific character and returning their original indices. A straightforward way to achieve this is to process each word sequentially and check for the character's presence.
 * Approach: 1. Initialize an empty array to store the indices of qualifying words. 2. Iterate through the input `words` array using the `reduce` higher-order function, which allows accumulating results from each word. 3. For each word in the iteration, check if it contains the target character using the `includes` string method. 4. If the word contains the character, add its current index to the accumulating array. 5. After iterating through all words, return the accumulated array of indices.
 * Dry Run: words = ["apple", "banana", "cherry"], x = "a"
 * 1. Initialize `matchingWordIndices = []`.
 * 2. `words.reduce` starts:
 *    - Initial `indicesCollector` is `[]`.
 *    - First iteration: `currentWordString = "apple"`, `indexPosition = 0`
 *      - `"apple".includes("a")` is `true`.
 *      - `indicesCollector.push(0)`. `indicesCollector` becomes `[0]`.
 *      - Returns `[0]`.
 *    - Second iteration: `indicesCollector` is `[0]`. `currentWordString = "banana"`, `indexPosition = 1`
 *      - `"banana".includes("a")` is `true`.
 *      - `indicesCollector.push(1)`. `indicesCollector` becomes `[0, 1]`.
 *      - Returns `[0, 1]`.
 *    - Third iteration: `indicesCollector` is `[0, 1]`. `currentWordString = "cherry"`, `indexPosition = 2`
 *      - `"cherry".includes("a")` is `false`.
 *      - `indicesCollector` remains `[0, 1]`.
 *      - Returns `[0, 1]`.
 * 3. `reduce` completes. `matchingWordIndices` is `[0, 1]`.
 * 4. Return `[0, 1]`.
 * Time Complexity: O(N * L)
 * Space Complexity: O(N)
 */
var findWordsContaining = function (words, x) {
  const matchingWordIndices = words.reduce(
    (indicesCollector, currentWordString, indexPosition) => {
      if (currentWordString.includes(x)) {
        indicesCollector.push(indexPosition);
      }
      return indicesCollector;
    },
    []
  );

  return matchingWordIndices;
};
