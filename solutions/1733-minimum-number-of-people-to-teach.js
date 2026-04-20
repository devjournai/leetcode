/**
 * Minimum Number Of People To Teach
 * Time Complexity: O(M * N + F * L_max + N * M)
 * Space Complexity: O(M * N + M)
 */
var minimumTeachings = function (n, languages, friendships) {
  const totalLanguagesCount = n;
  const userLanguagesList = languages;
  const friendshipPairs = friendships;

  const userLanguageSetsCollection = Array.from(
    { length: userLanguagesList.length },
    () => new Set(),
  );
  for (let userIndex = 0; userIndex < userLanguagesList.length; userIndex++) {
    for (const singleLanguageKnown of userLanguagesList[userIndex]) {
      userLanguageSetsCollection[userIndex].add(singleLanguageKnown);
    }
  }

  const usersWithCommunicationIssues = new Set();
  for (const friendshipEntry of friendshipPairs) {
    const firstFriendId = friendshipEntry[0];
    const secondFriendId = friendshipEntry[1];

    let canCurrentPairCommunicate = false;
    const firstFriendLanguageSet =
      userLanguageSetsCollection[firstFriendId - 1];
    const secondFriendLanguageSet =
      userLanguageSetsCollection[secondFriendId - 1];

    for (const friendshipLanguageCheck of firstFriendLanguageSet) {
      if (secondFriendLanguageSet.has(friendshipLanguageCheck)) {
        canCurrentPairCommunicate = true;
        break;
      }
    }

    if (!canCurrentPairCommunicate) {
      usersWithCommunicationIssues.add(firstFriendId);
      usersWithCommunicationIssues.add(secondFriendId);
    }
  }

  if (usersWithCommunicationIssues.size === 0) {
    return 0;
  }

  let minimumUsersToEducate = Infinity;
  for (
    let chosenTeachingLanguageId = 1;
    chosenTeachingLanguageId <= totalLanguagesCount;
    chosenTeachingLanguageId++
  ) {
    let currentLanguageTeachingCost = 0;
    for (const uncommunicativeUser of usersWithCommunicationIssues) {
      if (
        !userLanguageSetsCollection[uncommunicativeUser - 1].has(
          chosenTeachingLanguageId,
        )
      ) {
        currentLanguageTeachingCost++;
      }
    }
    minimumUsersToEducate = Math.min(
      minimumUsersToEducate,
      currentLanguageTeachingCost,
    );
  }

  return minimumUsersToEducate;
};
