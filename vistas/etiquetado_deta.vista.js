// ----------------------------------------------------------------------------------
// etiquetado_deta.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. IDEATECH
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 24/06/2020
// ----------------------------------------------------------------------------------
// V2.0.1
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
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": "nIDPackingList_Deta", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     


    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Imprimir_Etiqueta_Clic(l_nID){      
    if(l_nID>0){
        var arreglo=new Array();
        arreglo.push( { "id":l_nID} );     

        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Imprimir_Etiqueta(arreglo); 
        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");
        }
    }
} 

function fn_ReImprimir_Etiqueta_Clic(l_nID){      
    if(l_nID>0){
        var arreglo=new Array();
        arreglo.push( { "id":l_nID} );     

        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=ReImprimir_Etiqueta(arreglo); 
        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");
        }
    }
} 
// ************************************************************************************************



 