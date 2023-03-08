function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6UpgtxljaAu":
        Script1();
        break;
      case "6T4cd0gHPfd":
        Script2();
        break;
      case "6qzZnklbYzJ":
        Script3();
        break;
      case "6ItbQSxZSIO":
        Script4();
        break;
  }
}

function Script1()
{
  // INSTRUCCIÓN PARA DESACTIVAR EL REFRESCO DE PANTALLA AL TERMINAR O REINICIAR LA ACTIVIDAD
if(intervalJoinActividad){
    clearInterval(intervalJoinActividad);
}
}

function Script2()
{
  // INSTRUCCIÓN PARA DESACTIVAR EL REFRESCO DE PANTALLA AL TERMINAR O REINICIAR LA ACTIVIDAD
if(intervalJoinActividad){
    clearInterval(intervalJoinActividad);
}
}

function Script3()
{
  /*------------------------------------------------------------
    Código para CREAR LÍNEAS al inicio de la actividad
    y tambien para MOVER EL PUNTO FINAL (B) de cada línea.
    Sintaxis:
    - Texto de accesibilidad PUNTO A : itemA1
    - Texto de accesibilidad PUNTO B : itemB1
------------------------------------------------------------*/

// VARIABLES
let join_widthItemA = 28; // Ancho del punto Inicio (A)
let join_widthItemB = 120; // Ancho del punto Final (B)
let join_colorLine = "#294E9E"; // Color de la línea
let join_strokeLine = 12; // Grosor de la línea

// OBTENER CANTIDAD DE LÍNEAS (AMOUNT) DESDE ARTICULATE
let join_player = GetPlayer();
let join_amount = join_player.GetVar("join_amount");

// OBTENER LA ZONA DE LA ACTIVIDAD
let join_activityZone= document.querySelector("[data-acc-text='activityZone']"); // Obtener elemento HTML
join_activityZone.removeAttribute("data-acc-text"); // Eliminar texto de accesibilidad

// OBTENER POSICIÓN DE LOS PUNTOS DE INICIO (A)
let join_arrayPossA = new Array(join_amount);
for (let index = 1; index <= join_amount; index++) {
    let tmp_itemA = document.querySelector("[data-acc-text='itemA"+index+"']"); // Obtener elemento HTML del punto (A)
    tmp_itemA.removeAttribute("data-acc-text"); // Eliminar texto de accesibilidad del punto (A)
    let tmp_rectItemA = tmp_itemA.getBoundingClientRect(); // Obtener data del envoltorio del punto (A)
    let tmp_rectActivityZone = join_activityZone.getBoundingClientRect();  // Obtener data del envoltorio Zona de la Actividad
    let tmpPossX = tmp_rectItemA.left - tmp_rectActivityZone.left; // Obtener posición Horizontal Absoluta del punto (A)
    let tmpPossY = tmp_rectItemA.top - tmp_rectActivityZone.top; // Obtener posición Vertical Absoluta del punto (A)
    join_arrayPossA[index] = {
        x : ((1080*tmpPossX/tmp_rectActivityZone.width)+(join_widthItemA/2)), // Almacenar posición Horizontal Relativa del punto (A)
        y : ((1920*tmpPossY/tmp_rectActivityZone.height)+(join_widthItemA/2)), // Almacenar posición Vertical Relativa del punto (A)
    }
}

// OBTENER PUNTOS FINALES (B) Y PREPARACIÓN PARA SACAR SU POSICIÓN
let join_arrayPossB = new Array(join_amount);
let join_itemB = new Array();
for (let index = 1; index <= join_amount; index++) {
    join_itemB[index] = document.querySelector("[data-acc-text='itemB"+index+"']"); // Obtener elemento HTML del punto (B)
    join_itemB[index].removeAttribute("data-acc-text"); // Eliminar texto de accesibilidad del punto (B)
}

// FUNCIÓN OBTENER POSICIÓN DE LOS PUNTOS FINALES (B)
function join_actionPossB(){
    for (let index = 1; index <= join_amount; index++) {
        let tmp_rectItemB = join_itemB[index].getBoundingClientRect(); // Obtener data del envoltorio del punto (B)
        let tmp_rectActivityZone = join_activityZone.getBoundingClientRect(); // Obtener data del envoltorio Zona de la Actividad
        let tmpPossX = tmp_rectItemB.left - tmp_rectActivityZone.left; // Obtener posición Horizontal Absoluta del punto (B)
        let tmpPossY = tmp_rectItemB.top - tmp_rectActivityZone.top; // Obtener posición Vertical Absoluta del punto (B)
        join_arrayPossB[index] = {
            x : ((1080*tmpPossX/tmp_rectActivityZone.width)+(join_widthItemB/2)), // Almacenar posición Horizontal Relativa del punto (B)
            y : ((1920*tmpPossY/tmp_rectActivityZone.height)+(join_widthItemB/2)), // Almacenar posición Vertical Relativa del punto (B)
        }
    }
}

// OBTENER POSICIÓN DE LOS PUNTOS FINALES (B) AL COMENZAR
join_actionPossB();

// CREAR CANTIDAD DE LÍNEAS CON LAS POSICIONES DE INICIO (A) Y FINAL (B)
for (let index = 1; index <= join_amount; index++) {
    let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('id','lineItem'+index);
    newLine.setAttribute('x1',join_arrayPossA[index].x);
    newLine.setAttribute('y1',join_arrayPossA[index].y);
    newLine.setAttribute('x2',join_arrayPossB[index].x);
    newLine.setAttribute('y2',join_arrayPossB[index].y);
    newLine.setAttribute("stroke", join_colorLine);
    newLine.setAttribute("stroke-width", join_strokeLine);
    join_activityZone.getElementsByTagName("svg")[0].appendChild(newLine);
}

// FUNCIÓN MOVER PUNTO FINAL (B) DE LAS LÍNEAS
function join_moveLine(){
    join_actionPossB();
    for (let index = 1; index <= join_amount; index++) {
        let tmp_lineMove = document.getElementById("lineItem"+index);
        tmp_lineMove.setAttribute("x2",join_arrayPossB[index].x);
        tmp_lineMove.setAttribute("y2",join_arrayPossB[index].y)
    }
}

// REFRESCO DE PANTALLA
globalThis.intervalJoinActividad = setInterval(join_moveLine, 10);
}

