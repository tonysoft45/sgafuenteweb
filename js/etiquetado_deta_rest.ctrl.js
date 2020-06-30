// ----------------------------------------------------------------------------------
// etiquetado_deta_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. IDEATECH
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 24/06/2020
// ----------------------------------------------------------------------------------
// V2.0.1
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
               var l_Carton="";
               var l_Codigo="";
               var l_Producto="";
               var l_Descripcion="";
               var l_Cantidad="0";
               var l_CantidadCaja="0";
               var l_Cajas="0";
               var l_PesoBruto="0.00";
               var l_TotalM3="0.00";
               var l_Estatus="";


               l_Linea=l_Linea + "<div class='row align-item-end h-25 align-items-center'  style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Carton </label>";
               l_Linea=l_Linea + "</div>";    

               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo</label>";
               l_Linea=l_Linea + "</div>";    
           
               l_Linea=l_Linea + "<div class='col-md-2  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea+"<label style='cursor:pointer;' > Descripcion </label>";
               l_Linea=l_Linea+"</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad Total (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cantidad/Caja (Pc/Set)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Cajas </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Bruto (Kgs)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Peso Neto (Kgs) </label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + " <label style='cursor:pointer;' > Total (M3)</label>";
               l_Linea=l_Linea + "</div>";
   
               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Estatus </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "<div class='col-md-1  w-3 align-bottom align-self-center' style='height: 50px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F6;margin-top: auto;margin-bottom: auto;'>";
               l_Linea=l_Linea + "    <label style='cursor:pointer;' > Acciones </label>";
               l_Linea=l_Linea + "</div>";

               l_Linea=l_Linea + "</div>";

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos      

               for(i=0;i<contador;i++){     
                    l_Registros="";
                    l_Linea=l_Linea + "<div id='id_r" + i +"' class='row align-item-end h-20 align-items-start ' style='border-bottom: #D9DADA 2px solid;cursor:pointer;font-size:8px;' onmouseover=\"fn_Encima("+i+")\" onmouseout=\"fn_Dejar("+i+")\">";

                    if(obResultado[i]["retorno"]=="TRUE"){ 

                        l_nID=obResultado[i]["nIDPackingList_Deta"];
                        l_Carton=obResultado[i]["Carton"];
                        l_Codigo=obResultado[i]["Codigo"];                     
                        l_Descripcion=obResultado[i]["Descripcion"];
                        l_Cantidad=obResultado[i]["Cantidad"];
                        l_CantidadCaja=obResultado[i]["CantidadCaja"];
                        l_Cajas=obResultado[i]["Cajas"];
                        l_PesoBruto=obResultado[i]["PesoBruto"];
                        l_PesoNeto=obResultado[i]["PesoNeto"];
                        l_TotalM3=obResultado[i]["TotalM3"];
                        l_Estatus=obResultado[i]["Estatus"];

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;font-family:Arial, Gadget, sans-serif;'' >" +   l_Carton + "</label>";
                        l_Registros=l_Registros + "</div>";    

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Codigo + "</label>";
                        l_Registros=l_Registros + "</div>";    

                        l_Registros=l_Registros + "<div class='col-md-2 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Descripcion + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cantidad + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_CantidadCaja + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Cajas + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_PesoBruto + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_PesoNeto + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_TotalM3 + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                        l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Estatus + "</label>";
                        l_Registros=l_Registros + "</div>";   

                        if(l_Estatus=="NO RECIBIDO"){ 
                            l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                            l_Registros=l_Registros + "<label id='lb_Etiqueta' style='font-size:10px; color:#2271b3; cursor:pointer;font-family:Arial black, Gadget, sans-serif;' onclick=\"fn_Imprimir_Etiqueta_Clic('" + l_nID +  "')\"> Imprimir " + " </label>";
                            l_Registros=l_Registros + "</div>";    
                        } else {
                            if(l_Estatus=="ETIQUETA"){ 
                                l_Registros=l_Registros + "<div class='col-md-1 justify-content-start align-items-left w-3 d-inline-block  text-break' >";
                                l_Registros=l_Registros + "<label id='lb_Etiqueta' style='font-size:10px; color:#2271b3; cursor:pointer;font-family:Arial black, Gadget, sans-serif;' onclick=\"fn_ReImprimir_Etiqueta_Clic('" + l_nID +  "')\"> ReImprimir " + " </label>";
                                l_Registros=l_Registros + "</div>";    
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

function ReImprimir_Etiqueta(datos){
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
                        location.reload();
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



function PackingList_Deta_CambiarEstatus(datos){	 
    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){
        $("#modal_espera").modal("show");

       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/packinglist_deta_estatus_etiquetas.ctrl.php";
      
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
 