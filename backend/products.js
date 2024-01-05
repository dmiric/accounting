function aGetProductList() {
  return SpreadsheetApp.getActive().getRangeByName("cjenik")
}

function aGetProductIdByName(name) {
  const productList = aGetProductList()
  var rowNum = productList.createTextFinder(name).matchEntireCell(true).findNext().getRow();
  return productList.getCell(rowNum - 1, 1).getValue();
}

function aGetProducts() {
  const ss = getSheetByName("Cjenik")
  return ss.getRange(2, 1, ss.getLastRow() - 1, ss.getLastColumn()).getValues()
}
