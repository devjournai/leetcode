/**
 * Reverse Vowels Of A String
 * Intuition: Only vowels move. Two pointers on a character array skip consonants (case-insensitive via a lowercase set) and swap when both land on vowels.
 * Approach: 1. Copy s into charactersArray; vowelLookup = {a,e,i,o,u}. 2. While left < right, advance left until a vowel, right until a vowel. 3. Swap those characters and move both. 4. Join and return.
 * Dry Run: s = "hello".
 *   - left at e, right at o; swap → "holle". Pointers meet; return "holle".
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reverseVowels = function (s) {
  const charactersArray = Array.from(s);
  let leftIndex = 0;
  let rightIndex = charactersArray.length - 1;

  const vowelLookup = new Set(["a", "e", "i", "o", "u"]);

  while (leftIndex < rightIndex) {
    while (
      leftIndex < rightIndex &&
      !vowelLookup.has(charactersArray[leftIndex].toLowerCase())
    ) {
      leftIndex++;
    }

    while (
      leftIndex < rightIndex &&
      !vowelLookup.has(charactersArray[rightIndex].toLowerCase())
    ) {
      rightIndex--;
    }

    if (leftIndex < rightIndex) {
      let temporaryStorage = charactersArray[leftIndex];
      charactersArray[leftIndex] = charactersArray[rightIndex];
      charactersArray[rightIndex] = temporaryStorage;
      leftIndex++;
      rightIndex--;
    }
  }

  return charactersArray.join("");
};
