//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Como comienza la historia de DEATH NOTE?",
        op0:"Un estudiante de secundaria llamado Lawliet,se encuentra un misterioso cuaderno de notas,que pertenece a un Dios de la Muerte. ",
        op1:"Un estudiante de secundaria llamado Light,se encuentra un misterioso cuaderno de notas,que pertenece a un Dios de la Muerte.",
        op2:"Una estudiante de secundaria llamado Misa,se encuentra un misterioso cuaderno de notas,que pertenece a un Dios de la Muerte.",
        correcta:"Un estudiante de secundaria llamado Near,se encuentra un misterioso cuaderno de notas,que pertenece a un Dios de la Muerte."
    },
    {
        id:1,
        pregunta:"¿Como se llama el Demonio y cuales son las reglas de DEATH NOTE?",
        op0:"Sus regles son: 1) el nombre que escriba, morira. 2)Tener el rostro de la persona en su mente al escribir su nombre. 3)Si no se especifica, la persona morira de un ataque al corazon.Se llama Ryuk.",
        op1:"Sus regles son: 1) el nombre que escriba, tendra poderes. 2)Tener el rostro de la persona en su mente al escribir su nombre. 3)Si no se especifica, la persona morira de un ataque al corazon.Se llama Ryuk.",
        op2:"Sus regles son: 1) el nombre que escriba, morira. 2)Tener el rostro de la persona en su mente al escribir su nombre. 3)Si no se especifica, la persona le saldra alas.Se llama Ryuk.",
        correcta:"Sus regles son: 1) el nombre que escriba, morira. 2)Tener el rostro de la persona en su mente al escribir su nombre. 3)Si no es especificada, la persona morira de un ataque al corazon.Se llama Rem."
    },
    {
        id:2,
        pregunta:"¿Que siente EL ESTUDIANTE al tener DEATH NOTE?",
        op0:"Se sentirá con el poder de dibujar a los delincuentes irredentos con el fin de crear un nuevo mundo, más puro, en el que el crimen no tenga lugar. ",
        op1:"Se sentirá con el poder de acabar con delincuentes irredentos con el fin de crear un nuevo mundo, más puro, en el que el crimen no tenga lugar. ",
        op2:"se sentirá con el poder de acabar con delincuentes irredentos con el fin de crear un nuevo mundo con unicornios y poderes magicos, más puro, en el que el crimen no tenga lugar. ",
        correcta:"se sentirá con el poder de acabar con delincuentes irredentos con el fin de crear un nuevo mundo, más puro, en el que las personas buenas no tenga lugar. "
    },
    {
        id:3,
        pregunta:"¿Quien tiene la Mision de encontrar al estudiante?",
        op0:"La tarea de desenmascararlo recaerá en Misa, un misterioso investigador cuya capacidad intelectual le permite anticiparse a sus pasos.",
        op1:"La tarea de desenmascararlo recaerá en L, un misterioso investigador cuya capacidad intelectual le permite anticiparse a sus pasos.",
        op2:" La tarea de desenmascararlo recaerá en Soichiro, un misterioso investigador cuya capacidad intelectual le permite anticiparse a sus pasos.",
        correcta:"La tarea de desenmascararlo recaerá en Near, un misterioso investigador cuya capacidad intelectual le permite anticiparse a sus pasos."
    },
    {
        id:4,
        pregunta:"¿Quien aparece entre  Light y L?",
        op0:"Aparecerá en su vida una joven llamada Misa portadora de un nuevo cuaderno que cambiará sus planes por completo.",
        op1:"Aparecerá en su vida una joven llamada kiyomi portadora de un nuevo cuaderno que cambiará sus planes por completo.",
        op2:"Aparecerá en su vida una joven llamada Sayu portadora de un nuevo cuaderno que cambiará sus planes por completo.",
        correcta:"Aparecerá en su vida una joven llamada Halle portadora de un nuevo cuaderno que cambiará sus planes por completo."
    },
    {
        id:5,
        pregunta:"¿Cuál es el río más largo del mundo?",
        op0:"Nilo",
        op1:"Amazonas",
        op2:"Eufrates",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"¿Cuál es la capital de la India?",
        op0:"Chennai",
        op1:"Bombay",
        op2:"Nueva Delhi",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"¿Qué continente se encuentra en los 4 hemisferios?",
        op0:"Africa",
        op1:"Europa",
        op2:"Ninguno",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"¿Cuál es la capital de Egipto?",
        op0:"Alejandría",
        op1:"El Cairo",
        op2:"Menfis",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"¿Dónde se encuentra el estrecho de Magallanes?",
        op0:"Parte sur de america del Norte",
        op1:"En Europa",
        op2:"Parte su de Sudamérica",
        correcta:"2"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}