const activeTableConfig = {
	id: "lineitems",
	displayAddNewColumn: false,
	isHeaderTextEditable: false,
	stripedRows: {
		odd: {
			backgroundColor: ""
		},
		even: {
			backgroundColor: "#ebebeb7a"
		}
	},
	rowDropdown: {
		displaySettings: {
			isAvailable: true,
			openMethod: {
				overlayClick: true
			}
		},
		canEditHeaderRow: false,
		isInsertUpAvailable: false,
		isInsertDownAvailable: false,
		isMoveAvailable: false,
		isDeleteAvailable: true
	},
	columnDropdown: {
		isSortAvailable: false,
		isDeleteAvailable: false,
		isInsertLeftAvailable: false,
		isInsertRightAvailable: false,
		isMoveAvailable: false
	},
	tableStyle: {
		borderRadius: 0,
		boxShadow: "rgb(172 172 172 / 17 % ) 0 px 0.5 px 1 px 0 px",
	},
	availableDefaultColumnTypes: ["Number"],
	customColumnsSettings: [{
		headerName: "Roba",
		defaultText: "Izaberite proizvod",
		defaultColumnTypeName: "Roba",
		cellStyle: {
			"width": "345px"
		},
		isHeaderTextEditable: false
	},
	{
		headerName: "Cijena (€)",
		isCellTextEditable: false,
		cellStyle: {
			"backgroundColor": "#f1f1f1",
			"width": "100px",
			"text-align": "right"
		},
		defaultColumnTypeName: "Number",
		isHeaderTextEditable: false
	},
	{
		headerName: "Popust (%)",
		cellStyle: {
			"width": "100px",
			"text-align": "center"
		},
		defaultColumnTypeName: "Number",
		isHeaderTextEditable: false
	},
	{
		headerName: "Količina",
		cellStyle: {
			"width": "100px",
			"text-align": "center"
		},
		defaultColumnTypeName: "Number",
		isHeaderTextEditable: false
	},
	{
		headerName: "Ukupno (€)",
		isCellTextEditable: false,
		cellStyle: {
			"backgroundColor": "#f1f1f1",
			"width": "166px",
			"text-align": "right"
		},
		defaultColumnTypeName: "Number",
		isHeaderTextEditable: false
	}
	],
	customColumnTypes: [{
		name: "Roba",
		select: {
			options: [],
			canAddMoreOptions: true
		},
		iconSettings: {
			reusableIconName: "select"
		}
	}],
	data: [
		["Roba", "Cijena (€)", "Popust (%)", "Količina", "Ukupno (€)"],
		["", "", "", "", ""],
	]
};
var productsCache = []
const activeTable = document.createElement('active-table');

activeTable.id = activeTableConfig.id
// @ts-ignore
activeTable.data = activeTableConfig.data
// @ts-ignore
activeTable.customColumnTypes = activeTableConfig.customColumnTypes
// @ts-ignore
activeTable.customColumnsSettings = activeTableConfig.customColumnsSettings
// @ts-ignore
activeTable.tableStyle = activeTableConfig.tableStyle
// @ts-ignore
activeTable.availableDefaultColumnTypes = activeTableConfig.availableDefaultColumnTypes
// @ts-ignore
activeTable.columnDropdown = activeTableConfig.columnDropdown
// @ts-ignore
activeTable.rowDropdown = activeTableConfig.rowDropdown
// @ts-ignore
activeTable.stripedRows = activeTableConfig.stripedRows
// @ts-ignore
activeTable.isHeaderTextEditable = activeTableConfig.isHeaderTextEditable
// @ts-ignore
activeTable.displayAddNewColumn = activeTableConfig.displayAddNewColumn

function onGetProductsSuccess(products, activeTable) {
	products.forEach(function (product) {
		if (product[3] === true) {
			activeTable.customColumnTypes[0].select.options.push(product[1])
			productsCache.push(product)
		}
	});
	document.getElementById('lineitems-row').appendChild(activeTable);
}

// pick a product
// @ts-ignore
activeTable.onCellUpdate = function (cellUpdate) {
	if (cellUpdate.columnIndex == 0 && cellUpdate.updateType == 'Update' && cellUpdate.text != '' && cellUpdate.text != 'Izaberite proizvod') {
		const productPrice = arrayLookup(cellUpdate.text, productsCache, 1, 2)
		// @ts-ignore
		activeTable.updateCell({ newText: numeral(productPrice).format('0.00'), rowIndex: cellUpdate.rowIndex, columnIndex: 1 });
	}
	if ((cellUpdate.columnIndex == 1 || cellUpdate.columnIndex == 2 || cellUpdate.columnIndex == 3)
		&& cellUpdate.updateType == 'Update' && cellUpdate.text != '') {
		// @ts-ignore
		const lineItems = activeTable.getData();
		const lineItem = lineItems[cellUpdate.rowIndex]
		if (lineItem[3] != '') {
			// @ts-ignore
			let total = numeral(lineItem[1]).value() * numeral(lineItem[3]).value()
			if (lineItem[2] != '') {
				total = total - (total * (lineItem[2] / 100))
			}
			// @ts-ignore
			activeTable.updateCell({ newText: numeral(total).format('0.00'), rowIndex: cellUpdate.rowIndex, columnIndex: 4 });
		}
	}

	// calculate sub total
	// @ts-ignore
	const updatedLineItems = activeTable.getData();
	// @ts-ignore
	const header = updatedLineItems.shift()
	let subTotal = 0
	updatedLineItems.forEach((lineItem) => {
		if (lineItem[4] != '') {
			console.log(lineItem[4])
			// @ts-ignore
			subTotal = subTotal + numeral(lineItem[4]).value()
		}
	})
	// @ts-ignore
	subTotal = numeral(subTotal).format('0.00');
	// @ts-ignore
	document.getElementById('sub-total').innerHTML = subTotal
};

/**
 * This JavaScript function (specially meant for Google Apps Script or GAS) Get the lookup (vertical) value from a multi-dimensional array.
 *
 * @version 1.1.0
 *
 * @param {Object} searchValue The value to search for the lookup (vertical).
 * @param {Array} array The multi-dimensional array to be searched.
 * @param {Number} searchIndex The column-index of the array where to search.
 * @param {Number} returnIndex The column-index of the array from where to get the returning matching value.
 * @return {Object} Returns the matching value found else returns null.
 */
function arrayLookup(searchValue, array, searchIndex, returnIndex) {
	var returnVal = null;
	var i;
	for (i = 0; i < array.length; i++) {
		if (array[i][searchIndex] == searchValue) {
			returnVal = array[i][returnIndex];
			break;
		}
	}
	return returnVal;
}
