/**
 * Reformat Date
 * Intuition: The input is day-month-year in words; map the month token and zero-pad the numeric day.
 * Approach: 1. Split on spaces. 2. Strip the ordinal suffix from the day and pad to 2 digits. 3. Map Jan..Dec to 01..12. 4. Return YYYY-MM-DD.
 * Dry Run: date = "20th Oct 2052".
 *   - day=20, month=10, year=2052 → "2052-10-20".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var reformatDate = function (date) {
  const dateComponents = date.split(" ");

  const initialDayString = dateComponents[0];
  const initialMonthString = dateComponents[1];
  const initialYearString = dateComponents[2];

  const numericDayExtractor = initialDayString.slice(
    0,
    initialDayString.length - 2
  );
  const parsedDayNumber = parseInt(numericDayExtractor, 10);
  const twoDigitDay = String(parsedDayNumber).padStart(2, "0");

  const monthLookUpTable = new Map();
  monthLookUpTable.set("Jan", "01");
  monthLookUpTable.set("Feb", "02");
  monthLookUpTable.set("Mar", "03");
  monthLookUpTable.set("Apr", "04");
  monthLookUpTable.set("May", "05");
  monthLookUpTable.set("Jun", "06");
  monthLookUpTable.set("Jul", "07");
  monthLookUpTable.set("Aug", "08");
  monthLookUpTable.set("Sep", "09");
  monthLookUpTable.set("Oct", "10");
  monthLookUpTable.set("Nov", "11");
  monthLookUpTable.set("Dec", "12");

  const twoDigitMonth = monthLookUpTable.get(initialMonthString);

  const fourDigitYear = initialYearString;

  const finalFormattedDate = `${fourDigitYear}-${twoDigitMonth}-${twoDigitDay}`;

  return finalFormattedDate;
};
