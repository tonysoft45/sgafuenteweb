// ----------------------------------------------------------------------------------
// ambiente_imagenapp.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
 
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

function fn_Consultar_Imagen_Clic(l_Consulta){     
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
        resultado=Consultar_Imagen(arreglo); 
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

function Cerrar_Clic(){
    window.open(MODULO +"_editar.php","_self")
}

// ******************************************************************
// ARCHIVOS
function fn_Cargar_Adjunto_Imagen(){
    var l_Ubicacion="../adjuntos/";
	var arreglo=new Array();
	var cont_Arreglo=0;
    var l_Archivo = document.getElementById("txt_Archivo_Detalles1").value;
    var l_Anterior=document.getElementById("txt_Imagen").value;

    if(l_Archivo.length>0){
        var formData = new FormData($(".cl_Formulario_Archivo_1")[0]);
 
		 $.ajax({
			 type: "POST",
			 data: formData,
			 cache: false,
			 contentType: false,
			 processData: false,
			 url: "../utilerias/subirarchivo_adjunto_imagen.php",
		     }).done(function( msg ) {
				  var l_Resultado=msg.trim();
				 console.log("res:" + l_Resultado);

				 var posicion=l_Resultado.indexOf("FALSE");

			    if(posicion>=0){
                     console.log(l_Resultado);
                     if(l_Anterior.length>0){
                        document.getElementById("txt_Imagen").value=l_Anterior;
                        document.getElementById("img_imagen").src = l_Ubicacion + l_Anterior;
                     } else {
                        document.getElementById("txt_Imagen").value="";
                        document.getElementById("img_imagen").src ="";
                     }
                     
                     //alert("ARCHIVO INVALIDO");
                     
                     document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
                     $("#modal_falla").modal("show");
			    } else {
			        var l_NomArchivo=l_Resultado;
                    document.getElementById("txt_Imagen").value=l_NomArchivo;                     
                    document.getElementById("img_imagen").src = l_Ubicacion + l_NomArchivo;
		      }
			 });
    } else {
		 document.getElementById("txt_Archivo1").value="";
	}
}

function fn_Presentar_Adjunto_Imagen(){
    var l_Ubicacion="../adjuntos/";
    var l_NomArchivo = document.getElementById("txt_Imagen").value;

    console.log("Archivo:" + l_NomArchivo);
 
    if(l_NomArchivo.length>0){
        document.getElementById("img_imagen").src = l_Ubicacion + l_NomArchivo;
    }    
}
// ******************************************************************
 