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
 
function fn_Crear_Detalles_Clic(l_Folio){
    var formulariop = document.getElementById("frm_Detalles");   
    var LECTURA=[];
    var CAMPO=[];      
    var i=0;
    var sCampo="";

    console.log("Folios:" + l_Folio);

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){        
        sCampo=formulariop.elements[i].name;
        sCampo=sCampo.trim();
        if(sCampo.length>0){
             //console.log("campo:" + sCampo + "=" + formulariop.elements[i].value.trim() + ", " + formulariop.elements[i].type.trim()); 
            
            if(formulariop.elements[i].type.trim()=="checkbox"){
                if(formulariop.elements[i].checked){
                    LECTURA.push("SI");
                } else {
                    LECTURA.push("NO");
                }

            } else {
                LECTURA.push(formulariop.elements[i].value.trim())
            }
            
            CAMPO.push(formulariop.elements[i].name.trim())

        }     
    } 

 
    // Convierte los campos a minusculas
    for (i=0;i<CAMPO.length;i++){
        CAMPO[i]=CAMPO[i].toLowerCase(); 
    }

    var obj={};
    for (i=0;i<LECTURA.length;i++){
        obj[CAMPO[i]]=LECTURA[i];
    }

    obj["FOLIO"]=l_Folio;
     
    var DATOS=new Array();    
    DATOS.push(obj);     

    console.log("DETALLES");     
    console.log(DATOS);

    if(DATOS.length>0){        
        // Enviar para procesdar
        resultado=Crear_Detalles(DATOS);     

    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }  
}

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

// ************************************************************************************************



















// ************************************************************************************************
function fn_Actualizar_Detalles_Clic(){
    var formulariop = document.getElementById("frm_Detalles");   
    var LECTURA=[];
    var CAMPO=[];      
    var i=0;
    var sCampo="";

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){        
        sCampo=formulariop.elements[i].name;
        sCampo=sCampo.trim();
        if(sCampo.length>0){
            console.log("campo:" + sCampo);
            if(formulariop.elements[i].type.trim()=="checkbox"){
                if(formulariop.elements[i].checked){
                    LECTURA.push("SI");
                } else {
                    LECTURA.push("NO");
                }

            } else {
                LECTURA.push(formulariop.elements[i].value.trim())
            }
            CAMPO.push(formulariop.elements[i].name.trim())
        }     
    } 

    // Convierte los campos a minusculas
    for (i=0;i<CAMPO.length;i++){
        CAMPO[i]=CAMPO[i].toLowerCase(); 
    }

    var obj={};
    for (i=0;i<LECTURA.length;i++){
        obj[CAMPO[i]]=LECTURA[i];
    }

    console.log(obj);
     
    var DATOS=new Array();    
    DATOS.push(obj);     

    if(DATOS.length>0){        
        // Enviar para procesdar
        resultado=Actualizar_Detalles(DATOS); 
        console.log()
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }   
  
}

function fn_Eliminar_Detalles_Clic(){
   
    var l_nID = document.getElementById("txt_nID").value;
    var i=0;

    // Verificaciones
    if(l_nID.length<=0){
        console.log("ERROR NO TIENE ID ACCESO");
        return;
    } 

    // Limpia la información
    l_nID=l_nID.trim();
    
    // Validaciones
    if(!validarSiNumero(l_nID)){
        console.log("ERROR ID ACCION INVALIDO");
        return;
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push({"nid":l_nID});     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Eliminar_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Ocultar_Detalles_Clic(){
    var formulariop = document.getElementById("frm_Detalles");
    var l_nID=0;     
    var i=0;
    

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){
        if(formulariop.elements[i].name.indexOf("nID") != -1){
            l_nID=formulariop.elements[i].value;    
            break;     
        }     
    } 

    // Verificaciones
    if(l_nID.length<=0){
        console.log("ERROR NO TIENE ID ACCESO");
        return;
    } 

    // Limpia la información
    l_nID=l_nID.trim();
    
    // Validaciones
    if(!validarSiNumero(l_nID)){
        console.log("ERROR ID ACCION INVALIDO");
        return;
    }

    console.log("NID:" + l_nID);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( {"nid":l_nID, "estado":1} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Estado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Mostrar_Detalles_Clic(){
    var formulariop = document.getElementById("frm_Detalles");
    var l_nID=0;     
    var i=0;

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){
        if(formulariop.elements[i].name.indexOf("nID") != -1){
            l_nID=formulariop.elements[i].value;         
        }     
    } 

    // Verificaciones
    if(l_nID.length<=0){
        console.log("ERROR NO TIENE ID ACCESO");
        return;
    } 

    // Limpia la información
    l_nID=l_nID.trim();
    
    // Validaciones
    if(!validarSiNumero(l_nID)){
        console.log("ERROR ID ACCION INVALIDO");
        return;
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( {"nid":l_nID, "estado":0} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Estado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}



function fn_Consultar_Detalles_Recibo_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles_Recibo(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Consultar_Detalles_Validacion_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles_Validacion(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

 

 

function fn_Ver_Detalles_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Ver_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Listado_Ordenar_Detalles_Clic(l_CampoOrdenamiento){
    var formulariop = document.getElementById("frm_Consultar");
    var l_Consulta=ULTIMA_CONSULTA; 
    var i=0;
 
    if(FORMA_ORDENAMIENTO=="Descendente"){
        FORMA_ORDENAMIENTO="Ascendente"; 
    } else {
        FORMA_ORDENAMIENTO="Descendente";
    }

    CAMPO_ORDENAMIENTO=l_CampoOrdenamiento;
    
    console.log("CAMPO ORDENAMIENTO:"+ CAMPO_ORDENAMIENTO);
    console.log("FORMA ORDENAMIENTO:"+ FORMA_ORDENAMIENTO);
    console.log("ULTIMA CONSULTA:"+ ULTIMA_CONSULTA);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_PackingList_Deta_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    if(l_Consulta.length>0){
        l_Consulta=l_Consulta + " and bEstado=0";
    } else {
        l_Consulta="bEstado=0";
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=PackingList_Deta_Combo(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function Cerrar_Clic(){
    window.open(MODULO +".php","_self")
}

// Recibo

function Validar_Codigo(e){
    if (e.keyCode == 13) {
        console.log("Enter");

        var nID = document.getElementById("cb_nIDPackinglist").value;
        var Codigo = document.getElementById("txt_Etiqueta").value;

        if(nID>0){
            if(Codigo.length>0){
                var obj={};
                obj["nid"]=nID;
                obj["codigo"]=Codigo;

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

/*
function fn_Imprimir_Etiqueta_Clic(l_nID){      
     if(l_nID>0){
        window.open("https://www.w3schools.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");

        // Procesar
        var arreglo=new Array();
        arreglo.push( { "nid":l_nID, "estatus":"ETIQUETA"} );     

        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=PackingList_Deta_CambiarEstatus(arreglo); 
        } else {             
            document.getElementById("lbl_mensaje_falla").innerHTML="NO ES POSIBLE IMPRIMIR"      
            $("#modal_falla").modal("show");
        }
     

       document.getElementById("lbl_mensaje_falla").innerHTML="NO ES POSIBLE IMPRIMIR, PERMISOS DENEGADOS" ;     
       $("#modal_falla").modal("show");

     } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ID PARA IMPRIMIR"      
        $("#modal_falla").modal("show");
     }
}
*/


// *******************************************************************
// ENTRADAS POR COMPRAS

function fn_Consultar_Detalles_EntradasxCompras_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

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