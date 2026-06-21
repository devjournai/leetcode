/**
* Minimum Time To Kill All Monsters
* Intuition: The problem asks for the minimum time to defeat all monsters, where the time taken depends on the order of defeating them. This structure, combined with a limited number of monsters (N <= 15), suggests dynamic programming with bitmasking to represent the set of defeated monsters. The state should capture which monsters are left and the current mana gain.
* Approach: 1. A recursive function `calculateMinTime` is defined, taking two parameters: `defeatedMonstersMask` (a bitmask representing the monsters already killed) and `currentManaGain` (the mana gained per day). 2. A memoization map (`memoizedResults`) stores results for `(defeatedMonstersMask, currentManaGain)` pairs to avoid redundant computations. 3. The base case for the recursion is when `defeatedMonstersMask` indicates all monsters have been killed, in which case 0 additional days are needed. 4. In the recursive step, the function iterates through each monster. If a monster `idx` has not yet been defeated (checked using the bitmask): a. Calculate the `daysToAcquirePower` needed to defeat this monster, which is `Math.ceil(power[idx] / currentManaGain)`. b. Recursively call `calculateMinTime` with an updated mask (`defeatedMonstersMask | (1 << idx)`) and an incremented mana gain (`currentManaGain + 1`). c. Sum `daysToAcquirePower` and the result of the recursive call to get the total days for this specific path. d. Update the `minimumTotalDays` for the current state with the smallest value found across all possible next monsters. 5. The computed `minimumTotalDays` for the current state is stored in `memoizedResults` before being returned. 6. The initial call to `calculateMinTime` starts with `(0, 1)`, representing no monsters defeated and an initial mana gain of 1.
* Dry Run: power = [1, 2]
      - `numberOfMonsters = 2`
      - `calculateMinTime(0, 1)`:
        - `currentMask` is 0, `manaBoost` is 1. `memoizedResults` empty.
        - `lowestDays` = Infinity.
        - `monsterIdx = 0`: Monster 0 (power 1) not defeated.
          - `powerValue = 1`. `daysForMana = ceil(1/1) = 1`.
          - `nextMask = 0 | (1 << 0) = 1`. `nextBoost = 1 + 1 = 2`.
          - Call `calculateMinTime(1, 2)`:
            - `currentMask` is 1, `manaBoost` is 2. `memoizedResults` empty.
            - `lowestDays` = Infinity.
            - `monsterIdx = 0`: Monster 0 is defeated (bit 0 is set in mask 1). Skip.
            - `monsterIdx = 1`: Monster 1 (power 2) not defeated.
              - `powerValue = 2`. `daysForMana = ceil(2/2) = 1`.
              - `nextMask = 1 | (1 << 1) = 3`. `nextBoost = 2 + 1 = 3`.
              - Call `calculateMinTime(3, 3)`:
                - `currentMask` is 3. `(1 << 2) - 1` is 3. Base case reached. Return 0.
              - `totalDaysForPath = 1 (daysForMana) + 0 (recursive call) = 1`.
              - `lowestDays = min(Infinity, 1) = 1`.
            - Loop ends. Store `memoizedResults.set("1_2", 1)`. Return 1.
          - `totalDaysForPath = 1 (daysForMana) + 1 (recursive call) = 2`.
          - `lowestDays = min(Infinity, 2) = 2`.
        - `monsterIdx = 1`: Monster 1 (power 2) not defeated.
          - `powerValue = 2`. `daysForMana = ceil(2/1) = 2`.
          - `nextMask = 0 | (1 << 1) = 2`. `nextBoost = 1 + 1 = 2`.
          - Call `calculateMinTime(2, 2)`:
            - `currentMask` is 2, `manaBoost` is 2. `memoizedResults` empty.
            - `lowestDays` = Infinity.
            - `monsterIdx = 0`: Monster 0 (power 1) not defeated.
              - `powerValue = 1`. `daysForMana = ceil(1/2) = 1`.
              - `nextMask = 2 | (1 << 0) = 3`. `nextBoost = 2 + 1 = 3`.
              - Call `calculateMinTime(3, 3)`:
                - `currentMask` is 3. Base case. Return 0.
              - `totalDaysForPath = 1 (daysForMana) + 0 (recursive call) = 1`.
              - `lowestDays = min(Infinity, 1) = 1`.
            - `monsterIdx = 1`: Monster 1 is defeated (bit 1 is set in mask 2). Skip.
            - Loop ends. Store `memoizedResults.set("2_2", 1)`. Return 1.
          - `totalDaysForPath = 2 (daysForMana) + 1 (recursive call) = 3`.
          - `lowestDays = min(2, 3) = 2`.
        - Loop ends. Store `memoizedResults.set("0_1", 2)`. Return 2.
      - Final result: 2 days.
* Time Complexity: O(N^2 * 2^N)
* Space Complexity: O(N * 2^N)
*/
var minimumTime = function (power) {
  const numberOfMonsters = power.length;
  const memoizedResults = new Map();

  const calculateMinTime = (defeatedMonstersMask, currentManaGain) => {
    const allMonstersDefeatedValue = (1 << numberOfMonsters) - 1;
    if (defeatedMonstersMask === allMonstersDefeatedValue) {
      return 0;
    }

    const stateIdentifier = `${defeatedMonstersMask}_${currentManaGain}`;
    if (memoizedResults.has(stateIdentifier)) {
      return memoizedResults.get(stateIdentifier);
    }

    let minimumTotalDays = Infinity;
    let monsterIndex = 0;

    while (monsterIndex < numberOfMonsters) {
      const isMonsterDefeated = (defeatedMonstersMask >> monsterIndex) & 1;

      if (!isMonsterDefeated) {
        const monsterPowerValue = power[monsterIndex];
        const daysToAcquirePower = Math.ceil(
          monsterPowerValue / currentManaGain,
        );

        const nextMonstersMask = defeatedMonstersMask | (1 << monsterIndex);
        const nextManaGain = currentManaGain + 1;

        const remainingDays = calculateMinTime(nextMonstersMask, nextManaGain);
        const totalDaysForPath = daysToAcquirePower + remainingDays;

        minimumTotalDays = Math.min(minimumTotalDays, totalDaysForPath);
      }
      monsterIndex++;
    }

    memoizedResults.set(stateIdentifier, minimumTotalDays);
    return minimumTotalDays;
  };

  return calculateMinTime(0, 1);
};
