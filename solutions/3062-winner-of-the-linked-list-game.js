/**
 * Winner Of The Linked List Game
 * Intuition: Traverse the linked list in pairs, comparing the values of the even-indexed node with its subsequent odd-indexed node, and tallying points for "Even" or "Odd" teams. After processing all pairs, determine the winning team based on accumulated points.
 * Approach: 1. Initialize two score accumulators, one for the "Even" team and one for the "Odd" team. 2. Iterate through the linked list, taking two nodes at a time (an even-indexed node and its next odd-indexed node). 3. For each pair, extract their values. 4. Compare the extracted values: if the even-indexed node's value is greater, increment the "Even" score; if the odd-indexed node's value is greater, increment the "Odd" score. 5. Advance the iteration pointer by two steps to the next pair. 6. After iterating through all pairs, compare the final scores. Return "Even" if the even team has more points, "Odd" if the odd team has more points, or "Tie" if their points are equal.
 * Dry Run: head = [2, 1, 4, 3, 6, 5] (representing 2 -> 1 -> 4 -> 3 -> 6 -> 5 -> null)
 *   Initial: evenTeamPoints = 0, oddTeamPoints = 0
 *   Iteration 1:
 *     currentPosition points to Node(2)
 *     valueEvenNode = 2, valueOddNode = 1
 *     (2 > 1) is true. evenTeamPoints becomes 1.
 *     (1 > 2) is false.
 *     currentPosition advances to Node(4).
 *   Iteration 2:
 *     currentPosition points to Node(4)
 *     valueEvenNode = 4, valueOddNode = 3
 *     (4 > 3) is true. evenTeamPoints becomes 2.
 *     (3 > 4) is false.
 *     currentPosition advances to Node(6).
 *   Iteration 3:
 *     currentPosition points to Node(6)
 *     valueEvenNode = 6, valueOddNode = 5
 *     (6 > 5) is true. evenTeamPoints becomes 3.
 *     (5 > 6) is false.
 *     currentPosition advances to null.
 *   Loop ends.
 *   Final scores: evenTeamPoints = 3, oddTeamPoints = 0.
 *   (3 > 0) is true. Returns "Even".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var gameResult = function (head) {
  let evenTeamPoints = 0;
  let oddTeamPoints = 0;

  for (
    let currentPosition = head;
    currentPosition && currentPosition.next;
    currentPosition = currentPosition.next.next
  ) {
    const valueEvenNode = currentPosition.val;
    const valueOddNode = currentPosition.next.val;

    if (valueEvenNode > valueOddNode) {
      evenTeamPoints++;
    }
    if (valueOddNode > valueEvenNode) {
      oddTeamPoints++;
    }
  }

  if (evenTeamPoints > oddTeamPoints) {
    return "Even";
  }
  if (oddTeamPoints > evenTeamPoints) {
    return "Odd";
  }
  return "Tie";
};
