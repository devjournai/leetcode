/**
 * Rings And Rods
 * Intuition: To determine which rods have all three colors, we need a way to track the unique colors present on each rod. A map where keys are rod identifiers and values are sets of colors provides an efficient way to store and later check this information.
 * Approach: 1. Initialize a Map to store sets of colors for each rod. The keys will be rod identifiers (characters '0'-'9'), and values will be Sets of ring colors ('R', 'G', 'B'). 2. Iterate through the input `rings` string, processing two characters at a time. The first character of each pair is the ring color, and the second is the rod identifier. 3. For each color-rod pair, retrieve or create a Set for the specific rod in the Map, then add the current color to that Set. 4. After processing all rings, initialize a counter for rods with all three colors. 5. Iterate through the values (the color Sets) in the Map. If a Set's size is 3, it means that rod has all 'R', 'G', 'B' colors, so increment the counter. 6. Return the final count.
 * Dry Run: rings = "B0R0G0R9"
 * 1. Initialize `rodToColorsMap = new Map()`, `rodsWithAllColors = 0`.
 * 2. First loop (iterating `stringLengthIterator` from 0 to 7 by 2):
 *    - `stringLengthIterator = 0`: `ringColorVal = 'B'`, `rodNumberChar = '0'`. `rodToColorsMap` does not have '0'. `rodToColorsMap.set('0', new Set())`. `rodToColorsMap.get('0').add('B')`. `rodToColorsMap = {'0' => Set('B')}`.
 *    - `stringLengthIterator = 2`: `ringColorVal = 'R'`, `rodNumberChar = '0'`. `rodToColorsMap` has '0'. `rodToColorsMap.get('0').add('R')`. `rodToColorsMap = {'0' => Set('B', 'R')}`.
 *    - `stringLengthIterator = 4`: `ringColorVal = 'G'`, `rodNumberChar = '0'`. `rodToColorsMap` has '0'. `rodToColorsMap.get('0').add('G')`. `rodToColorsMap = {'0' => Set('B', 'R', 'G')}`.
 *    - `stringLengthIterator = 6`: `ringColorVal = 'R'`, `rodNumberChar = '9'`. `rodToColorsMap` does not have '9'. `rodToColorsMap.set('9', new Set())`. `rodToColorsMap.get('9').add('R')`. `rodToColorsMap = {'0' => Set('B', 'R', 'G'), '9' => Set('R')}`.
 * 3. Second loop (iterating `uniqueColorSet` through `rodToColorsMap.values()`):
 *    - `uniqueColorSet = Set('B', 'R', 'G')`. `uniqueColorSet.size` (which is 3) equals 3. `rodsWithAllColors` becomes 1.
 *    - `uniqueColorSet = Set('R')`. `uniqueColorSet.size` (which is 1) does not equal 3.
 * 4. Return `rodsWithAllColors`, which is 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countPoints = function (rings) {
  const rodColorCollections = new Map();
  let indexForPair = 0;
  const totalLength = rings.length;

  while (indexForPair < totalLength) {
    const ringTone = rings[indexForPair];
    const rodLocator = rings[indexForPair + 1];

    if (!rodColorCollections.has(rodLocator)) {
      rodColorCollections.set(rodLocator, new Set());
    }
    rodColorCollections.get(rodLocator).add(ringTone);
    indexForPair += 2;
  }

  let fullColorRodTally = 0;
  for (const collectedColors of rodColorCollections.values()) {
    if (collectedColors.size === 3) {
      fullColorRodTally++;
    }
  }

  return fullColorRodTally;
};
