const renderText = function (data, _cell, _dataIndex, _cellIndex) {
  return data
}

const renderDate = function (data, _cell, _dataIndex, _cellIndex) {
  const date = new Date(Date.parse(data));
  if (date.getDate()) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`
  }
  return ''
}

const renderButton = function (data, cell, dataIndex, _cellIndex) {
  cell.childNodes.push({
    nodeName: "BUTTON",
    attributes: {
      "data-row": data,
      class: "edit-document"
    },
    childNodes: [{
      nodeName: "#text",
      data: "Edit"
    }]
  })
}

// @ts-ignore
google.script.run.withSuccessHandler(onGetDocsSuccess).aGetDocuments();

function onGetDocsSuccess(docs) {
  const data = {
    headings: ["Id", "Pid", "Partner", "Datum izrade",
      "Datum dostave", "Datum uplate", "Ukupna vrij.",
      "Vrsta dok.", "Popust"],
    data: JSON.parse(docs)
  }
  console.log(data)
  // @ts-ignore
  const dataTable = new simpleDatatables.DataTable("#documents", {
    searchable: true,
    fixedHeight: true,
    data,
    columns: [
      {
        select: 1,
        hidden: true,
        type: "number"
      }, {
        select: 3,
        render: renderDate,
        type: "date",
        format: "DD.MM.YYYY."
      }, {
        select: 4,
        render: renderDate,
        type: "date",
        format: "DD.MM.YYYY."
      }, {
        select: 5,
        render: renderDate,
        type: "date",
        format: "DD.MM.YYYY."
      }, {
        select: 0,
        render: renderButton,
        type: "number"
      }
    ]
  })
}
