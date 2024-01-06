function aCreateMenu_() {
  const ui = SpreadsheetApp.getUi()
  const menu = ui.createMenu("Knjigovodstvo")
  menu.addItem("Novi dokument", "aLoadDocumentForm")
  menu.addItem("Uredi dokument", "aLoadDocumentFormEdit")
  menu.addItem("Pronađi dokument", "aFindDocument")
  menu.addToUi()
}

// test 22
function doGet() {
  const htmlServ = HtmlService.createTemplateFromFile("find-a-document");
  return htmlServ.evaluate()
}

function aLoadDocumentForm() {
  const html = HtmlService.createTemplateFromFile('document-form').evaluate()
  html.setWidth(850).setHeight(600)
  const ui = SpreadsheetApp.getUi()
  ui.showModalDialog(html, "Novi dokument")
}

function aLoadDocumentFormEdit() {
  const html = HtmlService.createTemplateFromFile('document-form-edit').evaluate()
  html.setWidth(850).setHeight(600)
  const ui = SpreadsheetApp.getUi()
  ui.showModalDialog(html, "Uredi dokument")
}

function aFindDocument() {
  const html = HtmlService.createTemplateFromFile('find-a-document').evaluate()
  html.setWidth(850).setHeight(600)
  const ui = SpreadsheetApp.getUi()
  ui.showModalDialog(html, "Pronađi dokument")
}

function onOpen(e) {
  aCreateMenu_()
}
