function aGetLineItems(line_items) {
  const lineItemsArr = [];
  for (i = 0; i < line_items.length; i++) {
    if (line_items[i][0] === '') { continue }
    const lineItem = aGetLineItem(line_items[i])
    lineItemsArr.push(lineItem)
  }
  return lineItemsArr
}

function aValidateLineItems(line_items) {
  for (i = 0; i < line_items.length; i++) {
    if (line_items[i][0] === '') { continue }
    const error = aValidateLineItem(line_items[i])
    if (isString(error)) {
      return error
    }
  }
}

function aGetLineItemsFromSheet(line_items) {
  const lineItemsArr = [];
  for (i = 0; i < line_items.length; i++) {
    const lineItem = aGetLineItemFromSheet(line_items[i])
    lineItemsArr.push(lineItem)
  }
  return lineItemsArr
}

function aGetLineItemFromSheet(line_item) {
  return {
    'id': line_item[0],
    'product': line_item[2],
    'price': line_item[5],
    'discount': isNumber(line_item[4]) ? line_item[4] : 0,
    'quantity': line_item[3],
    'total': line_item[6]
  }
}

function aGetLineItem(line_item) {
  return {
    'product_id': aGetProductIdByName(line_item[0]),
    'price': line_item[1],
    'discount': isNumber(line_item[2]) ? line_item[2] : 0,
    'quantity': line_item[3],
    'total': line_item[4]
  }
}

function aValidateLineItem(line_item) {
  if (line_item[3] === '') {
    return "Molimo unesite količinu za sve stavke!"
  }
}

function aLineItemsSave(document, doc_number) {
  const liSheet = getSheetByName("Stavke")
  const lastRow = liSheet.getLastRow()
  const lastId = liSheet.getRange(lastRow, 1).getCell(1, 1).getValue()

  for (i = 0; i < document.lineItems.length; i++) {
    liSheet.appendRow(
      [
        lastId + i + 1,
        doc_number,
        document.lineItems[i].product_id,
        document.lineItems[i].quantity,
        document.lineItems[i].discount,
        document.lineItems[i].price,
        document.lineItems[i].total
      ]
    )
  }
}
