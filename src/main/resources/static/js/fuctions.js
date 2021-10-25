var url = "http://localhost:8080/api";

function consultarCategory() {
  $("#resultadoCategory").empty();
  $("#name").val("");
  $("#description").val("");
  $.ajax({
    url: `${url}/Category/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let tableResponse = "<table class='table table-striped table-bordered'>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th scope='col'> Código </th>";
      tableResponse += "<th scope='col'> Nombre </th>";
      tableResponse += "<th scope='col'> Descripcion </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<th scope='row'>" + response[i].id + "</th>";
        tableResponse += "<td>" + response[i].name + "</td>";
        tableResponse += "<td>" + response[i].description + "</td>";
        tableResponse += "</tr>";
        tableResponse += "</tbody>";
      }
      tableResponse += "</table>";
      $("#resultadoCategory").append(tableResponse);
    },
  });
}
function agregarCategory() {
  if ($("#name").val() != "" && $("#description").val() != "") {
    let dataJSON = {
      name: $("#name").val(),
      description: $("#description").val(),
    };

    let dataToSend = JSON.stringify(dataJSON);
    $.ajax({
      url: `${url}/Category/save`,
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (respuesta) {
        consultarCategory();
        modalAlert("Guardado exitoso", "Agregado Satisfactoriamente");
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar"
    );
  }
}
function consultarCabin() {
  $("#resultadoCabin").empty();
  $("#brand").val("");
  $("#rooms").val("");
  $("#nameCabin").val("");
  $("#descriptionCabin").val("");
  $("#idCategoria").val("");
  $.ajax({
    url: `${url}/Cabin/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let tableResponse = "<table class='table table-striped table-bordered'>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th scope='col'> Código </th>";
      tableResponse += "<th scope='col'> Marca </th>";
      tableResponse += "<th scope='col'> Habitaciones </th>";
      tableResponse += "<th scope='col'> Nombre </th>";
      tableResponse += "<th scope='col'> Descripcion </th>";
      tableResponse += "<th scope='col'> Id categoria </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<th scope='row'>" + response[i].id + "</th>";
        tableResponse += "<td>" + response[i].brand + "</td>";
        tableResponse += "<td>" + response[i].rooms + "</td>";
        tableResponse += "<td>" + response[i].name + "</td>";
        tableResponse += "<td>" + response[i].description + "</td>";
        tableResponse += "<td>" + response[i].category.id + "</td>";
        tableResponse += "</tr>";
        tableResponse += "</tbody>";
      }
      tableResponse += "</table>";
      $("#resultadoCabin").append(tableResponse);
    },
  });
}
function agregarCabin() {
  if (
    $("#brand").val() != "" &&
    $("#rooms").val() != "" &&
    $("#nameCabin").val() != "" &&
    $("#descriptionCabin").val() != "" &&
    $("#idCategoria").val() != ""
  ) {
    let dataJSON = {
      brand: $("#brand").val(),
      rooms: $("#rooms").val(),
      name: $("#nameCabin").val(),
      description: $("#descriptionCabin").val(),
      category: { id: $("#idCategoria").val() },
    };

    let dataToSend = JSON.stringify(dataJSON);
    $.ajax({
      url: `${url}/Cabin/save`,
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (respuesta) {
        consultarCabin();
        modalAlert("Guardado exitoso", "Agregado Satisfactoriamente");
      },
      error: function (params) {
        modalAlert("Error", "Error al intentar guardar, Categoria no existe");
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar"
    );
  }
}
function consultarClient() {
  $("#resultadoClient").empty();
  $("#nameClient").val("");
  $("#email").val("");
  $("#password").val("");
  $("#age").val("");
  $.ajax({
    url: `${url}/Client/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      console.log(response);
      let tableResponse = "<table class='table table-striped table-bordered'>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th scope='col'> Código </th>";
      tableResponse += "<th scope='col'> Nombre </th>";
      tableResponse += "<th scope='col'> Correo electronico </th>";
      tableResponse += "<th scope='col'> Contraseña </th>";
      tableResponse += "<th scope='col'> Edad </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<th scope='row'>" + response[i].idClient + "</th>";
        tableResponse += "<td>" + response[i].name + "</td>";
        tableResponse += "<td>" + response[i].email + "</td>";
        tableResponse += "<td>" + response[i].password + "</td>";
        tableResponse += "<td>" + response[i].age + "</td>";
        tableResponse += "</tr>";
        tableResponse += "</tbody>";
      }
      tableResponse += "</table>";
      $("#resultadoClient").append(tableResponse);
    },
  });
}
function agregarClient() {
  if (
    $("#nameClient").val() != "" &&
    $("#email").val() != "" &&
    $("#password").val() != "" &&
    $("#age").val() != ""
  ) {
    let dataJSON = {
      name: $("#nameClient").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      age: $("#age").val(),
    };

    let dataToSend = JSON.stringify(dataJSON);
    $.ajax({
      url: `${url}/Client/save`,
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (respuesta) {
        consultarClient();
        modalAlert("Guardado exitoso", "Agregado Satisfactoriamente");
      },
      error: function (params) {
        modalAlert("Error", "Error al intentar guardar, Categoria no existe");
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar"
    );
  }
}
function consultarMessage() {
  $("#resultadoMessage").empty();
  $("#messageText").val("");
  $("#clientId").val("");
  $("#cabinId").val("");
  $.ajax({
    url: `${url}/Message/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let tableResponse = "<table class='table table-striped table-bordered'>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th scope='col'> Código </th>";
      tableResponse += "<th scope='col'> Mensaje </th>";
      tableResponse += "<th scope='col'> Cliente id </th>";
      tableResponse += "<th scope='col'> Cabaña Id </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<th scope='row'>" + response[i].id + "</th>";
        tableResponse += "<td>" + response[i].messageText + "</td>";
        tableResponse += "<td>" + response[i].client.idClient + "</td>";
        tableResponse += "<td>" + response[i].cabin.id + "</td>";
        tableResponse += "</tr>";
        tableResponse += "</tbody>";
      }
      tableResponse += "</table>";
      $("#resultadoMessage").append(tableResponse);
    },
  });
}
function agregarMessage() {
  if (
    $("#messageText").val() != "" &&
    $("#clientId").val() != "" &&
    $("#cabinId").val() != ""
  ) {
    let dataJSON = {
      messageText: $("#messageText").val(),
      client: { idClient: $("#clientId").val() },
      cabin: { id: $("#cabinId").val() },
    };

    let dataToSend = JSON.stringify(dataJSON);
    $.ajax({
      url: `${url}/Message/save`,
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (respuesta) {
        consultarMessage();
        modalAlert("Guardado exitoso", "Agregado Satisfactoriamente");
      },
      error: function (params) {
        modalAlert(
          "Error",
          "Error al intentar guardar, cliente o cabaña no existen"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar"
    );
  }
}
function consultarReservation() {
  console.log("aca");
  $("#resultadoReservation").empty();
  $("#startDate").val("");
  $("#devolutionDate").val("");
  $("#clientId").val("");
  $("#cabinId").val("");
  $.ajax({
    url: `${url}/Reservation/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let tableResponse = "<table class='table table-striped table-bordered'>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th scope='col'> Código </th>";
      tableResponse += "<th scope='col'> Fecha de inicio </th>";
      tableResponse += "<th scope='col'> Fecha de devolucion </th>";
      tableResponse += "<th scope='col'> Cliente id </th>";
      tableResponse += "<th scope='col'> Cabaña Id </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<th scope='row'>" + response[i].id + "</th>";
        tableResponse += "<td>" + response[i].startDate + "</td>";
        tableResponse += "<td>" + response[i].devolutionDate + "</td>";
        tableResponse += "<td>" + response[i].client.idClient + "</td>";
        tableResponse += "<td>" + response[i].cabin.id + "</td>";
        tableResponse += "</tr>";
        tableResponse += "</tbody>";
      }
      tableResponse += "</table>";
      $("#resultadoReservation").append(tableResponse);
    },
  });
}
function agregarReservation() {
  if (
    $("#startDate").val() != "" &&
    $("#devolutionDate").val() != "" &&
    $("#clientIdReservation").val() != "" &&
    $("#cabinIdReservation").val() != ""
  ) {
    let dataJSON = {
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      client: { idClient: $("#clientIdReservation").val() },
      cabin: { id: $("#cabinIdReservation").val() },
    };

    let dataToSend = JSON.stringify(dataJSON);
    $.ajax({
      url: `${url}/Reservation/save`,
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (respuesta) {
        consultarReservation();
        modalAlert("Guardado exitoso", "Agregado Satisfactoriamente");
      },
      error: function (params) {
        modalAlert(
          "Error",
          "Error al intentar guardar, cliente o cabaña no existen"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar"
    );
  }
}
function modalAlert(title, message) {
  var myModal = new bootstrap.Modal(document.getElementById("modalAlert"));
  $("#modalAlertLabel").text(title);
  $("#textMessage").text(message);
  myModal.show();
}
