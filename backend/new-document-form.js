function aSubmitDocument(doc) {
  console.log(doc)
  return 0
  const sheet = SpreadsheetApp.getActive();

  const line_items = sheet.getRangeByName("stavke").getValues()
  const partner = sheet.getRangeByName("partner").getValue()
  const doc_number = sheet.getRangeByName("broj_dokumenta").getValue()
  const doc_type = sheet.getRangeByName("vrsta_dokumenta").getValue()
  const created = sheet.getRangeByName("datum_izrade").getValue()
  const delivered = sheet.getRangeByName("datum_isporuke").getValue()
  const paid = sheet.getRangeByName("datum_uplate").getValue()
  const discount = sheet.getRangeByName("popust").getValue()
  const total = sheet.getRangeByName("ukupno").getValue()

  // new doc
  if (doc_number === '') {
    const error = aValidateDocument(partner, doc_type, created, delivered, paid, discount, line_items, total)
    if (isString(error)) {
      var ui = SpreadsheetApp.getUi();
      ui.alert('Greška', error, ui.ButtonSet.OK);
      return
    }

    const errorLi = aValidateLineItems(line_items)
    if (isString(errorLi)) {
      var ui = SpreadsheetApp.getUi();
      ui.alert('Greška', errorLi, ui.ButtonSet.OK);
      return
    }

    const document = aNewDocument(partner, doc_type, created, delivered, paid, discount, line_items, total)
    aDocumentSave(document)
    aClearDocumentForm()
  }

  // edit doc
  if (doc_number !== '') {

  }
}

