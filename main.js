/* CLASE CLIENTE */
// creamos el objeto cliente
class Cliente {
    constructor (nombre, apellido, sexo, edad, email, password,img) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.sexo = sexo,
        this.edad = edad,
        this.email = email,
        this.password = password,
        this.img = img
    }
}

//Definimos por defecto una lista de clientes en el arreglo listaClientes
let listaClientes = [];

function getLocalData() {
    const localData = localStorage.getItem('clientesKey');
    if (localData === null) {
    fetch('./personas.json')
        .then(response => response.json())
        .then(data => {
        data.forEach(cliente => {
          //Dentro el objeto json los pusheamos en el arreglo creando el objeto del mismo
            listaClientes.push(new Cliente(cliente.nombre, cliente.apellido, cliente.sexo, cliente.edad, cliente.email, cliente.password, cliente.img));
        });
        // Se busca en el localStorage el item clienteskey, de no existir se lo agrega, si ya existe no se hace nada
        localStorage.setItem('clientesKey', JSON.stringify(listaClientes));
        });
    } else {
        let localListaClientes = JSON.parse(localData)
        listaClientes = localListaClientes
    }
    console.table(listaClientes)
}

getLocalData();

function mostrarClientes() {
    let clientesContainer = document.getElementById("clientes-container")
    listaClientes.forEach(cliente => {
        let card = document.createElement('div')
        card.className = 'cardMain'

        let nombre = document.createElement('h4');
        nombre.textContent = cliente.nombre;

        let apellido = document.createElement('h4')
        apellido.textContent = cliente.apellido;

        let sexo = document.createElement('p')
        sexo.textContent = cliente.sexo;

        let edad = document.createElement('p')
        edad.textContent = cliente.edad;

        let email = document.createElement('p')
        email.textContent = cliente.email

        //Segun el sexo seleccinado se le asigna por defecto el tipo de imagen de perfil
        let imgProfile = document.createElement('img')
        if (cliente.sexo === 'masculino') {
            
            imgProfile.src = cliente.img = '../assets/img/profile-male.svg';
        } else {
            
            imgProfile.src = cliente.img = '../assets/img/profile-female.svg';
        }
        card.appendChild(imgProfile);
        card.appendChild(nombre);
        card.appendChild(apellido);
        card.appendChild(sexo)
        card.appendChild(edad)
        card.appendChild(email)
        clientesContainer.appendChild(card);
    })
}


const main = document.getElementById("table-container")
/* const mainList = document.getElementById("container-list") */

function filtrarClientes() {
    
    const buscadorCliente = document.getElementById("buscar-cliente")
    //obtenemos el valor del input del cliente a buscar
    let clienteBuscado = buscadorCliente.value.trim().toUpperCase()

    //Utilizamos la funcion de orden superior para filtrar el elemento cliente
    let clienteEncontrado = listaClientes.filter((cliente) => cliente.nombre.toUpperCase().includes(clienteBuscado))
    //Si encontramos algun cliente lo guardamos en la variable clienteEncontrado

    if (clienteBuscado === "") {
        //Elimina el contenido de la pantalla si habian resultaados anteriormente
        main.innerHTML = ''
        Swal.fire({
            title: 'No ingreso ningun nombre para buscar',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        })
    } else {
        //Si esta dentro del rango muestra la persona por consola
        if (clienteEncontrado.length > 0) {
            
            //limpiar el contenido previo
            main.innerHTML = ''
            
            clienteEncontrado.map(cliente => {
                //Segun el sexo cambio la foto del perfil
                if (cliente.sexo === 'masculino') {
                    cliente.img = '../assets/img/profile-male.svg'
                } else {
                    cliente.img = '../assets/img/profile-female.svg'
                }
                let cardFiltro = document.createElement("table")
                cardFiltro.className = "table"
                cardFiltro.innerHTML= `

                <table class="table align-middle mb-0 bg-white">
                    <thead class="bg-light">
                        <tr>
                        <th>Nombre</th>
                        <th>Edad/Sexo</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <div class="d-flex align-items-center">
                            <img
                                src="${cliente.img}"
                                alt="${cliente.nombre}"
                                style="width: 45px; height: 45px"
                                class="rounded-circle"
                                />
                            <div class="ms-3">
                                <p class="fw-bold mb-1">${cliente.nombre}</p>
                                <p class="text-muted mb-0">${cliente.apellido}</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${cliente.edad}</p>
                            <p class="text-muted mb-0">${cliente.sexo}</p>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${cliente.email}</p>
                            <p class="text-muted mb-0">${cliente.password}</p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                `
                main.appendChild(cardFiltro)
            })

            console.table(clienteEncontrado)
        } else {
            //Elimina el contenido de la pantalla si habian resultaados anteriormente
            main.innerHTML = ''
            Swal.fire({
                title: 'No se encontraron coincidencias',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: true, 
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar'
            });
            return;
            
        }
        
        
    }
    filtrarClientes.value = ''
}

