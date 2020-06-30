// ----------------------------------------------------------------------------------
// entradaporotrosconceptos_deta_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 25/03/2020
// ----------------------------------------------------------------------------------
 
function Crear_Detalles(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/entradaporotrosconceptos_deta_crear.ctrl.php";
      
       document.getElementById("bt_Grabar").style.visibility="hidden";
       $("#modal_espera").modal("show");

       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                             
            
               var obResultado=JSON.parse(l_Resultado);  
               
               $("#modal_espera").modal("hide");

               if(obResultado[0]["retorno"]=="TRUE"){
                   console.log("correcto");     
                   $("#modal_espera").modal("hide");
                   $("#modal_exitoso").modal("show");
 

               } else {        
                   console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);                          
                   document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                   $("#modal_falla").modal("show");
                   document.getElementById("bt_Grabar").style.visibility="visible";
                    
               }
               return obResultado;                
           }
       };

       xmlhttp.open("POST", url, true);
       xmlhttp.send(ob);
    }  else {
        console.log("NO TIENE INFORMACIÓN PARA PROCESAR");
        return "NO TIENE INFORMACIÓN PARA PROCESAR";
    }  
    
}

function Actualizar_Detalles(datos){   
    if(datos.length>0){
         console.log(datos);
        ob = JSON.stringify(datos);
 
        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/entradaporotrosconceptos_deta_actualizar.ctrl.php";
       
        document.getElementById("bt_Grabar").style.visibility="hidden";
        $("#modal_espera").modal("show");
 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;     
                console.log(l_Resultado);
                              
             
                var obResultado=JSON.parse(l_Resultado);  
                
                $("#modal_espera").modal("hide");
 
                if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");     
                    $("#modal_espera").modal("hide");
                    $("#modal_exitoso").modal("show");
 
                } else {        
                    console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);                          
                   document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                   $("#modal_falla").modal("show");
                   document.getElementById("bt_Grabar").style.visibility="visible";
                }
                return obResultado;                
            }
        };
 
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
     }  else {
         console.log("NO TIENE INFORMACIÓN PARA PROCESAR");
         return "NO TIENE INFORMACIÓN PARA PROCESAR";
     } 
}

function Eliminar_Detalles(datos){    
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/entradaporotrosconceptos_deta_eliminar.ctrl.php";
       
       document.getElementById("bt_Eliminar").style.visibility="hidden";
       $("#modal_espera").modal("show");
      
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  

               console.log(l_Resultado);
               var obResultado=JSON.parse(l_Resultado);

               $("#modal_espera").modal("hide");
               
               if(obResultado[0]["retorno"]=="TRUE"){
                  console.log("correcto");      
                  $("#modal_espera").modal("hide");
                  $("#modal_exitoso").modal("show");
               } else {                    
                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];
                    $("#modal_falla").modal("show");
                    document.getElementById("bt_Grabar").style.visibility="visible";         
               }
               return obResultado;
           }
       };

       xmlhttp.open("POST", url, true);
       xmlhttp.send(ob);
    }  
}

function Estado_Detalles(datos){        
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/entradaporotrosconceptos_deta_estado.ctrl.php";

       document.getElementById("bt_Eliminar").style.visibility="hidden";
       $("#modal_espera").modal("show");
      
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  

               console.log(l_Resultado);
               var obResultado=JSON.parse(l_Resultado);

               $("#modal_espera").modal("hide");
               
               if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");       
                    $("#modal_espera").modal("hide");
                    $("#modal_exitoso").modal("show");
               } else {                    
                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];
                    $("#modal_falla").modal("show");
                    document.getElementById("bt_Eliminar").style.visibility="visible";                 
               }

               return obResultado;
           }
       };

       xmlhttp.open("POST", url, true);
       xmlhttp.send(ob);
    }  
}
  
