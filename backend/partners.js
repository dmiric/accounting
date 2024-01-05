function aGetPartnerList() {
  return SpreadsheetApp.getActive().getRangeByName("partner_list")
}

function aGetPartnerIdByName(partnerName) {
  const partnerList = aGetPartnerList()
  var rowNum = partnerList.createTextFinder(partnerName).matchEntireCell(true).findNext().getRow();
  return partnerList.getCell(rowNum - 1, 1).getValue();
}

function aGetPartners() {
  const ss = getSheetByName("Partneri")
  return ss.getRange(2, 1, ss.getLastRow() - 1, 2).getValues()
}
