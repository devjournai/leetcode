/**
 * Smallest Sufficient Team
 * Intuition: Skill sets are small, so represent coverage as a bitmask. DP maps each reachable skill mask to the smallest team of people that achieves it; adding a person unions their mask with every existing state.
 * Approach: 1. Map each required skill to a bit and encode every person as a mask. 2. DP starts with mask 0 -> empty team. 3. For each person with a nonempty mask, snapshot current DP entries and try unioning that person; keep the shorter team for the new mask. 4. Return the team for the full-skill mask.
 * Dry Run: reqSkills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]].
 *   - Bits: java=1, nodejs=2, reactjs=4; people masks 1, 2, 6.
 *   - Person0: {1:[0]}. Person1: {3:[0,1]}. Person2: {7:[0,2]} (shorter than [0,1,2]).
 *   - Answer [0,2].
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
        nextSkillRequirementCoverage
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
