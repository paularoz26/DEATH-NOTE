var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }


    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="160px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio"></span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}




/*cargar las imagenes */

let personajes=["images (A).jfif","images(B).jfif","images (C).jfif", "images (D).jfif","descarga (5).jfif"];

/*la opcion correcta */

let correcta=[1,2,1,2,2];

/*personajes que se mostrara */

let opciones=[];

/*cargar las opciones para mostrar cada jugada  */

opciones.push(["Quiere asesinar a L.", "Es Infantil, Ingenua e Impoulsiva.", "Le encanta las ropas de colores."]);
opciones.push(["Light trabaja en la TV.", "Revive a las personas.", "Si usa la Death NOTE, su nombre sera KIRA. "]);
opciones.push([" Es el mejor deportista escolar.", "Su mición es atrapar a KIRA.", "Sus ojeras se debe por jugar mucho a la compu."]);
opciones.push([" Prefieren durmiendo todo el tiempo.","Su caracter es muy malo y agresivo.", "Ama comer las manzanas."]);
opciones.push([" Le entregó este Death Note a Misa.", "Mira todos los humanos con desprecio.", "Está dispuesta a sacrificar su vida para defender a Misa."]);

/*se guardara la posicion actual  */

let posActual=0;
/*se guarda la cantidad correcta*/
let cantidadCorrecta=0;

function comienzaeljuego(){
posActual=0;
cantidadCorrecta=0;

/*activamos las pantallas necesarias */

document.getElementById("pantalla-inicial").style.display="none";
document.getElementById("pantalla-juego").style.display="block";
cargarPersonajes();
}

/*la funcion para cargar la siguiente foto del personaje y sus opciones */

function cargarPersonajes(){
if(personajes.length<=posActual){
terminarJuego();
}
else{
/*cargar las opciones y limpiamos ñas clases*/

limpiarOpciones();
document.getElementById("imgAnimex").src="" + personajes[posActual];
document.getElementById("n0").innerHTML=opciones[posActual][0];
document.getElementById("n1").innerHTML=opciones[posActual][1];
document.getElementById("n2").innerHTML=opciones[posActual][2];

}
}

function limpiarOpciones(){
document.getElementById("n0").className="nombre";
document.getElementById("n1").className="nombre";
document.getElementById("n2").className="nombre";


document.getElementById("l0").className="letra";
document.getElementById("l1").className="letra";
document.getElementById("l2").className="letra";


}


function comprobarRespuesta(opElegida){
if(opElegida==correcta[posActual]){
/*correcto. Agrefamos las clases para colocar el color "verde " */
document.getElementById("n" + opElegida).className="nombre nombreCorrecto";
document.getElementById("l" + opElegida).className="letra letraCorrecto";
cantidadCorrecta++;
}else {
/*Incorrecto. Agrefamos las clases para colocar el color "red" */
document.getElementById("n" + opElegida).className="nombre nombreIncorrecto";
document.getElementById("l" + opElegida).className="letra letraIncorrecto";

/*opcion que era correcta */
document.getElementById("n" + correcta[posActual]).className="nombre nombreCorrecto";
document.getElementById("l" + correcta[posActual]).className="letra letraCorrecto";
}
posActual++;

/*esperamos un segundo y se muestra el siguente personaje y opciones */

setTimeout(cargarPersonajes,1000);

}

function terminarJuego(){
     //ocultamos las pantallas y mostramos la pantalla final
     document.getElementById("pantalla-juego").style.display = "none";
     document.getElementById("pantalla-final").style.display = "block";
     //agreamos los resultados
     document.getElementById("numCorrecto").innerHTML = cantidadCorrecta;
     document.getElementById("numIncorrecto").innerHTML = personajes.length - cantidadCorrecta;
 }
   
 function volverAJugar(){
    //ocultamos las pantallas y activamos la inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
}










