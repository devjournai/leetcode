/**
 * Replace Question Marks In String To Minimize Its Value
 * Intuition: The cost of a letter is 0+1+...+(freq-1). Fill '?' with letters that currently have the smallest frequency, greedily using a min-heap of frequencies.
 * Approach: 1. Count existing letters. 2. For each '?', pick the letter with smallest frequency (tie -> smallest char), increment it. 3. After deciding counts, rebuild the string left to right replacing '?' in order of the chosen multiset... Actually we need the final string lexicographically smallest among minimum cost, so assign the chosen extra letters in sorted order to '?' from left to right.
 * Dry Run:
 *   s = "???" three a's cost 0+1+2=3 which is optimal and lex smallest.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimizeStringValue = function (s) {
  const letterFrequency = new Array(26).fill(0);
  let questionCount = 0;
  for (const currentChar of s) {
    if (currentChar === "?") {
      questionCount++;
    } else {
      letterFrequency[currentChar.charCodeAt(0) - 97]++;
    }
  }

  const extraLetters = [];
  for (let extraIndex = 0; extraIndex < questionCount; extraIndex++) {
    let bestLetter = 0;
    for (let letterIndex = 1; letterIndex < 26; letterIndex++) {
      if (letterFrequency[letterIndex] < letterFrequency[bestLetter]) {
        bestLetter = letterIndex;
      }
    }
    extraLetters.push(String.fromCharCode(97 + bestLetter));
    letterFrequency[bestLetter]++;
  }
  extraLetters.sort();

  const resultChars = s.split("");
  let extraPointer = 0;
  for (let charIndex = 0; charIndex < resultChars.length; charIndex++) {
    if (resultChars[charIndex] === "?") {
      resultChars[charIndex] = extraLetters[extraPointer++];
    }
  }
  return resultChars.join("");
};
