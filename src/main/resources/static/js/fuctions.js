var url = "http://localhost:8080/api";

//#region Ocultar controles
$("#divIdCategory").hide();
$("#divIdbtnCategory").hide();
$("#divIdCabin").hide();
$("#divbtnCabin").hide();
$("#divIdClient").hide();
$("#divbtnClient").hide();
$("#divIdMessage").hide();
$("#divbtnMessage").hide();
$("#divIdReservation").hide();
$("#divbtnReservation").hide();
//#endregion
//#region Categorias
function consultarCategory() {
  $("#resultadoCategory").empty();
  limpiarCategory();
  $.ajax({
    url: `${url}/Category/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      console.log(response);
      let tableResponse = "<table>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th> Código </th>";
      tableResponse += "<th> Nombre </th>";
      tableResponse += "<th> Descripcion </th>";
      tableResponse += "<th colspan='2'> Acciones </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<td>" + response[i].id + "</td>";
        tableResponse += "<td>" + response[i].name + "</td>";
        tableResponse += "<td>" + response[i].description + "</td>";
        tableResponse +=
          "<td> <button onclick='borrarCategory(" +
          response[i].id +
          ")'>Borrar</button>";
        tableResponse +=
          "<td> <button onclick='cargarCategory(" +
          response[i].id +
          ")'>Actualizar</button>";
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
      success: function (response) {
        console.log(response);
        consultarCategory();
        modalAlert(
          "Guardado exitoso",
          "Agregado Satisfactoriamente",
          "modalAlertCategory"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar",
      "modalAlertCategory"
    );
  }
}
function borrarCategory(idCategory) {
  $.ajax({
    url: `${url}/Category/` + idCategory,
    type: "DELETE",
    success: function (respuesta) {
      consultarCategory();
      modalAlert(
        "Eliminar",
        "La categoría se eliminó satisfactoriamente",
        "modalAlertCategory"
      );
    },
  });
}
function cargarCategory(idCategory) {
  $.ajax({
    url: `${url}/Category/${idCategory}`,
    type: "GET",
    success: function (respuesta) {
      if (respuesta) {
        $("#id").val(respuesta.id);
        $("#name").val(respuesta.name);
        $("#description").val(respuesta.description);
        $("#divIdCategory").show();
        $("#divIdbtnCategory").show();
      }
    },
  });
}
function limpiarCategory() {
  $("#name").val("");
  $("#description").val("");
  $("#divIdCategory").hide();
  $("#divIdbtnCategory").hide();
}
function actualizarCategory() {
  if ($("#name").val() != "" && $("#description").val() != "") {
    let dataJSON = {
      id: $("#id").val(),
      name: $("#name").val(),
      description: $("#description").val(),
    };

    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
      url: `${url}/Category/update`,
      contentType: "application/json; charset=utf-8",
      type: "PUT",
      data: dataToSend,
      datatype: "JSON",
      success: function (respuesta) {
        consultarCategory();
        modalAlert(
          "Actualizar",
          "La categoría se actualizó satisfactoriamente",
          "modalAlertCategory"
        );
      },
    });
  } else
    modalAlert(
      "Error",
      "Falta información válida para Actualizar",
      "modalAlertCategory"
    );
}
//#endregion

//#region Cabañas
function consultarCabin() {
  $("#resultadoCabin").empty();
  limpirCabin();
  $.ajax({
    url: `${url}/Cabin/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let tableResponse = "<table>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th> Código </th>";
      tableResponse += "<th> Marca </th>";
      tableResponse += "<th> Habitaciones </th>";
      tableResponse += "<th> Nombre </th>";
      tableResponse += "<th> Descripcion </th>";
      tableResponse += "<th> Id categoria </th>";
      tableResponse += "<th colspan='2'> Acciones </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<td>" + response[i].id + "</td>";
        tableResponse += "<td>" + response[i].brand + "</td>";
        tableResponse += "<td>" + response[i].rooms + "</td>";
        tableResponse += "<td>" + response[i].name + "</td>";
        tableResponse += "<td>" + response[i].description + "</td>";
        tableResponse += "<td>" + response[i].category.id + "</td>";
        tableResponse +=
          "<td> <button onclick='borrarCabin(" +
          response[i].id +
          ")'>Borrar</button>";
        tableResponse +=
          "<td> <button onclick='cargarCabin(" +
          response[i].id +
          ")'>Actualizar</button>";
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
      success: function (response) {
        console.log(response);
        consultarCabin();
        modalAlert(
          "Guardado exitoso",
          "Agregado Satisfactoriamente",
          "modalAlertCabin"
        );
      },
      error: function (params) {
        modalAlert(
          "Error",
          "Error al intentar guardar, Categoria no existe",
          "modalAlertCabin"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar",
      "modalAlertCabin"
    );
  }
}
function borrarCabin(id) {
  $.ajax({
    url: `${url}/Cabin/` + id,
    type: "DELETE",
    success: function (respuesta) {
      consultarCabin();
      modalAlert(
        "Eliminar",
        "La cabaña se eliminó satisfactoriamente",
        "modalAlertCabin"
      );
    },
  });
}
function cargarCabin(idCabin) {
  $.ajax({
    url: `${url}/Cabin/${idCabin}`,
    type: "GET",
    success: function (respuesta) {
      if (respuesta) {
        $("#idCabin").val(respuesta.id);
        $("#brand").val(respuesta.brand);
        $("#rooms").val(respuesta.rooms);
        $("#nameCabin").val(respuesta.name);
        $("#descriptionCabin").val(respuesta.description);
        $("#idCategoria").val(respuesta.category.id);
        $("#divIdCabin").show();
        $("#divbtnCabin").show();
      }
    },
  });
}
function limpirCabin() {
  $("#brand").val("");
  $("#rooms").val("");
  $("#nameCabin").val("");
  $("#descriptionCabin").val("");
  $("#idCategoria").val("");
  $("#divIdCabin").hide();
  $("#divbtnCabin").hide();
}
function actualizarCabin() {
  if (
    $("#brand").val() != "" &&
    $("#rooms").val() != "" &&
    $("#nameCabin").val() != "" &&
    $("#descriptionCabin").val() != "" &&
    $("#idCategoria").val() != "0"
  ) {
    let dataJSON = {
      id: $("#idCabin").val(),
      brand: $("#brand").val(),
      rooms: $("#rooms").val(),
      name: $("#nameCabin").val(),
      description: $("#descriptionCabin").val(),
      category: { id: $("#idCategoria").val() },
    };

    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
      url: `${url}/Cabin/update`,
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        consultarCabin();
        modalAlert(
          "Actualizacion",
          "Cabaña actualizada satisfactoriamente",
          "modalAlertCabin"
        );
      },
    });
  } else
    modalAlert(
      "Error",
      "Falta información válida para Actualizar",
      "modalAlertCabin"
    );
}
//#endregion

