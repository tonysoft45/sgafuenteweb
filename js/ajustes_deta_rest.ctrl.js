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
 
function Listado_Detalles(datos){        
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inventarioxarticulo_deta_consultar_todos.ctrl.php";
 
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
                    fn_Ver_Detalles(0,0,obResultado[i]["nIDProducto"], obResultado[i]["Codigo_IZeta"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], "", obResultado[i]["Existencia"],obResultado[i]["Conteo"],obResultado[i]["Diferencia"],obResultado[i]["Estado"] );
                }  
            }     
            // ----------------------------------------------------------------             
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

 
function fn_Ver_Detalles(l_nIDIxA_Deta, l_nIDIxA, l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, l_Estado, l_Existencia, l_Conteo, l_Diferencia, l_Estado){
     
    l_Codigo=l_Codigo.trim();
    l_Producto=l_Producto.trim();
    l_UnidadDeMedida=l_UnidadDeMedida.trim();
    
    listadodeproductos.push( { "nidixa_deta":l_nIDIxA_Deta,"nidixa":l_nIDIxA, "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "existencia":l_Existencia, "conteo":l_Conteo, "diferencia":l_Diferencia, "estado":l_Estado } );     

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
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Estado </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Conteo </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Existencia </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Diferencia </label>";
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
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["conteo"] + "</label>";
        l_Linea=l_Linea + "</div>";   

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["existencia"] + "</label>";
        l_Linea=l_Linea + "</div>";   
   
        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["diferencia"] + "</label>";
        l_Linea=l_Linea + "</div>";   

        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  

}

// **************************************************************************
 

var NIDENTRADAPOROTROSCONCEPTOS=0;

function Anexar_Detalles(datos) {

    if(datos.length>0){
        var nIDIxA=datos[0]["nidixa"];
        var Codigo=datos[0]["codigo"];
        var nIDUsuario=datos[0]["nidusuario"];
        var nIDCat_Producto=datos[0]["nidcat_producto"];
        var nIDCat_Estado=datos[0]["nidcat_estado"];
        var Estado=datos[0]["estado"];

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inventarioxarticulo_deta_consultar_todos.ctrl.php";
 
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
                   
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 
                        fn_Agregar(obResultado[i]["nIDIxA_Deta"],obResultado[i]["nIDIxA"], obResultado[i]["nIDProducto"], obResultado[i]["Codigo_IZeta"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], nIDCat_Estado, Estado, 1, nIDUsuario,obResultado[i]["Existencia"] );
 
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

function fn_Agregar(l_nIDIxA_Deta, l_nIDIxA, l_nIDProducto, l_Codigo_IZeta, l_Producto, l_UnidadDeMedida, l_nIDCat_Estado, l_Estado, l_Cantidad, l_nIDUsuario, l_Existencia){
     
    l_Codigo_IZeta=l_Codigo_IZeta.trim();
    l_Producto=l_Producto.trim();
    l_UnidadDeMedida=l_UnidadDeMedida.trim();
    
 
    // Anexa los datos al listado de productos
    var bandEncontrado=0;
    var i=0;
    for(i=0;i<listadodeproductos.length;i++){
        if(listadodeproductos[i]["nidproducto"]==l_nIDProducto){
            listadodeproductos[i]["cantidad"]=listadodeproductos[i]["cantidad"]+1;
            bandEncontrado=1;
            break;
        }
    } 

    if(bandEncontrado==0){
        listadodeproductos.push( { "nidixa_deta":l_nIDIxA_Deta,"nidixa":l_nIDIxA, "nidproducto":l_nIDProducto,"codigo_izeta": l_Codigo_IZeta, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "cantidad":l_Cantidad, "nidcat_estado":l_nIDCat_Estado, "estado":l_Estado, "nidusuario":l_nIDUsuario, "existencia":l_Existencia } );     
    }
    

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
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Estado </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Conteo </label>";
    l_Linea=l_Linea + "</div>";
 

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo_izeta"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
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


function Listado_Grabar_Conteo(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inventarioxarticulo_deta_actualizar.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;    
                
               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos          
               if(contador>0){
                  for(i=0;i<contador;i++){     
                    l_Registros="";
                     
 
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                        $("#modal_exitoso").modal("show");
 
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

function Ajustar_Inventario(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inventarioxarticulo_ajustar_individual.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;    
                
               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos          
               if(contador>0){
                  for(i=0;i<contador;i++){     
                    l_Registros="";
                     
 
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                        $("#modal_exitoso").modal("show");

                        
 
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

// **************************************************************************

// **************************************************************************

function Listado_Grabar_Entrada(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/entradasporotrosconceptos_grabar.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;    
                
               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos          
               if(contador>0){
                  for(i=0;i<contador;i++){     
                    l_Registros="";
                     
 
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                        $("#modal_exitoso").modal("show");
 
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



function Listado_Folio(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/entradaporotrosconceptos_consultar_todos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
               var l_nID=0;
              

               if(obResultado[0]["retorno"]=="TRUE"){ 
                    l_nID=obResultado[0]["nIDEntradaPorOtrosConceptos"];
                    NIDENTRADAPOROTROSCONCEPTOS=l_nID;
                    
                    var l_Resumen=obResultado[0]["Folio"] + "," + obResultado[0]["Fecha"] + "," + obResultado[0]["Almacen"] + "," + obResultado[0]["ConceptoEntrada"];    
                    document.getElementById("lbl_Entrada").innerHTML=l_Resumen;

                    document.getElementById("bt_Buscar").style.visibility="hidden";
                    document.getElementById("bt_Cancelars").style.visibility="visible";
                    document.getElementById("txt_Entrada").readOnly = true;

                    document.getElementById("txt_Etiqueta").select();

               }

               if( l_nID<=0){
                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML="Folio NO Encontrado";                  
                    $("#modal_falla").modal("show");
                    document.getElementById("bt_Grabar").style.visibility="visible";
               }
                         
               document.getElementById("txt_nIDEntradaPorOtrosConceptos").value=l_nID;                 
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

// ******************************************************************