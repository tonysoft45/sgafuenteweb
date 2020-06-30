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
        var url = UBICACION_CONTROL + "/inventarioxubicacion_deta_consultar_todos.ctrl.php";
 
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
                    fn_Ver_Detalles(obResultado[i]["nIDIxU_Deta"],obResultado[i]["nIDIxU"],obResultado[i]["nIDUbicacion"],obResultado[i]["Almacen"], obResultado[i]["Rack"], obResultado[i]["Columna"], obResultado[i]["Nivel"], obResultado[i]["SubNivel"],
                    obResultado[i]["Pasillo"],obResultado[i]["nIDProducto"], obResultado[i]["Codigo_IZeta"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], "", obResultado[i]["Existencia"],obResultado[i]["Conteo"],obResultado[i]["Diferencia"],obResultado[i]["Estado"] );
                }  
            }     
            // ----------------------------------------------------------------             
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

 
function fn_Ver_Detalles(l_nIDIxA_Deta, l_nIDIxA, l_nIDUbicacion, l_Almacen, l_Rack, l_Columna, l_Nivel, l_SubNivel, l_Pasillo, l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, l_Estado, l_Existencia, l_Conteo, l_Diferencia, l_Estado){
     
    l_Codigo=l_Codigo.trim();
    l_Producto=l_Producto.trim();
    l_UnidadDeMedida=l_UnidadDeMedida.trim();
    
    listadodeproductos.push( { "nidixa_deta":l_nIDIxA_Deta,"nidixa":l_nIDIxA, "nidubicacion":l_nIDUbicacion, "almacen":l_Almacen, "rack":l_Rack, "columna":l_Columna, "nivel":l_Nivel, "subnivel":l_SubNivel, "pasillo":l_Pasillo,  "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "existencia":l_Existencia, "conteo":l_Conteo, "diferencia":l_Diferencia, "estado":l_Estado } );     

    var l_Ubicacion=l_Almacen + "," + l_Pasillo + "," + l_Rack + "," + l_Columna + "," + l_Nivel + "," + l_SubNivel;

    // Presenta la inforamción en la pantalla  
    var l_Linea="";   
 
    l_Linea="<div class='d-md-block' >"; 
    l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center'  style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

    l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-left align-items-center w-3' style='height: 40px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Ubicacion</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center w-20' style='height: 40px; text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-3 d-flex justify-content-left align-items-center w-20' style='height: 40px; text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Producto </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-left align-items-center w-10' style='height: 40px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Unidad de Medida </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center w-7' style='height: 40px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Estado </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center w-13' style='height: 40px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Conteo </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center w-13' style='height: 40px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Existencia </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center w-13' style='height: 40px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Diferencia </label>";
    l_Linea=l_Linea + "</div>";

 

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;font-size:8px;'>";

        l_Linea=l_Linea + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block ' >";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   l_Ubicacion + "</label>";
        l_Linea=l_Linea + "</div>"; 
        
        l_Linea=l_Linea + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block ' >";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-3  justify-content-start align-items-left w' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-2  justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-1  justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-1  justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["conteo"] + "</label>";
        l_Linea=l_Linea + "</div>";   

        l_Linea=l_Linea + "<div class='col-md-1  justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["existencia"] + "</label>";
        l_Linea=l_Linea + "</div>";   
   
        l_Linea=l_Linea + "<div class='col-md-1 justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
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
        var nIDIxU=datos[0]["nidixu"];
        var Codigo=datos[0]["codigo"];
        var nIDUsuario=datos[0]["nidusuario"];        
        var nIDCat_Estado=datos[0]["nidcat_estado"];
        var Estado=datos[0]["estado"];

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inventarioxubicacion_deta_consultar_todos.ctrl.php";
 
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
                        fn_Agregar(obResultado[i]["nIDIxU_Deta"],obResultado[i]["nIDIxU"],obResultado[i]["nIDUbicacion"],obResultado[i]["Almacen"], obResultado[i]["Rack"], obResultado[i]["Columna"], obResultado[i]["Nivel"], obResultado[i]["SubNivel"],
                        obResultado[i]["Pasillo"],obResultado[i]["nIDProducto"], obResultado[i]["Codigo_IZeta"], obResultado[i]["Producto"], obResultado[i]["UnidadDeMedida"], obResultado[i]["Existencia"],1,
                        obResultado[i]["Diferencia"],Estado, nIDCat_Estado,nIDUsuario );
 
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

function fn_Agregar(l_nIDIxU_Deta, l_nIDIxU, l_nIDUbicacion, l_Almacen, l_Rack, l_Columna, l_Nivel, l_SubNivel, l_Pasillo, l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, 
                    l_Existencia, l_Conteo, l_Diferencia, l_Estado, l_nIDCat_Estado, l_nIDUsuario){
     
    l_Codigo=l_Codigo.trim();
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
        listadodeproductos.push( { "nidixu_deta":l_nIDIxU_Deta,"nidixu":l_nIDIxU, "nidubicacion":l_nIDUbicacion, "almacen":l_Almacen, "rack":l_Rack, "columna":l_Columna, "nivel":l_Nivel, "subnivel":l_SubNivel, "pasillo":l_Pasillo,  "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "existencia":l_Existencia, "cantidad":l_Conteo, "diferencia":l_Diferencia, "estado":l_Estado, "nidcat_estado":l_nIDCat_Estado, "nidusuario":l_nIDUsuario } );     
    }
    

    var l_Ubicacion=l_Almacen + "," + l_Pasillo + "," + l_Rack + "," + l_Columna + "," + l_Nivel + "," + l_SubNivel;


    // Presenta la inforamción en la pantalla   
    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

    l_Linea=l_Linea + "<div class='col-md-3 d-flex justify-content-left align-items-center' style='text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Ubicacion</label>";
    l_Linea=l_Linea + "</div>";


    l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-left align-items-center' style='text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-3 d-flex justify-content-left align-items-center' style='text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Producto </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-2  d-flex justify-content-left align-items-center' style='text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Unidad de Medida </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Estado </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Conteo </label>";
    l_Linea=l_Linea + "</div>";
 

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col-md-3 d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   l_Ubicacion + "</label>";
        l_Linea=l_Linea + "</div>"; 

        l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-3 d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["producto"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["unidaddemedida"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
        l_Linea=l_Linea + "</div>";   

        l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
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
        var url = UBICACION_CONTROL + "/inventarioxubicacion_deta_actualizar.ctrl.php";
 
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
        var url = UBICACION_CONTROL + "/inventarioxubicacion_ajustar.ctrl.php";
 
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