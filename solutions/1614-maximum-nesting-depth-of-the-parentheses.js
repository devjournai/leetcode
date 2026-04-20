/**
 * Maximum Nesting Depth Of The Parentheses
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
          currentNestingLevel,
        );
        break;
      case ")":
        currentNestingLevel--;
        break;
    }
  }

  return greatestDepthAchieved;
};
