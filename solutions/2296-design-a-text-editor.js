/**
 * Design A Text Editor
 * Intuition: Represent the text and cursor using two dynamic arrays (stacks). One array (`leftBuffer`) stores characters to the left of the cursor, and the other (`rightBuffer`) stores characters to the right of the cursor in reverse order. This allows O(1) insertion/deletion at the cursor and O(1) character movement for cursor operations.
 * Approach: 1. Initialize `leftBuffer` and `rightBuffer` as empty arrays in the constructor to represent the text before and after the cursor, respectively. 2. For `addText`, iterate through the input `text` and push each character onto `leftBuffer`. This places the new text to the left of the cursor, and the cursor naturally ends up to its right. 3. For `deleteText`, repeatedly pop characters from `leftBuffer` up to `k` times or until `leftBuffer` is empty. The count of popped characters is returned. 4. For `cursorLeft`, repeatedly pop characters from `leftBuffer` and push them onto `rightBuffer` up to `k` times or until `leftBuffer` is empty. This effectively moves characters from left to right across the cursor. 5. For `cursorRight`, repeatedly pop characters from `rightBuffer` and push them onto `leftBuffer` up to `k` times or until `rightBuffer` is empty. This moves characters from right to left across the cursor. 6. Both `cursorLeft` and `cursorRight` return the last `min(10, leftBuffer.length)` characters from `leftBuffer` by slicing the array and joining them into a string.
 * Dry Run:
 *   1. TextEditor(): `leftBuffer = []`, `rightBuffer = []`
 *   2. addText("hello"): `leftBuffer = ['h', 'e', 'l', 'l', 'o']`, `rightBuffer = []`
 *   3. cursorLeft(2):
 *      - Pop 'o' from `leftBuffer`, push to `rightBuffer`. `leftBuffer = ['h', 'e', 'l', 'l']`, `rightBuffer = ['o']`
 *      - Pop 'l' from `leftBuffer`, push to `rightBuffer`. `leftBuffer = ['h', 'e', 'l']`, `rightBuffer = ['o', 'l']`
 *      - Returns `['h', 'e', 'l'].slice(Math.max(0, 3 - 10)).join('')` -> `['h', 'e', 'l'].slice(0).join('')` -> "hel"
 *   4. deleteText(1):
 *      - Pop 'l' from `leftBuffer`. `leftBuffer = ['h', 'e']`, `rightBuffer = ['o', 'l']`
 *      - Returns 1
 *   5. addText("xyz"):
 *      - Push 'x', 'y', 'z' to `leftBuffer`. `leftBuffer = ['h', 'e', 'x', 'y', 'z']`, `rightBuffer = ['o', 'l']`
 *   6. cursorRight(1):
 *      - Pop 'l' from `rightBuffer`, push to `leftBuffer`. `leftBuffer = ['h', 'e', 'x', 'y', 'z', 'l']`, `rightBuffer = ['o']`
 *      - Returns `['h', 'e', 'x', 'y', 'z', 'l'].slice(Math.max(0, 6 - 10)).join('')` -> `['h', 'e', 'x', 'y', 'z', 'l'].slice(0).join('')` -> "hexyl"
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var TextEditor = function () {
  this.leftBuffer = [];
  this.rightBuffer = [];
};

TextEditor.prototype.addText = function (incomingText) {
  for (const singleChar of incomingText) {
    this.leftBuffer.push(singleChar);
  }
};

TextEditor.prototype.deleteText = function (numToDelete) {
  let actualDeletedCount = 0;
  while (actualDeletedCount < numToDelete && this.leftBuffer.length > 0) {
    this.leftBuffer.pop();
    actualDeletedCount++;
  }
  return actualDeletedCount;
};

TextEditor.prototype.cursorLeft = function (shiftAmount) {
  let movesPerformed = 0;
  while (movesPerformed < shiftAmount && this.leftBuffer.length > 0) {
    this.rightBuffer.push(this.leftBuffer.pop());
    movesPerformed++;
  }
  const startIndex = Math.max(0, this.leftBuffer.length - 10);
  return this.leftBuffer.slice(startIndex).join("");
};

TextEditor.prototype.cursorRight = function (travelDistance) {
  for (let currentStep = 0; currentStep < travelDistance; ++currentStep) {
    if (this.rightBuffer.length === 0) {
      break;
    }
    this.leftBuffer.push(this.rightBuffer.pop());
  }
  const beginningIndex = Math.max(0, this.leftBuffer.length - 10);
  return this.leftBuffer.slice(beginningIndex).join("");
};
