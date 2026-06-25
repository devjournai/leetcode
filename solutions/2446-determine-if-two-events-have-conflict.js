/**
 * Determine If Two Events Have Conflict
 * Intuition: Two time intervals conflict if they share any common moment. This occurs if the first event begins at or before the second event ends, AND the second event begins at or before the first event ends.
 * Approach: 1. Destructure the start and end times for both event one and event two from their respective arrays. 2. Compare the start time of the first event with the end time of the second event using string comparison. 3. Simultaneously, compare the start time of the second event with the end time of the first event using string comparison. 4. Return true if both comparison conditions are met, indicating an overlap; otherwise, return false.
 * Dry Run: event1 = ["01:00", "02:00"], event2 = ["01:30", "02:30"]
 * 1. firstEventBeginning = "01:00", firstEventClosing = "02:00"
 * 2. secondEventBeginning = "01:30", secondEventClosing = "02:30"
 * 3. Evaluate firstEventBeginning <= secondEventClosing: "01:00" <= "02:30" (True)
 * 4. Evaluate secondEventBeginning <= firstEventClosing: "01:30" <= "02:00" (True)
 * 5. The logical AND of True and True is True.
 * 6. Return true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var haveConflict = function (event1, event2) {
  const [firstEventBeginning, firstEventClosing] = event1;
  const [secondEventBeginning, secondEventClosing] = event2;

  return (
    firstEventBeginning <= secondEventClosing &&
    secondEventBeginning <= firstEventClosing
  );
};
