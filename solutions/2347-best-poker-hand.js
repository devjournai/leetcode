/**
 * Best Poker Hand
 * Intuition: Determine the best poker hand by counting suit and rank occurrences. A "Flush" is identified by all cards having the same suit. Otherwise, prioritize "Three of a Kind" if any rank appears three or more times, then "Pair" if any rank appears twice. If no such patterns exist, the hand is "High Card".
 * Approach: 1. Initialize two separate maps: one to store the frequency of each suit (`suitCounts`) and another for the frequency of each rank (`rankFrequencies`). 2. Iterate through the given `ranks` and `suits` arrays (which always have 5 elements). For each card, increment its corresponding suit count in `suitCounts` and its rank count in `rankFrequencies`. 3. After populating the maps, check for a "Flush": If `suitCounts.size` is 1 (meaning all 5 cards share the same suit), return "Flush". 4. If not a "Flush", explicitly iterate through the `rankFrequencies` values to find the maximum rank frequency. 5. Check for "Three of a Kind": If this maximum rank frequency is 3 or greater, return "Three of a Kind". 6. Check for "Pair": If the maximum rank frequency is 2, return "Pair". 7. If none of the above conditions are met, return "High Card".
 * Dry Run: ranks = [4, 4, 4, 13, 2], suits = ['a', 'a', 'a', 'b', 'c']
 * 1. Initialize suitCounts = new Map(), rankFrequencies = new Map().
 * 2. Loop through cards (cardIndex from 0 to 4):
 *    - cardIndex = 0: suitCounts.set('a', 1), rankFrequencies.set(4, 1)
 *    - cardIndex = 1: suitCounts.set('a', 2), rankFrequencies.set(4, 2)
 *    - cardIndex = 2: suitCounts.set('a', 3), rankFrequencies.set(4, 3)
 *    - cardIndex = 3: suitCounts.set('b', 1), rankFrequencies.set(13, 1)
 *    - cardIndex = 4: suitCounts.set('c', 1), rankFrequencies.set(2, 1)
 *    Resulting maps: suitCounts = {'a': 3, 'b': 1, 'c': 1}, rankFrequencies = {4: 3, 13: 1, 2: 1}.
 * 3. Check for Flush: suitCounts.size is 3. Since 3 !== 1, it's not a Flush.
 * 4. Find max rank frequency:
 *    Initialize maxRankOccurrences = 0.
 *    Iterate through rankFrequencies.values() ([3, 1, 1]):
 *    - countValue = 3: maxRankOccurrences becomes 3.
 *    - countValue = 1: maxRankOccurrences remains 3.
 *    - countValue = 1: maxRankOccurrences remains 3.
 *    maxRankOccurrences = 3.
 * 5. Check for Three of a Kind: maxRankOccurrences (3) >= 3 is true. Return "Three of a Kind".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var bestHand = function (ranks, suits) {
  const suitCounts = new Map();
  const rankFrequencies = new Map();

  for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
    const currentSuit = suits[cardIndex];
    const currentRank = ranks[cardIndex];
    suitCounts.set(currentSuit, (suitCounts.get(currentSuit) || 0) + 1);
    rankFrequencies.set(
      currentRank,
      (rankFrequencies.get(currentRank) || 0) + 1,
    );
  }

  if (suitCounts.size === 1) {
    return "Flush";
  }

  let maxRankOccurrences = 0;
  for (const countValue of rankFrequencies.values()) {
    if (countValue > maxRankOccurrences) {
      maxRankOccurrences = countValue;
    }
  }

  if (maxRankOccurrences >= 3) {
    return "Three of a Kind";
  }

  if (maxRankOccurrences === 2) {
    return "Pair";
  }

  return "High Card";
};
