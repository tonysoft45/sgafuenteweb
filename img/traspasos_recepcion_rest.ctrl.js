// ----------------------------------------------------------------------------------
// traspasos_envio_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------


/*
function Listado(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var l_Modulo="traspasos_envio"; // MODULO
        var url = UBICACION_CONTROL + "/" + l_Modulo + "_consultar_todoscampos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               //console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";
               var l_Llave="";
               var l_Estatus="";

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
                       l_Estatus=obResultado[i]["Estatus"];

                       l_OrdenDeSurtido_Folio=obResultado[i]["OrdenDeSurtido_Folio"];
                       l_OrdenDeSurtido_Fecha=obResultado[i]["OrdenDeSurtido_Fecha"];
                       l_nIDOrdenDeSurtido=obResultado[i]["nIDOrdenDeSurtido"];
                       l_Tipo=obResultado[i]["Tipo"];
                       l_nIDTraspaso=obResultado[i]["nIDTraspaso"];

                        
                       l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";
                       l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_OrdenDeSurtido_Folio + "</label>";
                       l_Registros=l_Registros + "</div>";    
                       
                       
                       l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";
                       l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_OrdenDeSurtido_Fecha + "</label>";
                       l_Registros=l_Registros + "</div>";  

                       l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";
                       l_Registros=l_Registros + "<label style='cursor:pointer;' >" +   l_Estatus + "</label>";
                       l_Registros=l_Registros + "</div>";  

                       if(l_Estatus=="ABIERTO" && l_Tipo=="RECEPCION"){
                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";                                 
                            l_Registros=l_Registros + "<label style='display:inline-flex' >";
                            l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Ver' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Detalles | </a>";
                            l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Cancelar' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Cancelar | </a>";
                            l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Imprimir' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Imprimir </a>";
                            l_Registros=l_Registros + "</div>";            
                       } else {
                            if(l_Estatus=="CERRADO" && l_Tipo=="RECEPCION"){
                                l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";                                 
                                l_Registros=l_Registros + "<label style='display:inline-flex' >";
                                l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Crear' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '> Detalles </a>";
                                l_Registros=l_Registros + "</div>";   
                            } else {
                                if(l_Estatus=="ABIERTO" && l_Tipo=="ENVIO"){

                                } else {
                                    if(l_Estatus=="CERRADO" && l_Tipo=="ENVIO"){
                                        l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";                                 
                                        l_Registros=l_Registros + "<label style='display:inline-flex' >";
                                        l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Crear' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Recibir</a>";
                                        l_Registros=l_Registros + "</div>";            
                                    } else {
                                        if(l_Estatus=="PROCESO" && l_Tipo=="RECEPCION"){
                                            l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";                                 
                                            l_Registros=l_Registros + "<label style='display:inline-flex' >";
                                            l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Ver' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Detalles | </a>";                                            
                                            l_Registros=l_Registros + "</div>";          
                                        }

                                    }

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
*/

