/**
 * First Letter To Appear Twice
 * Intuition: To find the first letter that appears twice, we need a way to keep track of characters we've seen before. The moment we encounter a character that is already in our record of seen characters, that character is our answer.
 * Approach: 1. Initialize a hash set to store characters encountered so far. 2. Iterate through the input string using a standard index-based for loop. 3. For each character, check if it's already in the hash set. If it is, return that character. 4. Otherwise, add the current character to the hash set.
 * Dry Run: s = "abccba"
 * 1. `seenSymbols` initialized as an empty Set.
 * 2. `iterateIndex = 0`, `currentSymbol = 'a'`. `seenSymbols` does not contain 'a'. Add 'a' to `seenSymbols`. `seenSymbols = {'a'}`.
 * 3. `iterateIndex = 1`, `currentSymbol = 'b'`. `seenSymbols` does not contain 'b'. Add 'b' to `seenSymbols`. `seenSymbols = {'a', 'b'}`.
 * 4. `iterateIndex = 2`, `currentSymbol = 'c'`. `seenSymbols` does not contain 'c'. Add 'c' to `seenSymbols`. `seenSymbols = {'a', 'b', 'c'}`.
 * 5. `iterateIndex = 3`, `currentSymbol = 'c'`. `seenSymbols` *does* contain 'c'. Return 'c'.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var repeatedCharacter = function (s) {
  const seenSymbols = new Set();

  for (let iterateIndex = 0; iterateIndex < s.length; iterateIndex++) {
    const currentSymbol = s[iterateIndex];
    if (seenSymbols.has(currentSymbol)) {
      return currentSymbol;
    }
    seenSymbols.add(currentSymbol);
  }
};
