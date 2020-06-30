// ----------------------------------------------------------------------------------
// packinglist_deta_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------
 
function Crear_Detalles(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/packinglist_deta_crear.ctrl.php";
      
       document.getElementById("bt_Grabar").style.visibility="hidden";
       //$("#modal_espera").modal("show");

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


function Listado_Detalles(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar_todos.ctrl.php";
 
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

               l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center'  style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

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

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos      

               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 
 
                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Carton"] + "</label>";
                     l_Registros=l_Registros + "</div>";    

                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Codigo"] + "</label>";
                     l_Registros=l_Registros + "</div>";    

                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Producto"] + "</label>";
                     l_Registros=l_Registros + "</div>";                  
 
                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Descripcion"] + "</label>";
                     l_Registros=l_Registros + "</div>";  
 
                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Cantidad"] + "</label>";
                     l_Registros=l_Registros + "</div>";    

                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["CantidadCaja"] + "</label>";
                     l_Registros=l_Registros + "</div>";    
                     
                     l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Cajas"] + "</label>";
                     l_Registros=l_Registros + "</div>";    

                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["PesoBruto"] + "</label>";
                     l_Registros=l_Registros + "</div>";    
                     
                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["PesoNeto"] + "</label>";
                     l_Registros=l_Registros + "</div>";   
 
                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["TotalM3"] + "</label>";
                     l_Registros=l_Registros + "</div>";    
 
                     l_Registros=l_Registros + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                     l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i]["Estatus"] + "</label>";
                     l_Registros=l_Registros + "</div>";    
 
                     l_Linea = l_Linea + "<br>" + l_Registros;
                   } else { 

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   }

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

// ************************************************************************************************



