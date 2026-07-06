/**
 * Distribute Money to Maximum Children
 *
 * Intuition:
 * Every child must receive at least 1 dollar first.
 *
 * After giving everyone 1 dollar:
 *
 *      remaining = money - children
 *
 * To make a child receive exactly 8 dollars, we need to give that child
 * 7 additional dollars.
 *
 * Greedily maximize the number of children receiving these extra 7 dollars,
 * then carefully handle the special cases where someone would end up with
 * exactly 4 dollars or when all children receive 8 dollars but extra money
 * still remains.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. If:
 *
 *      money < children
 *
 *      it is impossible to give every child at least 1 dollar.
 *
 *      Return -1.
 *
 * 2. Give every child 1 dollar.
 *
 *      remaining = money - children
 *
 * 3. Compute the maximum possible children receiving exactly 8 dollars:
 *
 *      count =
 *          min(children, floor(remaining / 7))
 *
 *      remaining -= count × 7
 *
 * 4. Handle special cases:
 *
 *      Case 1:
 *
 *      If every child currently has 8 dollars
 *      but extra money is still left,
 *      one child must lose the "exactly 8" status.
 *
 *      Case 2:
 *
 *      If one child remains and:
 *
 *          remaining == 3
 *
 *      then that child would receive:
 *
 *          1 + 3 = 4 dollars
 *
 *      which is forbidden.
 *
 *      Reduce the answer by one.
 *
 * 5. Return the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * money = 20
 * children = 3
 *
 * Give everyone 1 dollar:
 *
 * remaining = 17
 *
 * count =
 *
 * min(3,17/7)
 *
 * =2
 *
 * remaining =
 *
 * 17-14
 *
 * =3
 *
 * One child still doesn't have 8 dollars.
 *
 * Since:
 *
 * remaining =3
 * remainingChildren =1
 *
 * That child would receive:
 *
 * 1+3=4
 *
 * Invalid.
 *
 * Reduce count:
 *
 * 2→1
 *
 * Return:
 *
 * 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

var distMoney = function (money, children) {
  money -= children;

  if (money < 0) {
    return -1;
  }

  const count7 = Math.floor(money / 7);
  const remaining = money % 7;

  if (count7 === children && remaining === 0) {
    return children;
  }

  if (count7 === children - 1 && remaining === 3) {
    return children - 2;
  }

  return Math.min(children - 1, count7);
};
