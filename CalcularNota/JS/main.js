const formulario = document.querySelector("#formulario");
const inputs = document.querySelectorAll("#formulario input");
let inputsTexto = document.querySelectorAll(".items-formulario input");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const documento = document.querySelector("#documento");
const correo = document.querySelector("#correo");
const nota1 = document.querySelector("#nota1");
const nota2 = document.querySelector("#nota2");

//Creando Expresiones Regulares
let expresionNombre = /^[a-zA-ZÀ-ÿ\s]{3,32}$/;
let expresionApellido = /^[a-zA-ZÀ-ÿ\s]{3,32}$/;
let expresionDocumento = /^[-?\d+\.?\d*]{8,12}$/m;
let expresionNota = /^(\d)?(\d|,)*\.?\d$/;
let expresionCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//Array de campos para posteriromente verificar campos vacios y Expresiones Regulares
const campos = {
  nombre: false,
  apellido: false,
  documento: false,
  correo: false,
  notaUno: false,
  notaDos: false,
};

//Funciones

function ValidarExpresiones(event, expresion, campo, nombreCampo) {
  if (expresion.test(event.target.value)) {//Validando la expresión regular
    console.log("Validación exitosa");
    campo.classList.add("correcto");
    campo.classList.remove("error");
    campos[nombreCampo] = true;
    // return true;
  } else {
    console.log("Validación errada");
    campo.classList.add("error");
    campo.classList.remove("correcto");
    campos[nombreCampo] = false;
    // return false;
  }
}

function ValidarCamposVacios() {
  let estado;

  console.log(inputsTexto);
  inputsTexto.forEach((input) => {
    // console.log(input);
    if (input.value == "null" || input.value == "" || input.value == NaN) {
      console.log(inputsTexto);
      console.log("Campos vacios" + inputsTexto);
      estado = true;
    } else {
      console.log("Campos llenos");
      estado = false;
    }
  });
  return estado;
}

const validarNota = (nota, nombreCampo) => {
  if (parseFloat(nota.value) < 0.0 || parseFloat(nota.value) > 5.0 || nota.value == "" ||isNaN(nota.value) == true) {
    console.log(nota.value);
    console.log("Nota incorrecta");
    nota.classList.remove("correcto");
    nota.classList.add("error");
    campos[nombreCampo] = false;
  } else {
    console.log(nota.value);
    console.log("Nota correcta");
    nota.classList.remove("error");
    nota.classList.add("correcto");
    campos[nombreCampo] = true;
  }
};

function LimpiarCampos() {
  //Ciclo para limpiar los inputs(campos de texto) del formulario
  inputsTexto.forEach((inputTexto) => {
    inputTexto.value = "";
    inputTexto.classList.remove("correcto", "error");
  });
}

function LimpiarCamposSalida() {
  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.textContent = "";
  });
}

function CalcularNotaFinal() {
  let notaFinal = (parseFloat(nota1.value) + parseFloat(nota2.value)) / 2;
  return notaFinal;
}

function mostrarDatos() {
  document.querySelector( "#mostrarNombre").textContent = `Nombre: ${nombre.value}`;
  document.querySelector("#mostrarApellido").textContent = `Apellido: ${apellido.value}`;
  document.querySelector("#mostrarDocumento").textContent = `Documento: ${documento.value}`;
  document.querySelector("#mostrarCorreo").textContent = `Correo: ${correo.value}`;
  document.querySelector("#mostrarNota1").textContent = `Nota 1: ${nota1.value}`;
  document.querySelector("#mostrarNota2").textContent = `Nota 2: ${nota2.value}`;
  document.querySelector("#mostrarNotaFinal").textContent = `Nota Final: ${CalcularNotaFinal()}`;
}

let mensajeEmergente = document.querySelector("#mensaje-emergente");
//Funciones Anonimas-Flecha
const validarFormulario = (event) => {
  // event.preventDefault();
  mensajeEmergente.textContent = "";
  switch (event.target.name) {
    case "nombre":
      ValidarExpresiones(event, expresionNombre, nombre, "nombre");
      // console.log(nom);
      break;
    case "apellido":
      ValidarExpresiones(event, expresionApellido, apellido, "apellido");
      break;
    case "documento":
      ValidarExpresiones(event, expresionDocumento, documento, "documento");
      break;
    case "correo":
      ValidarExpresiones(event, expresionCorreo, correo, "correo");
      break;
    case "nota1":
      ValidarExpresiones(event, expresionNota, nota1, "notaUno");
      validarNota(nota1, "notaUno");
      break;
    case "nota2":
      ValidarExpresiones(event, expresionNota, nota2, "notaDos");
      validarNota(nota2, "notaDos");

      break;
    default:
      break;
  }

};

//Cilo que activa eventos
inputs.forEach((input) => {
  // console.log(input);
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

// const mostrarnombre = document.querySelector("#mostrarNombre");
// const mostrarapellido = document.querySelector("#mostrarApellido");
// const mostrardocumento = document.querySelector("#mostrarDocumento");
// const mostrarcorreo = document.querySelector("#mostrarCorreo");
// const mostrarnota1 = document.querySelector("#mostrarNota1");
// const mostrarnota2 = document.querySelector("#mostrarNota2");
// const mostrarNotaFinal = document.querySelector("#mostrarNotaFinal");

//Llamada de eventos
const btnCalcular = document.querySelector("#btnCalcular");

btnCalcular.addEventListener("click", (event) => {
event.preventDefault();
  console.log(campos.nombre, campos.apellido, campos.documento, campos.correo, campos.notaUno, campos.notaDos
  );
  
  if (
    campos.nombre && campos.apellido && campos.documento && campos.correo && campos.notaUno && campos.notaDos
  ) {
    mostrarDatos();
    // LimpiarCampos();
    // formulario.reset();
    mensajeEmergente.textContent = "";
  } else {
    console.log("Hay campos incorrectos o Campos Obligatorios por rellenar(*)");
    mensajeEmergente.textContent =
      "Hay campos incorrectos o Campos Obligatorios por rellenar(*)";
  }
});

const btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", () => {
  formulario.reset();
  // LimpiarCampos();
  LimpiarCamposSalida();
  mensajeEmergente.textContent = "";
});
