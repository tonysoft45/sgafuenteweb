// ----------------------------------------------------------------------------------
// contenedores.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
 
// ******************************************************************
// CONTENEDORES
var listadodeproductos=new Array();
function fn_Contenedores_Cancelar(){
    var l_nIDPackingList=document.getElementById("txt_nIDPackingList").value;
    if(l_nIDPackingList<=0){
        console.log("ERROR NO TIENE ID PACKING LIST");
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ID";
        $("#modal_falla").modal("show");

        window.open("entradasxcompras.php","_self")  

        return;
    } 
 
    window.open("entradasxcompras_editar.php?id="+l_nIDPackingList + "&accion=Detalles","_self")  
}

function fn_Contenedores_Excel(){


}

function fn_Contenedores_Continuar(){
    // Graba la información del contenedor
    var l_nIDPackingList=document.getElementById("txt_nIDPackingList").value;
    var l_nIDUsuario=document.getElementById("txt_nIDUsuario").value;
    var l_NoFactura=document.getElementById("txt_NoFactura").value;
    var l_nIDProveedor=document.getElementById("cb_nIDCat_Proveedor").value;
    var l_Estatus=document.getElementById("txt_Estatus").value;

    if(l_nIDPackingList.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene PackingList";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_nIDUsuario.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene Usuario";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_NoFactura.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene Folio de la factura";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_nIDProveedor.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene Proveedor";             
        $("#modal_falla").modal("show");
        return;
    }

    // Validacion
    if (isNaN(l_nIDPackingList)) {
        document.getElementById("lbl_mensaje_falla").innerHTML="ID del PackingList debe de ser numerico";             
        $("#modal_falla").modal("show");
        return;
    }     

    if (isNaN(l_nIDProveedor)) {
        document.getElementById("lbl_mensaje_falla").innerHTML="ID del Proveedor debe de ser numerico";             
        $("#modal_falla").modal("show");
        return;
    }     
    
    if (isNaN(l_nIDUsuario)) {
        document.getElementById("lbl_mensaje_falla").innerHTML="ID del usuario debe de ser numerico";             
        $("#modal_falla").modal("show");
        return;
    }     
    
    if(l_nIDProveedor<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Selecciona el Proveedor";             
        $("#modal_falla").modal("show");
        return;
    }

    // Verifica los detalles del contenedor
    if(listadodeproductos<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE TABLA DE ATRIBUTOS";             
        $("#modal_falla").modal("show");
        return;
    }

 
    var arreglo=new Array();
    arreglo.push( { "nidusuario": l_nIDUsuario, "nidproveedor": l_nIDProveedor, "nofactura": l_NoFactura, "nidpackinglist":l_nIDPackingList, "estatus":l_Estatus } );     

        
    if(arreglo.length>0){       
            // Enviar para procesdar
        resultado=Listado_Grabar_Contenedor(arreglo); 

    } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
         document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
         $("#modal_falla").modal("show");
    }
}

function fn_Contenedor_Agregar(){
    var l_nIDPackingList=document.getElementById("txt_nIDPackingList").value;
    var l_Codigo_IZeta=document.getElementById("txt_Codigo_IZeta").value;
    var l_Codigo_SAP=document.getElementById("txt_Codigo_SAP").value;
    var l_Parts_Name=document.getElementById("txt_Parts_Name").value;
    var l_Cantidad=document.getElementById("txt_Cantidad").value;
    var l_PrecioDividido=document.getElementById("txt_PrecioDividido").value;

    l_Codigo_IZeta=l_Codigo_IZeta.trim();
    l_Codigo_SAP=l_Codigo_SAP.trim();
    l_Parts_Name=l_Parts_Name.trim();
    l_Cantidad=l_Cantidad.trim();
    l_PrecioDividido=l_PrecioDividido.trim();

    // Verificacion
    if(l_Codigo_IZeta.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture el codigo IZeta";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_Parts_Name.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture el Nombre de Parte";             
        $("#modal_falla").modal("show");
        return;
    }

    

    if(l_Cantidad.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture la Cantidad";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_PrecioDividido.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture el Precio Dividido";             
        $("#modal_falla").modal("show");
        return;
    }

    // Validacion
    if (isNaN(l_Cantidad)) {
        document.getElementById("lbl_mensaje_falla").innerHTML="La cantidad debe de ser numerica";             
        $("#modal_falla").modal("show");
        return;
    }        

    if (isNaN(l_PrecioDividido)) {
        document.getElementById("lbl_mensaje_falla").innerHTML="El precio dividido debe ser numerico";             
        $("#modal_falla").modal("show");
        return;
    }        

    // Anexa los datos al listado de productos
    var bandEncontrado=0;
    var i=0;
    for(i=0;i<listadodeproductos.length;i++){
        if(listadodeproductos[i]["codigo_izeta"]==l_Codigo_IZeta){
            bandEncontrado=1;
            break;
        }
    }

    if(bandEncontrado==0){

        var arreglo=new Array();
        arreglo.push( {  "nidcontenedor_deta":0,"nidcontenedor":0,"codigo_izeta": l_Codigo_IZeta, "codigo_sap":l_Codigo_SAP, "parts_name": l_Parts_Name, "cantidad": l_Cantidad, "preciodividido":l_PrecioDividido, "nidpackinglist":l_nIDPackingList } );     

        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Buscar_Producto_PackingList(arreglo); 
        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");
        } 
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Codigo Repetido";             
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo_IZeta").select();
        return;
    }    
 
}



function fn_Buscar_Codigo_CLick(e){
    if (e.keyCode == 13) {
        var Codigo_IZeta= document.getElementById("txt_Codigo_IZeta").value;

        Codigo_IZeta=Codigo_IZeta.trim();

        if(Codigo_IZeta.length<=0){
            document.getElementById("lbl_mensaje_falla").innerHTML="Captura el Codigo";                
            $("#modal_falla").modal("show");                    
            $("#modal_espera").modal("hide");
            obVerificar=setInterval(Ocultar_Espera,500);          
        }

        document.getElementById("txt_Codigo_IZeta").value="";
        document.getElementById("txt_Codigo_SAP").value="";
        document.getElementById("txt_Parts_Name").value="";
        document.getElementById("txt_Cantidad").value="";
        document.getElementById("txt_PrecioDividido").value="";

        l_Consulta="Codigo_IZeta='" + Codigo_IZeta + "'";

        // Verificaciones
        if(l_Consulta.length<=0){
            console.log("ERROR NO TIENE CONSULTA");
            //return;
        } 

        // Limpia la información
        l_Consulta=l_Consulta.trim();
    
        // Procesar
        var arreglo=new Array();
        arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     

        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Buscar_Producto(arreglo); 
        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");
        } 
    }        
}

function fn_Continuar(){
    window.open("entradadeproductos_editar.php?id="+NIDPACKINGLIST + "&accion=Detalles","_self");
}

function fn_Consultar_PackingList_Contenedor_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Consultar_PackingList_Contenedor(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Consultar_Contenedor_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Consultar_Contenedor(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}
// ******************************************************************