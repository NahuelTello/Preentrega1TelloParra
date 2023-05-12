/* Quiero armar una pagina donde me muestre una lista de clientes
donde pueda buscar por su nombre (filtro), tambien pueda agregar y
modificar el nombre */


/* DOM */
const formulario = document.getElementById("formulario")
const nombre = document.getElementById("nombre-input")
const apellido = document.getElementById("apellido-input")
const edad = document.getElementById("edad-input")
const sexo = document.getElementById("sexo-input")



const main = document.getElementById("contenedor")

const boton = document.getElementById("boton-mostrar")

/* DOM */



/* CLASE CLIENTE */
// creamos el objeto cliente
class Cliente {
    constructor (nombre, apellido, sexo, edad) {
            this.nombre = nombre,
            this.apellido = apellido,
            this.sexo = sexo,
            this.edad = edad
    }
}

let cliente1 = new Cliente("Juan","Pérez","masculino",30)
let cliente2 = new Cliente("Maria","Gomez","femenino",25)
let cliente3 = new Cliente("Carlos","Hernandez","masculino",45)
let cliente4 = new Cliente("Josefina", "Hernandez", "femenino", 15)
let cliente5 = new Cliente("Matias", "Martinez", "masculino", 35)


//Definimos por defecto una lista de clientes en el arreglo listaClientes
const listaClientes = [cliente1, cliente2, cliente3, cliente4, cliente5];
/* CLASE CLIENTE */


/* FUNCIONES */
//Definimos una funcion para agregar una persona mas a la lista
function agregarCliente(e) {
    
    e.preventDefault()
    let nombreInput = nombre.value
    let apellidoInput = apellido.value
    let sexoInput = sexo.value
    let edadInput = parseInt(edad.value)

    if (nombreInput === "" || apellidoInput === "" || sexoInput === "" || isNaN(edadInput)){
        let alert = document.createElement("p")
        alert.className = "evento-error"
        alert.innerHTML = `<p>Datos erróneos, intentar nuevamente!</p>`
        main.append(alert)
        return
    }

    let nuevoCliente = new Cliente(nombreInput, apellidoInput, sexoInput, edadInput)

    
    //Verficamos que la persona no este ingresada anteriormente
    let resultado = listaClientes.some((cliente) => (cliente.nombre === nuevoCliente.nombre) && (cliente.apellido === nuevoCliente.apellido))
    if (resultado) {
        //creamos un elemento tipo parrafo con la clase evento-error mostrando un texto
        eventError = document.createElement("p")
        eventError.className = "evento-error"
        eventError.innerHTML = `<p>El cliente ya esta ingresado!</p>`
        main.appendChild(eventError)
        return
    }

    listaClientes.push(nuevoCliente)
    console.log(listaClientes)
    
    let clienteDiv = document.createElement("div")
    clienteDiv.className = "clienteDiv"
    clienteDiv.innerHTML = `<h1> ${nuevoCliente.nombre} </h1>
                    <h3> ${nuevoCliente.apellido} </h3>
                    <p> ${nuevoCliente.sexo} </p>
                    <p> ${nuevoCliente.edad} </p>`
    main.appendChild(clienteDiv)
    
    localStorage.setItem('listaClientesKey', JSON.stringify(listaClientes))
}

//Definimos una funcion para mostrar la lista de los clientes actuales
function mostrarClientes() {

    // Obtener el arreglo de clientes almacenado en el localStorage
    let clientesArray = (JSON.parse(localStorage.getItem('listaClientesKey')) || [])

    //limpiar el contenido previo
    main.innerHTML = ''

    //Si hay clientes agregados muestra los mismos
    if (clientesArray.length > 0){
        // Recorrer el arreglo de clientes y agregar cada uno al DOM
        
        clientesArray.map(cliente => {
            let li = document.createElement("table");
            li.className = "divCliente"
            li.innerHTML = `<tr><td>${cliente.nombre}</td><td>${cliente.apellido}</td><td>${cliente.sexo}</td><td>${cliente.edad}</td></tr>` 
            main.appendChild(li);
        })
    } else {
        //En caso contrario no muestra nada, y nos indica un cartel que no hay clientes cargados
        let mostrarNoHayClientes = document.createElement("div");
        mostrarNoHayClientes.className = "evento-error"
        mostrarNoHayClientes.innerHTML = "No hay clientes cargados!"
        main.append(mostrarNoHayClientes)
    }

    console.table(clientesArray)

}
//Definimos una funcion que pide el nombre de la persona para saber si se encuentra
function buscarCliente() {
    const buscadorCliente = document.getElementById("buscar-cliente")
    //obtenemos el valor del input del cliente a buscar
    let clienteBuscado = buscadorCliente.value.trim().toUpperCase()

    //Utilizamos la funcion de orden superior para filtrar el elemento cliente
    let clienteEncontrado = listaClientes.filter((cliente) => cliente.nombre.toUpperCase().includes(clienteBuscado))
    //Si encontramos algun cliente lo guardamos en la variable clienteEncontrado

    if (clienteBuscado === ""){
        //creamos un elemento tipo parrafo con la clase evento-error mostrando un texto
        let eventError = document.createElement("p")
        eventError.className = "evento-error"
        eventError.innerHTML = `<p>NO INGRESO NINGUN NOMBRE PARA BUSCAR EL CLIENTE!</p>`
        main.appendChild(eventError)
    } else {
        //Si esta dentro del rango muestra la persona por consola
        if (clienteEncontrado.length > 0) {

            clienteEncontrado.map(cliente => {
                let mostrarCliente = document.createElement("div");
                mostrarCliente.className = "divCliente"
                mostrarCliente.innerHTML = `<h1> ${cliente.nombre} </h1>
                    <h3> ${cliente.apellido} </h3>
                    <p> ${cliente.sexo} </p>
                    <p> ${cliente.edad} </p>`
                main.appendChild(mostrarCliente);
            })
            
            console.table(clienteEncontrado)
        } else {
            //En caso contrario no se pudo encontrar
            let eventError = document.createElement("p")
            //creamos un elemento tipo parrafo con la clase evento-error mostrando un texto
            eventError.className = "evento-error"
            eventError.innerHTML = `<p>No se pudo encontrar ninguna persona con ese nombre</p>`
            main.append(eventError)
        } 
    }
    buscarCliente.value = ''
}

/* EVENTOS */
//Envia los datos cargados del formulario
formulario.addEventListener("submit", (e) => agregarCliente(e))
/* EVENTOS */

/* FUNCIONES */