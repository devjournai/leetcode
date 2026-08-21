/**
 * Design Spreadsheet
 * Intuition: Formulas are always `=X+Y` where each token is a cell id or a number. Sparse storage is enough: missing cells are 0, so a map from cell name to value implements the sheet.
 * Approach: 1. Construct ignores rows except as a capacity hint and keeps an empty map. 2. setCell stores the value. 3. resetCell writes 0. 4. getValue splits on `+` after the leading `=`, parses each token as an integer or a lookup defaulting to 0, and returns the sum.
 * Dry Run: Spreadsheet(3); getValue("=5+7") → 12; setCell("A1", 10); getValue("=A1+6") → 16; resetCell("A1"); getValue("=A1+6") → 6.
 * Time Complexity: O(1) per operation
 * Space Complexity: O(C) for C set cells
 */
var Spreadsheet = function (rows) {
  this.cellValues = new Map();
};

Spreadsheet.prototype.setCell = function (cell, value) {
  this.cellValues.set(cell, value);
};

Spreadsheet.prototype.resetCell = function (cell) {
  this.cellValues.set(cell, 0);
};

Spreadsheet.prototype.getValue = function (formula) {
  const plusIndex = formula.indexOf("+");
  const leftToken = formula.slice(1, plusIndex);
  const rightToken = formula.slice(plusIndex + 1);
  return this.getToken(leftToken) + this.getToken(rightToken);
};

Spreadsheet.prototype.getToken = function (token) {
  if (token[0] >= "0" && token[0] <= "9") {
    return Number(token);
  }
  return this.cellValues.has(token) ? this.cellValues.get(token) : 0;
};