function Ver_Detalles(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/entradaporotrosconceptos_deta_consultar.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

          
               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var h=0;
               var l_Registros="";
               var l_Linea="";
               var l_Llave="";
               var especiales=new Array();
               var especiales_tipo=new Array();
               var bandEncontrado=0;
               var l_Tipo="";

               var formulariop = document.getElementById("frm_Actualizar");   

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

               for(i=0;i<contador;i++){     
                   l_Registros="";                    

                   if(obResultado[i]["retorno"]=="TRUE"){ 
                        
                       for (var campo in obResultado[i]) {

                            if(campo!="retorno" && campo!="msg" && campo!="llave" ){
                                if(l_Llave==campo){
                                   // console.log("ENCONTRADO");
                                } else {
                                
                                    if(campo=="especiales"){
                                        for (var campo_e in obResultado[i][campo]) {
                                            //console.log("ESPECIALES:" + campo_e + ":" + obResultado[i][campo][campo_e]);        
                                            especiales.push( { "campo" : campo_e, "tipo": obResultado[i][campo][campo_e] } );                                                   
                                        }                                         
                                    }

                                    //console.log(especiales);

                                    for (k=0;k<formulariop.elements.length;k++){
                                        sCampo=formulariop.elements[k].name;
                                        sCampo=sCampo.trim();
                                        if(sCampo.length>0){
                                            if(sCampo==campo){  
                                                //console.log("campo:" + sCampo);   
                                                //console.log("VALOR:" + obResultado[i][campo]);      
                                                
                                                bandEncontrado=0;
                                                l_Tipo="";
                                                for(h=0;h<especiales.length;h++){
                                                    
                                                    if(especiales[h]["campo"]==campo){
                                                        console.log("especiales:" + especiales[h]["campo"] + ":" + especiales[h]["tipo"]);
                                                        l_Tipo=especiales[h]["tipo"];
                                                        bandEncontrado=1;
                                                        break;
                                                    }
                                                }

                                                formulariop.elements[k].value=obResultado[i][campo];
                                                 
                                            }
                                        }     
                                    }                                                                   
                                }                                
                            } else {
                                if(campo=="llave" ){
                                    l_Llave=obResultado[i]["llave"];                                    
                                }
                            }                            
                       }                     
                   }
               }                    
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}



function Listado_Detalles(datos){    
    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/salidaporotrosconceptos_deta_consultar_todos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
            var l_Resultado=this.responseText;  
            console.log(l_Resultado);  

            var obResultado=JSON.parse(l_Resultado);
                           
            var contador=obResultado.length;
            var i=0;               
            var l_Linea="";
          
            // ----------------------------------------------------------------
            // Construye la respuesta de la consulta
            // Campos      
            for(i=0;i<contador;i++){     
                l_Registros="";
                l_nID=0;
                
                 

                if(obResultado[i]["retorno"]=="TRUE"){ 
                    

                    fn_Agregar_Ver(obResultado[i]["nIDProducto"], obResultado[i]["Codigo"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], 1, obResultado[i]["nIDSalidaPorOtrosConceptos"], 0);

                } else {
                   
                }
            }     

            
            // ----------------------------------------------------------------             
        
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }


    
}

function Validar_Detalles(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/packinglist_deta_validar.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                             
            
               var obResultado=JSON.parse(l_Resultado);  
               
               //$("#modal_espera").modal("hide");

               if(obResultado[0]["retorno"]=="TRUE"){
                   console.log("correcto");     
                     
                   $("#modal_exitoso").modal("show");

                   document.getElementById("txt_Etiqueta").value="";

                   // Mostrar los detalles
                   fn_Cargar_Detalles_Seleccionado();


               } else {        
                   console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);                          
                   document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                   $("#modal_falla").modal("show");
                   document.getElementById("bt_Grabar").style.visibility="visible";
                    
               }
               return obResultado;                
           }
       };

       xmlhttp.open("POST", url, true);
       xmlhttp.send(ob);
    }  else {
        console.log("NO TIENE INFORMACIÓN PARA PROCESAR");
        return "NO TIENE INFORMACIÓN PARA PROCESAR";
    }  
    
}

// *******************************************************************
// SALIDAS DETALLES
var NIDSALIDAPOROTROSCONCEPTOS=0;

function Anexar_Detalles(datos) {

    if(datos.length>0){
        var nIDSalidaPorOtrosConceptos=datos[0]["nidsalidaporotrosconceptos"];
        var nIDUsuario=datos[0]["nidusuario"];

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/entradasporotrosconceptos_consultar_producto.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;               
               var l_Linea="";
             
               // -------------------------------------------------------------- 
               // Construye la respuesta de la consulta
               // Campos      
               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_nID=0;
                   
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 
                    fn_Agregar(obResultado[i]["nIDProducto"], obResultado[i]["Codigo"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], 1, nIDSalidaPorOtrosConceptos, nIDUsuario);
 
                   } else {
                    document.getElementById("lbl_mensaje_falla").innerHTML="CODIGO NO ENCONTRADO";             
                    $("#modal_falla").modal("show");
            
                    document.getElementById("txt_Etiqueta").select();
                    return;
                   }
               }     
               // ----------------------------------------------------------------
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}