//#region Clientes
function consultarClient() {
  $("#resultadoClient").empty();
  limpiarClient();
  $.ajax({
    url: `${url}/Client/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      let tableResponse = "<table>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th> Código </th>";
      tableResponse += "<th> Nombre </th>";
      tableResponse += "<th> Correo electronico </th>";
      tableResponse += "<th> Contraseña </th>";
      tableResponse += "<th> Edad </th>";
      tableResponse += "<th colspan='2'> Acciones </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<td>" + response[i].idClient + "</td>";
        tableResponse += "<td>" + response[i].name + "</td>";
        tableResponse += "<td>" + response[i].email + "</td>";
        tableResponse += "<td>" + response[i].password + "</td>";
        tableResponse += "<td>" + response[i].age + "</td>";
        tableResponse +=
          "<td> <button onclick='borrarClient(" +
          response[i].idClient +
          ")'>Borrar</button>";
        tableResponse +=
          "<td> <button onclick='cargarClient(" +
          response[i].idClient +
          ")'>Actualizar</button>";
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
      success: function (response) {
        console.log(response);
        consultarClient();
        modalAlert(
          "Guardado exitoso",
          "Agregado Satisfactoriamente",
          "modalAlertClient"
        );
      },
      error: function (params) {
        modalAlert(
          "Error",
          "Error al intentar guardar, Categoria no existe",
          "modalAlertClient"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar",
      "modalAlertClient"
    );
  }
}
function borrarClient(idClient) {
  $.ajax({
    url: `${url}/Client/${idClient}`,
    type: "DELETE",
    success: function (respuesta) {
      consultarClient();
      modalAlert(
        "Eliminar",
        "Cliente eliminado satisfactoriamente",
        "modalAlertClient"
      );
    },
  });
}
function cargarClient(idClient) {
  $.ajax({
    url: `${url}/Client/${idClient}`,
    type: "GET",
    success: function (respuesta) {
      if (respuesta) {
        $("#idClient").val(respuesta.idClient);
        $("#nameClient").val(respuesta.name);
        $("#email").val(respuesta.email);
        $("#password").val(respuesta.password);
        $("#age").val(respuesta.age);
        $("#divIdClient").show();
        $("#divbtnClient").show();
      }
    },
  });
}
function limpiarClient() {
  $("#idClient").val("");
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
  $("#age").val("");
  $("#divIdClient").hide();
  $("#divbtnClient").hide();
}
function actualizarClient() {
  if (
    $("#nameClient").val() != "" &&
    $("#password").val() != "" &&
    $("#email").val() != "" &&
    $("#age").val() != ""
  ) {
    let dataJSON = {
      idClient: $("#idClient").val(),
      name: $("#nameClient").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      age: $("#age").val(),
    };

    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
      url: `${url}/Client/update`,
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        consultarClient();
        modalAlert(
          "Actualizacion",
          "Cliente actualizado satisfactoriamente",
          "modalAlertClient"
        );
      },
    });
  } else
    modalAlert(
      "Error",
      "Falta información válida para Actualizar",
      "modalAlertClient"
    );
}
//#endregion

//#region Mensajes
function consultarMessage() {
  $("#resultadoMessage").empty();
  limpiarMessage();
  $.ajax({
    url: `${url}/Message/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      console.log(response);
      let tableResponse = "<table>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th> Código </th>";
      tableResponse += "<th> Mensaje </th>";
      tableResponse += "<th> Cliente id </th>";
      tableResponse += "<th> Cabaña Id </th>";
      tableResponse += "<th colspan='2'> Acciones </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<td>" + response[i].idMessage + "</td>";
        tableResponse += "<td>" + response[i].messageText + "</td>";
        tableResponse += "<td>" + response[i].client.idClient + "</td>";
        tableResponse += "<td>" + response[i].cabin.id + "</td>";
        tableResponse +=
          "<td> <button onclick='borrarMessage(" +
          response[i].idMessage +
          ")'>Borrar</button>";
        tableResponse +=
          "<td> <button onclick='cargarMessage(" +
          response[i].idMessage +
          ")'>Actualizar</button>";
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
      success: function (response) {
        console.log(response);
        consultarMessage();
        modalAlert(
          "Guardado exitoso",
          "Agregado Satisfactoriamente",
          "modalAlertMessage"
        );
      },
      error: function (params) {
        modalAlert(
          "Error",
          "Error al intentar guardar, cliente o cabaña no existen",
          "modalAlertMessage"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar",
      "modalAlertMessage"
    );
  }
}
function borrarMessage(id) {
  $.ajax({
    url: `${url}/Message/${id}`,
    type: "DELETE",
    success: function (respuesta) {
      consultarMessage();
      modalAlert(
        "Eliminar",
        "Se eliminó el mensaje satisfactoriamente",
        "modalAlertMessage"
      );
    },
  });
}
function cargarMessage(idMessage) {
  $.ajax({
    url: `${url}/Message/${idMessage}`,
    type: "GET",
    success: function (respuesta) {
      if (respuesta) {
        $("#idMessage").val(respuesta.idMessage);
        $("#messageText").val(respuesta.messageText);
        $("#clientId").val(respuesta.client.idClient);
        $("#cabinId").val(respuesta.cabin.id);
        $("#divIdMessage").show();
        $("#divbtnMessage").show();
      }
    },
  });
}
function limpiarMessage() {
  $("#messageText").val("");
  $("#clientId").val("");
  $("#cabinId").val("");
  $("#divIdMessage").hide();
  $("#divbtnMessage").hide();
}
function actualizarMessage() {
  if (
    $("#messageText").val() != "" &&
    $("#clientId").val() != "0" &&
    $("#cabinId").val() != "0"
  ) {
    let dataJSON = {
      idMessage: $("#idMessage").val(),
      messageText: $("#messageText").val(),
      cabin: { id: +$("#cabinId").val() },
      client: { idClient: +$("#clientId").val() },
    };
    console.log(dataJSON);
    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
      url: `${url}/Message/update`,
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        consultarMessage();
        modalAlert(
          "Actualizar",
          "El mensaje se actualizó satisfactoriamente",
          "modalAlertMessage"
        );
      },
    });
  } else
    modalAlert(
      "Error",
      "Falta información válida para actualizar",
      "modalAlertMessage"
    );
}
//#endregion