function Listado(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var l_Modulo="traspasos_envio"; // MODULO
        var url = UBICACION_CONTROL + "/" + l_Modulo + "_consultar.ctrl.php";
 
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
               var l_Encabezados;
               var l_Tamaxo=0;

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }
         
               // Verifica si fue exitoso
               if(obResultado[0]["retorno"]=="TRUE"){ 
                   l_Llave=obResultado[0]["llave"];

                   // Carga los encabezados
                   // Verifica el numero de encabezados
                   l_Encabezados=obResultado[0]["encabezados"];

                   // Calcula el tamaño de las columnas
                   l_Tamaxo=l_Encabezados.length;
                   l_Tamaxo=103/l_Tamaxo;

                   l_Linea=l_Linea + "<div class='table-responsive table-hover' style='margin-left:-10px; width:103%'>";
                   l_Linea=l_Linea + "<table class='table'>";
                   l_Linea=l_Linea + "<thead>";
                   l_Linea=l_Linea + "<tr>";

                   for(i=0;i<l_Encabezados.length;i++){

                        if(l_Llave!=l_Encabezados[i]){

                            l_Linea=l_Linea + "<th  scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black;width:" + l_Tamaxo + "%'>";
                            l_Linea=l_Linea + "<label id='campo_" + i + "'  onclick=\"fn_Listado_Ordenar_Clic('" + l_Encabezados[i] + "')\">";
                            l_Linea=l_Linea +  l_Encabezados[i];
                            l_Linea=l_Linea + "<img src='../iconos/updown.png' style='width: 10px; height: 10px; margin-left:2px;'>";
                            l_Linea=l_Linea + "</label>";
                            l_Linea=l_Linea + "</th>";
                        }
                   }

                   l_Linea=l_Linea + "<th scope='col' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black'> ";
                   l_Linea=l_Linea + "<label style='cursor:pointer;'> Acciones </label>";
                   l_Linea=l_Linea + "</th>";

                   l_Linea=l_Linea + "</tr>";
                   l_Linea=l_Linea + "</thead>";

                   // Carga el listado
                   l_Linea=l_Linea + "<tbody>";
                   for(i=0;i<contador;i++){     

                        l_Estatus=obResultado[i]["Estatus"];
                        l_nIDTraspaso=obResultado[i]["nIDTraspaso"];
                        l_Tipo=obResultado[i]["Tipo"];

                        l_Linea=l_Linea +  "<tr>";     
                        for (var campo in obResultado[i]) {
                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" && campo!="encabezados" ){
                                if(l_Llave!=campo){
                                    for(l=0;l<l_Encabezados.length;l++){

                                        if(campo==l_Encabezados[l]){
                                            l_Linea=l_Linea + " <td style='font-size:10px; font-family:Arial; width:16%'>" + obResultado[i][campo] + "</td>";       
                                            break;
                                        }
                                    }                            
                                }   
                            } else {
                                if(campo=="llave" ){
                                    l_Llave=obResultado[i]["llave"];                                    
                                }
                            }
                        }

                       
                        // Carga las acciones
                        for (var campo in obResultado[i]) {
                            if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" && campo!="encabezados" ){
                                if(l_Llave==campo){

                                    l_Linea=l_Linea + " <td style='font-size:10px; font-family:Arial; width:16%'>";  

                                    l_Linea=l_Linea  + "<label style='display:inline-flex' >";
                                    l_Linea=l_Linea  + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Detalles' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Detalle |</a>"

                                    if(l_Estatus=="ABIERTO" && l_Tipo=="RECEPCION"){                                                                                  
                                        l_Linea=l_Linea + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Cancelar' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Cancelar | </a>";
                                        l_Linea=l_Linea + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Imprimir' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Imprimir </a>";

                                    } else {
                                        if(l_Estatus=="CERRADO" && l_Tipo=="RECEPCION"){
                                           
                                        } else {
                                            if(l_Estatus=="ABIERTO" && l_Tipo=="ENVIO"){

                                              
                                            } else {
                                                if(l_Estatus=="CERRADO" && l_Tipo=="ENVIO"){

                                                    l_Linea=l_Linea + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + l_nIDTraspaso +"&accion=Crear' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Recibir1  </a>";      
                                                } else {
                                                    if(l_Estatus=="PROCESO" && l_Tipo=="RECEPCION"){
                                                         
                                                    } else {
                                                        // No aplica
                                                    }
                                                }

                                            }

                                        }
                                    }
                                    

                                    l_Linea=l_Linea + "</td>";    
                                }                                   
                            }  
                        }
              




                        l_Linea=l_Linea +  "</tr>";     
                   }
                   l_Linea=l_Linea + "</tbody>";


                   l_Linea=l_Linea + "</table>";
                   l_Linea=l_Linea + "</div>";

               } else {
                    l_Llave=obResultado[0]["llave"];

                    // Carga los encabezados
                    // Verifica el numero de encabezados
                    l_Encabezados=obResultado[0]["encabezados"];

                    // Calcula el tamaño de las columnas
                    l_Tamaxo=l_Encabezados.length;
                    l_Tamaxo=103/l_Tamaxo;

                    l_Linea=l_Linea + "<div class='table-responsive text-nowrap table-hover' style='margin-left:-10px; width:103%'>";
                    l_Linea=l_Linea + "<table class='table'>";
                    l_Linea=l_Linea + "<thead>";
                    l_Linea=l_Linea + "<tr>";

                    for(i=0;i<l_Encabezados.length;i++){

                         if(l_Llave!=l_Encabezados[i]){

                             l_Linea=l_Linea + "<th class='th-sm' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black'>";
                             l_Linea=l_Linea + "<label id='campo_" + i + "'  onclick=\"fn_Listado_Ordenar_Clic('" + l_Encabezados[i] + "')\">";
                             l_Linea=l_Linea +  l_Encabezados[i];
                             l_Linea=l_Linea + "<img src='../iconos/updown.png' style='width: 10px; height: 10px; margin-left:2px;'>";
                             l_Linea=l_Linea + "</label>";
                             l_Linea=l_Linea + "</th>";
                         } 
                     }

                     l_Linea=l_Linea + "<th scope='col' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black'> ";
                     l_Linea=l_Linea + "<label style='cursor:pointer;'> Acciones </label>";
                     l_Linea=l_Linea + "</th>";

                     l_Linea=l_Linea + "</tr>";
                     l_Linea=l_Linea + "</thead>";

                     l_Linea=l_Linea + "<tbody>";
                     l_Linea=l_Linea + "<tr>";
                     l_Linea=l_Linea + "<th scope='col' style='font-size:10px; font-family:Arial Black'> ";
                     l_Linea=l_Linea + "<label style='cursor:pointer;'> NO TIENE REGISTROS </label>";
                     l_Linea=l_Linea + "</th>";
                     l_Linea=l_Linea + "</tr>";
                     l_Linea=l_Linea + "</tbody>"; 


                     l_Linea=l_Linea + "</table>";
                     l_Linea=l_Linea + "</div>";
               }
                  
               document.getElementById("contenido").innerHTML=l_Linea;  
               
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}




