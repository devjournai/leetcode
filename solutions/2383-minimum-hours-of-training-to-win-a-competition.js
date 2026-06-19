/**
 * Minimum Hours Of Training To Win A Competition
 * Intuition: To minimize training hours, we only train when strictly necessary. Energy and experience requirements are cumulative and depend on our current stats. The total training hours are the sum of hours spent boosting energy and hours spent boosting experience, as these are independent training choices.
 * Approach: 1. Initialize variables to track total training hours for energy and experience, and our current energy and experience levels. 2. Iterate through each opponent sequentially. 3. For each opponent, first check if current energy is sufficient (strictly greater). If not, calculate the deficit, add it to energy training hours, and update current energy. 4. Similarly, check if current experience is sufficient. If not, calculate the deficit, add it to experience training hours, and update current experience. 5. After addressing any deficits for the current opponent, update current energy by subtracting the opponent's energy and update current experience by adding the opponent's experience. 6. After iterating through all opponents, return the sum of total energy training hours and total experience training hours.
 * Dry Run: initialEnergy = 1, initialExperience = 1, energy = [1, 2], experience = [2, 3]
 *   1. Initialize: trainingHoursForEnergy = 0, trainingHoursForExperience = 0, currentEnergyLevel = 1, currentExperienceLevel = 1.
 *   2. opponentIndex = 0 (opponent energy = 1, opponent experience = 2):
 *      a. Energy check: currentEnergyLevel (1) <= opponentEnergy (1). True.
 *         energyDeficitAmount = 1 - 1 + 1 = 1.
 *         trainingHoursForEnergy = 0 + 1 = 1.
 *         currentEnergyLevel = 1 + 1 = 2.
 *      b. Experience check: currentExperienceLevel (1) <= opponentExperience (2). True.
 *         experienceDeficitAmount = 2 - 1 + 1 = 2.
 *         trainingHoursForExperience = 0 + 2 = 2.
 *         currentExperienceLevel = 1 + 2 = 3.
 *      c. After defeating: currentEnergyLevel = 2 - 1 = 1. currentExperienceLevel = 3 + 2 = 5.
 *   3. opponentIndex = 1 (opponent energy = 2, opponent experience = 3):
 *      a. Energy check: currentEnergyLevel (1) <= opponentEnergy (2). True.
 *         energyDeficitAmount = 2 - 1 + 1 = 2.
 *         trainingHoursForEnergy = 1 + 2 = 3.
 *         currentEnergyLevel = 1 + 2 = 3.
 *      b. Experience check: currentExperienceLevel (5) <= opponentExperience (3). False.
 *      c. After defeating: currentEnergyLevel = 3 - 2 = 1. currentExperienceLevel = 5 + 3 = 8.
 *   4. End loop.
 *   5. Return trainingHoursForEnergy (3) + trainingHoursForExperience (2) = 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minNumberOfHours = function (
  initialEnergy,
  initialExperience,
  energyOpponents,
  experienceOpponents,
) {
  let trainingHoursForEnergy = 0;
  let trainingHoursForExperience = 0;
  let currentEnergyLevel = initialEnergy;
  let currentExperienceLevel = initialExperience;

  for (
    let opponentIndex = 0;
    opponentIndex < energyOpponents.length;
    opponentIndex++
  ) {
    let opponentEnergyRequirement = energyOpponents[opponentIndex];
    let opponentExperienceRequirement = experienceOpponents[opponentIndex];

    if (currentEnergyLevel <= opponentEnergyRequirement) {
      let energyDeficitAmount =
        opponentEnergyRequirement - currentEnergyLevel + 1;
      trainingHoursForEnergy += energyDeficitAmount;
      currentEnergyLevel += energyDeficitAmount;
    }

    if (currentExperienceLevel <= opponentExperienceRequirement) {
      let experienceDeficitAmount =
        opponentExperienceRequirement - currentExperienceLevel + 1;
      trainingHoursForExperience += experienceDeficitAmount;
      currentExperienceLevel += experienceDeficitAmount;
    }

    currentEnergyLevel -= opponentEnergyRequirement;
    currentExperienceLevel += opponentExperienceRequirement;
  }

  let totalRequiredHours = trainingHoursForEnergy + trainingHoursForExperience;
  return totalRequiredHours;
};
