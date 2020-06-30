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

// ----------------------------------------------------------------------------------
// DETALLES

var listadodeproductos=new Array();

function Validar_Detalles(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
        $("#modal_espera").modal("show");

   
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/recibo_deta_validar.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                                         
               var obResultado=JSON.parse(l_Resultado);  

               $("#modal_espera").modal("hide");    
               
               obVerificar=setInterval(Ocultar_Espera,500); 
                
               if(obResultado[0]["retorno"]=="TRUE"){
                   console.log("correcto");     
                 
                   document.getElementById("txt_Etiqueta").value="";

                   // Mostrar los detalles
                   fn_Cargar_Detalles_Seleccionado_Clic();

               } else {        
                   console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);                          
                   document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                   $("#modal_falla").modal("show");
                   document.getElementById("bt_Recibo").style.visibility="visible";
                    
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

function Listado_Detalles_Validacion(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/recibo_deta_consultar.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
       
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";               
               var l_nID=0;
               var l_Estatus="";

               l_Linea=l_Linea + "<div class='row align-item-end h-25 align-items-center'  style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;'>Codigo</label>";
               l_Linea=l_Linea + "</div>";                  
   
               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
    
               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Leidos </label>";
               l_Linea=l_Linea + "</div>";
    
               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
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
                   
                   //l_Linea=l_Linea + "<div id='id_r" + i +"' class='row align-item-end h-20 align-items-start ' style='border-bottom: #D9DADA 2px solid;cursor:pointer;font-size:8px;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 

                        l_Codigo=obResultado[i]["Codigo"];
                        l_Descripcion=obResultado[i]["Descripcion"];
                        l_Cantidad=obResultado[i]["Cantidad"];                         
                        l_Cajas=obResultado[i]["Cajas"];                         
                        l_Leidos=obResultado[i]["Leidos"];
                        l_Estatus=obResultado[i]["Estatus"];


                        if(l_Estatus=="RECIBO"){
                        
                            l_Registros=l_Registros + "<div id='id_r" + i +"' class='row align-item-end h-15 justify-content-start'  style='background-color:#00FF00; border-bottom: #D9DADA 2px solid;cursor:pointer;font-size:8px;'>";

                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Codigo  + "</label>";
                            l_Registros=l_Registros + "</div>";    
 
                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' style='height: 40px;background-color:#00FF00;' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Descripcion  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' style='height: 40px;background-color:#00FF00;' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cantidad  + "</label>";
                            l_Registros=l_Registros + "</div>";  
 
                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' style='height: 40px;background-color:#00FF00;' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cajas  + "</label>";
                            l_Registros=l_Registros + "</div>";  

                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' style='height: 40px;background-color:#00FF00;' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Leidos  + "</label>";
                            l_Registros=l_Registros + "</div>";  
 
                        
                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' style='height: 40px;background-color:#00FF00;' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Estatus  + "</label>";
                            l_Registros=l_Registros + "</div>"; 

                            l_Registros=l_Registros + "</div>"; 

                        } else {
                            l_Registros=l_Registros + "<div id='id_r" + i +"' class='row align-item-end h-20 align-items-start ' style='border-bottom: #D9DADA 2px solid;cursor:pointer;font-size:8px;'>";

                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Codigo  + "</label>";
                            l_Registros=l_Registros + "</div>";   
 
                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Descripcion  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cantidad  + "</label>";
                            l_Registros=l_Registros + "</div>";
 
                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cajas  + "</label>";
                            l_Registros=l_Registros + "</div>";
 
                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Leidos  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Estatus  + "</label>";
                            l_Registros=l_Registros + "</div>";

                            l_Registros=l_Registros + "</div>";
                        }

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   } else { 

                       l_Linea = l_Linea + "<br>" + l_Registros;
                   }

                   //l_Linea=l_Linea + "</div>";
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
 





// ----------------------------------------------------------------------------------



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
               var l_nID=0;

               l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Carton </label>";
               l_Linea=l_Linea + "</div>";    

               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
               l_Linea=l_Linea + "</div>";    
               
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Producto</label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea+"<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad/Caja (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Bruto (Kgs)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Neto (Kgs) </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Total (M3)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height: 60px;cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Estatus </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height: 60px; cursor:pointer;background-color:#F4F5F5;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Acciones </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "</div>";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos      

               for(i=0;i<contador;i++){     
                   l_Registros="";
                   l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                   if(obResultado[i]["retorno"]=="TRUE"){ 

                    l_nID=obResultado[i]["nIDPackingList_Deta"];

                    for (var campo in obResultado[i]) {

                        if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                            if(l_Llave==campo){
                              
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


function PackingList_Deta_CambiarEstatus(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
        $("#modal_espera").modal("show");

       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/packinglist_deta_estatus.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                             
            
               var obResultado=JSON.parse(l_Resultado);  

               $("#modal_espera").modal("hide");                   
               obVerificar=setInterval(Ocultar_Espera,500);  
                
               if(obResultado[0]["retorno"]=="TRUE"){
                   console.log("correcto");                          
                   location.reload();
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




function Imprimir_Etiqueta(datos){
    if(datos.length>0){
        var l_nID=datos[0]["id"];

        ob = JSON.stringify(datos);
 
        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/generate_code.ctrl.php";
       
         xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;     
                console.log(l_Resultado);
                              
             
                var obResultado=JSON.parse(l_Resultado);  
                
                //$("#modal_espera").modal("hide");
 
                if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");     
                      
                   // $("#modal_exitoso").modal("show");
                   obVENTANA=window.open("qr_vistaprevia.php?l_qr="+obResultado[0]["archivo"],"VISTA PREVIA","status=no,toolbar=no,menubar=no,scrollbars=yes,location=yes,width=1024, height=600");

                   // Procesar
                   var arreglo=new Array();
                   arreglo.push( { "nid":l_nID, "estatus":"ETIQUETA"} );     

                   if(arreglo.length>0){       
                        // Enviar para procesdar
                        resultado=PackingList_Deta_CambiarEstatus(arreglo); 
                   } else {             
                        document.getElementById("lbl_mensaje_falla").innerHTML="NO ES POSIBLE IMPRIMIR"      
                        $("#modal_falla").modal("show");
                   }
 
                } else {        
                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                    $("#modal_falla").modal("show");
                }                         
            }
        };
 
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
     }  else {
         console.log("NO TIENE INFORMACIÓN PARA PROCESAR");
         return "NO TIENE INFORMACIÓN PARA PROCESAR";
     }  
}