/**
 * Unique Email Addresses
 * Intuition: Canonical form drops everything after `+` in the local part and all `.` there; the domain is unchanged. A set of those strings is the unique inbox count.
 * Approach: 1. Split at `@`. 2. Cut local at first `+` if any. 3. Concatenate local chars except `.`. 4. Add local+"@"+domain to a Set. 5. Return size.
 * Dry Run: "test.email+alex@leetcode.com" → "testemail@leetcode.com". Same as "test.e.mail+bob.cathy@leetcode.com". Two distinct domains would stay two.
 * Time Complexity: O(N*L)
 * Space Complexity: O(N*L)
 */
var numUniqueEmails = function (emails) {
  const distinctEmailAddresses = new Set();

  for (let idx = 0; idx < emails.length; idx++) {
    let currentEmailAddress = emails[idx];
    let separatorIndex = currentEmailAddress.indexOf("@");

    let incomingLocalPart = currentEmailAddress.substring(0, separatorIndex);
    let incomingDomainPart = currentEmailAddress.substring(separatorIndex + 1);

    let plusCutoffIndex = incomingLocalPart.indexOf("+");
    let trimmedLocalSection;

    if (plusCutoffIndex !== -1) {
      trimmedLocalSection = incomingLocalPart.substring(0, plusCutoffIndex);
    } else {
      trimmedLocalSection = incomingLocalPart;
    }

    let normalizedLocalSegment = "";
    for (
      let charIndex = 0;
      charIndex < trimmedLocalSection.length;
      charIndex++
    ) {
      let characterValue = trimmedLocalSection[charIndex];
      if (characterValue !== ".") {
        normalizedLocalSegment += characterValue;
      }
    }

    let finalRecipientAddress =
      normalizedLocalSegment + "@" + incomingDomainPart;
    distinctEmailAddresses.add(finalRecipientAddress);
  }

  return distinctEmailAddresses.size;
};
