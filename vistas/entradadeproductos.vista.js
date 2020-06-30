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


function fn_Buscar_Codigo_CLick(e){
    if (e.keyCode == 13 || (event.keyCode== 32) ) {
        var Codigo_IZeta= document.getElementById("txt_Codigo_IZeta").value;
        var nIDPackingList= document.getElementById("txt_nIDPackingList").value;

        Codigo_IZeta=Codigo_IZeta.trim();

        if(Codigo_IZeta.length<=0){
            document.getElementById("lbl_mensaje_falla").innerHTML="Captura el Codigo";                
            $("#modal_falla").modal("show");                    
            $("#modal_espera").modal("hide");
            obVerificar=setInterval(Ocultar_Espera,500);          
        }

        document.getElementById("txt_Codigo_IZeta").value="";
        document.getElementById("txt_Serie").value="";
        document.getElementById("txt_Descripcion").value="";         
        document.getElementById("txt_Cantidad").value="";        

        l_Consulta="(Codigo='" + Codigo_IZeta + "' or CodigoQR='" + Codigo_IZeta + "') and nIDPackingList=" + nIDPackingList;

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

function fn_EntradaDeProductos_Agregar(){
    var l_nIDCat_Almacen=document.getElementById("cb_nIDCat_Almacen").value;
    var l_nIDCat_Proveedor=document.getElementById("txt_nIDCat_Proveedor").value;
    var l_nIDUsuario=document.getElementById("txt_nIDUsuario").value;
    var l_Comentarios=document.getElementById("txt_Comentarios").value;
    var l_NoFactura=document.getElementById("txt_NoFactura").value;

    var l_Codigo_IZeta=document.getElementById("txt_Codigo_IZeta").value;
    var l_Serie=document.getElementById("txt_Serie").value;
    var l_Descripcion=document.getElementById("txt_Descripcion").value;
    var l_Cantidad=document.getElementById("txt_Cantidad").value;
    var l_Pedimento=document.getElementById("txt_Pedimento").value;

    var l_nIDPackingList=document.getElementById("txt_nIDPackingList").value;

    l_Codigo_IZeta=l_Codigo_IZeta.trim();
    l_Serie=l_Serie.trim();
    l_Descripcion=l_Descripcion.trim();    
    l_Cantidad=l_Cantidad.trim();    
    l_Pedimento=l_Pedimento.trim();

    l_Comentarios=l_Comentarios.trim();

    // Verificacion
    if(l_Codigo_IZeta.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture el codigo IZeta";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_Serie.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture el codigo IZeta";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_Descripcion.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Falta la descripcion";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_Cantidad.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture la Cantidad";             
        $("#modal_falla").modal("show");
        return;
    }

    if(l_Pedimento.length<=0){
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
    
    if(l_nIDCat_Almacen<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="Seleccione el Almacen";             
        $("#modal_falla").modal("show");
        return;
    }
   

    // Anexa los datos al listado de productos
    var bandEncontrado=0;
    var i=0;
    for(i=0;i<listadodeproductos.length;i++){
        if(listadodeproductos[i]["serie"]==l_Serie){
            bandEncontrado=1;
            break;
        }
    }

    l_Condicion="(Codigo='" + l_Codigo_IZeta + "' or CodigoQR='" + l_Codigo_IZeta +  "')";


    if(bandEncontrado==0){

        var arreglo=new Array();
        arreglo.push( {  "codigo_izeta": l_Codigo_IZeta, "serie": l_Serie, "descripcion": l_Descripcion, "cantidad": l_Cantidad, "pedimento":l_Pedimento, "nidpackinglist":l_nIDPackingList, "nidcat_proveedor":l_nIDCat_Proveedor, "nidcat_almacen":l_nIDCat_Almacen, "nidusuario":l_nIDUsuario, "nofactura":l_NoFactura, "comentarios":l_Comentarios, "consulta":"","condicion":l_Condicion,"tipo":"general", "campos":"definidos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );

        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Buscar_Producto_PackingList(arreglo); 
        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");
        } 
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Serie Repetida";
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo_IZeta").select();
        return;
    }    
 
}

function fn_EntradaProductos_Grabar(){ 
        
    if(listadodeproductos.length>0){       
            // Enviar para procesdar
        resultado=Listado_Grabar_Entrada(listadodeproductos); 

    } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
         document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE DATOS PARA GRABAR";          
         $("#modal_falla").modal("show");
    }
}

function Cerrar_Clic(){
    window.open("entradasxcompras.php","_self");
}

 