//#region Reservaciones
function consultarReservation() {
  console.log("aca");
  $("#resultadoReservation").empty();
  limpiarReservation();
  $.ajax({
    url: `${url}/Reservation/all`,
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      console.log(response);
      let tableResponse = "<table>";
      tableResponse += "<thead>";
      tableResponse += "<tr>";
      tableResponse += "<th> Código </th>";
      tableResponse += "<th> Fecha de inicio </th>";
      tableResponse += "<th> Fecha de devolucion </th>";
      tableResponse += "<th> Cliente id </th>";
      tableResponse += "<th> Cabaña Id </th>";
      tableResponse += "<th colspan='2'> Acciones </th>";
      tableResponse += "</tr>";
      tableResponse += "</thead>";

      for (i = 0; i < response.length; i++) {
        tableResponse += "<tbody>";
        tableResponse += "<tr>";
        tableResponse += "<td>" + response[i].idReservation + "</td>";
        tableResponse += "<td>" + response[i].startDate + "</td>";
        tableResponse += "<td>" + response[i].devolutionDate + "</td>";
        tableResponse += "<td>" + response[i].client.idClient + "</td>";
        tableResponse += "<td>" + response[i].cabin.id + "</td>";
        tableResponse +=
          "<td> <button onclick='borrarReservation(" +
          response[i].idReservation +
          ")'>Borrar</button>";
        tableResponse +=
          "<td> <button onclick='cargarReservation(" +
          response[i].idReservation +
          ")'>Actualizar</button>";
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
      success: function (response) {
        console.log(response);
        consultarReservation();
        modalAlert(
          "Guardado exitoso",
          "Agregado Satisfactoriamente",
          "modalAlertReservation"
        );
      },
      error: function (params) {
        modalAlert(
          "Error",
          "Error al intentar guardar, cliente o cabaña no existen",
          "modalAlertReservation"
        );
      },
    });
  } else {
    modalAlert(
      "Error campos incompletos",
      "Digite información válida para agregar",
      "modalAlertReservation"
    );
  }
}
function borrarReservation(idReservation) {
  $.ajax({
    url: `${url}/Reservation/${idReservation}`,
    type: "DELETE",
    success: function (respuesta) {
      consultarReservation();
      modalAlert(
        "Eliminar",
        "La reservación se eliminó satisfactoriamente",
        "modalAlertReservation"
      );
    },
  });
}
function cargarReservation(idReservation) {
  $.ajax({
    url: `${url}/Reservation/${idReservation}`,
    type: "GET",
    success: function (respuesta) {
      if (respuesta) {
        $("#idReservation").val(respuesta.idReservation);
        $("#startDate").val(setDateFormat(respuesta.startDate));
        $("#devolutionDate").val(setDateFormat(respuesta.devolutionDate));
        $("#clientIdReservation").val(respuesta.client.idClient);
        $("#cabinIdReservation").val(respuesta.cabin.id);
        $("#divIdReservation").show();
        $("#divbtnReservation").show();
      }
    },
  });
}
function limpiarReservation() {
  $("#startDate").val("");
  $("#devolutionDate").val("");
  $("#clientIdReservation").val("");
  $("#cabinIdReservation").val("");
  $("#divIdReservation").hide();
  $("#divbtnReservation").hide();
}
function actualizarReservation(idReservation) {
  if (
    $("#startDate").val() != "" &&
    $("#devolutionDate").val() != "" &&
    $("#clientIdReservation").val() != "0" &&
    $("#cabinIdReservation").val() != "0"
  ) {
    let dataJSON = {
      idReservation: $("#idReservation").val(),
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      client: { idClient: $("#clientIdReservation").val() },
      cabin: { id: $("#cabinIdReservation").val() },
    };
    let dataToSend = JSON.stringify(dataJSON);

    $.ajax({
      url: `${url}/Reservation/update`,
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        consultarReservation();
        modalAlert(
          "Actualizar",
          "La reserva se modificó satisfactoriamente",
          "modalAlertReservation"
        );
      },
    });
  } else
    modalAlert(
      "Error",
      "Falta información válida para Actualizar",
      "modalAlertReservation"
    );
}
//#endregion

