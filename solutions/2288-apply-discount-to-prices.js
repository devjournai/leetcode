/**
 * Apply Discount To Prices
 * Intuition: Iterate through words, identify valid prices, apply discount, then reassemble the sentence.
 * Approach: 1. Split the input sentence into individual words using space as a delimiter. 2. Calculate a discount multiplier for efficiency. 3. Iterate over the words, checking each word if it starts with '$' and if the remainder consists solely of digits. 4. If a word is a valid price, convert its numeric part to a number, apply the discount multiplier, and format the result to two decimal places, prefixed with '$'. 5. Replace the original word with the discounted and formatted word. 6. Join all words back into a single string with spaces.
 * Dry Run: sentence = "I bought a $100 book for $50", discount = 10
 *   allWords = ["I", "bought", "a", "$100", "book", "for", "$50"]
 *   discountMultiplier = 1 - 10 / 100 = 0.9
 *   Loop (k=0): currentWord = "I". Not a price.
 *   Loop (k=1): currentWord = "bought". Not a price.
 *   Loop (k=2): currentWord = "a". Not a price.
 *   Loop (k=3): currentWord = "$100".
 *     isDollarPresent = true.
 *     pricePart = "100".
 *     isNumericSequence = true.
 *     parsedPrice = 100.
 *     finalPrice = 100 * 0.9 = 90.
 *     formattedString = "$90.00".
 *     allWords[3] becomes "$90.00".
 *   Loop (k=4): currentWord = "book". Not a price.
 *   Loop (k=5): currentWord = "for". Not a price.
 *   Loop (k=6): currentWord = "$50".
 *     isDollarPresent = true.
 *     pricePart = "50".
 *     isNumericSequence = true.
 *     parsedPrice = 50.
 *     finalPrice = 50 * 0.9 = 45.
 *     formattedString = "$45.00".
 *     allWords[6] becomes "$45.00".
 *   Loop ends.
 *   resultSentence = "I bought a $90.00 book for $45.00".
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var discountPrices = function (sentence, discount) {
  const allWords = sentence.split(" ");
  const discountMultiplier = 1 - discount / 100;

  for (let k = 0; k < allWords.length; k++) {
    const currentWord = allWords[k];
    const isDollarPresent = currentWord.startsWith("$");
    const pricePart = currentWord.slice(1);
    const isNumericSequence = /^\d+$/.test(pricePart);

    if (isDollarPresent && isNumericSequence) {
      const parsedPrice = parseInt(pricePart, 10);
      const finalPrice = parsedPrice * discountMultiplier;
      const formattedString = `$${finalPrice.toFixed(2)}`;
      allWords[k] = formattedString;
    }
  }

  const resultSentence = allWords.join(" ");
  return resultSentence;
};
