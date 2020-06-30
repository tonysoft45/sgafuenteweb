// ----------------------------------------------------------------------------------
// ambiente_modulos_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------


var listadodemodulos=[];

function Listado(datos){    
    if(datos.length>0){
        $("#modal_espera").modal("show");

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
                                    l_Linea=l_Linea  + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Editar' style='color: #53BEFE;cursor:pointer; margin-right: -20px; '>Editar </a>"
                                    l_Linea=l_Linea  + "<a class='nav-link' href='" + MODULO + "_editar.php?id=" + obResultado[i][campo] +"&accion=Eliminar' style='color: #53BEFE;cursor:pointer;margin-right: -20px;' >Eliminar</a>";           

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
                 l_Linea=l_Linea + "<th scope='col' style='background-color:#FFF;font-size:10px; font-family:Arial Black'> ";
                 l_Linea=l_Linea + "<label style='cursor:pointer;'> NO TIENE REGISTROS </label>";
                 l_Linea=l_Linea + "</th>";
                 l_Linea=l_Linea + "</tr>";
                 l_Linea=l_Linea + "</tbody>"; 


                 l_Linea=l_Linea + "</table>";
                 l_Linea=l_Linea + "</div>";
               }
                  
               document.getElementById("contenido").innerHTML=l_Linea;  
                 $("#modal_espera").modal("hide");    
               
               obVerificar=setInterval(Ocultar_Espera,500);     
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
                   $("#modal_espera").modal("hide");
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
        $("#modal_espera").modal("show");
 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;     
                console.log(l_Resultado);
                              
             
                var obResultado=JSON.parse(l_Resultado);  
                
                $("#modal_espera").modal("hide");
 
                if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");     
                      
                    $("#modal_exitoso").modal("show");
 
                } else {        
                    console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);                          
                   document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];                   
                   $("#modal_falla").modal("show");
                   document.getElementById("bt_Grabar").style.visibility="visible";
                   $("#modal_espera").modal("hide");
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

               var nIDModulo_Padre=0;
               var Padre_NombreDelModulo="";

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
      
                        nIDModulo_Padre=obResultado[i]["nIDModulo_Padre"];
                        Padre_NombreDelModulo=obResultado[i]["Padre_NombreDelModulo"];
            
                        
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
               
                              
               fn_Presentar_Adjunto_Imagen();           

               // Carga la info del modulo
               document.getElementById("cb_nIDModulo_Padre").text=nIDModulo_Padre; 
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






