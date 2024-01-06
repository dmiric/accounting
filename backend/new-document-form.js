function aSubmitDocument(doc) {
  console.log(doc)
  const document = aNewDocument(doc.partner, doc.doc_type, doc.create_date, doc.delivery_date, doc.payment_date, doc.line_items)
  aDocumentSave(document)
}

