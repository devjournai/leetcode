/**
 * Circular Sentence
 * Intuition: A sentence is circular if characters link up sequentially and the last word links back to the first. We can check these conditions by splitting the sentence into words and comparing adjacent character endpoints.
 * Approach: 1. Split the input sentence string into an array of individual words using a space delimiter. 2. Iterate through the array of words from the first element up to the second-to-last element. In each iteration, compare the last character of the current word with the first character of the next word. If any pair does not satisfy this condition, the sentence is not circular, and we immediately return false. 3. After checking all sequential word pairs, verify the overall circularity by comparing the last character of the very last word in the array with the first character of the very first word in the array. If these characters do not match, the sentence is not circular, and we return false. 4. If all checks pass, the sentence is indeed circular, so we return true.
 * Dry Run: sentence = "eetcode"
 *   1. wordComponents = ["eetcode"]
 *   2. totalWords = 1
 *   3. The loop for adjacent word pairs (wordIndex from 0 to totalWords - 2) does not run because totalWords - 2 = -1.
 *   4. firstElement = wordComponents[0] = "eetcode"
 *   5. lastElement = wordComponents[totalWords - 1] = "eetcode"
 *   6. firstCharOfFirstElement = firstElement[0] = 'e'
 *   7. lastCharOfLastElement = lastElement[lastElement.length - 1] = 'e'
 *   8. Return firstCharOfFirstElement === lastCharOfLastElement ('e' === 'e'), which is true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isCircularSentence = function (sentence) {
  const wordComponents = sentence.split(" ");
  const totalWords = wordComponents.length;

  for (let wordIndex = 0; wordIndex < totalWords - 1; wordIndex++) {
    const currentSegment = wordComponents[wordIndex];
    const nextSegment = wordComponents[wordIndex + 1];

    const lastCharCurrent = currentSegment[currentSegment.length - 1];
    const firstCharNext = nextSegment[0];

    if (lastCharCurrent !== firstCharNext) {
      return false;
    }
  }

  const firstElement = wordComponents[0];
  const lastElement = wordComponents[totalWords - 1];

  const firstCharOfFirstElement = firstElement[0];
  const lastCharOfLastElement = lastElement[lastElement.length - 1];

  return firstCharOfFirstElement === lastCharOfLastElement;
};
