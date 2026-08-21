/**
 * Maximum Nesting Depth Of The Parentheses
 * Intuition: Depth is just the running count of unmatched '('. Track the peak of that counter while ignoring other characters (the string is a VPS).
 * Approach: 1. Scan s. 2. On '(', increment current depth and update the max. 3. On ')', decrement. 4. Return the recorded maximum.
 * Dry Run: s = "(1+(2*3)+((8)/4))+1".
 *   - Peak nested ((8) → depth 3. Answer 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxDepth = function (s) {
  let currentNestingLevel = 0;
  let greatestDepthAchieved = 0;

  for (let charIndex = 0; charIndex < s.length; charIndex++) {
    const currentSymbol = s[charIndex];

    switch (currentSymbol) {
      case "(":
        currentNestingLevel++;
        greatestDepthAchieved = Math.max(
          greatestDepthAchieved,
          currentNestingLevel
        );
        break;
      case ")":
        currentNestingLevel--;
        break;
    }
  }

  return greatestDepthAchieved;
};
