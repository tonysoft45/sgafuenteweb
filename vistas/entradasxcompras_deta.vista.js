// ----------------------------------------------------------------------------------
// packinglist_deta.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
  
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
    //arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles_EntradasxCompras(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


function fn_EntradaxCompra_Cancelar(){     
    var nID = document.getElementById("txt_nID").value;

    if(nID>0){
        window.open("entradasxcompras.php","_self")
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ID"      
        $("#modal_falla").modal("show");
    }
}

function fn_EntradaxCompra_Continuar(){     
    var nID = document.getElementById("txt_nID").value;

    if(nID>0){
        window.open("contenedores_editar.php?id="+nID + "&accion=Crear","_self")
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ID"      
        $("#modal_falla").modal("show");
    }
}
// *******************************************************************