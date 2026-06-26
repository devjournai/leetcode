/**
 * Split Message Based On Limit
 * Intuition: The problem asks to split a message into the minimum possible number of parts, say 'k'. Each part has a content section and a suffix "<a/b>", where 'a' is the part index and 'b' is the total number of parts 'k'. The length of this suffix depends on the number of digits in 'a' and 'b'. As 'k' increases, both 'a' and 'b' (and thus their string lengths) can grow, affecting the space available for the message content in each part. We need to find the smallest 'k' that allows fitting the entire message, considering these dynamic suffix lengths.
 * Approach:
 * 1. Iterate through possible total number of parts, `kCandidate`, starting from 1. We search for the smallest `kCandidate` that satisfies the conditions. The upper bound for `kCandidate` can be `message.length`, because if each part contains at least one character of the message content, then `kCandidate` cannot exceed `message.length`.
 * 2. For each `kCandidate`, calculate the total number of characters required for all suffixes across all `kCandidate` parts. This involves summing `String(i).length` for `i` from 1 to `kCandidate`, and also accounting for `String(kCandidate).length` which is present in every suffix. The fixed characters like '<', '/', '>' are also included.
 * 3. Calculate the total content characters that can be accommodated across all `kCandidate` parts: `(limitValue * kCandidate) - (total suffix characters)`.
 * 4. If this `totalContentCharsAvailable` is greater than or equal to `message.length`, then `kCandidate` is the minimal number of parts. Proceed to construct the result.
 * 5. To construct the result, iterate `segmentNumber` from 1 to `kCandidate`. For each `segmentNumber`:
 *    a. Form the suffix `"<segmentNumber/kCandidate>"`.
 *    b. Determine the length of the content portion for this part: `limitValue - suffix.length`.
 *    c. Slice the appropriate segment from the `messageInput` using a running `messagePointer`.
 *    d. Concatenate the message segment and suffix, and add it to the `resultPartsCollection`. Update `messagePointer`.
 * 6. If the loop completes without finding a suitable `kCandidate`, return an empty array `[]`.
 * Dry Run:
 * message = "abc", limit = 7
 * messageOverallLength = 3
 * sumOfPartIndexDigits = 0
 *
 * kCandidate = 1:
 *   sumOfPartIndexDigits becomes 1 (for "1")
 *   currentKDigitsLength = 1 (for "1")
 *   totalSuffixCharsRequired = 3*1 + 1 + 1*1 = 5
 *   totalContentCharsAvailable = 7*1 - 5 = 2
 *   2 < messageOverallLength (3). Continue.
 *
 * kCandidate = 2:
 *   sumOfPartIndexDigits becomes 1 (prev) + 1 (for "2") = 2
 *   currentKDigitsLength = 1 (for "2")
 *   totalSuffixCharsRequired = 3*2 + 2 + 2*1 = 6 + 2 + 2 = 10
 *   totalContentCharsAvailable = 7*2 - 10 = 14 - 10 = 4
 *   4 >= messageOverallLength (3). Condition met! Construct result.
 *
 *   resultPartsCollection = []
 *   messagePointer = 0
 *
 *   segmentNumber = 1:
 *     partSuffixFormat = "<1/2>" (length 5)
 *     messageCharsForSegment = 7 - 5 = 2
 *     currentMessageSlice = "ab" (message.slice(0, 2))
 *     resultPartsCollection.push("ab<1/2>")
 *     messagePointer = 2
 *
 *   segmentNumber = 2:
 *     partSuffixFormat = "<2/2>" (length 5)
 *     messageCharsForSegment = 7 - 5 = 2
 *     currentMessageSlice = "c" (message.slice(2, 4) -> only 'c' available)
 *     resultPartsCollection.push("c<2/2>")
 *     messagePointer = 4
 *
 *   Inner loop ends.
 *   Return ["ab<1/2>", "c<2/2>"].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N log N)
 */
var splitMessage = function (messageInput, limitValue) {
  const messageOverallLength = messageInput.length;
  let cumulativePartIndexDigitCount = 0;

  for (
    let potentialPartCount = 1;
    potentialPartCount <= messageOverallLength;
    potentialPartCount++
  ) {
    cumulativePartIndexDigitCount += String(potentialPartCount).length;
    const currentPartCountDigitLength = String(potentialPartCount).length;
    const totalSuffixCharsOverhead =
      3 * potentialPartCount +
      cumulativePartIndexDigitCount +
      potentialPartCount * currentPartCountDigitLength;

    const totalContentCharsAvailable =
      limitValue * potentialPartCount - totalSuffixCharsOverhead;

    if (totalContentCharsAvailable >= messageOverallLength) {
      const finalSplitParts = [];
      let messageContentProgress = 0;

      for (
        let currentSplitIndex = 1;
        currentSplitIndex <= potentialPartCount;
        currentSplitIndex++
      ) {
        const partSuffixText = `<${currentSplitIndex}/${potentialPartCount}>`;
        const suffixCharactersTotal = partSuffixText.length;
        const availableContentCharacters = limitValue - suffixCharactersTotal;

        const currentMessageSegment = messageInput.slice(
          messageContentProgress,
          messageContentProgress + availableContentCharacters,
        );
        finalSplitParts.push(currentMessageSegment + partSuffixText);
        messageContentProgress += availableContentCharacters;
      }
      return finalSplitParts;
    }
  }

  return [];
};
