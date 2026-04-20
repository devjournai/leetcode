/**
 * Number Of Students Unable To Eat Lunch
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countStudents = function (students, sandwiches) {
  let zeroPreferenceCounter = 0;
  let onePreferenceCounter = 0;

  const initialStudentCount = students.length;

  for (
    let studentIterator = 0;
    studentIterator < initialStudentCount;
    studentIterator++
  ) {
    const currentStudentPreference = students[studentIterator];
    if (currentStudentPreference === 0) {
      zeroPreferenceCounter++;
    } else {
      onePreferenceCounter++;
    }
  }

  const initialSandwichCount = sandwiches.length;

  for (
    let sandwichIterator = 0;
    sandwichIterator < initialSandwichCount;
    sandwichIterator++
  ) {
    const topSandwichType = sandwiches[sandwichIterator];

    if (topSandwichType === 0) {
      if (zeroPreferenceCounter > 0) {
        zeroPreferenceCounter--;
      } else {
        return onePreferenceCounter;
      }
    } else {
      if (onePreferenceCounter > 0) {
        onePreferenceCounter--;
      } else {
        return zeroPreferenceCounter;
      }
    }
  }

  return 0;
};
