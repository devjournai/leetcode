/**
 * Naming A Company
 * Intuition: Group words by their initial letter, storing only their suffixes. Then, for every pair of initial letters, count valid combinations by finding suffixes unique to each letter's group.
 * Approach: 1. Initialize an array of 26 Sets, where each set will store suffixes of words starting with a particular letter (a-z). 2. Iterate through the input 'ideas' array. For each 'inputIdea', extract its first character and its remaining suffix. Add the suffix to the corresponding Set in the array. 3. Initialize a 'totalValidNames' counter to 0. 4. Iterate with 'firstGroupIndex' from 0 to 24 (inclusive) for the first letter group. 5. Inside, iterate with 'secondGroupIndex' from 'firstGroupIndex + 1' to 25 (inclusive) for the second letter group. This ensures distinct pairs of letter groups are considered once. 6. For each pair of letter groups (identified by 'firstGroupIndex' and 'secondGroupIndex'), determine the suffixes that are common to both sets. This 'mutualSuffixesCount' is found by iterating through all suffixes in the set for 'firstGroupIndex' and checking if each suffix exists in the set for 'secondGroupIndex'. 7. Calculate the count of suffixes unique to the 'firstGroupIndex' group: 'firstGroupUniqueCount' = (size of 'firstGroupIndex' set) - 'mutualSuffixesCount'. 8. Calculate the count of suffixes unique to the 'secondGroupIndex' group: 'secondGroupUniqueCount' = (size of 'secondGroupIndex' set) - 'mutualSuffixesCount'. 9. Add '2 * firstGroupUniqueCount * secondGroupUniqueCount' to 'totalValidNames'. The multiplication by 2 accounts for `ideaA ideaB` and `ideaB ideaA` pairs. 10. Return 'totalValidNames'.
 * Dry Run:
 * ideas = ["coffee", "donuts", "time", "toffee"]
 *
 * 1. Initialize `suffixGroups` = Array(26 of Set()).
 *
 * 2. Populate `suffixGroups`:
 *    - "coffee": `suffixGroups[2]` (for 'c') gets {"offee"}
 *    - "donuts": `suffixGroups[3]` (for 'd') gets {"onuts"}
 *    - "time":   `suffixGroups[19]` (for 't') gets {"ime"}
 *    - "toffee": `suffixGroups[19]` (for 't') gets {"ime", "offee"}
 *    `suffixGroups` state after this step:
 *    - `suffixGroups[2]` = {"offee"}
 *    - `suffixGroups[3]` = {"onuts"}
 *    - `suffixGroups[19]` = {"ime", "offee"}
 *    - All other sets are empty.
 *
 * 3. `totalValidNames` = 0.
 *
 * 4. Nested loops for `firstGroupIndex` and `secondGroupIndex`:
 *
 *    - Iteration 1: `firstGroupIndex = 2` ('c'), `secondGroupIndex = 3` ('d')
 *        - `currentSuffixGroupA = suffixGroups[2]` = {"offee"}
 *        - `currentSuffixGroupB = suffixGroups[3]` = {"onuts"}
 *        - `mutualSuffixesCount` = `[...currentSuffixGroupA].filter(suffix => currentSuffixGroupB.has(suffix)).length`
 *          = `[...{"offee"}].filter(suffix => {"onuts"}.has(suffix))` = 0
 *        - `firstGroupUniqueCount` = `currentSuffixGroupA.size - mutualSuffixesCount` = `1 - 0` = 1
 *        - `secondGroupUniqueCount` = `currentSuffixGroupB.size - mutualSuffixesCount` = `1 - 0` = 1
 *        - `totalValidNames += 2 * 1 * 1` = 2.
 *          (Example valid pair: ("coffee", "donuts") -> ("doffee", "conuts"))
 *
 *    - Iteration 2: `firstGroupIndex = 2` ('c'), `secondGroupIndex = 19` ('t')
 *        - `currentSuffixGroupA = suffixGroups[2]` = {"offee"}
 *        - `currentSuffixGroupB = suffixGroups[19]` = {"ime", "offee"}
 *        - `mutualSuffixesCount` = `[...currentSuffixGroupA].filter(suffix => currentSuffixGroupB.has(suffix)).length`
 *          = `[...{"offee"}].filter(suffix => {"ime", "offee"}.has(suffix))` = 1 (for "offee")
 *        - `firstGroupUniqueCount` = `currentSuffixGroupA.size - mutualSuffixesCount` = `1 - 1` = 0
 *        - `secondGroupUniqueCount` = `currentSuffixGroupB.size - mutualSuffixesCount` = `2 - 1` = 1 (for "ime")
 *        - `totalValidNames += 2 * 0 * 1` = 0.
 *          (No valid pairs where a 'c'-starting word's suffix is unique to 'c' group, and 't'-starting word's suffix is unique to 't' group, given "offee" is common)
 *
 *    - Iteration 3: `firstGroupIndex = 3` ('d'), `secondGroupIndex = 19` ('t')
 *        - `currentSuffixGroupA = suffixGroups[3]` = {"onuts"}
 *        - `currentSuffixGroupB = suffixGroups[19]` = {"ime", "offee"}
 *        - `mutualSuffixesCount` = `[...currentSuffixGroupA].filter(suffix => currentSuffixGroupB.has(suffix)).length`
 *          = `[...{"onuts"}].filter(suffix => {"ime", "offee"}.has(suffix))` = 0
 *        - `firstGroupUniqueCount` = `currentSuffixGroupA.size - mutualSuffixesCount` = `1 - 0` = 1
 *        - `secondGroupUniqueCount` = `currentSuffixGroupB.size - mutualSuffixesCount` = `2 - 0` = 2
 *        - `totalValidNames += 2 * 1 * 2` = 4.
 *          (Example valid pairs: ("donuts", "time") -> ("tonuts", "dime"); ("donuts", "toffee") -> ("tonuts", "doffee"))
 *
 *    - Other pairs will involve empty sets or have no new unique suffix combinations.
 *
 * 5. Final `totalValidNames` = 2 + 0 + 4 = 6.
 *
 * Time Complexity: O(N * L + K^2 * S_avg * L_avg)
 * Space Complexity: O(N * L)
 */
var distinctNames = function (ideas) {
  const suffixGroups = Array.from({ length: 26 }, () => new Set());
  let totalValidNames = 0;

  for (const inputIdea of ideas) {
    const firstLetterCode = inputIdea.charCodeAt(0);
    const firstLetterIndex = firstLetterCode - 97;
    const currentSuffix = inputIdea.slice(1);
    suffixGroups[firstLetterIndex].add(currentSuffix);
  }

  for (let firstGroupIndex = 0; firstGroupIndex < 25; firstGroupIndex++) {
    for (
      let secondGroupIndex = firstGroupIndex + 1;
      secondGroupIndex < 26;
      secondGroupIndex++
    ) {
      const currentSuffixGroupA = suffixGroups[firstGroupIndex];
      const currentSuffixGroupB = suffixGroups[secondGroupIndex];

      let mutualSuffixesCount = 0;
      for (const suffixValue of currentSuffixGroupA) {
        if (currentSuffixGroupB.has(suffixValue)) {
          mutualSuffixesCount++;
        }
      }

      const firstGroupUniqueCount =
        currentSuffixGroupA.size - mutualSuffixesCount;
      const secondGroupUniqueCount =
        currentSuffixGroupB.size - mutualSuffixesCount;

      totalValidNames += 2 * firstGroupUniqueCount * secondGroupUniqueCount;
    }
  }

  return totalValidNames;
};
