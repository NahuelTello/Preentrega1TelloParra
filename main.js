
// creamos la funcion de objeto persona
class Persona { 
    constructor (nombre, apellido, sexo, edad){
        this.nombre = nombre,
        this.apellido = apellido,
        this.sexo = sexo,
        this.edad = edad 
        }
    }
//llamamos al constructor del objeto persona
let persona1 = new Persona("Juan", "Tortorielo", "M", 22)
let persona2 = new Persona("Maria", "De la Fuente", "F", 21)
let persona3 = new Persona("Pedro", "Miranda", "F", 19)
let persona4 = new Persona("Jorge", "Rodriguez", "M", 40)

// Creamos un arreglo que almacena objetos de personas
let arrayPersonas = [persona1, persona2, persona3, persona4]
// Mostramos por consola en forma de tabla  la lista de las personas
console.table(arrayPersonas)

//Definimos una funcion que pide el nombre de la persona para saber si se encuentra
function buscarPeronsa() {
    let nombrePersona = prompt("Ingresar el nombre de la persona que busca").trim().toUpperCase()

    //Utilizamos la funcion de orden superior para filtrar el elemento persona
    let personaEncontrada = arrayPersonas.filter((persona)=> persona.nombre.toUpperCase().includes(nombrePersona))

    //Si esta dentro del rango muestra la persona por consola
    if(personaEncontrada.length > 0){
        console.table(personaEncontrada)
    } else{
        //En caso contrario no se pudo encontrar
        console.log("No se pudo encontrar a la persona intente nuevamente")
    }
}

//Definimos una funcion para agregar una persona mas a la lista
function agregarPersona() {
    //Pedimos que ingrese los datos
    let nombre = prompt("Ingrese el nombre").trim()
    let apellido = prompt("Ingrese el apellido").trim()
    let sexo = prompt("Ingrese el sexo").trim()
    let edad = parseInt(prompt("Ingrese la edad"))

    //Verificamos que los datos sean los correctos, en  caso contrario no
    if (nombre === "" || apellido === "" || sexo === "" || isNaN(edad)) {
        alert("Datos erróneos, intentar nuevamente!")
        return;
    }

    //Llamamos al constructor Persona para crear a la nueva persona
    let personaNueva = new Persona (nombre, apellido, sexo, edad)

    //Verficamos que la persona no este ingresada anteriormente
    if(arrayPersonas.some((persona)=> persona.nombre === personaNueva.nombre)){
        alert("La persona ya esta ingresada! ")
        return
    }

    //Lo agregamos al arreglo y mostramos por consola
    arrayPersonas.push(personaNueva)
    console.table(arrayPersonas)
}

// Definimos una función que recibe el arreglo de personas, el índice de la persona que queremos modificar y el nuevo nombre
function modificarNombrePersona(arreglo, indice, nuevoNombre) {
    // Verificamos si el índice está dentro del rango del arreglo
    if (indice >= 0 && indice < arreglo.length) {
        // Modificamos el nombre de la persona en el objeto correspondiente
        arreglo[indice].nombre = nuevoNombre;
        alert('Nombre Modificado!');
    } else {
        // Si el índice está fuera de rango, mostramos un mensaje de error
        alert('El índice especificado está fuera de rango.');
    }
}

let opcion = prompt('Ingrese una opcion. \n1) Buscar Cliente. \n2) Agregar Cliente. \n3) Modificar Cliente \n Salir (X) ')
while (opcion != 'x' && opcion != 'X') {
    {
        if (parseInt(opcion) == 1) {
            buscarPeronsa()
        } else if (parseInt(opcion) == 2) {
            agregarPersona()
        } else if (parseInt(opcion) == 3) {
            alert('Recorda que la longitud de la lista es de: ' + arrayPersonas.length)
            let indicePersonaModificar = prompt('Ingrese en que ubicacion se encuentra esa persona dentro de la tabla')
            let nombrePersonaModificar = prompt ('Ingrese el nuevo nombre de la persona que quiere modificar')
            modificarNombrePersona(arrayPersonas,indicePersonaModificar, nombrePersonaModificar)
            console.table(arrayPersonas)
        } else {
            alert('Elegiste una opción inválida')
        };
    }

    opcion = prompt('Ingrese una opcion. \n1) Buscar Cliente. \n2) Agregar Cliente. \n3) Modificar Cliente \n Salir (X) ')
}















