// ----------------------------------------------------------------------------------
// ubicaciones_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 25/03/2020
// ----------------------------------------------------------------------------------
 

function Listado_Cargar_Ubicaciones_Disponibles(datos){    
    var bandError=0;

    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ubicaciones_consultar.ctrl.php";
 
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
                    l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
 
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                         l_nIDMatriz=obResultado[i]["nIDCat_Matriz"];
                         l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
 
                         l_Linea=l_Linea + "   <input type='radio' id='rb_" + i + "' name='IDMatriz' value='" + l_nIDMatriz + "'>";                        
                         l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["RazonSocial"]  + "," + obResultado[i]["Almacen"] +  "," + obResultado[i]["Pasillo"] + "," +  obResultado[i]["Rack"] + "," + obResultado[i]["Columna"] + "," +  obResultado[i]["Nivel"] + "," + obResultado[i]["SubNivel"] + "</label>";
                         l_Linea=l_Linea + "</div>";         
                    } else {
                        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                        l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                        l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" + "NO TIENE UBICACIONES DISPONIBLES" + "</label>";
                        l_Linea=l_Linea + "</div>";         
                        l_Linea=l_Linea + "</div>";

                        bandError=1;

                        break;
                    }
                    l_Linea=l_Linea + "</div>";
                  }   
                  
                  


               } else {
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                   l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                   l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >NO TIENE UBICACIONES DISPONIBLES</label>";
                   l_Linea=l_Linea + "</div>";         
                   l_Linea=l_Linea + "</div>";
               }   

               if(bandError){
                l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                l_Linea=l_Linea+ "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" + "NO TIENE UBICACIONES DISPONIBLES" + "</label>";
                l_Linea=l_Linea + "</div>";         
                l_Linea=l_Linea + "</div>";
                l_Linea=l_Linea + "</div>";

                document.getElementById("contenido_ubicaciones").innerHTML=l_Linea;  
               } else {
                    document.getElementById("contenido_ubicaciones").innerHTML=l_Linea;  
               }
              

               //$("#modal_espera").modal("hide");
               
               
               // ----------------------------------------------------------------                        
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}


