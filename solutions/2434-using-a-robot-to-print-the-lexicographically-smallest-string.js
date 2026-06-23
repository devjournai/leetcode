/**
 * Using A Robot To Print The Lexicographically Smallest String
 * Intuition: To construct the lexicographically smallest string, we must always aim to print the smallest available character. At any given moment, the robot has two sources for characters: the front of the remaining input string `s` and the top of its temporary storage `t` (which acts as a stack). The key decision is whether to print the top character from `t` or to push the next character from `s` onto `t`. We should print the character from `t` if it is less than or equal to the smallest character that still exists anywhere in the unprocessed portion of `s`. If the character at `t.top()` is greater than the smallest remaining character in `s`, we must defer printing `t.top()` and instead bring the next character from `s` onto `t`, because the smaller character in `s` will eventually become available and is preferable.
 * Approach: 1. Initialize an array `characterFrequencies` of size 26 to store the count of each character ('a' through 'z') in the input string `s`. This allows us to quickly determine the smallest character still present in `s` that has not yet been processed. 2. Initialize an empty stack `robotHoldingStack` to represent the robot's temporary storage `t`. 3. Initialize an empty string `finalPrintedString` which will accumulate the characters written on paper. 4. Maintain a `smallestRemainingCharIndex` variable, initialized to 0, representing the index ('a' = 0, 'b' = 1, etc.) of the smallest character that currently has a non-zero count in `characterFrequencies`. This `smallestRemainingCharIndex` acts as our `minRemainingCharInS` reference. 5. Iterate through each character `currentSourceChar` of the input string `s`: a. Push `currentSourceChar` onto `robotHoldingStack`. b. Decrement the count of `currentSourceChar` in `characterFrequencies`. c. Continuously increment `smallestRemainingCharIndex` until it points to a character with a non-zero count in `characterFrequencies` or until it exceeds 25 (meaning all characters in `s` have been seen). d. While `robotHoldingStack` is not empty AND (either `smallestRemainingCharIndex` is 26 (indicating no more characters left in `s` that haven't been pushed to the stack) OR the character at `robotHoldingStack.top()` is lexicographically less than or equal to the character represented by `smallestRemainingCharIndex`): i. Pop a character from `robotHoldingStack` and append it to `finalPrintedString`. 6. After the loop processing all characters from `s` is complete, any characters remaining in `robotHoldingStack` must be popped and appended to `finalPrintedString` in their current order. 7. Return `finalPrintedString`.
 * Dry Run: s = "cbacdcbc"
 * 1. `characterFrequencies = {'c':4, 'b':2, 'a':1, 'd':1}`. `robotHoldingStack = []`. `finalPrintedString = ""`. `smallestRemainingCharIndex = 0` ('a').
 * 2. **Process 'c'**: `robotHoldingStack=['c']`. `charFrequencies['c']--` (`c:3`). `smallestRemainingCharIndex` remains `0` ('a'). `robotHoldingStack.top()='c' > 'a'`. No pop.
 * 3. **Process 'b'**: `robotHoldingStack=['c','b']`. `charFrequencies['b']--` (`b:1`). `smallestRemainingCharIndex` remains `0` ('a'). `robotHoldingStack.top()='b' > 'a'`. No pop.
 * 4. **Process 'a'**: `robotHoldingStack=['c','b','a']`. `charFrequencies['a']--` (`a:0`). `smallestRemainingCharIndex` updates to `1` ('b') (since `charFrequencies[0]` is now 0, and `charFrequencies[1]` is 1).
 *    `robotHoldingStack.top()='a'`, `char(smallestRemainingCharIndex)='b'`. 'a' <= 'b'. Pop 'a'. `finalPrintedString="a"`. `robotHoldingStack=['c','b']`.
 *    `robotHoldingStack.top()='b'`, `char(smallestRemainingCharIndex)='b'`. 'b' <= 'b'. Pop 'b'. `finalPrintedString="ab"`. `robotHoldingStack=['c']`.
 *    `robotHoldingStack.top()='c'`, `char(smallestRemainingCharIndex)='b'`. 'c' > 'b'. No more pops.
 * 5. **Process 'c'**: `robotHoldingStack=['c','c']`. `charFrequencies['c']--` (`c:2`). `smallestRemainingCharIndex` remains `1` ('b'). `robotHoldingStack.top()='c' > 'b'`. No pop.
 * 6. **Process 'd'**: `robotHoldingStack=['c','c','d']`. `charFrequencies['d']--` (`d:0`). `smallestRemainingCharIndex` remains `1` ('b'). `robotHoldingStack.top()='d' > 'b'`. No pop.
 * 7. **Process 'c'**: `robotHoldingStack=['c','c','d','c']`. `charFrequencies['c']--` (`c:1`). `smallestRemainingCharIndex` remains `1` ('b'). `robotHoldingStack.top()='c' > 'b'`. No pop.
 * 8. **Process 'b'**: `robotHoldingStack=['c','c','d','c','b']`. `charFrequencies['b']--` (`b:0`). `smallestRemainingCharIndex` updates to `2` ('c').
 *    `robotHoldingStack.top()='b'`, `char(smallestRemainingCharIndex)='c'`. 'b' <= 'c'. Pop 'b'. `finalPrintedString="abb"`. `robotHoldingStack=['c','c','d','c']`.
 *    `robotHoldingStack.top()='c'`, `char(smallestRemainingCharIndex)='c'`. 'c' <= 'c'. Pop 'c'. `finalPrintedString="abbc"`. `robotHoldingStack=['c','c','d']`.
 *    `robotHoldingStack.top()='d'`, `char(smallestRemainingCharIndex)='c'`. 'd' > 'c'. No more pops.
 * 9. **Process 'c'**: `robotHoldingStack=['c','c','d','c']`. `charFrequencies['c']--` (`c:0`). `smallestRemainingCharIndex` updates to `26` (all `s` chars processed).
 *    `robotHoldingStack.top()='c'`, `smallestRemainingCharIndex=26`. True. Pop 'c'. `finalPrintedString="abbcc"`. `robotHoldingStack=['c','c','d']`.
 *    `robotHoldingStack.top()='d'`, `smallestRemainingCharIndex=26`. True. Pop 'd'. `finalPrintedString="abbccd"`. `robotHoldingStack=['c','c']`.
 *    `robotHoldingStack.top()='c'`, `smallestRemainingCharIndex=26`. True. Pop 'c'. `finalPrintedString="abbccdc"`. `robotHoldingStack=['c']`.
 *    `robotHoldingStack.top()='c'`, `smallestRemainingCharIndex=26`. True. Pop 'c'. `finalPrintedString="abbccdc"`. `robotHoldingStack=[]`.
 * 10. End of string `s`. `robotHoldingStack` is empty.
 * 11. Return `abbcccdc`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var robotWithString = function (s) {
  const characterFrequencies = Array(26).fill(0);
  for (
    let frequencyIteration = 0;
    frequencyIteration < s.length;
    frequencyIteration++
  ) {
    characterFrequencies[s.charCodeAt(frequencyIteration) - 97]++;
  }

  const robotHoldingStack = [];
  let smallestRemainingCharIndex = 0;
  let finalPrintedString = "";

  for (let stringTraversal = 0; stringTraversal < s.length; stringTraversal++) {
    const currentSourceChar = s[stringTraversal];
    robotHoldingStack.push(currentSourceChar);
    characterFrequencies[currentSourceChar.charCodeAt(0) - 97]--;

    while (
      smallestRemainingCharIndex < 26 &&
      characterFrequencies[smallestRemainingCharIndex] === 0
    ) {
      smallestRemainingCharIndex++;
    }

    while (
      robotHoldingStack.length > 0 &&
      (smallestRemainingCharIndex === 26 ||
        robotHoldingStack[robotHoldingStack.length - 1].charCodeAt(0) - 97 <=
          smallestRemainingCharIndex)
    ) {
      finalPrintedString += robotHoldingStack.pop();
    }
  }

  while (robotHoldingStack.length > 0) {
    finalPrintedString += robotHoldingStack.pop();
  }

  return finalPrintedString;
};
