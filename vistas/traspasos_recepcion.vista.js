// ----------------------------------------------------------------------------------
// traspasos_envio.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
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


    if(l_CondicionExtra.length<=0){
        l_CondicionExtra="((Tipo='ENVIO' and Estatus='CERRADO') or (Tipo='RECEPCION' and Estatus='ABIERTO') or (Tipo='RECEPCION' and Estatus='PROCESO'))";
    }

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


function fn_Consultar_Detalles_OrdenDeSurtido_Clic(l_nIDOrdenDeSurtido){     
    // Verificaciones
    if(l_nIDOrdenDeSurtido.length<=0){
        console.log("ERROR NO TIENE ORDEN DE SURTIDO");
        //return;
    } 

    // Limpia la información
    l_Consulta="nIDOrdenDeSurtido=" + l_nIDOrdenDeSurtido;

    l_Consulta=l_Consulta.trim();

    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     
    

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_PorFolio_Detalles_OrdenDeSurtido(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function Cerrar_Clic(){
    window.open(MODULO +".php","_self")
}

function fn_Crear_Clic(){
    var formulariop = document.getElementById("frm_Actualizar");   
    var LECTURA=[];
    var CAMPO=[];      
    var i=0;
    var sCampo="";

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
     
    var DATOS=new Array();    
    DATOS.push(obj);     

    if(DATOS.length>0){        
        // Enviar para procesdar
        resultado=Crear(DATOS); 
        console.log()
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }  
  
}

function fn_Cancelar_Clic(){
 
    var l_nID=document.getElementById("txt_nIDTraspaso").value;     

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
        resultado=Cancelar_Traspaso(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }

}

function Buscar_OrdenDeSurtido(e){
    if (e.keyCode == 13) {
        fn_Buscar_OrdenDeSurtido_Clic();
    }        
}

function fn_Buscar_OrdenDeSurtido_Clic(){
    var Folio = document.getElementById("txt_OrdenDeSurtido").value; 
    var l_Consulta1="Folio=" + Folio + " and Estatus='ORDEN - EN EMBARQUE - RECEPCION'";
    var l_Consulta2="Folio=" + Folio + " and OrdenDeSurtido_Estatus='ORDEN - EN EMBARQUE - RECEPCION'";
    var nIDUsuario = document.getElementById("txt_nIDUsuario").value; 

     // Verificaciones
     if(l_Consulta1.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    if(l_Consulta2.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta1=l_Consulta1.trim();
    l_Consulta2=l_Consulta2.trim();
    

    // ------------------------------------------------------------
    // Detalles
    // Procesar    
    var arreglo1=new Array();
    arreglo1.push( { "consulta":"","condicion":l_Consulta1,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION, "nidusuario":nIDUsuario } );     
     
    var arreglo2=new Array();
    arreglo2.push( { "consulta":"","condicion":l_Consulta2,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION, "nidusuario":nIDUsuario } );     
 
    if(arreglo1.length>0){       
        // Enviar para procesdar
        resultado=Listado_PorFolio(arreglo1,arreglo2); 

        /*if(arreglo2.length>0){       
            resultado=Listado_PorFolio_Detalles(arreglo2); 
        }*/
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
    // ------------------------------------------------------------

}

function fn_Cancelar_OrdenDeSurtido_Clic(){
    fn_Eliminar_ListadoProductos();

    document.getElementById("txt_OrdenDeSurtido").value="";
    document.getElementById("txt_nIDOrdenDeSurtido").value="";
    document.getElementById("bt_BuscarOrden").style.visibility="visible";
    document.getElementById("bt_CancelarOrden").style.visibility="hidden";
    document.getElementById("txt_OrdenDeSurtido").readOnly = false;

    document.getElementById("txt_OrdenDeSurtido").select();
  
    document.getElementById("txt_Almacen_Origen").value="";
    document.getElementById("txt_Almacen_Destino").value="";
}

function fn_Anexar_Codigo_CLick(e){
    if (e.keyCode == 13) {
        fn_Buscar_Codigo_Clic();
    }

}

function fn_Buscar_Codigo_Clic(){
    var Codigo= document.getElementById("txt_Etiqueta").value;
    var nIDOrdenDeSurtido= document.getElementById("txt_nIDOrdenDeSurtido")

    if(Codigo.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO";          
        $("#modal_falla").modal("show");
        return;
    }

    if(nIDOrdenDeSurtido<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONE LA ORDEN DE SURTIDO";          
        $("#modal_falla").modal("show");
        return;
    }

    // Busca el codigo
    var bandEncontrado=0;
    for(j=0;j<listadodeproductos.length;j++){
        if(listadodeproductos[j]["codigo"]==Codigo){
            bandEncontrado=1;
            listadodeproductos[j]["estatus"]="LEIDO";
            break;            
        }
    }        

    if(bandEncontrado){
        fn_Ver_ListadoDeProductos_Estatus();
        document.getElementById("txt_Etiqueta").value="";
        document.getElementById("txt_Etiqueta").select();
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Codigo NO ENCONTRADO en la Orden de Embarque"        
        $("#modal_falla").modal("show");                   
        return;
    }
    
}

function fn_Crear_Detalles_Clic(){
    var nIDOrdenDeSurtido=document.getElementById("txt_nIDOrdenDeSurtido").value;

    if(nIDOrdenDeSurtido<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONE LA ORDEN DE SURTIDO";          
        $("#modal_falla").modal("show");
        return;
    }

    var contador=0;
    if(listadodeproductos.length>0){
        /*
        for(i=0;i<listadodeproductos.length;i++){
            if(listadodeproductos[i]["estatus"]=="LEIDO") {
                contador=contador+1;
            }
        }

        if(contador==listadodeproductos.length){
            resultado=Grabar_Traspaso_Lectura(listadodeproductos); 
        } else{
            document.getElementById("lbl_mensaje_falla").innerHTML="LISTADO NO ESCANEADO COMPLETAMENTE";          
            $("#modal_falla").modal("show");
            return;
        }
        */
       resultado=Grabar_Traspaso_Lectura(listadodeproductos); 
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE LISTADO DE PRODUCTOS";          
        $("#modal_falla").modal("show");
        return;

    }
}

function Reiniciar_Clic(){
    window.open("traspasos_recepcion_detalles.php","_self")
}

// ******************************************************************


/*
 
function fn_Actualizar_Clic(){
    var formulariop = document.getElementById("frm_Actualizar");   
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
        resultado=Actualizar(DATOS); 
        console.log()
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }   
  
}

function fn_Eliminar_Clic(){
    var formulariop = document.getElementById("frm_Actualizar");
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
    arreglo.push({"nid":l_nID});     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Eliminar(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Ocultar_Clic(){
    var formulariop = document.getElementById("frm_Actualizar");
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
        resultado=Estado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Mostrar_Clic(){
    var formulariop = document.getElementById("frm_Actualizar");
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
        resultado=Estado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}




function fn_Ver_Clic(l_Consulta){     
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
        resultado=Ver(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


 


function Reiniciar_Clic(){
    window.open("traspasos_recepcion_detalles.php","_self")
}


function fn_Listado_PorFolio_Clic(){
    var formulariop = document.getElementById("frm_Consultar");
    var l_Consulta="";     
    var i=0;

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){
        if(formulariop.elements[i].name.indexOf("Consulta") != -1){
            l_Consulta=formulariop.elements[i].value;         
        }     
    } 

    // Verificaciones
    if(l_Consulta.length<=0){
        fn_Listado_Clic("Tipo='ENVIO'");
        return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    ULTIMA_CONSULTA=l_Consulta;

    console.log("CAMPO ORDENAMIENTO:"+ CAMPO_ORDENAMIENTO);
    console.log("FORMA ORDENAMIENTO:"+ FORMA_ORDENAMIENTO);
    console.log("ULTIMA CONSULTA:"+ ULTIMA_CONSULTA);
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": CAMPO_ORDENAMIENTO, "formadeordenamiento":FORMA_ORDENAMIENTO} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_PorFolio(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}


// ******************************************************************
// ORDEN DE SURTIDO

function fn_Buscar_Clic(){
    var Codigo_IZeta = document.getElementById("txt_Codigo").value;
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
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Detalles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}
// ******************************************************************




// ******************************************************************



function fn_Consultar_Folio_Clic(l_Consulta){     
   
}

 


function fn_Buscar_Codigo_Clic(){
    var Codigo= document.getElementById("txt_Etiqueta").value;
    var nIDOrdenDeSurtido= document.getElementById("txt_nIDOrdenDeSurtido")

    if(Codigo.length<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO";          
        $("#modal_falla").modal("show");
        return;
    }

    if(nIDOrdenDeSurtido<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONE LA ORDEN DE SURTIDO";          
        $("#modal_falla").modal("show");
        return;
    }

    // Busca el codigo
    var bandEncontrado=0;
    for(j=0;j<listadodeproductos.length;j++){
        if(listadodeproductos[j]["codigo"]==Codigo){
            bandEncontrado=1;
            listadodeproductos[j]["estatus"]="LEIDO";
            break;            
        }
    }        

    if(bandEncontrado){
        fn_Ver_ListadoDeProductos_Estatus_Recepcion();
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Codigo NO ENCONTRADO en la Orden de Surtido"        
        $("#modal_falla").modal("show");                   
        return;
    }
    
}

function fn_Crear_Detalles_Clic(){

    var nIDOrdenDeSurtido=document.getElementById("txt_nIDOrdenDeSurtido").value;
 

    if(nIDOrdenDeSurtido<=0){
        document.getElementById("lbl_mensaje_falla").innerHTML="SELECCIONE LA ORDEN DE SURTIDO";          
        $("#modal_falla").modal("show");
        return;
    }

    var contador=0;
    if(listadodeproductos.length>0){
        for(i=0;i<listadodeproductos.length;i++){
            if(listadodeproductos[i]["Estatus"]=="LEIDO") {
                contador=contador+1;
            }
        }

        resultado=Grabar_Traspaso_Lectura(listadodeproductos); 

 
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE LISTADO DE PRODUCTOS";          
        $("#modal_falla").modal("show");
        return;

    }

}
// ******************************************************************
*/
