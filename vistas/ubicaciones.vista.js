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

var NIDCAT_MATRIZ=0;
function fn_Cargar_Ubicaciones_Disponibles(){
    var nIDCat_Almacen = document.getElementById("cb_nIDCat_Almacen").value;

    NIDCAT_MATRIZ=0;

    if(nIDCat_Almacen<=0){
        console.log("ERROR NO TIENE ID");                 
        //document.getElementById("lbl_mensaje_falla").innerHTML="No tiene Almacen Seleccionado";          
        //$("#modal_falla").modal("show");

        var l_Linea="";
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
        l_Linea=l_Linea + "<div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' ></label>";
        l_Linea=l_Linea + "</div>";         
        l_Linea=l_Linea + "</div>";


        document.getElementById("contenido_ubicaciones").innerHTML=l_Linea;  
        return;
    }
     
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "nid":nIDCat_Almacen} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Cargar_Ubicaciones_Disponibles(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
        document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
        $("#modal_falla").modal("show");
    }
}

function fn_Anterior_Clic(){
    fn_Cargar_Ubicaciones_Disponibles();
}

function fn_Siguiente_Clic(){
     // Busca la ubicacion seleccionada
     var radios = document.getElementsByName('IDMatriz');
     for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio             
            NIDCAT_MATRIZ=radios[i].value;
            document.getElementById("txt_Codigo").select();

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
}


function fn_Agregar_Clic(){
    var CodigoQR = document.getElementById("txt_Codigo").value;
    var nIDCat_Almacen = document.getElementById("cb_nIDCat_Almacen").value;

    if(nIDCat_Almacen<=0){
        console.log("NO TIENE ALMACEN SELECCIONADO");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ALMACEN SELECCIONADO";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
        return;
    }

    if(NIDCAT_MATRIZ<=0){
        console.log("NO TIENE UBICACION SELECCIONADA");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE UBICACION SELECCIONADA";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
        return;
    }


    if(CodigoQR.length>0){
        var arreglo=new Array();
        arreglo.push( { "codigoqr": CodigoQR, "nidcat_almacen": nIDCat_Almacen, "nidcat_matriz": NIDCAT_MATRIZ} );     

        
        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Listado_Cargar_UbicacionTemporal(arreglo); 

        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
            document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
            $("#modal_falla").modal("show");
        }


    } else {
        console.log("ESCANEE O CAPTURE EL CODIGO QR");      
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO QR";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
    }
}



function fn_Cancelar_Clic(){
    document.getElementById("txt_Codigo").value="";
    NIDCAT_MATRIZ=0;
    document.getElementById("contenido_posiciones").innerHTML="";
    fn_Cargar_Ubicaciones_Disponibles();
}

function fn_Guardar_Clic(){

    var CodigoQR = document.getElementById("txt_Codigo").value;
    var nIDCat_Almacen = document.getElementById("cb_nIDCat_Almacen").value;

    if(nIDCat_Almacen<=0){
        console.log("NO TIENE ALMACEN SELECCIONADO");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE ALMACEN SELECCIONADO";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
        return;
    }

    if(NIDCAT_MATRIZ<=0){
        console.log("NO TIENE UBICACION SELECCIONADA");      
        document.getElementById("lbl_mensaje_falla").innerHTML="NO TIENE UBICACION SELECCIONADA";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
        return;
    }


    if(CodigoQR.length>0){
        var arreglo=new Array();
        arreglo.push( { "codigoqr": CodigoQR, "nidcat_almacen": nIDCat_Almacen, "nidcat_matriz": NIDCAT_MATRIZ} );     

        
        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Listado_Grabar_Ubicacion(arreglo); 

        } else {
            console.log("ERROR NO SE CARGO LA INFORMACIÓN");      
            document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
            $("#modal_falla").modal("show");
        }

    } else {
        console.log("ESCANEE O CAPTURE EL CODIGO QR");      
        document.getElementById("lbl_mensaje_falla").innerHTML="ESCANEE O CAPTURE EL CODIGO QR";          
        $("#modal_falla").modal("show");

        document.getElementById("txt_Codigo").select();
    }

}


function fn_Buscar_Clic(){
    var CodigoQR = document.getElementById("txt_Buscar").value;
   
    if(CodigoQR.length>0){
        var arreglo=new Array();
        arreglo.push( { "codigoqr": CodigoQR } );     

        
        if(arreglo.length>0){       
            // Enviar para procesdar
            resultado=Listado_Buscar_Ubicacion(arreglo); 

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



function Cerrar_Clic(){
    window.open("ubicaciones_editar.php","_self")
}




/*







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
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Consultar(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Listado_Clic(){
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
        resultado=Listado(arreglo); 
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

function fn_Listado_Ordenar_Clic(l_CampoOrdenamiento){
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

/*
function fn_Cat_Almacen_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();

    if(l_Consulta.length>0){
        l_Consulta=l_Consulta + " and Activo='SI' and bEstado=0";
    } else {
        l_Consulta="Activo='SI' and bEstado=0";
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "condicion":l_Consulta, "tipo":"directa", "campos":"todos" } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Cat_Almacen_Combo(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}
 




// ******************************************************************
// CARGAR
function fn_Listado_Cargar_Clic(){
    var Archivo = document.getElementById("txt_Archivo").value;

    if(Archivo.length<=0){
        console.log("ERROR NO TIENE ARCHIVO");        

        document.getElementById("txt_Archivo").value="";
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene archivo";          
        $("#modal_falla").modal("show");
    }
     
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "archivo":Archivo} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Cargar(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");

        document.getElementById("txt_Archivo").value="";
        document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
        $("#modal_falla").modal("show");
    }
}


function fn_Listado_Grabar_Clic(){
    var Archivo = document.getElementById("txt_Archivo").value;

    if(Archivo.length<=0){
        console.log("ERROR NO TIENE ARCHIVO");        

        document.getElementById("txt_Archivo").value="";
        document.getElementById("lbl_mensaje_falla").innerHTML="No tiene archivo";          
        $("#modal_falla").modal("show");
    }
     
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "archivo":Archivo} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Listado_Grabar(arreglo); 
    } else {
        console.log("ERROR NO SE GRABO LA INFORMACIÓN");

        document.getElementById("txt_Archivo").value="";
        document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
        $("#modal_falla").modal("show");
    }
}


function fn_Cargar_Archivo_Csv(){
    var l_Ubicacion="../archivos/";
	var arreglo=new Array();
	var cont_Arreglo=0;
    var l_Archivo = document.getElementById("txt_Archivo_Detalles1").value;     

    if(l_Archivo.length>0){
        var formData = new FormData($(".cl_Formulario_Archivo_1")[0]);
 
		 $.ajax({
			 type: "POST",
			 data: formData,
			 cache: false,
			 contentType: false,
			 processData: false,
			 url: "../utilerias/subirarchivo_adjunto_csv.php",
		     }).done(function( msg ) {
				  var l_Resultado=msg.trim();
				 console.log("res:" + l_Resultado);

				 var posicion=l_Resultado.indexOf("FALSE");

			    if(posicion>=0){
                     console.log(l_Resultado);
                     document.getElementById("txt_Archivo").value="";
                     document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
                     $("#modal_falla").modal("show");
			    } else {
			        var l_NomArchivo=l_Resultado;
                    document.getElementById("txt_Archivo").value=l_NomArchivo;       
                    
                    //fn_Mostrar_Listado();
		      }
			 });
    } else {
        document.getElementById("txt_Archivo").value="";
	}
} 
// ******************************************************************

// ******************************************************************
// Ubicaciones











// ******************************************************************

*/