/**
 * Check If A Parentheses String Can Be Valid
 * Intuition: A valid parentheses string must have an even length. Additionally, for any prefix, the count of open parentheses must be greater than or equal to the count of closed ones. Symmetrically, for any suffix, the count of closed parentheses must be greater than or equal to the count of open ones. Positions marked '0' in `locked` offer the flexibility to act as either an opening or closing parenthesis.
 * Approach: 1. First, check if the length of the string `s` is odd. If it is, return `false` immediately as valid parentheses strings must have an even length. 2. Perform a left-to-right pass: Initialize a `openBalanceCounter` to track the balance. Iterate through the string; if `s[i]` is an open parenthesis or `locked[i]` is '0', increment `openBalanceCounter` (as a '0' can always be an opening parenthesis). Otherwise (a fixed closing parenthesis), decrement `openBalanceCounter`. If `openBalanceCounter` ever drops below zero, it means there are too many fixed closing parentheses that cannot be balanced by fixed open ones or flexible '0's encountered so far, so return `false`. 3. Perform a right-to-left pass: Initialize a `closeBalanceCounter` to track the balance from the end. Iterate backward through the string; if `s[i]` is a closing parenthesis or `locked[i]` is '0', increment `closeBalanceCounter` (as a '0' can always be a closing parenthesis). Otherwise (a fixed opening parenthesis), decrement `closeBalanceCounter`. If `closeBalanceCounter` ever drops below zero, it means there are too many fixed opening parentheses that cannot be balanced by fixed closing ones or flexible '0's encountered from the right, so return `false`. 4. If both passes complete without returning `false`, then the string can be made valid, so return `true`.
 * Dry Run: s = "())(" , locked = "1010"
 * 1. stringLength = 4. 4 % 2 is 0. Continue.
 * 2. Left-to-right pass:
 *    openBalanceCounter = 0
 *    forwardIndex = 0: s[0]='(', locked[0]='1'. `locked[0]=='0'` is false, `s[0]=='('` is true. openBalanceCounter becomes 1.
 *    forwardIndex = 1: s[1]=')', locked[1]='0'. `locked[1]=='0'` is true. openBalanceCounter becomes 2.
 *    forwardIndex = 2: s[2]=')', locked[2]='1'. `locked[2]=='0'` is false, `s[2]=='('` is false. openBalanceCounter becomes 1.
 *    forwardIndex = 3: s[3]='(', locked[3]='0'. `locked[3]=='0'` is true. openBalanceCounter becomes 2.
 *    All openBalanceCounter values >= 0. Pass successful.
 * 3. Right-to-left pass:
 *    closeBalanceCounter = 0
 *    reverseIndex = 3: s[3]='(', locked[3]='0'. `locked[3]=='0'` is true. closeBalanceCounter becomes 1.
 *    reverseIndex = 2: s[2]=')', locked[2]='1'. `locked[2]=='0'` is false, `s[2]==')'` is true. closeBalanceCounter becomes 2.
 *    reverseIndex = 1: s[1]=')', locked[1]='0'. `locked[1]=='0'` is true. closeBalanceCounter becomes 3.
 *    reverseIndex = 0: s[0]='(', locked[0]='1'. `locked[0]=='0'` is false, `s[0]==')'` is false. closeBalanceCounter becomes 2.
 *    All closeBalanceCounter values >= 0. Pass successful.
 * 4. Both passes complete. Return true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canBeValid = function (s, locked) {
  const stringLength = s.length;

  if (stringLength % 2 !== 0) {
    return false;
  }

  let openBalanceCounter = 0;
  for (let forwardIndex = 0; forwardIndex < stringLength; forwardIndex++) {
    if (locked[forwardIndex] === "0" || s[forwardIndex] === "(") {
      openBalanceCounter++;
    } else {
      openBalanceCounter--;
    }
    if (openBalanceCounter < 0) {
      return false;
    }
  }

  let closeBalanceCounter = 0;
  for (let reverseIndex = stringLength - 1; reverseIndex >= 0; reverseIndex--) {
    if (locked[reverseIndex] === "0" || s[reverseIndex] === ")") {
      closeBalanceCounter++;
    } else {
      closeBalanceCounter--;
    }
    if (closeBalanceCounter < 0) {
      return false;
    }
  }

  return true;
};
