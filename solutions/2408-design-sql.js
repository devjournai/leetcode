/**
 * Design Sql
 * Intuition: To manage multiple SQL tables with auto-incrementing IDs, row removal, cell selection, and CSV export, a Map-based approach is suitable. Each table can be represented by a Map entry, storing its column count and its rows (also stored in a Map keyed by row ID). An additional Map can track the next available auto-increment ID for each table.
 * Approach:
 * 1. **SQL Constructor**: Initialize two class-level Maps: `tableDataStore` to hold table metadata (column count and row data) and `idCounters` to store the next available auto-increment ID for each table. Iterate through the `names` and `columns` arrays, populating these Maps. Each table entry in `tableDataStore` will itself contain a `Map` to store its rows, mapping row IDs to string arrays representing the row data.
 * 2. **ins(name, row)**: Check if the table `name` exists and if the `row` length matches the table's expected `columnCount`. If valid, retrieve the next auto-increment ID from `idCounters`, insert the `row` into the table's `allRows` Map using this ID, and then increment the ID in `idCounters` for that table.
 * 3. **rmv(name, rowId)**: Check if the table `name` exists. If so, access its `allRows` Map and use the `delete` method with the provided `rowId`. This operation does not affect the next auto-increment ID.
 * 4. **sel(name, rowId, columnId)**: Check if the table `name` exists. Then, verify that `rowId` exists within the table's `allRows` Map and that `columnId` is within the valid range (1 to `columnCount`). If all conditions are met, retrieve the row array and return the value at `columnId - 1`. Otherwise, return `"<null>"`.
 * 5. **exp(name)**: Check if the table `name` exists. If so, initialize an empty array `csvOutput`. Iterate through the entries (row ID and row data array) of the table's `allRows` Map. For each entry, format a string concatenating the row ID and the joined row data array (using commas), and add it to `csvOutput`. Return `csvOutput`.
 * Dry Run:
 * SQL(["Users"], [2])
 *   `this.tableDataStore` -> `Map()`
 *   `this.idCounters` -> `Map()`
 *   Loop `tableIndex = 0`:
 *     `currentTableName` = "Users", `currentColumnCount` = 2
 *     `tableStructure` = `{ columnCount: 2, allRows: new Map() }`
 *     `this.tableDataStore.set("Users", tableStructure)`
 *     `this.idCounters.set("Users", 1)`
 *   Result: `this.tableDataStore` = `{"Users": {columnCount: 2, allRows: Map()}}`, `this.idCounters` = `{"Users": 1}`
 *
 * ins("Users", ["Alice", "alice@example.com"])
 *   `tableNme` = "Users", `inputRow` = ["Alice", "alice@example.com"]
 *   `this.tableDataStore.has("Users")` is true.
 *   `tableProperties` = `{ columnCount: 2, allRows: Map() }`
 *   `inputRow.length` (2) matches `tableProperties.columnCount` (2).
 *   `autoIncrementValue` = `this.idCounters.get("Users")` -> 1
 *   `tableProperties.allRows.set(1, ["Alice", "alice@example.com"])`
 *   `this.idCounters.set("Users", 2)`
 *   Returns `true`.
 *   State: `this.tableDataStore` = `{"Users": {columnCount: 2, allRows: Map(1){1: ["Alice", "alice@example.com"]}}}`, `this.idCounters` = `{"Users": 2}`
 *
 * sel("Users", 1, 1)
 *   `tableNameToSelect` = "Users", `targetRowId` = 1, `targetColumnId` = 1
 *   `this.tableDataStore.has("Users")` is true.
 *   `currentTableMetadata` = `{ columnCount: 2, allRows: Map(1){1: ["Alice", "alice@example.com"]} }`
 *   `currentTableMetadata.allRows.has(1)` is true. `targetColumnId` (1) is between 1 and `columnCount` (2).
 *   `retrievedRow` = `currentTableMetadata.allRows.get(1)` -> `["Alice", "alice@example.com"]`
 *   Returns `retrievedRow[targetColumnId - 1]` -> `retrievedRow[0]` -> `"Alice"`.
 * Time Complexity: O(N)
 * Space Complexity: O(N * (C_avg + R_total))
 */
var SQL = function (names, columns) {
  this.tableDataStore = new Map();
  this.idCounters = new Map();

  for (let tableIndex = 0; tableIndex < names.length; tableIndex++) {
    const currentTableName = names[tableIndex];
    const currentColumnCount = columns[tableIndex];
    const tableStructure = {
      columnCount: currentColumnCount,
      allRows: new Map(),
    };
    this.tableDataStore.set(currentTableName, tableStructure);
    this.idCounters.set(currentTableName, 1);
  }
};

SQL.prototype.ins = function (tableNme, inputRow) {
  if (!this.tableDataStore.has(tableNme)) {
    return false;
  }

  const tableProperties = this.tableDataStore.get(tableNme);
  if (inputRow.length !== tableProperties.columnCount) {
    return false;
  }

  const autoIncrementValue = this.idCounters.get(tableNme);
  tableProperties.allRows.set(autoIncrementValue, inputRow);
  const newTableIdentifier = autoIncrementValue + 1;
  this.idCounters.set(tableNme, newTableIdentifier);

  return true;
};

SQL.prototype.rmv = function (tableLabel, rowIdentifier) {
  if (!this.tableDataStore.has(tableLabel)) {
    return;
  }

  const tableDetails = this.tableDataStore.get(tableLabel);
  tableDetails.allRows.delete(rowIdentifier);
};

SQL.prototype.sel = function (tableNameToSelect, targetRowId, targetColumnId) {
  if (!this.tableDataStore.has(tableNameToSelect)) {
    return "<null>";
  }

  const currentTableMetadata = this.tableDataStore.get(tableNameToSelect);
  if (
    !currentTableMetadata.allRows.has(targetRowId) ||
    targetColumnId < 1 ||
    targetColumnId > currentTableMetadata.columnCount
  ) {
    return "<null>";
  }

  const retrievedRow = currentTableMetadata.allRows.get(targetRowId);
  return retrievedRow[targetColumnId - 1];
};

SQL.prototype.exp = function (tableNameToExport) {
  if (!this.tableDataStore.has(tableNameToExport)) {
    return [];
  }

  const tableDataForExport = this.tableDataStore.get(tableNameToExport);
  const csvOutput = [];

  for (const [recordId, recordValues] of tableDataForExport.allRows) {
    const formattedEntry = `${recordId},${recordValues.join(",")}`;
    csvOutput.push(formattedEntry);
  }

  return csvOutput;
};
