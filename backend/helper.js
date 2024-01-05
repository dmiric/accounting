function getFirstEmptyRowByColumnArray(spr) {
  var column = spr.getRange('A:A');
  var values = column.getValues(); // get all data in one call
  var ct = 0;
  while (values[ct] && values[ct][0] != "") {
    ct++;
  }
  return (ct + 1);
}

function gcGetCurrentTimestamp() {
  const currentDate = new Date();
  return timestamp = currentDate.getTime();
}

function getSheetByName(name) {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var idx in sheets) {
    if (sheets[idx].getName() == name) {
      return sheets[idx];
    }
  }
  return null;
}

function getSheetUrl() {
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  var ss = SS.getActiveSheet();
  var url = '';
  url += SS.getUrl();
  url += '#gid=';
  url += ss.getSheetId();
  return url;
}

function isNumber(value) {
  return typeof value === 'number';
}

function isString(value) {
  return typeof value === 'string';
}