//#region Reportes
function traerReporteStatus() {
  console.log("test");
  $.ajax({
    url: `${url}/Reservation/report-status`,
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuesta(respuesta);
    },
  });
}
function traerReporteDate() {
  var fechaInicio = document.getElementById("RstarDate").value;
  var fechaCierre = document.getElementById("RdevolutionDate").value;
  console.log(fechaInicio);
  console.log(fechaCierre);

  $.ajax({
    url: `${url}/Reservation/report-dates/${fechaInicio}/${fechaCierre}`,
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuestaDate(respuesta);
    },
  });
}
function traerReporteClientes() {
  $.ajax({
    url: `${url}/Reservation/report-clients`,
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuestaClientes(respuesta);
    },
  });
}
function pintarRespuesta(respuesta) {
  let myTable = "<table>";
  myTable += "<tr>";
  myTable += "<th>completadas</th>";
  myTable += "<td>" + respuesta.completed + "</td>";
  myTable += "<th>canceladas</th>";
  myTable += "<td>" + respuesta.cancelled + "</td>";
  myTable += "</tr>";
  myTable += "</table>";
  $("#resultadoStatus").html(myTable);
}
function pintarRespuestaDate(respuesta) {
  let myTable = "<table>";
  myTable += "<tr>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<th>total</th>";
    myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
    myTable += "<td>" + respuesta[i].startDate + "</td>";
    myTable += "<td>" + respuesta[i].status + "</td>";

    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultadoDate").html(myTable);
}
function pintarRespuestaClientes(respuesta) {
  let myTable = "<table>";
  myTable += "<tr>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<th>total</th>";
    myTable += "<td>" + respuesta[i].total + "</td>";
    myTable += "<td>" + respuesta[i].client.name + "</td>";
    myTable += "<td>" + respuesta[i].client.email + "</td>";
    myTable += "<td>" + respuesta[i].client.age + "</td>";

    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultadoClientes").html(myTable);
}
//#endregion

function setDateFormat(date) {
  const dateFormat = date ? new Date(date) : new Date();
  dateFormat.setHours(dateFormat.getHours() + 5);

  return `${returnCero(dateFormat.getFullYear())}-${returnCero(
    dateFormat.getMonth() + 1
  )}-${returnCero(dateFormat.getDate())}`;
}
function returnCero(dato) {
  return dato <= 9 ? `0${dato}` : dato;
}
//#region Modal
function modalAlert(title, message, nameModal) {
  $("#modalAlertLabel").text(title);
  $("#textMessage").text(message);
  $(`#${nameModal}`).addClass("active");
}
function hiddenModal(nameModal) {
  $(`#${nameModal}`).removeClass("active");
}
//#endregion
