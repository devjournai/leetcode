/**
 * Smallest Sufficient Team
 * Time Complexity: O(P * 2^S * S)
 * Space Complexity: O(2^S * S)
 */
var smallestSufficientTeam = function (reqSkills, people) {
  const totalRequiredSkills = reqSkills.length;
  const skillNameMap = new Map();

  for (let skillIdx = 0; skillIdx < totalRequiredSkills; skillIdx++) {
    const skillEntryName = reqSkills[skillIdx];
    const skillBitValue = 1 << skillIdx;
    skillNameMap.set(skillEntryName, skillBitValue);
  }

  const personBitmasks = [];
  for (let personIdIndex = 0; personIdIndex < people.length; personIdIndex++) {
    const personCurrentSkillSet = people[personIdIndex];
    let accumulatedPersonSkillMask = 0;

    for (
      let currentSkillIterator = 0;
      currentSkillIterator < personCurrentSkillSet.length;
      currentSkillIterator++
    ) {
      const acquiredSkillName = personCurrentSkillSet[currentSkillIterator];
      const acquiredSkillBit = skillNameMap.get(acquiredSkillName);
      if (acquiredSkillBit !== undefined) {
        accumulatedPersonSkillMask |= acquiredSkillBit;
      }
    }
    personBitmasks.push(accumulatedPersonSkillMask);
  }

  const allSkillsTargetMask = (1 << totalRequiredSkills) - 1;
  const minimumTeamsDP = new Map();
  minimumTeamsDP.set(0, []);

  for (
    let individualPersonnelIndex = 0;
    individualPersonnelIndex < people.length;
    individualPersonnelIndex++
  ) {
    const personnelSkillBitfield = personBitmasks[individualPersonnelIndex];

    if (personnelSkillBitfield === 0) {
      continue;
    }

    const currentDpStates = [...minimumTeamsDP.entries()];

    for (
      let stateIterator = 0;
      stateIterator < currentDpStates.length;
      stateIterator++
    ) {
      const currentDpEntry = currentDpStates[stateIterator];
      const previousSkillConfiguration = currentDpEntry[0];
      const currentTeamMembers = currentDpEntry[1];

      const nextSkillRequirementCoverage =
        previousSkillConfiguration | personnelSkillBitfield;

      if (nextSkillRequirementCoverage === previousSkillConfiguration) {
        continue;
      }

      const prospectiveTeam = [...currentTeamMembers, individualPersonnelIndex];
      const existingOptimalForNextSkills = minimumTeamsDP.get(
        nextSkillRequirementCoverage,
      );

      const isNewEntryForSkills = existingOptimalForNextSkills === undefined;
      const isSmallerCandidateTeamFound =
        prospectiveTeam.length < existingOptimalForNextSkills?.length;

      if (isNewEntryForSkills || isSmallerCandidateTeamFound) {
        minimumTeamsDP.set(nextSkillRequirementCoverage, prospectiveTeam);
      }
    }
  }

  return minimumTeamsDP.get(allSkillsTargetMask);
};
