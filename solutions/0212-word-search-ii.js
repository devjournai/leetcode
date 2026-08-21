/**
 * Word Search II
 * Intuition: Put all words in a trie so one DFS from each board cell can match many words at once. Marking a cell '#' prevents reuse; clearing _word after a hit avoids duplicate results.
 * Approach: 1. Insert every word into a trie, storing the full string at _word. 2. From each cell whose letter is a trie child, DFS. 3. If the node has _word, add it and unset _word. 4. Mark the cell visited, recurse to 4-neighbors, then restore the letter. 5. Return the set as an array.
 * Dry Run: board = [["a","b"],["c","d"]], words = ["ab","cd"].
 *   - Trie has ab and cd.
 *   - DFS from [0][0] 'a' → [0][1] 'b' hits _word "ab" and unsets it.
 *   - DFS from [1][0] 'c' → [1][1] 'd' hits "cd". Return ["ab","cd"].
 * Time Complexity: O(M * N * 3^K)
 * Space Complexity: O(L)
 */
var findWords = function (board, words) {
  const boardRows = board.length;
  const boardColumns = board[0].length;

  const trieRootNode = {};
  const foundWordSet = new Set();

  words.forEach((wordItem) => {
    let currentTriePointer = trieRootNode;
    for (let charIterator = 0; charIterator < wordItem.length; charIterator++) {
      const characterKey = wordItem[charIterator];
      if (!currentTriePointer[characterKey]) {
        currentTriePointer[characterKey] = {};
      }
      currentTriePointer = currentTriePointer[characterKey];
    }
    currentTriePointer._word = wordItem;
  });

  const moveDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (let rowScan = 0; rowScan < boardRows; rowScan++) {
    for (let colScan = 0; colScan < boardColumns; colScan++) {
      const initialChar = board[rowScan][colScan];
      if (trieRootNode[initialChar]) {
        depthFirstSearch(rowScan, colScan, trieRootNode);
      }
    }
  }

  return Array.from(foundWordSet);

  function depthFirstSearch(currentRow, currentCol, parentTrieNode) {
    const boardCellCharacter = board[currentRow][currentCol];
    const nextTrieNode = parentTrieNode[boardCellCharacter];

    if (!nextTrieNode) {
      return;
    }

    if (nextTrieNode._word) {
      const discoveredWord = nextTrieNode._word;
      foundWordSet.add(discoveredWord);
      nextTrieNode._word = undefined;
    }

    board[currentRow][currentCol] = "#";

    for (
      let directionCounter = 0;
      directionCounter < moveDirections.length;
      directionCounter++
    ) {
      const [rowOffset, colOffset] = moveDirections[directionCounter];
      const nextRowCoordinate = currentRow + rowOffset;
      const nextColCoordinate = currentCol + colOffset;

      if (
        nextRowCoordinate >= 0 &&
        nextRowCoordinate < boardRows &&
        nextColCoordinate >= 0 &&
        nextColCoordinate < boardColumns &&
        board[nextRowCoordinate][nextColCoordinate] !== "#"
      ) {
        depthFirstSearch(nextRowCoordinate, nextColCoordinate, nextTrieNode);
      }
    }

    board[currentRow][currentCol] = boardCellCharacter;
  }
};
