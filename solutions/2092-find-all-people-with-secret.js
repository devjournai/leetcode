/**
 * Find All People With Secret
 * Intuition: The problem involves tracking secret propagation over time. A Disjoint Set Union (DSU) data structure is suitable for efficiently managing connected components of people who share the secret. The key is that secret sharing is time-dependent and instantaneous within a given time, but connections made at a certain time might need to be undone if they don't lead to a secret holder.
 * Approach: 1. Initialize a DSU structure where each person is initially their own parent. Person 0 and 'firstPerson' immediately share the secret by uniting their sets. 2. Sort all meetings by their time. 3. Iterate through the sorted meetings, processing all meetings that occur at the same time together. For each time block, record all people involved in meetings. 4. Within a time block, perform DSU union operations for all participants of meetings at that specific time. 5. After processing all meetings for a given time, iterate through the people involved in that time block. If a person's DSU root is not the same as person 0's DSU root (meaning they didn't acquire the secret through this time block), reset their parent in the DSU back to themselves. This effectively "undoes" any connections they formed in this time block that didn't lead to a secret. 6. After iterating through all meeting time blocks, traverse all people from 0 to n-1. If a person's DSU root is the same as person 0's root, they have the secret. Collect these people.
 * Dry Run:
 * n = 4, meetings = [[0,2,1],[1,3,2],[0,3,1]], firstPerson = 1
 *
 * 1. Initialize:
 *    - totalPeopleCount = 4, allMeetings = [[0,2,1],[1,3,2],[0,3,1]], initialSecretHolder = 1
 *    - personRoots = [0, 1, 2, 3] (each person is their own parent)
 *    - uniteSets(0, initialSecretHolder) -> uniteSets(0, 1):
 *      - findSet(0) is 0, findSet(1) is 1.
 *      - personRoots[0] = 1. personRoots = [1, 1, 2, 3]. (0 and 1 are connected, root 1).
 *    - allMeetings.sort(): allMeetings = [[0,2,1],[0,3,1],[1,3,2]] (sorted by time).
 *
 * 2. Process meetings by time:
 *    - meetingIterationIndex = 0.
 *    - currentMeetingTime = 1. peopleInCurrentTimeBlock = [].
 *    - Inner while loop (for time 1):
 *      - Meeting [0,2,1]: participantOne = 0, participantTwo = 2.
 *        - peopleInCurrentTimeBlock.push(0, 2). peopleInCurrentTimeBlock = [0, 2].
 *        - uniteSets(0, 2):
 *          - findSet(0) returns 1. findSet(2) returns 2.
 *          - personRoots[1] = 2. personRoots = [1, 2, 2, 3]. (0, 1, 2 are connected, root 2).
 *        - meetingIterationIndex becomes 1.
 *      - Meeting [0,3,1]: participantOne = 0, participantTwo = 3.
 *        - peopleInCurrentTimeBlock.push(0, 3). peopleInCurrentTimeBlock = [0, 2, 0, 3].
 *        - uniteSets(0, 3):
 *          - findSet(0) returns 2. findSet(3) returns 3.
 *          - personRoots[2] = 3. personRoots = [1, 2, 3, 3]. (0, 1, 2, 3 are connected, root 3).
 *        - meetingIterationIndex becomes 2.
 *      - Next meeting [1,3,2] has time 2, so inner loop for time 1 ends.
 *    - After time 1 block, reset check:
 *      - findSet(0) (secret holder reference) returns 3.
 *      - For individualParticipant in [0, 2, 0, 3]:
 *        - individualParticipant = 0: findSet(0) is 3. findSet(0) is 3. (3 === 3). No reset.
 *        - individualParticipant = 2: findSet(2) is 3. findSet(0) is 3. (3 === 3). No reset.
 *        - individualParticipant = 3: findSet(3) is 3. findSet(0) is 3. (3 === 3). No reset.
 *      - personRoots remains [1, 2, 3, 3].
 *
 *    - meetingIterationIndex = 2.
 *    - currentMeetingTime = 2. peopleInCurrentTimeBlock = [].
 *    - Inner while loop (for time 2):
 *      - Meeting [1,3,2]: participantOne = 1, participantTwo = 3.
 *        - peopleInCurrentTimeBlock.push(1, 3). peopleInCurrentTimeBlock = [1, 3].
 *        - uniteSets(1, 3):
 *          - findSet(1) returns 3. findSet(3) returns 3.
 *          - personRoots[3] = 3. (No change, already in same set).
 *        - meetingIterationIndex becomes 3.
 *      - No more meetings, inner loop for time 2 ends.
 *    - After time 2 block, reset check:
 *      - findSet(0) (secret holder reference) returns 3.
 *      - For individualParticipant in [1, 3]:
 *        - individualParticipant = 1: findSet(1) is 3. findSet(0) is 3. (3 === 3). No reset.
 *        - individualParticipant = 3: findSet(3) is 3. findSet(0) is 3. (3 === 3). No reset.
 *      - personRoots remains [1, 2, 3, 3].
 *
 *    - meetingIterationIndex = 3. `3 < allMeetings.length` (3 < 3) is false. Outer loop ends.
 *
 * 3. Collect final secret holders:
 *    - secretHoldersList = [].
 *    - personSeeker = 0: findSet(0) is 3. findSet(0) is 3. (3 === 3). secretHoldersList.push(0). -> [0]
 *    - personSeeker = 1: findSet(1) is 3. findSet(0) is 3. (3 === 3). secretHoldersList.push(1). -> [0, 1]
 *    - personSeeker = 2: findSet(2) is 3. findSet(0) is 3. (3 === 3). secretHoldersList.push(2). -> [0, 1, 2]
 *    - personSeeker = 3: findSet(3) is 3. findSet(0) is 3. (3 === 3). secretHoldersList.push(3). -> [0, 1, 2, 3]
 *
 * Final Result: [0, 1, 2, 3].
 *
 * Time Complexity: O(M log M + (M + N) * α(N))
 * Space Complexity: O(N + M)
 */
