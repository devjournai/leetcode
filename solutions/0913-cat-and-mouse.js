/**
 * Cat And Mouse
 * Intuition: Terminal states are known: mouse at hole 0 wins; mouse and cat on the same node (not 0) means the cat wins. Working backward, a player wins a state if they can move to a winning successor; they lose it only when every remaining legal move is losing.
 * Approach: 1. `stateOutcome[mouse][cat][turn]` starts DRAW. 2. Enqueue every (0, cat, turn) as mouse-win and every (i,i,turn) i>0 as cat-win. 3. `remainingMovesCount` is degree; cat cannot move to 0 so those edges are subtracted. 4. BFS predecessors: if the previous player’s move reaches their own win, color that state; else decrement remaining moves and color when they hit 0. 5. Return `stateOutcome[1][2][MOUSE_PLAYER_TURN]`.
 * Dry Run: graph=[[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]. Hole 0 is mouse-win. Start mouse=1, cat=2, mouse to move; reverse coloring yields 0 (draw) for this classic instance.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var catMouseGame = function (graph) {
  const MOUSE_PLAYER_WINS = 1;
  const CAT_PLAYER_WINS = 2;
  const DRAW_GAME_OUTCOME = 0;

  const MOUSE_PLAYER_TURN = 0;
  const CAT_PLAYER_TURN = 1;

  const totalNodes = graph.length;

  const stateOutcome = new Array(totalNodes).fill(0).map(() => {
    return new Array(totalNodes)
      .fill(0)
      .map(() => new Array(2).fill(DRAW_GAME_OUTCOME));
  });

  const remainingMovesCount = new Array(totalNodes).fill(0).map(() => {
    return new Array(totalNodes).fill(0).map(() => new Array(2).fill(0));
  });

  const gameStatesProcessingQueue = [];

  for (
    let currentMouseNode = 0;
    currentMouseNode < totalNodes;
    currentMouseNode++
  ) {
    for (let currentTurnType = 0; currentTurnType < 2; currentTurnType++) {
      stateOutcome[0][currentMouseNode][currentTurnType] = MOUSE_PLAYER_WINS;
      gameStatesProcessingQueue.push([
        0,
        currentMouseNode,
        currentTurnType,
        MOUSE_PLAYER_WINS,
      ]);

      if (currentMouseNode > 0) {
        stateOutcome[currentMouseNode][currentMouseNode][currentTurnType] =
          CAT_PLAYER_WINS;
        gameStatesProcessingQueue.push([
          currentMouseNode,
          currentMouseNode,
          currentTurnType,
          CAT_PLAYER_WINS,
        ]);
      }
    }
  }

  for (
    let mousePositionIndex = 0;
    mousePositionIndex < totalNodes;
    mousePositionIndex++
  ) {
    for (
      let catPositionIndex = 0;
      catPositionIndex < totalNodes;
      catPositionIndex++
    ) {
      remainingMovesCount[mousePositionIndex][catPositionIndex][
        MOUSE_PLAYER_TURN
      ] = graph[mousePositionIndex].length;
      remainingMovesCount[mousePositionIndex][catPositionIndex][
        CAT_PLAYER_TURN
      ] = graph[catPositionIndex].length;

      for (
        let catNeighborIndex = 0;
        catNeighborIndex < graph[catPositionIndex].length;
        catNeighborIndex++
      ) {
        if (graph[catPositionIndex][catNeighborIndex] === 0) {
          remainingMovesCount[mousePositionIndex][catPositionIndex][
            CAT_PLAYER_TURN
          ]--;
          break;
        }
      }
    }
  }

  while (gameStatesProcessingQueue.length > 0) {
    const currentGameStateInfo = gameStatesProcessingQueue.shift();
    const mouseCurrentLocation = currentGameStateInfo[0];
    const catCurrentLocation = currentGameStateInfo[1];
    const activePlayerTurn = currentGameStateInfo[2];
    const stateDeterminedOutcome = currentGameStateInfo[3];

    const previousPlayerInTurn = 1 - activePlayerTurn;
    const potentialPredecessorStates = [];

    if (previousPlayerInTurn === MOUSE_PLAYER_TURN) {
      for (const predecessorMouseLocation of graph[mouseCurrentLocation]) {
        potentialPredecessorStates.push([
          predecessorMouseLocation,
          catCurrentLocation,
        ]);
      }
    } else {
      for (const predecessorCatLocation of graph[catCurrentLocation]) {
        if (predecessorCatLocation !== 0) {
          potentialPredecessorStates.push([
            mouseCurrentLocation,
            predecessorCatLocation,
          ]);
        }
      }
    }

    for (const predecessorGameConfig of potentialPredecessorStates) {
      const previousMouseNode = predecessorGameConfig[0];
      const previousCatNode = predecessorGameConfig[1];

      if (
        stateOutcome[previousMouseNode][previousCatNode][
          previousPlayerInTurn
        ] !== DRAW_GAME_OUTCOME
      ) {
        continue;
      }

      let previousPlayerCanWin = false;
      if (
        previousPlayerInTurn === MOUSE_PLAYER_TURN &&
        stateDeterminedOutcome === MOUSE_PLAYER_WINS
      ) {
        previousPlayerCanWin = true;
      } else if (
        previousPlayerInTurn === CAT_PLAYER_TURN &&
        stateDeterminedOutcome === CAT_PLAYER_WINS
      ) {
        previousPlayerCanWin = true;
      }

      if (previousPlayerCanWin) {
        stateOutcome[previousMouseNode][previousCatNode][previousPlayerInTurn] =
          stateDeterminedOutcome;
        gameStatesProcessingQueue.push([
          previousMouseNode,
          previousCatNode,
          previousPlayerInTurn,
          stateDeterminedOutcome,
        ]);
      } else {
        remainingMovesCount[previousMouseNode][previousCatNode][
          previousPlayerInTurn
        ]--;
        if (
          remainingMovesCount[previousMouseNode][previousCatNode][
            previousPlayerInTurn
          ] === 0
        ) {
          stateOutcome[previousMouseNode][previousCatNode][
            previousPlayerInTurn
          ] = stateDeterminedOutcome;
          gameStatesProcessingQueue.push([
            previousMouseNode,
            previousCatNode,
            previousPlayerInTurn,
            stateDeterminedOutcome,
          ]);
        }
      }
    }
  }

  return stateOutcome[1][2][MOUSE_PLAYER_TURN];
};
