/**
 * Capitalize The Title
 * Intuition: The problem requires distinct capitalization rules based on word length. Words of length 1 or 2 are fully lowercased, while longer words have their first letter capitalized and the rest lowercased.
 * Approach: 1. Split the input title into individual words using spaces as delimiters. 2. Initialize an empty array to store the processed words. 3. Iterate through each word in the split array. 4. For each word, determine its length. 5. If the word's length is 1 or 2, convert the entire word to lowercase. 6. Otherwise (if the length is greater than 2), convert the first letter to uppercase and the remaining letters to lowercase. 7. Add the processed word to the collection. 8. Join the collection of processed words back into a single string, separated by spaces.
 * Dry Run: title = "aBC dEfGh Ij"
 * 1. originalTitle = "aBC dEfGh Ij"
 * 2. separatedWords = ["aBC", "dEfGh", "Ij"]
 * 3. transformedParts = []
 * 4. Loop (wordCounter = 0):
 *    currentElement = "aBC", elementLength = 3
 *    normalizedElement = "abc"
 *    elementLength (3) > 2, so:
 *      firstLetter = 'a', restOfElement = "bc"
 *      upperFirstLetter = 'A'
 *      finalSegment = "Abc"
 *    transformedParts = ["Abc"]
 * 5. Loop (wordCounter = 1):
 *    currentElement = "dEfGh", elementLength = 5
 *    normalizedElement = "defgh"
 *    elementLength (5) > 2, so:
 *      firstLetter = 'd', restOfElement = "efgh"
 *      upperFirstLetter = 'D'
 *      finalSegment = "Defgh"
 *    transformedParts = ["Abc", "Defgh"]
 * 6. Loop (wordCounter = 2):
 *    currentElement = "Ij", elementLength = 2
 *    normalizedElement = "ij"
 *    elementLength (2) <= 2, so:
 *      finalSegment = "ij"
 *    transformedParts = ["Abc", "Defgh", "ij"]
 * 7. Loop ends.
 * 8. resultString = transformedParts.join(' ') = "Abc Defgh ij"
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var capitalizeTitle = function (title) {
  const originalTitle = title;
  const separatedWords = originalTitle.split(" ");
  const transformedParts = [];

  for (
    let wordCounter = 0;
    wordCounter < separatedWords.length;
    wordCounter++
  ) {
    const currentElement = separatedWords[wordCounter];
    const elementLength = currentElement.length;
    const normalizedElement = currentElement.toLowerCase();

    let finalSegment;
    if (elementLength <= 2) {
      finalSegment = normalizedElement;
    } else {
      const firstLetter = normalizedElement.charAt(0);
      const restOfElement = normalizedElement.slice(1);
      const upperFirstLetter = firstLetter.toUpperCase();
      finalSegment = upperFirstLetter + restOfElement;
    }
    transformedParts.push(finalSegment);
  }

  const resultString = transformedParts.join(" ");
  return resultString;
};
