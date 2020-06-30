// ----------------------------------------------------------------------------------
// packinglist.vista.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
 
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
    var formulariop = document.getElementById("frm_Actualizar");   
    var LECTURA=[];
    var CAMPO=[];      
    var i=0;
    var sCampo="";
    var Fecha="";
    
    var bFechaImportacion=1;

    // Extrae la información
    for (i=0;i<formulariop.elements.length;i++){        
        sCampo=formulariop.elements[i].name;
        sCampo=sCampo.trim();
        if(sCampo.length>0){
            //console.log("campo:" + sCampo + "=" + formulariop.elements[i].value.trim() + ", " + formulariop.elements[i].type.trim()); 
            if(sCampo=="FechaImportacion"){
                Fecha=formulariop.elements[i].value.trim();
                console.log("Fecha:"+ Fecha);

                if(Fecha.length!=10){
                    console.log("Invalido");
                    bFechaImportacion=0;
                    break;
                }
            }

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

    if(bFechaImportacion){
 
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
        
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Fecha de Importacion Invalida";                   
        $("#modal_falla").modal("show");
        document.getElementById("bt_Grabar").style.visibility="visible";
    }     
}

function fn_Cancelar_Clic(){     
    var l_nID=0;     
    var i=0;

    l_nID= document.getElementById("txt_nID").value;

    // Verificaciones
    if(l_nID.length<=0){
        console.log("ERROR NO TIENE ID ACCESO");
        return;
    } 
 
    // Validaciones
    if(!validarSiNumero(l_nID)){
        console.log("ERROR ID ACCION INVALIDO");
        return;
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( {"nid":l_nID, "estado":2} );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Estado(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}

function fn_Presentar_Adjunto_Archivo(){
    var l_Archivo = document.getElementById("txt_Archivo").value;
    var obj={};
    var datos=new Array();
    datos.push( { "archivo":l_Archivo} );    
   
    if(datos.length>0){
         ob = JSON.stringify(datos);
 
         var xmlhttp = new XMLHttpRequest();
         var url = UBICACION_CONTROL + "/" + MODULO + "_cargar.ctrl.php";
 
         xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var l_Resultado=this.responseText;  
             console.log(l_Resultado);  
 
             var obResultado=JSON.parse(l_Resultado);
 
             console.log(obResultado);
 
             var obResultado=JSON.parse(l_Resultado);
                           
             var contador=obResultado.length;
             var i=0;
             var l_Registros="";
             var l_Linea="";
 
              
             l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + "<label style='cursor:pointer;' > Carton </label>";
             l_Linea=l_Linea + "</div>";    
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
             l_Linea=l_Linea + "</div>";    
             
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea+"<label style='cursor:pointer;' > Producto</label>";
             l_Linea=l_Linea+"</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
             l_Linea=l_Linea+"</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
             l_Linea=l_Linea + "</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad/Caja (Pc/Set)</label>";
             l_Linea=l_Linea + "</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
             l_Linea=l_Linea + "</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Bruto (Kgs)</label>";
             l_Linea=l_Linea + "</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Neto (Kgs) </label>";
             l_Linea=l_Linea + "</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + " <label style='cursor:pointer;' > Total (M3)</label>";
             l_Linea=l_Linea + "</div>";
 
             l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
             l_Linea=l_Linea + "    <label style='cursor:pointer;' > Estatus </label>";
             l_Linea=l_Linea + "</div>";
             
             l_Linea=l_Linea + "</div>";

             
 
             for(i=0;i<contador;i++){    
                 l_Registros=""; 
                 
                 l_Registros=l_Registros + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                 if(obResultado[i]["retorno"]=="TRUE"){ 
 
                     for (var campo in obResultado[i]) {
 
                         //console.log("Campo:" + campo);
                         if(campo=="carton"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="codigo"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="producto"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="descripcion"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="cantidadpc"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="cantidadcaja"){
                            l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="cajas"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="pesobruto"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="pesoneto"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="totalm3"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
 
                         if(campo=="estatus"){
                             l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";  
                             l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                             l_Registros=l_Registros + "</div>";    
                         }
                    }
  
                    l_Linea = l_Linea + "<br>" + l_Registros;
 
                 } else {
                     l_Linea = l_Linea + "<br>" + l_Registros;
                 }
 
                 l_Linea=l_Linea + "</div>";
             
             }
 
             //console.log(l_Linea);
             document.getElementById("contenido_productos").innerHTML=l_Linea;  
 
         }        
         };
 
      xmlhttp.open("POST", url, true);
      xmlhttp.send(ob);
     }    
       
 }
 

 function fn_Subir_Archivo(){   
    var l_Archivo = document.getElementById("txt_Archivo_Detalles1").value;
    var l_Anterior=document.getElementById("txt_Archivo").value;

    if(l_Archivo.length>0){
        var formData = new FormData($(".cl_Formulario_Archivo_1")[0]);
 
		 $.ajax({
			 type: "POST",
			 data: formData,
			 cache: false,
			 contentType: false,
			 processData: false,
             //url: "../utilerias/subirarchivo_adjunto_archivo.php"
             url: "../utilerias/subirarchivo_adjunto_excel.php",
		     }).done(function( msg ) {
				  var l_Resultado=msg.trim();
				 console.log("res:" + l_Resultado);

				 var posicion=l_Resultado.indexOf("FALSE");

			    if(posicion>=0){
                     console.log(l_Resultado);
                     if(l_Anterior.length>0){
                        document.getElementById("txt_Archivo").value=l_Anterior;                         
                     } else {
                        document.getElementById("txt_Archivo").value="";                         
                     }
                     
                     //alert("ARCHIVO INVALIDO");
                     
                     document.getElementById("lbl_mensaje_falla").innerHTML="Archivo Invalido";          
                     $("#modal_falla").modal("show");
			    } else {
			        var l_NomArchivo=l_Resultado;
                    document.getElementById("txt_Archivo").value=l_NomArchivo;  
                    
                    // Cargar la informacion en el formulario
                    fn_Presentar_Adjunto_Archivo();
		      }
			 });
    } else {
		 document.getElementById("txt_Archivo").value="";
	}
}


function Cerrar_Clic(){
    window.open(MODULO +".php","_self")
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

function fn_Consultar_PackingList_Clic(l_Consulta){     
    // Verificaciones
    if(l_Consulta.length<=0){
        console.log("ERROR NO TIENE CONSULTA");
        //return;
    } 

    // Limpia la información
    l_Consulta=l_Consulta.trim();
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta,"tipo":"general", "campos":"definidos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO, "cantidadregistros":NUMERODEREGISTROS,"modulo":MODULO, "accion":ACCION } );     

    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Consultar_PackingList(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}




function fn_PackingList_Clic(l_Consulta,l_Seleccion,l_Accion){   
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
        l_Consulta=" bEstado=0";
    }
    
    // Procesar
    var arreglo=new Array();
    arreglo.push( { "consulta":"","condicion":l_Consulta, "seleccion":l_Seleccion, "tipo":"directa", "campos":"todos","campodeordenamiento": "", "formadeordenamiento":FORMA_ORDENAMIENTO,"cantidadregistros":NUMERODEREGISTROS, "modulo":MODULO, "accion":l_Accion } );


    if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=PackingList_Combo(arreglo); 
    } else {
        console.log("ERROR NO SE CARGO LA INFORMACIÓN");
    }
}
// ************************************************************************************************

 