/**
 * Find the Minimum Amount of Time to Brew Potions
 * Intuition: Wizards brew each potion in order with no waiting between wizards on the same potion (a pipeline). Potion j cannot start at wizard i until wizard i finished potion j-1 and wizard i-1 finished potion j. Working backwards from the last wizard of the previous potion finds the earliest finish time of the next potion.
 * Approach: 1. Let sumSkill be the total skill. The first potion finishes at sumSkill * mana[0]. 2. For each later potion j, walk wizards from the second-last down to the first, taking max of "this wizard done with previous potion" vs "next wizard's forced start minus this wizard's brew time". 3. Add sumSkill * mana[j] to get the new last-wizard finish. 4. Return that finish time.
 * Dry Run: skill = [1,5,2,4], mana = [5,1,4,2].
 *   - Potion 0 finishes at (1+5+2+4)*5 = 60.
 *   - Later potions slide the pipeline so the last wizard's finish is 110.
 * Time Complexity: O(N * M)
 * Space Complexity: O(1)
 */
var minTime = function (skill, mana) {
  let sumSkill = 0;
  for (const wizardSkill of skill) {
    sumSkill += wizardSkill;
  }

  let prevWizardDone = sumSkill * mana[0];

  for (let j = 1; j < mana.length; j++) {
    let prevPotionDone = prevWizardDone;
    for (let i = skill.length - 2; i >= 0; i--) {
      prevPotionDone -= skill[i + 1] * mana[j - 1];
      prevWizardDone = Math.max(
        prevPotionDone,
        prevWizardDone - skill[i] * mana[j]
      );
    }
    prevWizardDone += sumSkill * mana[j];
  }

  return prevWizardDone;
};
