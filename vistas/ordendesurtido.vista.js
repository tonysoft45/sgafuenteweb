// ----------------------------------------------------------------------------------
// ordendesurtido.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 21/08/2020
// ----------------------------------------------------------------------------------
 
var listadodeproductos=[];
 
function fn_Listado_Clic(l_CondicionExtra){
    var formulariop = document.getElementById("frm_Consultar");
    var l_Consulta="";     
    var i=0;

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){
        if(formulariop.elements[i].name.indexOf("Consulta") != -1){
            l_Consulta=formulariop.elements[i].value;         
        }     
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    ULTIMA_CONSULTA=l_Consulta;
    ULTIMA_CONDICION=l_CondicionExtra;

    console.log("CAMPO ORDENAMIENTO:"+ CAMPO_ORDENAMIENTO);
    console.log("FORMA ORDENAMIENTO:"+ FORMA_ORDENAMIENTO);
    console.log("ULTIMA CONSULTA:"+ ULTIMA_CONSULTA);
    console.log("ULTIMA CONDICION:"+ ULTIMA_CONDICION);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":l_Consulta,"condicion":l_CondicionExtra,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS, "modulo":MODULO } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


function fn_Listado_Ordenar_Clic(l_CampoOrdenamiento){       
    var l_Consulta=ULTIMA_CONSULTA; 
    var l_CondicionExtra=ULTIMA_CONDICION; 
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
    console.log("ULTIMA CONDICION:"+ ULTIMA_CONDICION);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":l_Consulta,"condicion":l_CondicionExtra,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS, "modulo":MODULO } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Crear_Clic(){
    if(listadodeproductos.length>0){   
        
        document.getElementById("bt_Grabar").style.visibility="hidden";   

        // Enviar para procesdar
        l_Cant=0;
        for(i=0;i<listadodeproductos.length;i++){
            l_Cant=document.getElementById("txt_Cantidad_"+i).value;
            if (isNaN(l_Cant)) {
                document.getElementById("lbl_mensaje_falla").innerHTML="Cantidad Invalida";             
                $("#modal_falla").modal("show");
                
                return;
            } else {
                listadodeproductos[i]["cantidad"]=l_Cant
            }
        }

        resultado=Crear(listadodeproductos); 

    } else {
         console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE DATOS PARA GRABAR";          
        $("#modal_falla").modal("show");
    }
}

function fn_Consultar_Clic(l_Consulta){     
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
        resultado=Consultar(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


function fn_Buscar_Clic(){
    var Codigo_IZeta = document.getElementById("txt_Codigo").value;
    Codigo_IZeta=Codigo_IZeta.trim();
    
    var l_nIDCat_Almacen_Origen=document.getElementById("cb_nIDCat_Almacen_Origen").value;
    var l_nIDCat_Almacen_Destino=document.getElementById("cb_nIDCat_Almacen_Destino").value;
    var l_Comentarios=document.getElementById("txt_Comentarios").value;
    var l_nIDUsuario=document.getElementById("txt_nIDUsuario").value;

    if(l_nIDCat_Almacen_Origen<=0){
        console.log("NO TIENE ALMACEN ORIGEN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ALMACEN ORIGEN";          
        $("#modal_falla").modal("show");

        return;
    }

    if(l_nIDCat_Almacen_Destino<=0){
        console.log("NO TIENE ALMACEN DESTINO");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ALMACEN DESTINO";          
        $("#modal_falla").modal("show");

        return;
    }
    

    if(Codigo_IZeta.length>0){
        var arreglo=new Array();
        arreglo.push( { "codigo_izeta": Codigo_IZeta, "nidcat_almacen_origen":l_nIDCat_Almacen_Origen, "nidcat_almacen_destino":l_nIDCat_Almacen_Destino, "comentarios":l_Comentarios, "nidusuario":l_nIDUsuario } );     

        
        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Anexar_Producto(arreglo); 

        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
            document.getElementById("lbl_mensaje_falla").innerHTML="ERROR AL CARGAR LA INFORMACION";          
            $("#modal_falla").modal("show");
        }


    } else {
        console.log("ESCANEE O CAPTURE EL CODIGO QR");      
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO QR";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
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
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     


    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Consultar_Detalles_OrdenDeSurtido_Clic(l_Consulta){     
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


function fn_Cancelar_Clic(){
 
    var l_nID=document.getElementById("txt_nIDOrdenDeSurtido").value;     

    // Verificaciones
    if(l_nID.length<=0){
        console.log("ERROR NO TIENE ID ORDEN DE SURTIDO");
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
        resultado=Cancelar_OrdenDeSurtido(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }

}


function fn_OrdenDeSurtido_Clic(l_Consulta,l_Seleccion,l_Accion){     
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
    arreglo.push( { "consulta":"","condicion":l_Consulta, "seleccion":l_Seleccion, "tipo":"directa", "campos":"todos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO,"cantidadregistros":NUMERODEREGISTROS, "modulo":MODULO, "accion":l_Accion } );


    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=OrdenDeSurtido_Combo(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

 