function Listado_Grabar_Ubicacion(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ubicaciones_producto_grabar.ctrl.php";
 
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
                        fn_Cancelar_Clic();
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


function Listado_Cargar_UbicacionTemporal(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ubicaciones_producto_consultar.ctrl.php";
 
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
                         l_nIDMatriz=obResultado[i]["nIDCat_Matriz"];


                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "      <label style='cursor:pointer;font-family:Arial Black, Gadget, sans-serif; margin-left:10px;' >Almacen </label>";
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["IDAlmacen"] + "," + obResultado[i]["Almacen"] +  "</label>";
                         l_Linea=l_Linea + "  </div>";     
                         
                         l_Linea=l_Linea + "</div>";

                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "      <label style='cursor:pointer;font-family:Arial Black, Gadget, sans-serif; margin-left:10px;' >Ubicacion </label>";
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["Pasillo"] + "," +  obResultado[i]["Rack"] + "," + obResultado[i]["Columna"] + "," + obResultado[i]["Nivel"] + "," + obResultado[i]["SubNivel"] + "</label>";
                         l_Linea=l_Linea + "  </div>";     
                         
                                                    
                         l_Linea=l_Linea + "</div>";

                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "      <label style='cursor:pointer;font-family:Arial Black, Gadget, sans-serif; margin-left:10px;' >Producto </label>";
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["Codigo"] + "," +  obResultado[i]["Producto"] + "</label>";                        
                         l_Linea=l_Linea + "  </div>";     
                         
                                                    
                         l_Linea=l_Linea + "</div>";

                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                                              
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' > Pzas x caja:" +   obResultado[i]["CantidadCaja"] + "</label>";
                         l_Linea=l_Linea + "  </div>";     
                         
                                                    
                         l_Linea=l_Linea + "</div>";

                    } else {
                         l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                         l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' > " + obResultado[i]["msg"] +  "</label>";
                         l_Linea=l_Linea + "</div>";   
                         break;
                    }
                    l_Linea=l_Linea + "</div>";
                  }     
               } else {
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                   l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                   l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >NO SE ENCONTRO REGISTRADO EL CODIGO DEL PRODUCTO EN EL SISTEMA</label>";
                   l_Linea=l_Linea + "</div>";         
                   l_Linea=l_Linea + "</div>";
               }   
              

               //$("#modal_espera").modal("hide");
               document.getElementById("contenido_posiciones").innerHTML=l_Linea;  
               
               // ----------------------------------------------------------------                        
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function Listado_Buscar_Ubicacion(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ubicaciones_producto_buscar.ctrl.php";
 
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
                         l_nIDMatriz=obResultado[i]["nIDCat_Matriz"];


                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "      <label style='cursor:pointer;font-family:Arial Black, Gadget, sans-serif; margin-left:10px;' >Almacen </label>";
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["IDAlmacen"] + "," + obResultado[i]["Almacen"] +  "</label>";
                         l_Linea=l_Linea + "  </div>";     
                         
                         l_Linea=l_Linea + "</div>";

                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "      <label style='cursor:pointer;font-family:Arial Black, Gadget, sans-serif; margin-left:10px;' >Ubicacion </label>";
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["Pasillo"] + "," +  obResultado[i]["Rack"] + "," + obResultado[i]["Columna"] + "," + obResultado[i]["Nivel"] + "," + obResultado[i]["SubNivel"] + "</label>";
                         l_Linea=l_Linea + "  </div>";     
                         
                                                    
                         l_Linea=l_Linea + "</div>";

                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "      <label style='cursor:pointer;font-family:Arial Black, Gadget, sans-serif; margin-left:10px;' >Producto </label>";
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >" +   obResultado[i]["Codigo"] + "," +  obResultado[i]["Producto"] + "</label>";                        
                         l_Linea=l_Linea + "  </div>";     
                         
                                                    
                         l_Linea=l_Linea + "</div>";

                         l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                         l_Linea=l_Linea + "  <div class='col-2 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                     
                         
                         l_Linea=l_Linea + "  </div>";         

                         l_Linea=l_Linea + "  <div class='col-10 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                                              
                         l_Linea=l_Linea + "     <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' > Pzas x caja:" +   obResultado[i]["CantidadCaja"] + "</label>";
                         l_Linea=l_Linea + "  </div>";     
                         
                                                    
                         l_Linea=l_Linea + "</div>";

                    } else {
                         l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                         l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' > " + obResultado[i]["msg"] +  "</label>";
                         l_Linea=l_Linea + "</div>";   
                         break;
                    }
                    l_Linea=l_Linea + "</div>";
                  }     
               } else {
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                   l_Linea=l_Linea + "<div class='col-12 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                   l_Linea=l_Linea + "   <label style='cursor:pointer;font-family:Arial, Gadget, sans-serif; margin-left:10px;' >NO SE ENCONTRO REGISTRADO EL CODIGO DEL PRODUCTO EN EL SISTEMA</label>";
                   l_Linea=l_Linea + "</div>";         
                   l_Linea=l_Linea + "</div>";
               }   
              

               //$("#modal_espera").modal("hide");
               document.getElementById("contenido_productos").innerHTML=l_Linea;  
               
               // ----------------------------------------------------------------                        
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

// *********************






