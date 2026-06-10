/**
* Sender With Largest Word Count
* Intuition: To find the sender with the most words, we need to accumulate word counts for each sender. A hash map is ideal for storing these running totals. While aggregating, we must also keep track of the current maximum word count and the corresponding sender, handling lexicographical tie-breaking for sender names.
* Approach: 1. Initialize an empty Map to store total word counts for each sender (sender name -> total words). 2. Initialize `maximumWordsEncountered` to 0 and `winningSenderName` to an empty string. 3. Iterate through the messages and senders arrays using a single loop. 4. In each iteration, calculate the word count for the current message by splitting it by space and getting the array length. 5. Retrieve the current sender's accumulated word count from the Map, defaulting to 0 if not present, then add the current message's word count to it. 6. Update the sender's total word count in the Map. 7. Compare this updated total word count with `maximumWordsEncountered`: if it's strictly greater, update `maximumWordsEncountered` and `winningSenderName`. If it's equal, compare the current sender's name lexicographically with `winningSenderName`; if the current sender's name is lexicographically larger, update `winningSenderName`. 8. After the loop completes, `winningSenderName` will hold the desired result.
* Dry Run:
      messages = ["Hello user", "Another message here", "Hi there again", "Simple hello"]
      senders = ["Alice", "Bob", "Alice", "Bob"]

      senderWordCounts = Map {}
      maximumWordsEncountered = 0
      winningSenderName = ""

      Iteration 1 (messageIndex = 0):
        currentMessage = "Hello user" (2 words)
        currentSender = "Alice"
        messageWords = 2
        existingCount = 0
        updatedTotalWords = 2
        senderWordCounts.set("Alice", 2) // senderWordCounts: {"Alice": 2}
        updatedTotalWords (2) > maximumWordsEncountered (0) -> true
        maximumWordsEncountered = 2
        winningSenderName = "Alice"

      Iteration 2 (messageIndex = 1):
        currentMessage = "Another message here" (3 words)
        currentSender = "Bob"
        messageWords = 3
        existingCount = 0
        updatedTotalWords = 3
        senderWordCounts.set("Bob", 3) // senderWordCounts: {"Alice": 2, "Bob": 3}
        updatedTotalWords (3) > maximumWordsEncountered (2) -> true
        maximumWordsEncountered = 3
        winningSenderName = "Bob"

      Iteration 3 (messageIndex = 2):
        currentMessage = "Hi there again" (3 words)
        currentSender = "Alice"
        messageWords = 3
        existingCount = senderWordCounts.get("Alice") (2)
        updatedTotalWords = 2 + 3 = 5
        senderWordCounts.set("Alice", 5) // senderWordCounts: {"Alice": 5, "Bob": 3}
        updatedTotalWords (5) > maximumWordsEncountered (3) -> true
        maximumWordsEncountered = 5
        winningSenderName = "Alice"

      Iteration 4 (messageIndex = 3):
        currentMessage = "Simple hello" (2 words)
        currentSender = "Bob"
        messageWords = 2
        existingCount = senderWordCounts.get("Bob") (3)
        updatedTotalWords = 3 + 2 = 5
        senderWordCounts.set("Bob", 5) // senderWordCounts: {"Alice": 5, "Bob": 5}
        updatedTotalWords (5) > maximumWordsEncountered (5) -> false
        updatedTotalWords (5) === maximumWordsEncountered (5) -> true
        currentSender ("Bob") > winningSenderName ("Alice") -> true (lexicographically)
        winningSenderName = "Bob"

      Loop ends.
      Return "Bob".
* Time Complexity: O(N * (L + S))
* Space Complexity: O(U * S + L)
*/
var largestWordCount = function (messages, senders) {
  const senderWordCounts = new Map();
  let maximumWordsEncountered = 0;
  let winningSenderName = "";

  for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
    const currentMessage = messages[messageIndex];
    const currentSender = senders[messageIndex];
    const messageWords = currentMessage.split(" ").length;

    const existingCount = senderWordCounts.get(currentSender) || 0;
    const updatedTotalWords = existingCount + messageWords;
    senderWordCounts.set(currentSender, updatedTotalWords);

    if (updatedTotalWords > maximumWordsEncountered) {
      maximumWordsEncountered = updatedTotalWords;
      winningSenderName = currentSender;
    } else if (updatedTotalWords === maximumWordsEncountered) {
      if (currentSender > winningSenderName) {
        winningSenderName = currentSender;
      }
    }
  }

  return winningSenderName;
};