function Ambiente_Modulos_Combo(datos){ 

    if(datos.length>0){
        var nID=datos[0]["seleccion"];
        var Accion=datos[0]["accion"];

        if(Accion=="Eliminar"){
            return;
        }

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ambiente_modulos_consultar.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;  
                console.log(l_Resultado);  
 
           
                var obResultado=JSON.parse(l_Resultado);
                               
                var contador=obResultado.length;
                var i=0;
                var h=0;
                var l_Registros="";                
                var l_Llave="";
                
                var combos=new Array();
                var registros=new Array();
                var valores=new Array();                
                var l_Posicion=0;               
                var valor=new Array();
                var registro="";
 
 
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
                          l_Posicion=0;
                          for(h=0;h<combos.length;h=h+1){
 
                             for (var campo in obResultado[i]) {
                                 if(campo!="retorno" && campo!="msg" && campo!="llave" && campo!="especiales" && campo!="combo" ){
 
                                     if(campo==combos[h]["campo"]){
                                         valores.push( obResultado[i][campo]);                                          
                                     }
                                 }
                             }
 
                          }
 
 
                          
                          //registros.push( [valores] );  
                          registro=[];
                          registros.push();
                         
                          for(h=0;h<valores.length;h=h+1){                                          
                             valor=valores[h];
                             registro.push(valor);
                              
                             
                          }
                          registros[registros.length]=registro;
               
 
                          while(valores.length > 0) {
                             valores.pop(); 
                          }
 
                          while(combos.length > 0) {
                             combos.pop(); 
                          }
                              
                         
 
                          console.log(registros);
                
                    }
                }    
 
                // Construye la respuesta
                l_Registros="<option value='0'>Ninguno</option>";
                for(i=0;i<registros.length;i=i+1){
                     if(nID==registros[i][0]){
                        l_Registros=l_Registros + "<option selected value='" + registros[i][0] + "'>";                    
                     } else {
                        l_Registros=l_Registros + "<option value='" + registros[i][0] + "'>";                    
                     }
                     
                     for(j=1;j<registros[i].length;j=j+1){
                         l_Registros=l_Registros + "" + registros[i][j] + "";
                     }
                     l_Registros=l_Registros + "</option>  ";                  
                }
 
                console.log("Registros:"+ l_Registros);  
                 
                document.getElementById("cb_nIDModulo").innerHTML=l_Registros;  
                // ----------------------------------------------------------------             
            
            }        
         };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function Ambiente_Modulos_Combo_Padre(datos){ 

    if(datos.length>0){
        var l_nIDModulo_Padre=document.getElementById("cb_nIDModulo_Padre").value;

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ambiente_modulos_consultar.ctrl.php";
      
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

                if(l_nIDModulo_Padre==registros[i]["valor1"]){
                    l_Registros=l_Registros + "<option selected value='" + registros[i]["valor1"] + "'>" + registros[i]["valor2"] + "</option>  ";
                } else {
                    l_Registros=l_Registros + "<option value='" + registros[i]["valor1"] + "'>" + registros[i]["valor2"] + "</option>  ";
                }
                    
               }
         
               console.log("Registros:"+ l_Registros);  

               document.getElementById("cb_nIDModulo_Padre").innerHTML=l_Registros;  


               return true;
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function Listado_Modulos(datos){
    
    
    if(datos.length>0){
        console.log(datos);
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ambiente_modulos_consultar_todos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;
               var l_Registros="";
               var l_Linea="";                
               var l_nIDModulo=0;
               var l_nIDModulo1=0;
               var l_nIDModulo1_1=0;


               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

               l_Linea=l_Linea + "<div class='table-responsive table-hover' style='margin-left:-10px; width:103%'>";
               l_Linea=l_Linea + "<table class='table'>";
               l_Linea=l_Linea + "<thead>";

               if(ACCION!="Eliminar") {            
                l_Linea=l_Linea + "<tr>";

                l_Linea=l_Linea + "<th class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
                l_Linea=l_Linea + "<label>";
              
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosCrear_0' id='ch_TodosCrear' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Crear()\"> ";                
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosEditar_0' id='ch_TodosEditar' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Editar()\"> ";                
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosBorrar_0' id='ch_TodosBorrar' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Borrar()\"> ";                
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosCancelar_0' id='ch_TodosCancelar' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Cancelar()\"> ";                
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosConsultar_0' id='ch_TodosConsultar' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Consultar()\"> "; 
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosListar_0' id='ch_TodosListar' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Listar()\"> "; 
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosEjecutar_0' id='ch_TodosEjecutar' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Ejecutar()\"> ";               
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosImprimir_0' id='ch_TodosImprimir' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Imprimir()\"> ";            
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosEtiquetas_0' id='ch_TodosEtiquetas' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Etiquetas()\"> ";       
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosCarga_0' id='ch_TodosCarga' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Carga()\"> ";         
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosExcel_0' id='ch_TodosExcel' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_Excel()\"> ";            
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";
               l_Linea=l_Linea + "<input type='checkbox' name='TodosPDF_0' id='ch_TodosPDF' class='' value='NO'  style='font-size:10px; font-family:Arial, Gadget, sans-serif;' onclick=\"fn_Checar_PDF()\"> ";            
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";


               l_Linea=l_Linea + "</tr>";
               }

               l_Linea=l_Linea + "<tr>";

               l_Linea=l_Linea + "<th class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";    
               l_Linea=l_Linea + "Modulo";           
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Crear";
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Editar";
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Eliminar";
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Cancelar";
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";               
               l_Linea=l_Linea + "Consultar";
               l_Linea=l_Linea + "</label>";
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Listar";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Ejecutar";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Imprimir";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Etiquetas";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Carga";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";                
               l_Linea=l_Linea + "Excel";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "<th  class='align-middle' scope='col' class='th' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black; text-align:center'>";
               l_Linea=l_Linea + "<label>";              
               l_Linea=l_Linea + "PDF";
               l_Linea=l_Linea + "</label>"
               l_Linea=l_Linea + "</th>";

               l_Linea=l_Linea + "</tr>";
               
               l_Linea=l_Linea + "</thead>";

               l_Linea=l_Linea + "<tbody>";
               if(obResultado[0]["retorno"]=="TRUE"){ 
                    for(i=0;i<contador;i++){     
                        if(obResultado[i]["retorno"]=="TRUE"){ 

                            if(obResultado[i]["nIDModulo_Padre"]==0){

                                l_nIDModulo=obResultado[i]["nIDModulo"];

                                listadodemodulos.push( { "nidmodulo":obResultado[i]["nIDModulo"], "nombredelmodulo":obResultado[i]["NombreDelModulo"], "nivel": obResultado[i]["Nivel"], "orden": obResultado[i]["Orden"], 
                                                         "creacion": obResultado[i]["Creacion"], "editar": obResultado[i]["Editar"], "borrar": obResultado[i]["Borrar"], "cancelar": obResultado[i]["Cancelar"],"consultar": obResultado[i]["Consultar"],
                                                         "listar": obResultado[i]["Listar"],"ejecutar": obResultado[i]["Ejecutar"],"imprimir": obResultado[i]["Imprimir"],"etiquetas": obResultado[i]["Etiquetas"],
                                                         "cargamasiva": obResultado[i]["CargaMasiva"],"exportarexcel": obResultado[i]["ExportarExcel"], "exportarpdf": obResultado[i]["ExportarPDF"] })

                                for(j=0;j<contador;j++){

                                    if(obResultado[j]["nIDModulo_Padre"]==l_nIDModulo){

                                        l_nIDModulo1=obResultado[j]["nIDModulo"];

                                        listadodemodulos.push( { "nidmodulo":obResultado[j]["nIDModulo"], "nombredelmodulo":obResultado[j]["NombreDelModulo"], "nivel": obResultado[j]["Nivel"], "orden": obResultado[j]["Orden"], 
                                                                 "creacion": obResultado[j]["Creacion"], "editar": obResultado[j]["Editar"], "borrar": obResultado[j]["Borrar"], "cancelar": obResultado[j]["Cancelar"],"consultar": obResultado[j]["Consultar"],
                                                                 "listar": obResultado[j]["Listar"],"ejecutar": obResultado[j]["Ejecutar"],"imprimir": obResultado[j]["Imprimir"],"etiquetas": obResultado[j]["Etiquetas"],
                                                                 "cargamasiva": obResultado[j]["CargaMasiva"],"exportarexcel": obResultado[j]["ExportarExcel"], "exportarpdf": obResultado[j]["ExportarPDF"] })

                                        for(k=0;k<contador;k++){

                                            if(obResultado[k]["nIDModulo_Padre"]==l_nIDModulo1){

                                                l_nIDModulo1_1=obResultado[k]["nIDModulo"];

                                                listadodemodulos.push( { "nidmodulo":obResultado[k]["nIDModulo"], "nombredelmodulo":obResultado[k]["NombreDelModulo"], "nivel": obResultado[k]["Nivel"], "orden": obResultado[k]["Orden"], 
                                                                         "creacion": obResultado[k]["Creacion"], "editar": obResultado[k]["Editar"], "borrar": obResultado[k]["Borrar"], "cancelar": obResultado[k]["Cancelar"],"consultar": obResultado[k]["Consultar"],
                                                                         "listar": obResultado[k]["Listar"],"ejecutar": obResultado[k]["Ejecutar"],"imprimir": obResultado[k]["Imprimir"],"etiquetas": obResultado[k]["Etiquetas"],
                                                                         "cargamasiva": obResultado[k]["CargaMasiva"],"exportarexcel": obResultado[k]["ExportarExcel"], "exportarpdf": obResultado[k]["ExportarPDF"] })

                                            }
                                        }     
                                    }
                                }     
  
                            }  
 
                        }

                    }

                    // Muestra los registros

                    for(i=0;i<listadodemodulos.length;i++){

                        l_Linea=l_Linea + "<tr>";

                        l_Linea=l_Linea + " <td class='align-left' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:left'>";  
                        l_Linea=l_Linea + "<label>";
                        l_Linea=l_Linea + listadodemodulos[i]["nombredelmodulo"];
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>";  
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["creacion"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Creacion_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Crear_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px;' > ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Creacion_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Crear_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px;' disabled > ";
                        }
                        
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["editar"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Editar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Editar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Editar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Editar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px;' disabled> ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["borrar"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Borrar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Borrar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Borrar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Borrar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; ' disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["cancelar"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Cancelar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Cancelar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Cancelar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Cancelar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; ' disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["consultar"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Consultar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Consultar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Consultar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Consultar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; ' disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["listar"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Listar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Listar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Listar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Listar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '  disabled  > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["ejecutar"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Ejecutar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Ejecutar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Ejecutar_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Ejecutar_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; ' disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["imprimir"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Imprimir_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Imprimir_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Imprimir_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Imprimir_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; ' disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["etiquetas"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Etiquetas_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Etiquetas_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Etiquetas_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Etiquetas_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; ' disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["cargamasiva"]=="SI"){
                            l_Linea=l_Linea + "<input type='checkbox' name='Carga_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Carga_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Carga_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Carga_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '  disabled  > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["exportarexcel"]=="SI"){                            
                            l_Linea=l_Linea + "<input type='checkbox' name='Excel_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Excel_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='Excel_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_Excel_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '  disabled > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";

                        l_Linea=l_Linea + "<td class='align-center' scope='col' class='td' style='font-size:10px; font-family:Arial Black; text-align:center'>"; 
                        l_Linea=l_Linea + "<label>";
                        if(listadodemodulos[i]["exportarpdf"]=="SI"){                   
                            l_Linea=l_Linea + "<input type='checkbox' name='PDF_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_PDF_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '> ";
                        } else {
                            l_Linea=l_Linea + "<input type='checkbox' name='PDF_" + listadodemodulos[i]["nidmodulo"] + "' id='ch_PDF_" + listadodemodulos[i]["nidmodulo"] + "' class='' value='NO' style='font-size:10px; font-family:Arial, Gadget, sans-serif; margin-left:-10px; padding-top:30px; '  disabled  > ";
                        }
                        l_Linea=l_Linea + "</label>";
                        l_Linea=l_Linea + " </td>";


                        l_Linea=l_Linea + "</tr>";

                    }
                    


               } else {
                    l_Linea=l_Linea + "<tr>";
                    l_Linea=l_Linea + "<th scope='col' style='background-color:#F4F5F5;font-size:10px; font-family:Arial Black'> ";
                    l_Linea=l_Linea + "<label style='cursor:pointer;'> NO TIENE MODULOS CARGADOS </label>";
                    l_Linea=l_Linea + "</th>";
                    l_Linea=l_Linea + "</tr>";
               }

               l_Linea=l_Linea + "</tbody>";

               l_Linea=l_Linea + "</table>";

               l_Linea=l_Linea + "</div>";

               //$("#modal_espera").modal("hide");
               document.getElementById("contenido").innerHTML=l_Linea; 
               
               // Muestra los valores de los campos
               resultado=Consultar_Detalles(datos); 
               
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

// Ocultar la espera
function Ocultar_Espera(){
    $("#modal_espera").modal("hide");       
}

