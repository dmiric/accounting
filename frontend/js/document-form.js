function onGetPartnersSuccess(partners) {
  var container = document.getElementById("partner-container")
  var select = createSelect("partner", partners)
  container.insertBefore(select, container.firstChild);
  var partnerEl = document.getElementById("partner")
  // @ts-ignore
  M.FormSelect.init(partnerEl, {})
}

function onGetDocumentTypesSuccess(doc_types) {
  console.log(doc_types)
  var doc_types_dual = []
  for (var i = 0; i < doc_types.length; i++) {
    console.log(doc_types[i])
    doc_types_dual.push([doc_types[i], doc_types[i]])
  }
  console.log(doc_types_dual)
  var container = document.getElementById("document-type-container")
  console.log(container)
  var select = createSelect("document-type", doc_types_dual)
  container.insertBefore(select, container.firstChild);
  var partnerEl = document.getElementById("document-type")
  // @ts-ignore
  M.FormSelect.init(partnerEl, {})
}

function onLoadDocumentSuccess(doc) {
  console.log(doc)
  var create_date = document.querySelector('#create_date');
  create_date.setAttribute('value', 'defaultValue');
}

function createSelect(id, options) {
  var fragment = document.createDocumentFragment();
  var select = document.createElement('select');
  select.setAttribute("id", id);
  select.setAttribute("class", "validate");
  select.required = true;
  select.options.add(new Option("Odaberite", "", true, false));

  select.style.position = "absolute"
  select.style.display = "inline"
  select.style.height = '0'
  select.style.padding = '0'
  select.style.width = '0'

  options.forEach(function (option) {
    select.options.add(new Option(option[1], option[0]));
  });
  fragment.appendChild(select);
  return fragment;
}

document.addEventListener('DOMContentLoaded', function () {
  // @ts-ignore
  google.script.run.withSuccessHandler(onGetPartnersSuccess).aGetPartners();
  // @ts-ignore
  google.script.run.withSuccessHandler(onGetDocumentTypesSuccess).aGetDocumentTypes();

  const formSwitch = 'edit'
  const doc_id = 20;

  if (formSwitch == 'edit') {
    google.script.run.withSuccessHandler(onLoadDocumentSuccess).aLoadDocument(doc_id);
  }

  // date pickers
  var options = {
    autoClose: true,
    container: document.body
  }

  var create_date = document.querySelector('#create_date')
  // @ts-ignore
  var create_date_instance = M.Datepicker.init(create_date, options)
  // @ts-ignore
  create_date.onclick = function () {
    create_date_instance.open()
  }

  var payment_date = document.querySelector('#payment_date')
  // @ts-ignore
  var payment_date_instance = M.Datepicker.init(payment_date, options)
  // @ts-ignore
  payment_date.onclick = function () {
    payment_date_instance.open()
  }

  var delivery_date = document.querySelector('#delivery_date')
  // @ts-ignore
  var delivery_date_instance = M.Datepicker.init(delivery_date, options)
  // @ts-ignore
  delivery_date.onclick = function () {
    delivery_date_instance.open()
  }

  document.getElementById("reset").addEventListener("click", function (event) {
    event.preventDefault()
    clearForm()
  });

  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault()

    var create_date = document.querySelector('#create_date')
    var payment_date = document.querySelector('#payment_date')
    var delivery_date = document.querySelector('#delivery_date')

    var partner = document.querySelector('#partner')
    var doc_type = document.querySelector('#document-type')

    var lineitems = document.getElementById("lineitems");
    // @ts-ignore
    var lineItemsData = lineitems.getData();
    for (let i = 0; i < lineItemsData.length; i++) {
      // @ts-ignore
      lineItemsData[i][4] = numeral(lineItemsData[i][4]).value()
    }

    var doc = {
      // @ts-ignore
      'create_date': create_date.value,
      // @ts-ignore
      'payment_date': payment_date.value,
      // @ts-ignore
      'delivery_date': delivery_date.value,
      // @ts-ignore
      'partner': partner.value,
      // @ts-ignore
      'doc_type': doc_type.value,
      'line_items': lineItemsData
    }

    const error = validateForm(doc)
    if (error !== false) {
      showErrorMessage(error);
      return
    }

    console.log(create_date, payment_date, delivery_date, partner, doc_type, lineItemsData)

    console.log(doc)
    // @ts-ignore
    google.script.run.withSuccessHandler(submitDocumentSuccess).aSubmitDocument(doc);
  });

  function showErrorMessage(error) {
    console.log(error)
    if (document.getElementById("error-message")) {
      document.getElementById("error-message").remove()
    }
    const errorElement = document.createElement('div');
    errorElement.setAttribute('id', 'error-message')
    errorElement.setAttribute('class', 'align-center')
    errorElement.innerHTML = error
    console.log(errorElement)
    document.getElementById('error-message-row').appendChild(errorElement)
  }

  function validateForm(doc) {
    if (doc.create_date == '') {
      console.log("datum!!!")
      return 'Datum kreiranja mora biti unešen!'
    }

    if (doc.partner == '') {
      return 'Partner mora biti unešen!'
    }

    if (doc.doc_type == '') {
      return 'Vrsta dokumenta mora biti odabrana!'
    }

    // TODO: Add validation for line items

    return false
  }

  function submitDocumentSuccess() {
    clearForm()
  }

  function clearForm() {
    var input = document.querySelectorAll('input')
    input.forEach(function (element) {
      element.classList.remove("valid")
      element.value = ''
    });
    // @ts-ignore
    M.updateTextFields()

    var lineitems = document.getElementById("lineitems");
    // @ts-ignore
    lineitems.updateData([["Roba", "Cijena (€)", "Popust (%)", "Količina", "Ukupno (€)"], ["", "", "", "", ""]]);

    if (document.getElementById("error-message")) {
      document.getElementById("error-message").remove()
    }
  }

});