function Script4()
{
  let st_player=GetPlayer();
let st_totalSlides=st_player.GetVar("st_totalSlides");
let st_currentSlide=st_player.GetVar("st_currentSlide");
let st_colorBarVisited=document.querySelector("[data-acc-text='st_barMasterV'] svg path").getAttribute("fill");
let st_colorBarCurrent=document.querySelector("[data-acc-text='st_barMasterC'] svg path").getAttribute("fill");
let st_colorBarUnvisited=document.querySelector("[data-acc-text='st_barMasterU'] svg path").getAttribute("fill");
let st_numberSpaces=st_totalSlides-1;
let st_sizeSpacingBar=12;
let st_sizeBarSingle=(880-(st_numberSpaces*st_sizeSpacingBar))/st_totalSlides;
let st_objBarMasterFull=document.querySelector("[data-acc-text='st_barMasterFull']");
st_objBarMasterFull.removeAttribute("data-acc-text");
let st_tmpPositionX=0;
const SVG_NS="http://www.w3.org/2000/svg";
function st_drawSVG(st_drawSVGobj){
    let st_drawSVGnew=document.createElementNS(SVG_NS,"rect");
    for(var st_drawSVGobjAttribute in st_drawSVGobj){
        if(st_drawSVGobj.hasOwnProperty(st_drawSVGobjAttribute)){
            st_drawSVGnew.setAttributeNS(null,st_drawSVGobjAttribute,st_drawSVGobj[st_drawSVGobjAttribute]);
        }
    }
    st_objBarMasterFull.getElementsByTagName("svg")[0].appendChild(st_drawSVGnew);
}
function st_CloneBar(st_CloneBarNum,st_CloneBarColor){
    for(let index=0;index<st_CloneBarNum;index++){
        let st_objBar={x:st_tmpPositionX,y:0,rx:12,ry:12,width:st_sizeBarSingle,height:24,stroke:null,fill:st_CloneBarColor};
        st_drawSVG(st_objBar);
        st_tmpPositionX=st_tmpPositionX+st_sizeBarSingle+st_sizeSpacingBar;
    }
}
st_CloneBar(st_currentSlide-1,st_colorBarVisited);
st_CloneBar(1,st_colorBarCurrent);
st_CloneBar(st_totalSlides-st_currentSlide,st_colorBarUnvisited);
}

