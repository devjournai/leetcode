/**
 * Minimum Initial Energy To Finish Tasks
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumEffort = function (taskDescriptions) {
  taskDescriptions.sort((descriptionA, descriptionB) => {
    const diffA = descriptionA[1] - descriptionA[0];
    const diffB = descriptionB[1] - descriptionB[0];
    return diffB - diffA;
  });

  let requiredInitialEnergy = 0;
  let currentEnergyLevel = 0;

  for (const singleTask of taskDescriptions) {
    const energyExpenditure = singleTask[0];
    const energyPrerequisite = singleTask[1];

    if (currentEnergyLevel < energyPrerequisite) {
      requiredInitialEnergy += energyPrerequisite - currentEnergyLevel;
      currentEnergyLevel = energyPrerequisite;
    }
    currentEnergyLevel -= energyExpenditure;
  }

  return requiredInitialEnergy;
};