function fn_Agregar(l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, l_Cantidad, nIDSalidaPorOtrosConceptos, nIDUsuario){
     
    l_Codigo=l_Codigo.trim();
    l_Producto=l_Producto.trim();
    l_UnidadDeMedida=l_UnidadDeMedida.trim();
     
    // Anexa los datos al listado de productos
    var bandEncontrado=0;
    var i=0;
    for(i=0;i<listadodeproductos.length;i++){
        if(listadodeproductos[i]["nidproducto"]==l_nIDProducto){
            bandEncontrado=1;
            break;
        }
    }

    listadodeproductos.push( { "nidentradaporotrosconceptos_deta":0,"nidsalidaporotrosconceptos":nIDSalidaPorOtrosConceptos, "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "cantidad":l_Cantidad, "nidusuario":nIDUsuario } );     

    // Presenta la inforamción en la pantalla   
    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Producto </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Unidad de Medida </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Cantidad </label>";
    l_Linea=l_Linea + "</div>";
 

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
        l_Linea=l_Linea + "</div>";   
   
        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  

    document.getElementById("txt_Etiqueta").value="";
     
    document.getElementById("txt_Etiqueta").select();

}


function fn_Agregar_Ver(l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, l_Cantidad, nIDSalidaPorOtrosConceptos, nIDUsuario){
     
    l_Codigo=l_Codigo.trim();
    l_Producto=l_Producto.trim();
    l_UnidadDeMedida=l_UnidadDeMedida.trim();
    
    listadodeproductos.push( { "nidsalidaporotrosconceptos_deta":0,"nidsalidaporotrosconceptos":nIDSalidaPorOtrosConceptos, "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "cantidad":l_Cantidad, "nidusuario":nIDUsuario } );     

    // Presenta la inforamción en la pantalla   
    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Producto </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Unidad de Medida </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Cantidad </label>";
    l_Linea=l_Linea + "</div>";
 

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
        l_Linea=l_Linea + "</div>";   
   
        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;
}

function Listado_Grabar_Salida(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/salidasporotrosconceptos_grabar.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;    
               var l_Linea="";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos          
               if(contador>0){
                  for(i=0;i<contador;i++){     
                    l_Registros="";
                     
 
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                        $("#modal_exitoso").modal("show");

                        // Actividades a realizar
                        
                    } else {
                        // No se guardo la ubicacion
                        console.log(obResultado[0]["msg"]);   
                        console.log(obResultado);                          
                        document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                        $("#modal_falla").modal("show");                   
                    }
                     
                  }     
               } else {
                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                    $("#modal_falla").modal("show");
               }                 
               // ----------------------------------------------------------------                        
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}


function fn_Eliminar_ListadoProductos(){
   
    for(i=0;i<listadodeproductos.length;i++){
        listadodeproductos.pop();
    }

    listadodeproductos.pop();
 
    fn_Ver_ListadoDeProductos_Estatus();

}

function fn_Ver_ListadoDeProductos_Estatus(){
    // Presenta la inforamción en la pantalla   
    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
    l_Linea=l_Linea + "</div>";
  
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Producto </label>";
    l_Linea=l_Linea + "</div>";
  
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Unidad de Medida </label>";
    l_Linea=l_Linea + "</div>";
  
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Cantidad </label>";
    l_Linea=l_Linea + "</div>";
  
  
    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
  
        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
        l_Linea=l_Linea + "</div>";  
  
        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  
  
        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  
  
        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
        l_Linea=l_Linea + "</div>";   
   
        l_Linea=l_Linea + "</div>";
    }
  
    document.getElementById("contenido_productos").innerHTML=l_Linea;  
  }
  
  function Listado_Folio(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/salidaporotrosconceptos_consultar_todos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                                             
               var l_nID=0;             

               if(obResultado[0]["retorno"]=="TRUE"){ 
                    l_nID=obResultado[0]["nIDSalidaPorOtrosConceptos"];
                    NIDENTRADAPOROTROSCONCEPTOS=l_nID;

                    if( l_nID<=0){
                        console.log(obResultado[0]["msg"]);   
                        console.log(obResultado);                          
                        document.getElementById("lbl_mensaje_falla").innerHTML="Folio NO Encontrado";                  
                        $("#modal_falla").modal("show");
                        document.getElementById("bt_Grabar").style.visibility="visible";
                        document.getElementById("lbl_Salida").innerHTML="";
    
                   }
                             
                   document.getElementById("txt_nIDSalidaPorOtrosConceptos").value=l_nID;   
                   var l_Resumen=obResultado[0]["Folio"] + "," + obResultado[0]["Fecha"] + "," + obResultado[0]["Almacen"] + "," + obResultado[0]["ConceptoSalida"];    
                   document.getElementById("lbl_Salida").innerHTML=l_Resumen;

                   document.getElementById("bt_Buscar").style.visibility="hidden";
                   document.getElementById("bt_Cancelars").style.visibility="visible";
                   document.getElementById("txt_Salida").readOnly = true;

                   document.getElementById("txt_Etiqueta").select();
               } else {

                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML="Folio NO Encontrado";                  
                    $("#modal_falla").modal("show");
                    document.getElementById("bt_Grabar").style.visibility="visible";
                    document.getElementById("lbl_Salida").innerHTML="";
               }

               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

// *******************************************************************
