function aGetDocumentTypes() {
  const ss = getSheetByName("Konfiguracija")
  const vals = ss.getRange(2, 1, ss.getLastRow() - 1, 1).getValues()
  console.log(vals)
  return vals
}

function aGetDocuments() {
  const ss = getSheetByName("Dokumenti")
  const values = ss.getRange(2, 1, ss.getLastRow() - 1, ss.getLastColumn()).getValues()
  console.log(values)
  return JSON.stringify(values);
}

function aNewDocument(partner, doc_type, created, delivered, paid, discount, line_items, total) {
  var newDocumentObj = aGetDocumentObj(partner, doc_type, created, delivered, paid, discount, line_items, total)
  return newDocumentObj
}

function aLoadDocument(doc_id) {
  // load base document
  const documents = aGetEntitiesByColumn('A', doc_id, "Dokumenti")
  const document = documents[0]

  // load line items
  const lineItems = aGetEntitiesByColumn('B', doc_id, "Stavke")

  var newDocumentObjFromSheet = aGetDocumentObjFromSheet(
    document[1],
    document[6],
    document[2],
    document[3],
    document[4],
    document[7],
    lineItems,
    document[5])
  return newDocumentObjFromSheet
}

function aGetDocumentObjFromSheet(partner_id, doc_type, created, delivered, paid, discount, line_items, total) {
  return {
    'discount': discount,
    'type': doc_type,
    'dates': {
      'created': created,
      'delivered': delivered,
      'paid': paid
    },
    'partner': partner_id,
    'total': total,
    'lineItems': aGetLineItemsFromSheet(line_items)
  }
}

function aValidateDocument(partner, doc_type, created, delivered, paid, discount, line_items, total) {
  if (partner === '') {
    return "Molimo unesite partnera!"
  }

  if (doc_type === '') {
    return "Molimo odaberite vrstu dokumenta!"
  }

  if (created === '') {
    return "Molimo unesite datum izrade!"
  }
}

function aGetDocumentObj(partner, doc_type, created, delivered, paid, discount, line_items, total) {
  return {
    'discount': discount,
    'type': doc_type,
    'dates': {
      'created': created,
      'delivered': delivered,
      'paid': paid
    },
    'partner_id': aGetPartnerIdByName(partner),
    'total': total,
    'lineItems': aGetLineItems(line_items)
  }
}

function aDocumentSave(document) {
  if (!document.hasOwnProperty('doc_number')) {
    const docSheet = getSheetByName("Dokumenti")
    const lastRow = docSheet.getLastRow()
    const lastId = docSheet.getRange(lastRow, 1).getCell(1, 1).getValue()
    doc_number = lastId + 1
    docSheet.appendRow(
      [doc_number,
        document.partner_id,
        document.dates.created,
        document.dates.delivered,
        document.dates.paid,
        document.total,
        document.type,
        document.discount
      ])
    aLineItemsSave(document, doc_number)
  }
}
