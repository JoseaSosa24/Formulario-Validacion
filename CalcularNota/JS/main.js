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
let expresionNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
let expresionApellido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
let expresionDocumento = /^-?\d+\.?\d*$/m;
let expresionNota = /^(\d)?(\d|,)*\.?\d$/;
let expresionCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//Vector de campos
const campos = {
  nombre: false,
  apellido: false,
  documento: false,
  correo: false,
  notaUno: false,
  notaDos: false,
};

//Funciones

function ValidarExpresiones(event, expresion, campo) {
  if (expresion.test(event.target.value)) {
    console.log("Validación exitosa");
    campo.classList.add("correcto");
    campo.classList.remove("error");
    campos[campo]=true;
    // return true;
  } else {
    console.log("Validación errada");
    campo.classList.add("error");
    campo.classList.remove("correcto");
    campos[campo]=false;
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

function validarNota(nota) {
  if (parseFloat(nota.value < 0.0) && parseFloat(nota.value > 5.0)) {
    console.log(nota.value);
    console.log("Nota incorrecta");
  } else {
    console.log(nota.value);
    console.log("Nota correcta");
  }
}

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
  document.querySelector(
    "#mostrarNombre"
  ).textContent = `Nombre: ${nombre.value}`;
  document.querySelector(
    "#mostrarApellido"
  ).textContent = `Apellido: ${apellido.value}`;
  document.querySelector(
    "#mostrarDocumento"
  ).textContent = `Documento: ${documento.value}`;
  document.querySelector(
    "#mostrarCorreo"
  ).textContent = `Correo: ${correo.value}`;
  document.querySelector(
    "#mostrarNota1"
  ).textContent = `Nota 1: ${nota1.value}`;
  document.querySelector(
    "#mostrarNota2"
  ).textContent = `Nota 2: ${nota2.value}`;
  document.querySelector(
    "#mostrarNotaFinal"
  ).textContent = `Nota Final: ${CalcularNotaFinal()}`;
}

let validar;
let mensajeEmergente = document.querySelector("#mensaje-emergente");
let camposCorrectos;
//Funciones Anonimas-Flecha
const validarFormulario = (event) => {
  // event.preventDefault();
  mensajeEmergente.textContent = "";
  let nom, apel, doc, cor, n1, n2;
  switch (event.target.name) {
    case "nombre":
      ValidarExpresiones(event, expresionNombre, nombre);
      // console.log(nom);
      break;
    case "apellido":
      ValidarExpresiones(event, expresionApellido, apellido);
      break;
    case "documento":
      ValidarExpresiones(event, expresionDocumento, documento);
      break;
    case "correo":
      ValidarExpresiones(event, expresionCorreo, correo);
      break;
    case "nota1":
      ValidarExpresiones(event, expresionNota, nota1);
      validarNota(nota1);
      break;
    case "nota2":
      ValidarExpresiones(event, expresionNota, nota2);
      validarNota(nota2);

      break;
    default:
      break;
  }
  console.log(
    `Nombre: ${nom} Apellido: ${apel} Doc: ${doc} Corr: ${cor} Nota 1: ${n1}, Nota 2: ${n2}`
  );
  // camposCorrectos = ValidarCamposCorrectos(nom, apel, doc, cor, n1, n2);
};

function ValidarCamposCorrectos() {
  if (
    nom == true &&
    apel == true &&
    doc == true &&
    cor == true &&
    n1 == true &&
    n2 == true
  ) {
    return true;
  } else {
    return false;
  }
}

inputs.forEach((input) => {
  // console.log(input);
  input.addEventListener("keydown", validarFormulario);
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

btnCalcular.addEventListener("click", () => {
  if (ValidarCamposVacios() == false) {
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
