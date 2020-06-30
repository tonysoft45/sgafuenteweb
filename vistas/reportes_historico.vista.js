// ----------------------------------------------------------------------------------
// ubicaciones.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------

 
function fn_Cargar_Inventario(){
    var FechaInicio = document.getElementById("txt_FechaInicio").value;
    var FechaFin = document.getElementById("txt_FechaFin").value;

    if(FechaInicio.length!=10){
        
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture la Fecha de Inicio";          
        $("#modal_falla").modal("show");

        // Presenta la inforamción en la pantalla   
        var l_Linea="";

        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >NO ES POSIBLE CARGAR EL INVENTARIO</label>";
        l_Linea=l_Linea + "</div>";          
        
        l_Linea=l_Linea + "</div>";

        document.getElementById("contenido_productos").innerHTML=l_Linea;  
        return;

    }

    if(FechaFin.length!=10){
        
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture la Fecha de Fin";          
        $("#modal_falla").modal("show");

        // Presenta la inforamción en la pantalla   
        var l_Linea="";

        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >NO ES POSIBLE CARGAR EL INVENTARIO</label>";
        l_Linea=l_Linea + "</div>";          
        
        l_Linea=l_Linea + "</div>";

        document.getElementById("contenido_productos").innerHTML=l_Linea;  
        return;

    }
 
     
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "fecha_inicio":FechaInicio,"fecha_fin":FechaFin } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="No es posible cargar el inventario";          
        $("#modal_falla").modal("show");
    }
}
 

function Cerrar_Clic(){
    window.open("menu.php","_self")
}

function fn_Imprimir(){
    var FechaInicio = document.getElementById("txt_FechaInicio").value;
    var FechaFin = document.getElementById("txt_FechaFin").value;

    if(FechaInicio.length!=10){
        
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture la Fecha de Inicio";          
        $("#modal_falla").modal("show");

        // Presenta la inforamción en la pantalla   
        var l_Linea="";

        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >NO ES POSIBLE CARGAR EL INVENTARIO</label>";
        l_Linea=l_Linea + "</div>";          
        
        l_Linea=l_Linea + "</div>";

        document.getElementById("contenido_productos").innerHTML=l_Linea;  
        return;

    }

    if(FechaFin.length!=10){
        
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="Capture la Fecha de Fin";          
        $("#modal_falla").modal("show");

        // Presenta la inforamción en la pantalla   
        var l_Linea="";

        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >NO ES POSIBLE CARGAR EL INVENTARIO</label>";
        l_Linea=l_Linea + "</div>";          
        
        l_Linea=l_Linea + "</div>";

        document.getElementById("contenido_productos").innerHTML=l_Linea;  
        return;

    }
 
   obVENTANA=window.open("historico_vistaprevia.php?fechainicio="+FechaInicio  + "&fechafin="+FechaFin ,"VISTA PREVIA","status=no,toolbar=no,menubar=no,scrollbars=yes,location=yes,width=1024, height=600");

}
 