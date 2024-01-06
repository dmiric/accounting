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

function aNewDocument(partner, doc_type, created, delivered, paid, line_items) {
  line_items.shift()
  const total = aCalculateOrderTotal(line_items)
  console.log(total)
  const newDocumentObj = aGetDocumentObj(partner, doc_type, created, delivered, paid, line_items, total)
  return newDocumentObj
}

function aCalculateOrderTotal(line_items) {
  let total = 0
  for (let i = 0; i < line_items.length; i++) {
    total = total + line_items[i][4];
  }
  return total
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

function aGetDocumentObjFromSheet(partner_id, doc_type, created, delivered, paid, line_items, total) {
  return {
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

function aGetDocumentObj(partner, doc_type, created, delivered, paid, line_items, total) {
  return {
    'type': doc_type,
    'dates': {
      'created': created,
      'delivered': delivered,
      'paid': paid
    },
    'partner_id': partner,
    'total': total,
    'lineItems': aGetLineItems(line_items)
  }
}

function aDocumentSave(document) {
  if (!document.hasOwnProperty('doc_number')) {
    const docSheet = getSheetByName("Dokumenti")
    const lastRow = docSheet.getLastRow()
    const lastId = docSheet.getRange(lastRow, 1).getCell(1, 1).getValue()
    const doc_number = lastId + 1
    docSheet.appendRow(
      [doc_number,
        document.partner_id,
        "=VLOOKUP(B" + lastRow + ",Partneri!$A$2:$H,2)",
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
