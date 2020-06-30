// ----------------------------------------------------------------------------------
// contenedores_deta.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
 
function fn_Contenedores_Continuar_Deta(l_Folio, l_nIDPackingList){
    // Graba la información del contenedor
    
    if(l_Folio.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene PackingList";             
        $("#modal_falla").modal("show");
        return;
    }
 
    // Validacion
    if (isNaN(l_Folio)) {
        document.getElementById("lbl_mensaje_falla").innerHTML="Folio Invalido";             
        $("#modal_falla").modal("show");
        return;
    }     
     
    // Verifica los detalles del contenedor
    if(listadodeproductos<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE TABLA DE ATRIBUTOS";             
        $("#modal_falla").modal("show");
        return;
    }
 
    var i=0;
    var l_Codigo_IZeta="";
    var l_Codigo_SAP="";
    var l_Parts_Name="";
    var l_Cantidad=0;
    var l_PrecioDividido=0;

    var arreglo=new Array();
    for(i=0;i<listadodeproductos.length;i++){
        l_Codigo_IZeta=listadodeproductos[i]["codigo_izeta"];
        l_Codigo_SAP=listadodeproductos[i]["codigo_sap"];
        l_Parts_Name=listadodeproductos[i]["parts_name"];
        l_Cantidad=listadodeproductos[i]["cantidad"];
        l_PrecioDividido=listadodeproductos[i]["preciodividido"];

        arreglo.push( { "folio": l_Folio, "nidpackinglist":l_nIDPackingList, "codigo_izeta":l_Codigo_IZeta, "codigo_sap":l_Codigo_SAP, "parts_name":l_Parts_Name, "cantidad":l_Cantidad, "preciodividido":l_PrecioDividido} );
    } 
        
    if(arreglo.length>0){       
            // Enviar para procesdar
        resultado=Listado_Grabar_Contenedor_Deta(arreglo); 

    } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
         document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE DATOS PARA GRABAR";          
         $("#modal_falla").modal("show");
    }

}

 