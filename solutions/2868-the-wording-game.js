/**
 * The Wording Game
 * Intuition: This is a game theory problem solvable with minimax and memoization. The state of the game can be defined by the last played word and whose turn it is. A player wins if they can make a move that forces the opponent into a losing state. The key observation from the problem structure (and validated by the reference solution) is that for optimal play, players only need to consider the lexicographically largest word available for a given starting character (or the next character), rather than exhaustively checking all valid words. If playing this largest word leads to a win, the player takes it. If not, no other words starting with that character would lead to a win (this implies a specific game property not explicitly stated, but crucial for efficiency).
 * Approach:
 * 1. Pre-process both players' word lists (`a` and `b`) to create maps (`playerWordMaps`). Each map stores, for each possible starting character ('a' through 'z'), the lexicographically largest word from that player's list that starts with that character. This is done by iterating through the sorted word lists in reverse.
 * 2. Initialize a memoization table (`gameMemo`) to store results of `(lastPlayedWord, playerTurnId)` states to avoid redundant computations.
 * 3. Define a recursive function `checkPlayerWinState(lastPlayedWord, playerTurnId)`:
 *    a. Check `gameMemo` for the current state. If found, return the memoized result.
 *    b. Determine the `baseLetter` of `lastPlayedWord` and the `successorLetter` (the next letter in the alphabet).
 *    c. Try to make a winning move by playing a word starting with `baseLetter`:
 *       i. Retrieve the `candidateWordOne` from `playerWordMaps[playerTurnId]` for `baseLetter`.
 *       ii. If `candidateWordOne` exists and is lexicographically greater than `lastPlayedWord`, recursively call `checkPlayerWinState(candidateWordOne, opponentTurnId)`. If this call indicates the opponent loses (returns `false`), then the current player wins from the current state. Memoize `true` and return `true`.
 *    d. Try to make a winning move by playing a word starting with `successorLetter`:
 *       i. Retrieve the `candidateWordTwo` from `playerWordMaps[playerTurnId]` for `successorLetter`.
 *       ii. If `candidateWordTwo` exists (any word starting with `successorLetter` will be lexicographically greater than `lastPlayedWord`), recursively call `checkPlayerWinState(candidateWordTwo, opponentTurnId)`. If this call indicates the opponent loses (returns `false`), then the current player wins from the current state. Memoize `true` and return `true`.
 *    e. If neither of the above options leads to a win, the current player cannot make a winning move. Memoize `false` and return `false`.
 * 4. Alice starts by playing `a[0]`. The game then proceeds with Bob's turn. Alice wins if Bob loses from the state `(a[0], Bob)`. Therefore, the main function returns `!checkPlayerWinState(a[0], 1)`.
 * Dry Run: For `a = ["ant", "ape"]`, `b = ["bear"]`
 * 1. `playerWordMaps` created: `playerWordMaps[0] = {'a': "ape"}`, `playerWordMaps[1] = {'b': "bear"}`.
 * 2. Initial call: `!checkPlayerWinState("ant", 1)` (Alice played "ant", Bob's turn).
 *    `checkPlayerWinState("ant", 1)`:
 *      - `lastPlayedWord = "ant"`, `playerTurnId = 1`. `baseLetter = 'a'`, `successorLetter = 'b'`.
 *      - Check `playerWordMaps[1]['a']`: Not found.
 *      - Check `playerWordMaps[1]['b']`: Found "bear".
 *        - Recurse: `!checkPlayerWinState("bear", 0)` (Bob plays "bear", Alice's turn).
 *          `checkPlayerWinState("bear", 0)`:
 *            - `lastPlayedWord = "bear"`, `playerTurnId = 0`. `baseLetter = 'b'`, `successorLetter = 'c'`.
 *            - Check `playerWordMaps[0]['b']`: Not found.
 *            - Check `playerWordMaps[0]['c']`: Not found.
 *            - Neither option works. Alice loses. Returns `false`. `gameMemo` stores `("bear", 0): false`.
 *        - Back to `checkPlayerWinState("ant", 1)`: `!false` is `true`. Bob wins. Returns `true`. `gameMemo` stores `("ant", 1): true`.
 * 3. Final return: `!true` which is `false`. Alice loses.
 * Time Complexity: O((N + M) * L)
 * Space Complexity: O((N + M) * L)
 */
var canAliceWin = function (a, b) {
  const playerWordMaps = [{}, {}];

  [a, b].forEach((currentWords, playerTurnId) => {
    for (let wordIndex = currentWords.length - 1; wordIndex >= 0; wordIndex--) {
      const startLetter = currentWords[wordIndex][0];
      if (!(startLetter in playerWordMaps[playerTurnId])) {
        playerWordMaps[playerTurnId][startLetter] = currentWords[wordIndex];
      }
    }
  });

  const gameMemo = new Map();

  function checkPlayerWinState(lastPlayedWord, playerTurnId) {
    const memoKey = `${lastPlayedWord},${playerTurnId}`;
    if (gameMemo.has(memoKey)) {
      return gameMemo.get(memoKey);
    }

    const baseLetter = lastPlayedWord[0];
    const successorLetter = String.fromCharCode(baseLetter.charCodeAt(0) + 1);
    const opponentTurnId = playerTurnId ^ 1;

    if (baseLetter in playerWordMaps[playerTurnId]) {
      const candidateWordOne = playerWordMaps[playerTurnId][baseLetter];
      if (candidateWordOne > lastPlayedWord) {
        if (!checkPlayerWinState(candidateWordOne, opponentTurnId)) {
          gameMemo.set(memoKey, true);
          return true;
        }
      }
    }

    if (successorLetter in playerWordMaps[playerTurnId]) {
      const candidateWordTwo = playerWordMaps[playerTurnId][successorLetter];
      if (!checkPlayerWinState(candidateWordTwo, opponentTurnId)) {
        gameMemo.set(memoKey, true);
        return true;
      }
    }

    gameMemo.set(memoKey, false);
    return false;
  }

  return !checkPlayerWinState(a[0], 1);
};
