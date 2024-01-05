function getEntityConfig(sheetName) {
  const entities = {
    'Dokumenti': {
      'start': 'A',
      'end': 'H'
    },
    'Stavke': {
      'start': 'A',
      'end': 'G'
    },
    'Partneri': {
      'start': 'A',
      'end': 'E'
    },
    'Cjenik': {
      'start': 'A',
      'end': 'D'
    }
  }

  return entities[sheetName]
}


function aGetEntitiesByColumn(column, value, sheetName, matchEntireCell = true) {
  const conf = getEntityConfig(sheetName)
  const sheet = getSheetByName(sheetName)
  const range = sheet.getRange(column + ':' + column)
  const rows = range.createTextFinder(value).matchEntireCell(matchEntireCell).findAll();
  const values = []
  for (i = 0; i < rows.length; i++) {
    const row = sheet.getRange(conf.start + rows[i].getRow() + ':' + conf.end + rows[i].getRow()).getValues()
    values.push(row[0])
  }

  return values
}
