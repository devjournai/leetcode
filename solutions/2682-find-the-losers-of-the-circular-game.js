/**
 * Find The Losers Of The Circular Game
 * Intuition: Simulate the game turn by turn, keeping track of visited friends using a Set. The game stops when a friend receives the ball for the second time.
 * Approach: 1. Initialize a Set to store friends who have received the ball (using 0-indexed friend numbers). 2. Simulate the game with a while loop: in each turn, add the current friend to the Set, calculate the next friend based on the turn multiplier and `k`, then update the current friend and increment the turn multiplier. The loop continues until the current friend is already in the Set. 3. After the game, iterate through all possible friend indices (0 to n-1) and identify those not present in the Set. 4. Convert these 0-indexed friends to 1-indexed numbers and collect them into a result array, which will be naturally sorted as we iterate.
 * Dry Run: n = 5, k = 2
 *   Initial: totalFriends = 5, passStep = 2, visitedFriends = Set{}, currentFriendPosition = 0, turnMultiplier = 1
 *   Turn 1:
 *     visitedFriends.has(0)? No.
 *     visitedFriends.add(0) -> Set{0}
 *     nextPassDistance = 1 * 2 = 2
 *     currentFriendPosition = (0 + 2) % 5 = 2
 *     turnMultiplier = 2
 *   Turn 2:
 *     visitedFriends.has(2)? No.
 *     visitedFriends.add(2) -> Set{0, 2}
 *     nextPassDistance = 2 * 2 = 4
 *     currentFriendPosition = (2 + 4) % 5 = 1
 *     turnMultiplier = 3
 *   Turn 3:
 *     visitedFriends.has(1)? No.
 *     visitedFriends.add(1) -> Set{0, 1, 2}
 *     nextPassDistance = 3 * 2 = 6
 *     currentFriendPosition = (1 + 6) % 5 = 2
 *     turnMultiplier = 4
 *   Turn 4:
 *     visitedFriends.has(2)? Yes. (Game ends)
 *   Collect losers:
 *     gameLosers = []
 *     iteratorFriendIndex = 0: visitedFriends.has(0)? Yes.
 *     iteratorFriendIndex = 1: visitedFriends.has(1)? Yes.
 *     iteratorFriendIndex = 2: visitedFriends.has(2)? Yes.
 *     iteratorFriendIndex = 3: visitedFriends.has(3)? No. gameLosers.push(3+1=4) -> [4]
 *     iteratorFriendIndex = 4: visitedFriends.has(4)? No. gameLosers.push(4+1=5) -> [4, 5]
 *   Return [4, 5].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var circularGameLosers = function (n, k) {
  const visitedFriends = new Set();
  let currentFriendPosition = 0;
  let turnMultiplier = 1;

  while (!visitedFriends.has(currentFriendPosition)) {
    visitedFriends.add(currentFriendPosition);
    let nextPassDistance = turnMultiplier * k;
    currentFriendPosition = (currentFriendPosition + nextPassDistance) % n;
    turnMultiplier++;
  }

  const gameLosers = [];
  for (
    let iteratorFriendIndex = 0;
    iteratorFriendIndex < n;
    iteratorFriendIndex++
  ) {
    if (!visitedFriends.has(iteratorFriendIndex)) {
      gameLosers.push(iteratorFriendIndex + 1);
    }
  }

  return gameLosers;
};
