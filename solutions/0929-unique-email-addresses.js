/**
 * Unique Email Addresses
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
