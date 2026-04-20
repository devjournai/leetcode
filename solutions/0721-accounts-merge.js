/**
 * Accounts Merge
 * Time Complexity: O(K * α(M) + M log M)
 * Space Complexity: O(K)
 */
var accountsMerge = function (accounts) {
  const emailParents = new Map();
  const emailNameMap = new Map();

  const retrieveRoot = (emailIdentifier) => {
    if (!emailParents.has(emailIdentifier)) {
      emailParents.set(emailIdentifier, emailIdentifier);
    }
    const directParent = emailParents.get(emailIdentifier);
    if (directParent === emailIdentifier) {
      return emailIdentifier;
    }
    const finalRootNode = retrieveRoot(directParent);
    emailParents.set(emailIdentifier, finalRootNode);
    return finalRootNode;
  };

  for (const accountEntry of accounts) {
    const personName = accountEntry[0];
    const primaryEmail = accountEntry[1];

    emailNameMap.set(primaryEmail, personName);

    for (let j = 1; j < accountEntry.length; j++) {
      const currentEmailAddress = accountEntry[j];
      emailNameMap.set(currentEmailAddress, personName);

      const rootForCurrent = retrieveRoot(currentEmailAddress);
      const rootForPrimary = retrieveRoot(primaryEmail);

      if (rootForCurrent !== rootForPrimary) {
        emailParents.set(rootForCurrent, rootForPrimary);
      }
    }
  }

  const mergedGroups = new Map();

  for (const uniqueEmailKey of emailParents.keys()) {
    const ultimateRoot = retrieveRoot(uniqueEmailKey);
    if (!mergedGroups.has(ultimateRoot)) {
      mergedGroups.set(ultimateRoot, new Set());
    }
    mergedGroups.get(ultimateRoot).add(uniqueEmailKey);
  }

  const resultAccounts = [];
  for (const [groupRootEmail, emailSetCollection] of mergedGroups.entries()) {
    const groupOwnerName = emailNameMap.get(groupRootEmail);
    const sortedEmailsArray = Array.from(emailSetCollection).sort();
    resultAccounts.push([groupOwnerName, ...sortedEmailsArray]);
  }

  return resultAccounts;
};
