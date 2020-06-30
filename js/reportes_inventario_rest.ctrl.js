// ----------------------------------------------------------------------------------
// ubicaciones_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 25/03/2020
// ----------------------------------------------------------------------------------

// ******************************************************************
// PARTES
var listadodeproductos=new Array();
function Listado_Detalles(datos){        
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/reporte_inventario_todos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
            var l_Resultado=this.responseText;  
            console.log(l_Resultado);  

            var obResultado=JSON.parse(l_Resultado);
                           
            var contador=obResultado.length;
            var i=0;               
            var l_Linea="";
          
            // ----------------------------------------------------------------
            // Construye la respuesta de la consulta
            // Campos      
            for(i=0;i<contador;i++){     
                l_Registros="";
                l_nID=0;

                if(obResultado[i]["retorno"]=="TRUE"){ 
                    fn_Ver_Detalles(obResultado[i]["nIDProducto"], obResultado[i]["Codigo_IZeta"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], obResultado[i]["Existencia"] );
                } else {
                    
                    document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE EXISTENCIAS";          
                    $("#modal_falla").modal("show");
                    
                     // Presenta la inforamción en la pantalla   
                    var l_Linea="";
            
                    l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
            
                    l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                    l_Linea=l_Linea + "<label style='cursor:pointer;' >NO TIENE EXISTENCIAS</label>";
                    l_Linea=l_Linea + "</div>";          
                    
                    l_Linea=l_Linea + "</div>";
            
                    document.getElementById("contenido_productos").innerHTML=l_Linea;  
                    return;
                } 
            }     
            // ----------------------------------------------------------------             
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function fn_Ver_Detalles(l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida,l_Existencia ){
     
    l_Codigo=l_Codigo.trim();
    l_Producto=l_Producto.trim();
    l_UnidadDeMedida=l_UnidadDeMedida.trim();
    
    listadodeproductos.push( {"nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "existencia":l_Existencia} );     

    // Presenta la inforamción en la pantalla   
    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Producto </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Unidad de Medida </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Existencia </label>";
    l_Linea=l_Linea + "</div>";
 

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["existencia"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        
        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  

}
// ******************************************************************




 