function Crear(datos){	     
    console.log(datos);   
    
 
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/" + MODULO +  "_grabar.ctrl.php";
      
       document.getElementById("bt_Grabar").style.visibility="hidden";
       //$("#modal_espera").modal("show");

       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                             
            
               var obResultado=JSON.parse(l_Resultado);  
               
               //$("#modal_espera").modal("hide");

               if(obResultado[0]["retorno"]=="TRUE"){
                     
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
         console.log(datos);
        ob = JSON.stringify(datos);
 
        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_actualizar.ctrl.php";
       
        document.getElementById("bt_Grabar").style.visibility="hidden";
        //$("#modal_espera").modal("show");
 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;     
                console.log(l_Resultado);
                              
             
                var obResultado=JSON.parse(l_Resultado);  
                
                //$("#modal_espera").modal("hide");
 
                if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("packinglist_actualizar:correcto");  
                   
                    console.log("FOLIO:" + obResultado[0]["FOLIO"] );   
                      
                    $("#modal_exitoso").modal("show");
                    //fn_Crear_Detalles_Clic(obResultado[0]["FOLIO"]);
 
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
       //$("#modal_espera").modal("show");
      
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  

               console.log(l_Resultado);
               var obResultado=JSON.parse(l_Resultado);

               //$("#modal_espera").modal("hide");
               
               if(obResultado[0]["retorno"]=="TRUE"){
                  console.log("correcto");
                 
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
       //$("#modal_espera").modal("show");
      
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  

               console.log(l_Resultado);
               var obResultado=JSON.parse(l_Resultado);

               //$("#modal_espera").modal("hide");
               
               if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");       
                  
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
        var l_Modulo="traspasos_envio"; // MODULO
        var url = UBICACION_CONTROL + "/" + l_Modulo + "_consultar_todoscampos.ctrl.php";
      
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






function OrdenDeSurtido_Combo(datos){ 

    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ordendesurtido_consultar.ctrl.php";
      
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
               var l_Valor3="";
               var l_Posicion=0;

               var formulariop = document.getElementById("frm_Actualizar");   

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               
               for(i=0;i<contador;i++){
                   l_Registros="";                    

                   if(obResultado[i]["retorno"]=="TRUE"){ 
                         l_Valor1=obResultado[i]["nIDOrdenDeSurtido"];
                         l_Valor2=obResultado[i]["Folio"];;
                         l_Valor3=obResultado[i]["Fecha"];;
                         l_Valor4=obResultado[i]["Almacen_Origen"];;
                         l_Valor5=obResultado[i]["Almacen_Destino"];;
 

                         registros.push( { "valor1" : l_Valor1, "valor2" : l_Valor2, "valor3": l_Valor3, "valor4":l_Valor4, "valor5":l_Valor5 } );  

                         console.log(registros);
               
                   }
               }    

               // Construye la respuesta
               l_Registros="<option value='0' selected >Ninguno</option>";
               for(i=0;i<registros.length;i=i+1){
                    l_Registros=l_Registros + "<option value='" + registros[i]["valor1"] + "'>" + registros[i]["valor2"] + ">" + registros[i]["valor3"] + "</option>  ";
               }
         
               console.log("Registros:"+ l_Registros);  

               document.getElementById("cb_nIDOrdenDeSurtido").innerHTML=l_Registros;
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}


function Listado_PorFolio(datos){    
    if(datos.length>0){
         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_consultar_folio.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               //console.log(l_Resultado);  

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
                    l_Estatus=obResultado[i]["Estatus"];
                    console.log(l_Estatus); 


                                      
                    for (var campo in obResultado[i]) {

                         if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
                             if(l_Llave==campo){
                               
                             } else {
                                 l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";
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
                             l_Registros=l_Registros + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:left;display:block; cursor:pointer;'>";                                 
                             l_Registros=l_Registros + "<label style='display:inline-flex' >";
                             l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Ver' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Detalle </a>";
                             if(l_Estatus=="ABIERTO"){
                                 l_Registros=l_Registros + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Eliminar' style='color: #53BEFE;cursor:pointer;margin-right: -20px;' >Cancelar</a>";
                             }
                             
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


function Listado_PorFolio_Detalles(datos){    
    if(datos.length>0){
         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
         
        var url = UBICACION_CONTROL + "/traspasos_recepcion_ordendesurtido_consultar_detalles.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               //console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";
               var l_Llave="";
               var l_Almacen_Origen="";
               var l_Almacen_Destino="";

               var l_nIDUsuario= document.getElementById("txt_nIDUsuario").value;

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

               for(i=0;i<listadodeproductos.length;i=i+1){
                    listadodeproductos.pop();
               }
               listadodeproductos.pop();

               for(i=0;i<contador;i++){     
                l_Registros="";
                l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                if(obResultado[i]["retorno"]=="TRUE"){ 
                    l_Estatus=obResultado[i]["Estatus"];
                    l_nIDCat_Almacen_Origen=obResultado[i]["nIDCat_Almacen_Origen"];
                    l_Almacen_Origen=obResultado[i]["Almacen_Origen"];
                    l_nIDCat_Almacen_Destino=obResultado[i]["nIDCat_Almacen_Destino"];
                    l_Almacen_Destino=obResultado[i]["Almacen_Destino"];
                    l_Estatus=obResultado[i]["Estatus"];

                    if(l_Estatus.length<=0){
                        l_Estatus="NO LEIDO";
                    }

                    l_nIDProducto=obResultado[i]["nIDProducto"];
                    l_Producto=obResultado[i]["Producto"];
                    l_Codigo=obResultado[i]["Codigo_IZeta"];
                    l_nIDCat_UnidadDeMedida=obResultado[i]["nIDCat_UnidadDeMedida"];
                    l_UnidadDeMedida=obResultado[i]["UnidadDeMedida"];
                    l_Cantidad=obResultado[i]["Cantidad"];
                    l_nIDOrdenDeSurtido_Deta=obResultado[i]["nIDOrdenDeSurtido_Deta"];
                    l_nIDOrdenDeSurtido=obResultado[i]["nIDOrdenDeSurtido"];
                    l_nIDCat_Almacen_Destino=obResultado[i]["nIDCat_Almacen_Destino"];

                    listadodeproductos.push( { "nidordendesurtido":l_nIDOrdenDeSurtido, "nidordendesurtido_deta":l_nIDOrdenDeSurtido_Deta, "nidcat_almacen_origen":l_nIDCat_Almacen_Origen, "nidcat_almacen_destino":l_nIDCat_Almacen_Destino, "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "cantidad":l_Cantidad, "leidos":0, "estatus":l_Estatus, "nidusuario":l_nIDUsuario, "nidcat_unidaddemedida":l_nIDCat_UnidadDeMedida } );     
 
                } else {
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[i]["msg"]        
                    $("#modal_falla").modal("show");
                     break;

                }
                
            }     


            //$("#modal_espera").modal("hide");
            document.getElementById("txt_Almacen_Origen").value=l_Almacen_Origen;
            document.getElementById("txt_Almacen_Destino").value=l_Almacen_Destino;
            document.getElementById("txt_nIDOrdenDeSurtido").value=l_nIDOrdenDeSurtido;
            fn_Ver_ListadoDeProductos_Estatus_Recepcion();
 
            // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function Listado_PorFolio_Detalles_OrdenDeSurtido(datos){    
    if(datos.length>0){
         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
         
        var url = UBICACION_CONTROL + "/traspasos_recepcion_ordendesurtido_consultar_productos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               //console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";
               var l_Llave="";
               var l_Almacen_Origen="";
               var l_Almacen_Destino="";

               var l_nIDUsuario= document.getElementById("txt_nIDUsuario").value;

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

               for(i=0;i<listadodeproductos.length;i=i+1){
                    listadodeproductos.pop();
               }
               listadodeproductos.pop();

               for(i=0;i<contador;i++){     
                l_Registros="";
                l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

                if(obResultado[i]["retorno"]=="TRUE"){ 
                    l_Estatus=obResultado[i]["Estatus"];
                    l_nIDCat_Almacen_Origen=obResultado[i]["nIDCat_Almacen_Origen"];
                    l_Almacen_Origen=obResultado[i]["Almacen_Origen"];
                    l_nIDCat_Almacen_Destino=obResultado[i]["nIDCat_Almacen_Destino"];
                    l_Almacen_Destino=obResultado[i]["Almacen_Destino"];
                    l_Estatus=obResultado[i]["Estatus"];

                    if(l_Estatus.length<=0){
                        l_Estatus="NO LEIDO";
                    }

                    l_nIDProducto=obResultado[i]["nIDProducto"];
                    l_Producto=obResultado[i]["Producto"];
                    l_Codigo=obResultado[i]["Codigo_IZeta"];
                    l_nIDCat_UnidadDeMedida=obResultado[i]["nIDCat_UnidadDeMedida"];
                    l_UnidadDeMedida=obResultado[i]["UnidadDeMedida"];
                    l_Cantidad=obResultado[i]["Cantidad"];
                    l_nIDOrdenDeSurtido_Deta=obResultado[i]["nIDOrdenDeSurtido_Deta"];
                    l_nIDOrdenDeSurtido=obResultado[i]["nIDOrdenDeSurtido"];
                    l_nIDCat_Almacen_Destino=obResultado[i]["nIDCat_Almacen_Destino"];

                    listadodeproductos.push( { "nidordendesurtido":l_nIDOrdenDeSurtido, "nidorden desurtido_deta":l_nIDOrdenDeSurtido_Deta, "nidcat_almacen_origen":l_nIDCat_Almacen_Origen, "nidcat_almacen_destino":l_nIDCat_Almacen_Destino, "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "cantidad":l_Cantidad, "leidos":0, "estatus":l_Estatus, "nidusuario":l_nIDUsuario, "nidcat_unidaddemedida":l_nIDCat_UnidadDeMedida } );     
 
                } else {
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[i]["msg"]        
                    $("#modal_falla").modal("show");
                     break;

                }
                
            }     


            //$("#modal_espera").modal("hide");
            document.getElementById("txt_Almacen_Origen").value=l_Almacen_Origen;
            document.getElementById("txt_Almacen_Destino").value=l_Almacen_Destino;
            document.getElementById("txt_nIDOrdenDeSurtido").value=l_nIDOrdenDeSurtido;
            fn_Ver_ListadoDeProductos_Estatus_Consulta();
 
            // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

// ----------------------------------------------------------------    



// ******************************************************************
// ORDEN DE SURTIDO
function Anexar_Producto(datos){    
    if(datos.length>0){
        var l_Codigo=datos[0]["codigo_izeta"];
        var l_nIDUsuario=datos[0]["nidusuario"];
        var l_nIDCat_Almacen_Origen=datos[0]["nidcat_almacen_origen"];
        var l_nIDCat_Almacen_Destino=datos[0]["nidcat_almacen_destino"];
        var l_Comentarios=datos[0]["comentarios"];
     
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/cat_productos_consultar_datos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;    
               var l_nIDProducto=0;               
               var l_Producto="";
               var l_UnidadDeMedida="";
               var l_Cantidad=0;



               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos          
              if(contador>0){
                  for(i=0;i<contador;i++){     
                    l_Registros="";
                    
 
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                         l_nIDProducto=obResultado[i]["nidproducto"];
                         l_Producto=obResultado[i]["producto"];
                         l_Descripcion=obResultado[i]["descripcion"];
                         l_UnidadDeMedida=obResultado[i]["unidaddemedida"];


                         fn_Agregar(l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, l_Cantidad, l_nIDCat_Almacen_Origen, l_Comentarios, l_nIDCat_Almacen_Destino, l_nIDUsuario);                          

                    } else {
                        document.getElementById("lbl_mensaje_falla").innerHTML="Codigo NO encontrado";             
                        $("#modal_falla").modal("show");
                         break;
                    }
                     
                  }     
             } else {
                   

             }   
              
             // ----------------------------------------------------------------                        
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function fn_Agregar(l_nIDProducto, l_Codigo, l_Producto, l_UnidadDeMedida, l_Cantidad, l_nIDCat_Almacen_Origen, l_Comentarios, l_nIDCat_Almacen_Destino, l_nIDUsuario){

    // Lee los valores capturados    
    l_Cant=0;
    for(i=0;i<listadodeproductos.length;i++){
        l_Cant=document.getElementById("txt_Cantidad_"+i).value;
        if (isNaN(l_Cant)) {
            document.getElementById("lbl_mensaje_falla").innerHTML="Cantidad Invalida";             
            $("#modal_falla").modal("show");
            
            return;
        } else {
            listadodeproductos[i]["cantidad"]=l_Cant
        }
    }
    
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

    if(bandEncontrado==0){
        listadodeproductos.push( { "nidproducto":l_nIDProducto,"codigo": l_Codigo, "producto":l_Producto, "unidaddemedida":l_UnidadDeMedida, "cantidad":l_Cantidad, "nidusuario":l_nIDUsuario, "nidcat_almacen_origen":l_nIDCat_Almacen_Origen, "nidcat_almacen_destino":l_nIDCat_Almacen_Destino, "comentarios":l_Comentarios } );     
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="Codigo Repetido";             
        $("#modal_falla").modal("show");
        
        return;
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
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Cantidad </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Acciones </label>";
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
        l_Linea=l_Linea + "<input type='text' name='cantidad_+" + i + "' id='txt_Cantidad_" + i + "' class='form-control' value='" + listadodeproductos[i]["cantidad"] + "' style='height: 30px;width:100px;font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px;' >";   
        l_Linea=l_Linea + "</div>";   

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>"; 
        l_Linea=l_Linea + "<a class='nav-link' style='color: #53BEFE;cursor:pointer;margin-right: -20px;' onclick=\"fn_Eliminar_Producto("+ i + ")\">Eliminar</a>";
        l_Linea=l_Linea + "</div>";   

 
        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  
}

function fn_Eliminar_Producto(indice){
    var listadodeproductos_tmp=[];

    l_Cant=0;
    for(i=0;i<listadodeproductos.length;i++){
        l_Cant=document.getElementById("txt_Cantidad_"+i).value;
        listadodeproductos[i]["cantidad"]=l_Cant
    }

    var contador=0;
    for(i=0;i<listadodeproductos.length;i++){
        if(i!=indice){
            listadodeproductos_tmp[contador]=listadodeproductos[i];         
            contador++;
        }          
    }

    for(i=0;i<listadodeproductos.length;i++){
        listadodeproductos.pop();
    }

    for(i=0;i<listadodeproductos_tmp.length;i++){
        listadodeproductos[i]=listadodeproductos_tmp[i];
    }

    fn_Mostrar_ListadoDeProductos();

}

function fn_Mostrar_ListadoDeProductos(){

     
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

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Acciones </label>";
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
        l_Linea=l_Linea + "<input type='text' name='cantidad_+" + i + "' id='txt_Cantidad_" + i + "' class='form-control' value='" + listadodeproductos[i]["cantidad"] + "' style='height: 30px;width:100px;font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px;' >";   
        l_Linea=l_Linea + "</div>";   

        l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>"; 
        l_Linea=l_Linea + "<a class='nav-link' style='color: #53BEFE;cursor:pointer;margin-right: -20px;' onclick=\"fn_Eliminar_Producto("+ i + ")\">Eliminar</a>";
        l_Linea=l_Linea + "</div>";   

 
        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  
}

function fn_Ver_ListadoDeProductos(){

     
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
        if(listadodeproductos[i]["Estatus"]=="LEIDO"){
            l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer; background-color:#2ECC71 '>";

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
        } else {
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
        
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  
}


function fn_Ver_ListadoDeProductos_Estatus_Consulta(){

     
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
 
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Estatus </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "</div>";
    
    for(i=0;i<listadodeproductos.length;i++){
        if(listadodeproductos[i]["Estatus"]=="LEIDO"){
            l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer; background-color:#2ECC71 '>";

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
     
            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estatus"] + "</label>";
            l_Linea=l_Linea + "</div>";
    
     
            l_Linea=l_Linea + "</div>";
        } else {
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
     
            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estatus"] + "</label>";
            l_Linea=l_Linea + "</div>";
     
            l_Linea=l_Linea + "</div>";

        }
        
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  
}

function fn_Ver_ListadoDeProductos_Estatus_Recepcion(){

     
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
 
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Leidos </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "</div>";
    
    for(i=0;i<listadodeproductos.length;i++){
        if(listadodeproductos[i]["estatus"]=="LEIDO"){
            /*
            l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer; background-color:#2ECC71 '>";

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
     
            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["leidos"] + "</label>";
            l_Linea=l_Linea + "</div>";    
     
            l_Linea=l_Linea + "</div>";
            */
        } else {
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
            
            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["leidos"] + "</label>";
            l_Linea=l_Linea + "</div>";    
     
    
     
            l_Linea=l_Linea + "</div>";

        }
        
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  
}




function Listado_Grabar_OrdenDeSurtido(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ordendesurtido_grabar.ctrl.php";
 
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
// ******************************************************************

// ******************************************************************
function Listado_Detalles(datos){    
    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ordendesurtido_deta_consultar.ctrl.php";
 
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
                     // Anexa los datos al listado de productos
                     listadodeproductos.push( { "nidproducto":obResultado[i]["nIDProducto"],"codigo": obResultado[i]["Codigo_IZeta"], "producto":obResultado[i]["Producto"], "unidaddemedida":obResultado[i]["UnidadDeMedida"], "cantidad":obResultado[i]["Cantidad"], "nidusuario":0, "nidcat_almacen_origen":0, "nidcat_almacen_destino":0, "comentarios":"" } );     
                } else {
                 
                }
            }     
            fn_Ver_ListadoDeProductos();
            // ----------------------------------------------------------------                     
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}
// ******************************************************************


function Cancelar_Traspaso(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/traspasos_cancelar_recepcion.ctrl.php";
 
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

function Grabar_Traspaso_Lectura(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/traspasos_grabar_lectura_recepcion.ctrl.php";
 
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

// ******************************************************************
function Listado_PorFolio(datos){    
    if(datos.length>0){
        MODULO="ordendesurtido"
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/" + MODULO + "_consultar_folio_detalles.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               //console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";
               var l_Llave="";
               var l_nIDOrdenDeSurtido=0;

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

            

               for(i=0;i<contador;i++){     
                     
                    if(obResultado[i]["retorno"]=="TRUE"){ 

                        for(j=0;j<listadodeproductos.length;j++){
                            listadodeproductos.pop();
                        }

                        l_nIDOrdenDeSurtido=obResultado[i]["nIDOrdenDeSurtido"];
                        listadodeproductos.push( { "nidordendesurtido":obResultado[i]["nIDOrdenDeSurtido"],  "nidproducto":obResultado[i]["nIDProducto"],"codigo": obResultado[i]["Codigo_IZeta"], "producto":obResultado[i]["Producto"], "unidaddemedida":obResultado[i]["UnidadDeMedida"], "cantidad":obResultado[i]["Cantidad"], "Estatus":"NO LEIDO" } );     
 
                    } else {
                        document.getElementById("lbl_mensaje_falla").innerHTML="Orden de Surtido No encontrada"        
                        $("#modal_falla").modal("show");                   
                        return;
                    }
                     
                 }    
                 
                 
                 document.getElementById("txt_nIDOrdenDeSurtido").value=l_nIDOrdenDeSurtido
                 fn_Ver_ListadoDeProductos_Estatus();
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}




// ******************************************************************