let formulario = document.getElementById("formulario")
let email = document.getElementById("email-input")
let password = document.getElementById("password-input")
let nombre = document.getElementById("nombre-input")
let apellido = document.getElementById("apellido-input")
let edad = document.getElementById("edad-input")
let sexo = document.getElementById("sexo-input")
//Definimos una funcion para agregar una persona mas a la lista
function agregarCliente(e) {
    
    e.preventDefault()  
    //Obtenemos los valores de los inputs
    let emailIn = email.value.trim()
    let passwordIn = password.value.trim()
    let nombreIn = nombre.value.trim()
    let apellidoIn = apellido.value.trim()
    let edadIn = parseInt(edad.value)
    let sexoIn = sexo.value.trim()

    
    //Verificamos que los campos no esten vacios asi no se agrega nada vacio al localStorage
    if (nombreIn === "" ||  apellidoIn === "" ||  edadIn === "" ||  sexoIn === "" ||  emailIn === "" ||  passwordIn === ""){
        //Elimina el contenido de la pantalla si habian resultaados anteriormente
        /* main.innerHTML = '' */
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingresa valores válidos.",
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        });
        return
    }
    //Segun el sexo seleccinado se le asigna por defecto el tipo de imagen de perfil
    if (sexoIn === "masculino" || sexoIn === "MASCULINO" ) {
        img = '../assets/img/profile-male.svg'
    } else {
        img = '../assets/img/profile-female.svg'
    }
    
    let nuevoCliente = new Cliente(nombreIn, apellidoIn, sexoIn, edadIn, emailIn, passwordIn, img)
    //Verficamos que la persona no este ingresada anteriormente
    let resultado = listaClientes.some((cliente) => (cliente.nombre === nuevoCliente.nombre) && (cliente.apellido === nuevoCliente.apellido))
    if (resultado) {
        //creamos un elemento tipo parrafo con la clase evento-error mostrando un texto
        Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "El producto ya existe en la lista.",
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        })
        return
    } 
    //Creamos un objeto cliente y lo agregamos en el arreglo
    listaClientes.push(nuevoCliente)

    let clienteDiv = document.createElement("div")
    clienteDiv.className = "divCliente"
    clienteDiv.innerHTML = `
                    <h1> <img src="${nuevoCliente.img}" alt="Imagen ${nuevoCliente.nombre}"></h1>
                    <h1> ${nuevoCliente.nombre} ${nuevoCliente.apellido} </h1>
                    <p>Sexo: ${nuevoCliente.sexo} </p>
                    <p>Edad: ${nuevoCliente.edad} </p>`
    
    Swal.fire({
        icon: 'success',
        title: "Cliente Registrado",
        html: clienteDiv,
        timer: 3000
    })
    localStorage.setItem('clientesKey', JSON.stringify(listaClientes))
    console.table(listaClientes)
}
formulario.addEventListener("submit", (e) => agregarCliente(e))



function ordenarClientes() {
    //Ordenamos la lista por edad de menor a mayor
    listaClientes.sort((a,b) => a.edad - b.edad);

    //Obtenemos el DOM donde mostramos por pantalla el resultado
    let ordenarCliente = document.getElementById("ordenar-cliente")

    //Segun el sexo seleccinado se le asigna por defecto el tipo de imagen de perfil
    

    listaClientes.map((cliente) => {

        let imgProfile = document.createElement('img')
        if (cliente.sexo === 'masculino') {

            imgProfile.src = cliente.img = '../assets/img/profile-male.svg';
        } else {

            imgProfile.src = cliente.img = '../assets/img/profile-female.svg';
        }

        let tableFiltro = document.createElement("table")
        tableFiltro.className = "table"
        tableFiltro.innerHTML = `
                <table class="table align-middle mb-0 bg-white">
                    <thead class="bg-light">
                        <tr>
                        <th>Nombre</th>
                        <th>Edad/Sexo</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <div class="d-flex align-items-center">
                            <img
                                src="../${cliente.img}"
                                alt="${cliente.nombre}"
                                style="width: 45px; height: 45px"
                                class="rounded-circle"
                                />
                            <div class="ms-3">
                                <p class="fw-bold mb-1">${cliente.nombre}</p>
                                <p class="text-muted mb-0">${cliente.apellido}</p>
                            </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${cliente.edad}</p>
                            <p class="text-muted mb-0">${cliente.sexo}</p>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${cliente.email}</p>
                            <p class="text-muted mb-0">${cliente.password}</p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                `
            ordenarCliente.appendChild(tableFiltro)
    }).join("")

}
