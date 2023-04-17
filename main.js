
//funcion
/* function login(pin) {

    let access = false;

    for (let i = 2; i >= 0; i--) {
        //Si la longitud del pin es mayor o igual a 8 ingresa al sistema
        if (pin.length >= 8) {
            alert('Ingreso exitoso. Bienvenido/a');
            access = true;
            break;
        } else {
            alert('Error. Te quedan ' + i + ' intentos.')
        }
    }

    return access
}  */

/* Funcion que suma dos numeros enteros */
/* function suma (a,b){
    let resultado = a + b
    return resultado
} */
/* Funcion que resta dos numeros enteros */
/* function resta(a, b) {
    let resultado = a - b
    return resultado
} */





//Funcion que pasa de Celcius a Fahrenheit
/* function C_A_F(tempCelc) {
    // Para calcular cuántos grados Fahrenheit son X grados Celsius, tenemos que multiplicar los X grados Celsius por 1,8 y sumarle 32.
    let tempFahrenheit = suma((tempCelc * 9/5) , 32)
   */ /*  return tempFahrenheit */
/* } */
//Funcion que pasa de Fahrenheit a Celcius
/* function F_A_C(tempFah) {
    let tempCelcius = resta(tempFah,32) * 5/9
    return tempCelcius
} */

/* let userName = prompt("Ingrese una contraseña mayor de 8 caracteres")
if(login(userName)){
    let opcion = prompt('Ingrese una opcion. \n1) Pasar de Celcius a Fahrenheit. \n2) Pasar de Fahrenheit a Celsius. \n3) Verificar cual es la temperatura mayor \n Salir (X) ')
    while (opcion != 'x' && opcion != 'X') {
        {
            if (parseInt(opcion) == 1) {
                let tempC = prompt('Ingresar la temperatura en grados °C.')
                let tempRes = C_A_F(tempC)
                alert("La temperatura °C" + tempC + " equivale a " + tempRes +"°F")
            } else if (parseInt(opcion) == 2) {
                let tempF = prompt('Ingresar la temperatura en grados °F.')
                let tempRes = F_A_C(tempF)
                alert("La temperatura F°" + tempF + " equivale a " + tempRes +"C°")
            } else if (parseInt(opcion) == 3) {
                let seguir = prompt("Quisieras intentar? (si) - (no)")
                
                
                while (seguir != "no") {
                    let temp1 = prompt("Ingrese la primer temperatura (en este formato '12°C')")
                    let temp2 = prompt("Ingrese la segunda temperatura (en este formato '12°C')")
                    if (temp1.slice(-2) === temp2.slice(-2)) {
                        // AMBAS TEMPERATURAS TIENEN QUE SER DE LA MISMA UNIDAD
                        const valor1 = parseFloat(temp1)
                        const valor2 = parseFloat(temp2)

                        if (valor1 > valor2) {
                            alert("La primera temperatura es mayor")
                        } else if (valor1 < valor2) {
                            alert("La segunda temperatura es mayor")
                        } else {
                            alert("Ambas son iguales")
                        }
                    } else {
                        alert("Las temperaturas no están en la misma unidad")
                    }
                    seguir = prompt("Quisieras intentar nuevamente? (si) - (no)")
                }
                
            } else {
                alert('Elegiste una opción inválida')
            };
        }

        opcion = prompt('Ingrese una opcion. \n1) Pasar de Celcius a Fahrenheit. \n2) Pasar de Fahrenheit a Celsius. \n Salir (X) ')
    }
}   

alert('Adiós');
 */



/* ----------------------------------------------------------------- */

const Persona = function (nombre, apellido, sexo, edad){
    this.nombre = nombre,
    this.apellido = apellido,
    this.sexo = sexo,
    this.edad = edad
}   

let persona1 = new Persona("Nahuel", "Tello", "Masculino", 22)
let persona2 = new Persona("Agustina", "Tello", "Femenino", 21)
let persona3 = new Persona("Abril", "Tello", "Femenino", 19)
let persona4 = new Persona("Jorge", "Rodriguez", "Masculino", 40)

let arrayPersonas = [persona1, persona2, persona3, persona4]

console.table(arrayPersonas)

function buscarPeronsa() {
    let nombrePersona = prompt("Ingresar el nombre de la persona que busca").trim().toUpperCase()
    let personaEncontrada = arrayPersonas.filter((persona)=> persona.nombre.toUpperCase().includes(nombrePersona))

    if(personaEncontrada.length > 0){
        console.table(personaEncontrada)
    } else{
        console.log("No se pudo encontrar a la persona intente nuevamente")
    }
}

function agregarPersona() {
    let nombre = prompt("Ingrese el nombre").trim()
    let apellido = prompt("Ingrese el apellido").trim()
    let sexo = prompt("Ingrese el sexo").trim()
    let edad = parseInt(prompt("Ingrese la edad"))

    if (nombre === "" || apellido === "" || sexo === "" || isNaN(edad)) {
        alert("Datos erróneos, intentar nuevamente!")
        return;
    }

    let personaNueva = new Persona (nombre, apellido, sexo, edad)

    if(arrayPersonas.some((persona)=> persona.nombre === personaNueva.nombre)){
        alert("La persona ya esta ingresada! ")
        return
    }

    arrayPersonas.push(personaNueva)
    console.table(arrayPersonas)
}


function quitarPersona(){
    let nombre = prompt("Ingrese el nombre").trim()
    let apellido = prompt("Ingrese el apellido").trim()
    let sexo = prompt("Ingrese el sexo").trim()
    let edad = parseInt(prompt("Ingrese la edad"))

    if (nombre === "" || apellido === "" || sexo === "" || isNaN(edad)) {
        alert("Datos erróneos, intentar nuevamente!")
        return;
    }

    let personaAeliminar = new Persona(nombre, apellido, sexo, edad)
    if (arrayPersonas.some((persona)=> persona.nombre === personaAeliminar.nombre)) {
        alert("Esta persona no existe en nuestra lista!")
    }

    arrayPersonas.splice(nombre)
    console.table(arrayPersonas)

}

let opcion = prompt('Ingrese una opcion. \n1) Buscar Cliente. \n2) Agregar Cliente. \n3) Eliminar Cliente \n Salir (X) ')
while (opcion != 'x' && opcion != 'X') {
    {
        if (parseInt(opcion) == 1) {
            buscarPeronsa()
        } else if (parseInt(opcion) == 2) {
            agregarPersona()
        } else if (parseInt(opcion) == 3) {
            quitarPersona()
        } else {
            alert('Elegiste una opción inválida')
        };
    }

    opcion = prompt('Ingrese una opcion. \n1) Buscar Cliente. \n2) Agregar Cliente. \n3) Eliminar Cliente \n Salir (X) ')
}