function Crear(datos){	     
    console.log(datos);   
    
 
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/" + MODULO +  "_crear.ctrl.php";
      
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

function Actualizar(datos){   
    if(datos.length>0){
        ob = JSON.stringify(datos);
 
        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_actualizar.ctrl.php";
       
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

function Eliminar(datos){    
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/" + MODULO + "_eliminar.ctrl.php";
       
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

function Estado(datos){        
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/" + MODULO + "_estado.ctrl.php";

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
 
function Consultar(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_consultar.ctrl.php";
      
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
                                                
                                                if(bandEncontrado==1){
                                                    //CHEKCBOX, RADIOBUTTON, IMAGEN
                                                    switch(l_Tipo){
                                                        case "CHEKCBOX":
                                                            if(obResultado[i][campo]=="SI"){
                                                                formulariop.elements[k].checked=true;
                                                            }
                                                            
                                                            break;
                                                        case "RADIOBUTTON":
                                                            break;
                                                        case "IMAGEN":
                                                            break;
                                                        
                                                    }

                                                } else {
                                                    formulariop.elements[k].value=obResultado[i][campo];
                                                }                                                
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

function Ver(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_consultar.ctrl.php";
      
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



function Listado(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_consultar.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";
               var l_Llave="";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 
                                         
                       for (var campo in obResultado[i]) {

                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                                if(l_Llave==campo){
                                  
                                } else {
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";                                     
                                }                                
                            } else {
                                if(campo=="llave" ){
                                    l_Llave=obResultado[i]["llave"];
                                    
                                }
                            }                            
                       }

                       for (var campo in obResultado[i]) {

                        if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                            if(l_Llave==campo){
                                l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";                                 
                                l_Registros=l_Registros + "<label style='display:inline-flex' >";
                                l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Editar' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Editar </a>"
                                l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Eliminar' style='color: #53BEFE;cursor:pointer;margin-right: -20px;' >Eliminar</a>";
                                //l_Registros=l_Registros + "<a class='nav-link' href='#' style='color: #53BEFE;cursor:pointer; '>Detalles</a> </label>";                                       
                                l_Registros=l_Registros + "</div>";                 
                            } else {
                                                    
                            }                                
                        } else {
                            if(campo=="llave" ){
                                l_Llave=obResultado[i]["llave"]; 
                            }
                        }                            
                   }

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   }

                   l_Linea=l_Linea + "</div>";
               }     


               //$("#modal_espera").modal("hide");
               document.getElementById("contenido").innerHTML=l_Linea;  
               
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}


function Cat_Almacen_Combo(datos){ 

    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/cat_almacen_consultar.ctrl.php";
      
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
               
               var combos=new Array();
               var registros=new Array();
               var bandEncontrado=0;
               var l_Tipo="";
               var l_Valor1="";
               var l_Valor2="";
               var l_Posicion=0;

               var formulariop = document.getElementById("frm_Actualizar");   

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               
               for(i=0;i<contador;i++){
                   l_Registros="";                    

                   if(obResultado[i]["retorno"]=="TRUE"){ 

                         // Extrae los campos combos
                         for (var campo in obResultado[i]) {
                             if(campo!="retorno" && campo!="msg" && campo!="llave" ){
                                 if(l_Llave!=campo){
                                    if(campo=="combo"){
                                        for (var campo_c in obResultado[i][campo]) {
                                            console.log("COMBOS:" + campo_c );        
                                            combos.push( { "campo" : campo_c } );                                                   
                                        }                                         
                                    }                                    
                                 }  
                             }
                         }

                         //console.log(combos);
                         l_Valor1="";
                         l_Valor2="";
                         l_Posicion=0;
                         for(h=0;h<combos.length;h=h+1){

                            for (var campo in obResultado[i]) {
                                if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){

                                    if(campo==combos[h]["campo"]){
                                        if(l_Posicion==0){
                                            l_Valor1=obResultado[i][campo];
                                            l_Posicion++;
                                        } else {
                                            l_Valor2=obResultado[i][campo];
                                        }
                                             
                                        break;
                                    }
                                }
                            }
                            
                         }
                         registros.push( { "valor1" : l_Valor1, "valor2": l_Valor2 } );  

                         console.log(registros);
               
                   }
               }    

               // Construye la respuesta
               l_Registros="<option value='0' selected >Ninguno</option>";
               for(i=0;i<registros.length;i=i+1){
                    l_Registros=l_Registros + "<option value='" + registros[i]["valor1"] + "'>" + registros[i]["valor2"] + "</option>  ";
               }
         


               console.log("Registros:"+ l_Registros);  

               document.getElementById("cb_nIDCat_Almacen").innerHTML=l_Registros;  



               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

// ******************************************************************
// CARGAR
function Listado_Cargar(datos){    
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

               for(i=0;i<contador;i++){    
                    l_Registros=""; 
                    l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                    if(obResultado[i]["retorno"]=="TRUE"){ 

                        for (var campo in obResultado[i]) {

                            //console.log("Campo:" + campo);

                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                                //console.log("ENTRE");
                                 l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                 l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                 l_Registros=l_Registros + "</div>";    
                                 //console.log("Registros:" + l_Registros);                                      
                            }                  
                       }

                       l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                       l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   "SIN PROCESAR" + "</label>";
                       l_Registros=l_Registros + "</div>";    

                       l_Linea = l_Linea + "<br>" + l_Registros;

                    } else {
                        l_Linea = l_Linea + "<br>" + l_Registros;
                    }

                    l_Linea=l_Linea + "</div>";
               }

               //console.log(l_Linea);
               document.getElementById("contenido").innerHTML=l_Linea;  
 
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function Listado_Grabar(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_grabar.ctrl.php";
 
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

               for(i=0;i<contador;i++){    
                    l_Registros=""; 
                    l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
                    if(obResultado[i]["retorno"]=="TRUE"){ 

                        for (var campo in obResultado[i]) {

                            //console.log("Campo:" + campo);

                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                                //console.log("ENTRE");
                                 l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                 l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                 l_Registros=l_Registros + "</div>";    
                                 //console.log("Registros:" + l_Registros);                                      
                            }                  
                       }
                       
                       l_Linea = l_Linea + "<br>" + l_Registros;

                    } else {
                        l_Linea = l_Linea + "<br>" + l_Registros;
                    }

                    l_Linea=l_Linea + "</div>";
               }

               //console.log(l_Linea);
               document.getElementById("contenido").innerHTML=l_Linea;  
 
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}
// ******************************************************************

// ******************************************************************









