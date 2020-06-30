// ----------------------------------------------------------------------------------
// ordendesurtido.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
 
var listadodeproductos=[];


function fn_Crear_Clic(){

    l_nIDCat_Almacen=document.getElementById("cb_nIDCat_Almacen").value;
    l_nIDUsuario=document.getElementById("txt_nIDUsuario").value;

    if(l_nIDCat_Almacen<=0){       
        document.getElementById("lbl_mensaje_falla").innerHTML="NECESITA SELECCIONAR EL ALMACEN";          
        $("#modal_falla").modal("show");
        return;
    }
    
    var obj={};
    obj["nidcat_almacen"]=l_nIDCat_Almacen;
    obj["nidusuario"]=l_nIDUsuario;
     
    var DATOS=new Array();    
    DATOS.push(obj);     

    if(DATOS.length>0){        
        // Enviar para procesdar
        resultado=Crear(DATOS); 
        console.log()
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE DATOS PARA GRABAR";         
        $("#modal_falla").modal("show");
        return;
    }   
}

function IntroducirConteo_Clic(){
    window.open("inventarioxarticulo_conteo.php","_self")
}

function fn_InventariosXArticulo_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    if(l_Consulta.length>0){
        l_Consulta=l_Consulta + " and Estatus='ABIERTO' and bEstado=0";
    } else {
        l_Consulta="Estatus='ABIERTO' and bEstado=0";
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=InventarioXArticulo_Combo(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Buscar_Codigo_Clic(){
    var Codigo = document.getElementById("txt_Etiqueta").value;
    var nIDIxA = document.getElementById("cb_nIDIxA").value;

    if(Codigo.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="NECESITA CAPTURAR EL CODIGO";         
        $("#modal_falla").modal("show");
        return;
    }

    if(nIDIxA<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONA EL ALMACEN";         
        $("#modal_falla").modal("show");
        return;
    }

    var l_Consulta="Codigo_IZeta='" + Codigo + "' and nIDIxA="+ nIDIxA;

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    if(l_Consulta.length>0){
        l_Consulta=l_Consulta + " and bEstado=0";
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO SE CARGO LA CONSULTA";         
        $("#modal_falla").modal("show");
        return;
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Buscar_Codigo(arreglo); 
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO SE CARGO LA CONSULTA";         
        $("#modal_falla").modal("show");
        return;
    }     
}

