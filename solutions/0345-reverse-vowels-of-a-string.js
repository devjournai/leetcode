/**
 * Reverse Vowels Of A String
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var reverseVowels = function (s) {
    const charactersArray = Array.from(s);
    let leftIndex = 0;
    let rightIndex = charactersArray.length - 1;

    const vowelLookup = new Set(['a', 'e', 'i', 'o', 'u']);

    while (leftIndex < rightIndex) {
        while (leftIndex < rightIndex && !vowelLookup.has(charactersArray[leftIndex].toLowerCase())) {
            leftIndex++;
        }

        while (leftIndex < rightIndex && !vowelLookup.has(charactersArray[rightIndex].toLowerCase())) {
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

    return charactersArray.join('');
};