// ************************************************************************************************
// REVISAR
function Listado_Detalles_Recibo(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar.ctrl.php";
 
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
               var l_nID=0;

               l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Carton </label>";
               l_Linea=l_Linea + "</div>";  

               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
               l_Linea=l_Linea + "</div>";    
               
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Producto</label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad/Caja (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Bruto (Kgs)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Neto (Kgs) </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Total (M3)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Estatus </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Acciones </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "</div>";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos      

               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_nID=0;
                   
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 

                        for (var campo in obResultado[i]) {

                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                                if(l_Llave==campo){
                                    l_nID=obResultado[i][campo];
                                } else {
                                    if(campo.toLowerCase()=="carton"){
                                        l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                        l_Registros=l_Registros + "</div>";    
                                    }                                             
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
                                  
                                } else {
                                    if(campo.toLowerCase()=="codigo"){
                                        l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                        l_Registros=l_Registros + "</div>";    
                                    }                                             
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="producto"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                                           
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="descripcion"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                                           
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="cantidad"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="cantidadcaja"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="cajas"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="pesobruto"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="pesoneto"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="totalm3"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                     
                                if(campo.toLowerCase()=="estatus"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    

                                    
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";

                                    l_Registros=l_Registros + "<label id='lb_Etiqueta' style='color:#2271b3; cursor:pointer;font-family:Arial black, Gadget, sans-serif;' onclick=\"fn_Imprimir_Etiqueta_Clic('" + l_nID +  "')\"> Imprimir Etiqueta " + " </label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                                 
                            }                                
                        } else {
                            if(campo=="llave" ){
                                l_Llave=obResultado[i]["llave"];
                                
                            }
                        }                            
                      }

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   } else { 

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   }

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


function Listado_Detalles_Validacion(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar.ctrl.php";
 
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
               var l_nID=0;
               var l_Estatus="";

               l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
               l_Linea=l_Linea + "<div class='col d-flex justify-content-middle align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F6;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;'>Codigo</label>";
               l_Linea=l_Linea + "</div>";    
               
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F6;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Producto</label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad/Caja (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Bruto (Kgs)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Neto (Kgs) </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Total (M3)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Estatus </label>";
               l_Linea=l_Linea + "</div>";
 
               l_Linea=l_Linea + "</div>";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos      

               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_nID=0;
                   l_Estatus="";
                   
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 

                        l_Estatus=obResultado[i]["Estatus"];
                        l_Codigo=obResultado[i]["Codigo"];
                        l_Producto=obResultado[i]["Producto"];
                        l_Descripcion=obResultado[i]["Descripcion"];
                        l_Cantidad=obResultado[i]["Cantidad"];
                        l_CantidadCaja=obResultado[i]["CantidadCaja"];
                        l_Cajas=obResultado[i]["Cajas"];
                        l_PesoBruto=obResultado[i]["PesoBruto"];
                        l_PesoNeto=obResultado[i]["PesoNeto"];
                        l_TotalM3=obResultado[i]["TotalM3"];


                        if(l_Estatus=="RECIBO"){
                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Codigo  + "</label>";
                            l_Registros=l_Registros + "</div>";    

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Producto  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Descripcion  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cantidad  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_CantidadCaja  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cajas  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_PesoBruto  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_PesoNeto  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_TotalM3  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; height: 50px; cursor:pointer; background-color:#00FF00;'>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Estatus  + "</label>";
                            l_Registros=l_Registros + "</div>"; 

                        } else {
                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Codigo  + "</label>";
                            l_Registros=l_Registros + "</div>";   

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Producto  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Descripcion  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cantidad  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_CantidadCaja  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cajas  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_PesoBruto  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_PesoNeto  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_TotalM3  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer; '>";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Estatus  + "</label>";
                            l_Registros=l_Registros + "</div>";
                        }

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   } else { 

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   }

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



function PackingList_Deta_Combo(datos){ 

    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar.ctrl.php";
      
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

               document.getElementById("cb_nID_PackingList_Deta").innerHTML=l_Registros;
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

// Recibo
function PackingList_Deta_CambiarEstatus(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/packinglist_deta_estatus.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                             
            
               var obResultado=JSON.parse(l_Resultado);  
               
               //$("#modal_espera").modal("hide");

               if(obResultado[0]["retorno"]=="TRUE"){
                   console.log("correcto");     
                     
                   $("#modal_exitoso").modal("show");

                   // Mostrar los detalles


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

/*
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
                     
                  // $("#modal_exitoso").modal("show");

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
*/



// *******************************************************************
// Entradas por Compras

function Listado_Detalles_EntradasxCompras(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar.ctrl.php";
 
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
               var l_nID=0;

               l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
               l_Linea=l_Linea + "</div>";    
               
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Producto</label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad/Caja (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Bruto (Kgs)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Neto (Kgs) </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Total (M3)</label>";
               l_Linea=l_Linea + "</div>";
    
               l_Linea=l_Linea + "</div>";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos      

               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_nID=0;
                   
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 

                        for (var campo in obResultado[i]) {

                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                                if(l_Llave==campo){
                                    l_nID=obResultado[i][campo];
                                } else {
                                    if(campo.toLowerCase()=="codigo"){
                                        l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                        l_Registros=l_Registros + "</div>";    
                                    }                                             
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
                                  
                                } else {
                                    if(campo.toLowerCase()=="codigo"){
                                        l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                        l_Registros=l_Registros + "</div>";    
                                    }                                             
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="producto"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                                           
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="descripcion"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                                           
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="cantidad"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="cantidadcaja"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="cajas"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="pesobruto"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="pesoneto"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                             
                                if(campo.toLowerCase()=="totalm3"){
                                    l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
                                    l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   obResultado[i][campo] + "</label>";
                                    l_Registros=l_Registros + "</div>";    
                                }                    
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
                              
                            } else {                     
                                if(campo.toLowerCase()=="estatus"){
                                  
                                }                                 
                            }                                
                        } else {
                            if(campo=="llave" ){
                                l_Llave=obResultado[i]["llave"];
                                
                            }
                        }                            
                      }

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   } else { 

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   }

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











function Actualizar_Detalles(datos){   
    if(datos.length>0){
         console.log(datos);
        ob = JSON.stringify(datos);
 
        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_actualizar.ctrl.php";
       
        document.getElementById("bt_Grabar").style.visibility="hidden";
        //$("#modal_espera").modal("show");
 
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
       var url = UBICACION_CONTROL + "/packinglist_deta_eliminar.ctrl.php";
       
       document.getElementById("bt_Eliminar").style.visibility="hidden";
       //$("#modal_espera").modal("show");
      
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
       var url = UBICACION_CONTROL + "/packinglist_deta_estado.ctrl.php";

       document.getElementById("bt_Eliminar").style.visibility="hidden";
       //$("#modal_espera").modal("show");
      
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
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar.ctrl.php";
      
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
