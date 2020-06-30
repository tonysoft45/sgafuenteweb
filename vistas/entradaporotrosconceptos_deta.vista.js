// ----------------------------------------------------------------------------------
// entradaporotrosconceptos_deta.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 15/04/2020
// ----------------------------------------------------------------------------------

var listadodeproductos=new Array();


function fn_Consultar_Detalles_Clic(l_Consulta){     
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
        resultado=Listado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Buscar_Codigo_Clic(){
    Anexar_Codigo()
 
}

function fn_Anexar_Codigo_CLick(e){
    if (e.keyCode == 13) {
        Anexar_Codigo()
    }
}


function Anexar_Codigo(){
    var Codigo = document.getElementById("txt_Etiqueta").value;
    var nID = document.getElementById("txt_nIDEntradaPorOtrosConceptos").value;
    var nIDUsuario = document.getElementById("txt_nIDUsuario").value;

    if(Codigo.length>0){
        if(nID>0){
            var obj={}; 
            obj["codigo"]=Codigo;
            obj["nidentradaporotrosconceptos"]=nID;
            obj["nidusuario"]=nIDUsuario;

            var DATOS=new Array();    
            DATOS.push(obj);    
            
            resultado=Anexar_Detalles(DATOS);     

        } else {
            document.getElementById("lbl_mensaje_falla").innerHTML="CAPTURE EL FOLIO DE LA ENTRADA POR OTROS CONCEPTOS";       
            $("#modal_falla").modal("show");
        } 
      

    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO";       
        $("#modal_falla").modal("show");
    }
}
 
function fn_Crear_Detalles_Clic(){
    
    if(listadodeproductos.length>0){       
        // Enviar para procesdar
        resultado=Listado_Grabar_Entrada(listadodeproductos); 

    } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE DATOS PARA GRABAR";          
        $("#modal_falla").modal("show");
    }
   
}

 
var listadodeproductos=new Array();

function Buscar_Entrada(e){
    if (e.keyCode == 13) {
        var Folio = document.getElementById("txt_Entrada").value;

        fn_Consultar_Folio_Clic( "Folio=" + Folio + " and Estatus='NO PROCESADO'" );
    }        
}

function fn_Buscar_Entrada_Clic(){
    var Folio = document.getElementById("txt_Entrada").value;
    if(Folio.length>0){
        fn_Consultar_Folio_Clic( "Folio=" + Folio + " and Estatus='NO PROCESADO'" );

    } else {                            
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture el Folio";                  
        $("#modal_falla").modal("show");
        document.getElementById("bt_Grabar").style.visibility="visible";        
    }    
}

function fn_Consultar_Folio_Clic(l_Consulta){     
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
        resultado=Listado_Folio(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
} 


function fn_Cancelar_Entrada_Clic(){
    fn_Eliminar_ListadoProductos();

    document.getElementById("txt_Entrada").value="";
    document.getElementById("txt_nIDEntradaPorOtrosConceptos").value="";
    document.getElementById("bt_Buscar").style.visibility="visible";
    document.getElementById("bt_Cancelars").style.visibility="hidden";
    document.getElementById("txt_Entrada").readOnly = false;

    document.getElementById("lbl_Entrada").innerHTML="";


    document.getElementById("txt_Entrada").select();
  
}
 