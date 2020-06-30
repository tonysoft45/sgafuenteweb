// ----------------------------------------------------------------------------------
// packinglist.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 21/03/2020
// ----------------------------------------------------------------------------------

function fn_Listado_Clic(l_CondicionExtra){
    // -----------
    var formulariop = document.getElementById("frm_Consultar");
    var l_Consulta="";     
    var i=0;

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){
        if(formulariop.elements[i].name.indexOf("Consulta") != -1){
            l_Consulta=formulariop.elements[i].value;         
        }     
    } 

    if(l_CondicionExtra.length<=0){
        l_CondicionExtra="Estatus='CERRADA' or Estatus='INSPECCION' and bEstado=0";
    }

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    /*
    if(l_Consulta.length>0){
        l_Consulta="Folio=" + l_Consulta;
    } else {
        l_Consulta="";
    }
    */
     
    ULTIMA_CONSULTA=l_Consulta;
    ULTIMA_CONDICION=l_CondicionExtra;

    console.log("CAMPO ORDENAMIENTO:"+ CAMPO_ORDENAMIENTO);
    console.log("FORMA ORDENAMIENTO:"+ FORMA_ORDENAMIENTO);
    console.log("ULTIMA CONSULTA:"+ ULTIMA_CONSULTA);
    console.log("ULTIMA CONDICION:"+ ULTIMA_CONDICION);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":l_Consulta,"condicion":l_CondicionExtra,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS, "modulo":MODULO } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


function fn_Listado_Ordenar_Clic(l_CampoOrdenamiento){   
    var l_Consulta=ULTIMA_CONSULTA; 
    var l_CondicionExtra=ULTIMA_CONDICION; 
    var i=0;
 
    if(FORMA_ORDENAMIENTO=="Descendente"){
        FORMA_ORDENAMIENTO="Ascendente"; 
    } else {
        FORMA_ORDENAMIENTO="Descendente";
    }

    CAMPO_ORDENAMIENTO=l_CampoOrdenamiento;
    
    console.log("CAMPO ORDENAMIENTO:"+ CAMPO_ORDENAMIENTO);
    console.log("FORMA ORDENAMIENTO:"+ FORMA_ORDENAMIENTO);
    console.log("ULTIMA CONSULTA:"+ ULTIMA_CONSULTA);
    console.log("ULTIMA CONDICION:"+ ULTIMA_CONDICION);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":l_Consulta,"condicion":l_CondicionExtra,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS, "modulo":MODULO } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


function fn_Recibo_Clic(){   
    var l_nID = document.getElementById("txt_nID").value;

    // Verificaciones
    if(l_nID<=0){
        console.log("ERROR NO TIENE CONSULTA");
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ID";
        $("#modal_falla").modal("show");
        return;
    } 

     // Limpia la información
     l_Consulta="nIDPackingList=" + l_nID;
    
     // Procesar
     var arreglo=new Array();
     arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION, "nidpackinglist":l_nID } );     
  
     if(arreglo.length>0){       
         // Enviar para procesdar
         resultado=ValidarParaRecibir(arreglo); 
     } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");
     }

    
}


function fn_Consultar_Clic(l_Consulta){     
   // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Consultar(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


function Cerrar_Clic(){
    window.open(MODULO +".php","_self")
}

function Cerrar_Inspeccion_Clic(){
    window.open("menu.php","_self")
}

function fn_Grabar_Inspeccion_Clic() {
    var nID = document.getElementById("cb_nIDPackinglist").value;
   
    if(listadodeproductos.length>0 && listadodeproductos_serie.length>0){

        if(nID>0){
            resultado=Grabar_Inspeccion();   
        } else {
            document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE UN PACKINGLIST SELECCIONADO";       
            $("#modal_falla").modal("show");
        }
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="PACKINGLIST SIN DETALLES PARA GRABAR";       
        $("#modal_falla").modal("show");

    }
}

function fn_Finalizar_Inspeccion_Clic() {
    var nID = document.getElementById("cb_nIDPackinglist").value;
   
    if(nID>0){
        var arreglo=new Array();
        arreglo.push( { "nid":nID} );     
     
        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Finalizar_Inspeccion(arreglo); 

        } else {
            document.getElementById("lbl_mensaje_falla").innerHTML="FALLA AL MOMENTO DE FINALIZAR";       
            $("#modal_falla").modal("show");
        }
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="FALLA AL MOMENTO DE FINALIZAR";       
        $("#modal_falla").modal("show");
    } 
}