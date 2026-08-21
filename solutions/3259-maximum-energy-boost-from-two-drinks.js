/**
 * Maximum Energy Boost From Two Drinks
 * Intuition: Each hour you either keep drinking the same drink or switch. Switching costs a full hour of cleansing, so the best "last drink is A/B" states only depend on the previous hour.
 * Approach: 1. Let dpA / dpB be the best energy if the current hour is committed to A / B (either drinking it or cleansing after a switch). 2. Transition with newDpA = max(dpB, dpA + A[i]) and the symmetric formula for B. 3. Return max(dpA, dpB).
 * Dry Run:
 *   A = [1,3,1], B = [3,1,1]
 *   hour 0: dpA=1, dpB=3
 *   hour 1: dpA=max(3,1+3)=4, dpB=max(1,3+1)=4
 *   hour 2: dpA=max(4,4+1)=5, dpB=max(4,4+1)=5 -> 5
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  let dpA = 0;
  let dpB = 0;

  for (let i = 0; i < energyDrinkA.length; i++) {
    const newDpA = Math.max(dpB, dpA + energyDrinkA[i]);
    const newDpB = Math.max(dpA, dpB + energyDrinkB[i]);
    dpA = newDpA;
    dpB = newDpB;
  }

  return Math.max(dpA, dpB);
};
