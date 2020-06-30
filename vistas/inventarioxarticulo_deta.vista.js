// ----------------------------------------------------------------------------------
// inventarioxarticulo_deta.vista.js
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






function fn_Realizar_Conteo_Clic(){
    var nIDIxA = document.getElementById("cb_nIDIxA").value;

    if(nIDIxA>0){
        document.getElementById("bt_Buscar").style.visibility="hidden";
        document.getElementById("bt_Cancelars").style.visibility="visible";        

        document.getElementById("id_Estado").style.visibility="visible";     
        document.getElementById("id_Codigo").style.visibility="visible";    

        document.getElementById("frm_Detalles2").style.visibility="visible"; 
        document.getElementById("frm_Detalles").style.visibility="visible"; 

        document.getElementById("cb_nIDIxA").disabled=true; 
        document.getElementById("cb_nIDCat_Producto").disabled=true;     

    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Seleccione el inventario";                  
        $("#modal_falla").modal("show");         
    }
}

function fn_Cancelar_Conteo_Clic(){
    fn_Eliminar_ListadoProductos();

    document.getElementById("bt_Buscar").style.visibility="visible";
    document.getElementById("bt_Cancelars").style.visibility="hidden";        

    document.getElementById("id_Estado").style.visibility="hidden";     
    document.getElementById("id_Codigo").style.visibility="hidden";    

    document.getElementById("frm_Detalles2").style.visibility="hidden"; 
    document.getElementById("frm_Detalles").style.visibility="hidden"; 

    document.getElementById("cb_nIDIxA").disabled=false;     
    document.getElementById("cb_nIDCat_Producto").disabled=false;    
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
    var nIDIxA = document.getElementById("cb_nIDIxA").value;
    var nIDCat_Producto = document.getElementById("cb_nIDCat_Producto").value;
    var nIDUsuario = document.getElementById("txt_nIDUsuario").value;
    var obCat_Estado= document.getElementById("cb_nIDCat_Estado")
    var nIDCat_Estado = document.getElementById("cb_nIDCat_Estado").value;
    var Estado=obCat_Estado.options[obCat_Estado.selectedIndex].text;



    if(Codigo.length>0){
        if(nIDIxA>0){
            if(nIDCat_Estado>0){
                var obj={}; 
                obj["codigo"]=Codigo;
                obj["nidixa"]=nIDIxA;
                obj["nidusuario"]=nIDUsuario;
                obj["nidcat_producto"]=nIDCat_Producto;
                obj["nidcat_estado"]=nIDCat_Estado;
                
                var l_Consulta="Codigo_IZeta='" + Codigo + "' and nIDIxA=" + nIDIxA;
                
                if(nIDCat_Producto>0){
                    l_Consulta=l_Consulta + " and  nIDProducto=" + nIDCat_Producto;
                }
    
                // Consulta 
                var arreglo=new Array();
                arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, 
                "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION, "codigo":Codigo, "nidixa":nIDIxA, "nidusuario":nIDUsuario, "nidcat_producto":nIDCat_Producto, "nidcat_estado":nIDCat_Estado, "estado":Estado } );     
     
                resultado=Anexar_Detalles(arreglo);  

            } else {
                document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONE EL ESTATUS DEL PRODUCTO";       
                $("#modal_falla").modal("show");
            }

        } else {
            document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONE EL INVENTARIO POR ALMACEN";       
            $("#modal_falla").modal("show");
        } 
      

    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO";       
        $("#modal_falla").modal("show");
    }
}

function fn_Grabar_Conteo_Clic(){
    
    if(listadodeproductos.length>0){       
        // Enviar para procesdar
        resultado=Listado_Grabar_Conteo(listadodeproductos); 

    } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE DATOS PARA GRABAR";          
        $("#modal_falla").modal("show");
    }
   
}

function fn_Ajustar_Inventario_Clic(){

    var nIDIxA = document.getElementById("txt_nIDIxA").value;
    var nIDUsuario = document.getElementById("txt_nIDUsuario").value;

    var obj={};   
    obj["nidixa"]=nIDIxA;
    obj["nidusuario"]=nIDUsuario;
     
    var arreglo=new Array();
    arreglo.push( {"nidixa":nIDIxA, "nidusuario":nIDUsuario } );     

    
    if(arreglo.length>0){        
        // Enviar para procesdar
        resultado=Ajustar_Inventario(arreglo); 
        console.log()
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }  

}