var findAllPeople = function (
  totalPeopleCount,
  allMeetings,
  initialSecretHolder,
) {
  const personRoots = Array.from(
    { length: totalPeopleCount },
    (_, currentIdx) => currentIdx,
  );

  const findSet = (targetId) => {
    if (personRoots[targetId] !== targetId) {
      personRoots[targetId] = findSet(personRoots[targetId]);
    }
    return personRoots[targetId];
  };

  const uniteSets = (idOne, idTwo) => {
    personRoots[findSet(idOne)] = findSet(idTwo);
  };

  uniteSets(0, initialSecretHolder);

  allMeetings.sort(
    (comparisonA, comparisonB) => comparisonA[2] - comparisonB[2],
  );

  let meetingIterationIndex = 0;
  while (meetingIterationIndex < allMeetings.length) {
    const currentMeetingTime = allMeetings[meetingIterationIndex][2];
    const peopleInCurrentTimeBlock = [];
    const temporaryStart = meetingIterationIndex;

    while (
      meetingIterationIndex < allMeetings.length &&
      allMeetings[meetingIterationIndex][2] === currentMeetingTime
    ) {
      const participantOne = allMeetings[meetingIterationIndex][0];
      const participantTwo = allMeetings[meetingIterationIndex][1];
      peopleInCurrentTimeBlock.push(participantOne, participantTwo);
      uniteSets(participantOne, participantTwo);
      meetingIterationIndex++;
    }

    const secretRootIdentifier = findSet(0);
    for (const individualParticipant of peopleInCurrentTimeBlock) {
      if (findSet(individualParticipant) !== secretRootIdentifier) {
        personRoots[individualParticipant] = individualParticipant;
      }
    }
  }

  const secretHoldersList = [];
  const absoluteSecretRoot = findSet(0);
  for (let personSeeker = 0; personSeeker < totalPeopleCount; personSeeker++) {
    if (findSet(personSeeker) === absoluteSecretRoot) {
      secretHoldersList.push(personSeeker);
    }
  }

  return secretHoldersList;
};
