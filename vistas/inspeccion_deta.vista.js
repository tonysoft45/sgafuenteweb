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

function fn_Cargar_Detalles_Seleccionado_Clic(){
    var nID = document.getElementById("cb_nIDPackinglist").value;
    var l_Accion="Editar";
 
    l_Consulta="nIDPackingList=" + nID;
    fn_Consultar_Detalles_Inspeccion_Clic(l_Consulta); 
}
 

function Validar_Codigo_Clic(e){
    if (e.keyCode == 13) {
        console.log("Enter");

        var nID = document.getElementById("cb_nIDPackinglist").value;
        var nIDUsuario = document.getElementById("txt_nIDUsuario").value;
        var nIDCat_Estado = document.getElementById("cb_nIDCat_Estado").value;
        var Codigo = document.getElementById("txt_Etiqueta").value;
        var obEstado =document.getElementById("cb_nIDCat_Estado");
        var Estado=obEstado.options[obEstado.selectedIndex].text;


        if(nIDCat_Estado<=0){
            document.getElementById("lbl_mensaje_falla").innerHTML="NECESITA SELECCIONAR EL ESTADO";       
            $("#modal_falla").modal("show");
            return;
        }

        if(nID>0){
            if(Codigo.length>0){
                var obj={};
                obj["nid"]=nID;
                obj["codigo"]=Codigo;
                obj["nidcat_estado"]=nIDCat_Estado;
                obj["estado"]=Estado;
                obj["nidusuario"]=nIDUsuario;

                var DATOS=new Array();    
                DATOS.push(obj);    
                
                resultado=Validar_Detalles(DATOS);     


            } else {
                document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO";       
                $("#modal_falla").modal("show");
            }
        } else {
            document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE UN PACKINGLIST SELECCIONADO";       
            $("#modal_falla").modal("show");
        }

    }
}

// ************************************************************************************************

// ************************************************************************************************
// INSPECCION 
function fn_Consultar_Detalles_Inspeccion_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    var nIDUsuario = document.getElementById("txt_nIDUsuario").value;
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": "nIDPackingList_Deta", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION, "nidusuario":nIDUsuario } );     


    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles_Inspeccion(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}



 