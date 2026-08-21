/**
 * Minimum Number Of People To Teach
 * Intuition: Only users in friendships with no shared language need teaching. Pick one language that minimizes how many of those users do not already know it.
 * Approach: 1. Build `userLanguageSetsCollection`. 2. Collect `usersWithCommunicationIssues` from pairs with empty intersection. 3. For each language 1..n, count how many issue-users lack it; take the min. 4. Return 0 if nobody has issues.
 * Dry Run: n=2, languages=[[1],[2],[1,2]], friendships=[[1,2],[1,3],[2,3]]
 * Pair 1-2 cannot talk; users {1,2}. Teach language 1: user 2; teach 2: user 1. Min = 1.
 * Time Complexity: O(M * N + F * L_max + N * M)
 * Space Complexity: O(M * N + M)
 */
var minimumTeachings = function (n, languages, friendships) {
  const totalLanguagesCount = n;
  const userLanguagesList = languages;
  const friendshipPairs = friendships;

  const userLanguageSetsCollection = Array.from(
    { length: userLanguagesList.length },
    () => new Set()
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
          chosenTeachingLanguageId
        )
      ) {
        currentLanguageTeachingCost++;
      }
    }
    minimumUsersToEducate = Math.min(
      minimumUsersToEducate,
      currentLanguageTeachingCost
    );
  }

  return minimumUsersToEducate;
};
