// ----------------------------------------------------------------------------------
// ambiente_clasificaciones_deta_rest.ctrl.js
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
       var url = UBICACION_CONTROL + "/ambiente_calificaciones_deta_crear.ctrl.php";
      
       document.getElementById("bt_Grabar").style.visibility="hidden";
       
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);
                             
            
               var obResultado=JSON.parse(l_Resultado);  
           
               if(obResultado[0]["retorno"]=="TRUE"){
                   console.log("correcto");     
                     
                   $("#modal_espera").modal("hide"); // 25/03/2020
                   $("#modal_exitoso").modal("show");

               } else {        
                   console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);   
                   $("#modal_espera").modal("hide");                       
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
        var url = UBICACION_CONTROL + "/ambiente_calificaciones_deta_actualizar.ctrl.php";
       
        document.getElementById("bt_Grabar").style.visibility="hidden";
        //$("#modal_espera").modal("show");
 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;     
                console.log(l_Resultado);
                              
             
                var obResultado=JSON.parse(l_Resultado);  
                
                //$("#modal_espera").modal("hide");
 
                if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");     

                    $("#modal_espera").modal("hide"); // 25/03/2020
                    $("#modal_exitoso").modal("show");
 
                } else {        
                    console.log(obResultado[0]["msg"]);   
                   console.log(obResultado);              
                   $("#modal_espera").modal("hide");            
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
       var url = UBICACION_CONTROL + "/ambiente_calificaciones_deta_eliminar.ctrl.php";
       
       document.getElementById("bt_Eliminar").style.visibility="hidden";
       //$("#modal_espera").modal("show");
      
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  

               console.log(l_Resultado);
               var obResultado=JSON.parse(l_Resultado);
   
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

 
 
function Consultar_Detalles(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ambiente_calificaciones_deta_consultar_todos.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               //console.log(l_Resultado);  

          
               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;  
               var l_Registros="";
              
               var MODULOS=new Array();
               var CREACIONES=new Array();
               var EDICION=new Array();
               var BORRAR=new Array();
               var CANCELAR=new Array();
               var CONSULTAR=new Array();
               var LISTAR=new Array();
               var EJECUTAR=new Array();
               var IMPRESION=new Array();
               var ETIQUETAS=new Array();
               var CARGA=new Array();
               var EXCEL=new Array();
               var PDF=new Array();

               var l_Pos=-1;
 
               var formulariop = document.getElementById("frm_Detalles");   

               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               for (var campo in obResultado[0]) {
                    l_Registros=l_Registros + campo + ",";
               }

                 for(i=0;i<contador;i++){     
                     l_Registros="";                    

                     if(obResultado[i]["retorno"]=="TRUE"){ 
                        
                         // Buscar el Id  
                         l_nIDModulo=0;
                         for (var campo in obResultado[i]) {
                            if(campo=="nIDModulo"){ 
                                //console.log("nIDModulo:" + obResultado[i]['nIDModulo'])    
                                MODULOS.push(obResultado[i]['nIDModulo']) ;                           
                            }

                            if(campo=="Creacion"){ 
                                //console.log("Creacion:" + obResultado[i]['Creacion'])    
                                CREACIONES.push(obResultado[i]['Creacion']) ;       
                            }

                            if(campo=="Editar"){ 
                                //console.log("Edicion:" + obResultado[i]['Edicion'])    
                                EDICION.push(obResultado[i]['Editar']) ;       
                            }

                            if(campo=="Eliminacion"){ 
                                //console.log("Eliminacion:" + obResultado[i]['Eliminacion'])    
                                BORRAR.push(obResultado[i]['Eliminacion']) ;       
                            }
 

                            if(campo=="Cancelar"){ 
                                //console.log("Cancelacion:" + obResultado[i]['Cancelacion'])    
                                CANCELAR.push(obResultado[i]['Cancelar']) ;       
                            }

                            if(campo=="Consultar"){ 
                                //console.log("Consultar:" + obResultado[i]['Consultar'])    
                                CONSULTAR.push(obResultado[i]['Consultar']) ;       
                            }

                            if(campo=="Listar"){ 
                                //console.log("Consultar:" + obResultado[i]['Consultar'])    
                                LISTAR.push(obResultado[i]['Listar']) ;       
                            }

                            if(campo=="Ejecutar"){ 
                                //console.log("Impresion:" + obResultado[i]['Impresion'])    
                                EJECUTAR.push(obResultado[i]['Ejecutar']) ;       
                            }
                            

                            if(campo=="Imprimir"){ 
                                //console.log("Impresion:" + obResultado[i]['Impresion'])    
                                IMPRESION.push(obResultado[i]['Imprimir']) ;       
                            }

                            if(campo=="Etiquetas"){ 
                                //console.log("Impresion:" + obResultado[i]['Impresion'])    
                                ETIQUETAS.push(obResultado[i]['Etiquetas']) ;       
                            }

                            if(campo=="CargaMasiva"){ 
                                //console.log("Impresion:" + obResultado[i]['Impresion'])    
                                CARGA.push(obResultado[i]['CargaMasiva']) ;       
                            }

                            if(campo=="ExportarPDF"){ 
                                //console.log("Impresion:" + obResultado[i]['Impresion'])    
                                PDF.push(obResultado[i]['ExportarPDF']) ;       
                            }

                            if(campo=="ExportarExcel"){ 
                                //console.log("Impresion:" + obResultado[i]['Impresion'])    
                                EXCEL.push(obResultado[i]['ExportarExcel']) ;       
                            }

                         }
                      }
                 }    

                 /*
                 console.log("Modulos");
                 console.log(MODULOS);
                 console.log("Creaciones");
                 console.log(CREACIONES);
                 console.log(EDICION);
                 console.log(ELIMINACION);
                 console.log(CANCELACION);
                 console.log(CONSULTAR);
                 console.log(IMPRESION);    
                 */
                 
                 for (k=0;k<formulariop.elements.length;k++){
                    sCampo=formulariop.elements[k].name;
                    sCampo=sCampo.trim(); 
 
                     if(sCampo.length>0){

                        l_Pos=sCampo.indexOf("_");

                        if(l_Pos>=0){
                            l_Campo_Extraido=sCampo.substr(0,l_Pos);
                            l_Pos=l_Pos+1;
                            l_IDModulo_Extraido=sCampo.substr(l_Pos,sCampo.length);                           
                         }

                         // Creacion
                         for(j=0;j<MODULOS.length;j++){
                             l_Creacion="Creacion_" + MODULOS[j];
                             l_Edicion="Editar_" + MODULOS[j];
                             l_Borrar="Borrar_" + MODULOS[j];
                             l_Cancelar="Cancelar_" + MODULOS[j];
                             l_Consultar="Consultar_" + MODULOS[j];
                             l_Listar="Listar_" + MODULOS[j];
                             l_Ejecutar="Ejecutar_" + MODULOS[j];
                             
                             l_Impresion="Imprimir_" + MODULOS[j];
                             l_Etiquetas="Etiquetas_" + MODULOS[j];

                             l_Carga="Carga_" + MODULOS[j];
                             l_Excel="Excel_" + MODULOS[j];
                             l_PDF="PDF_" + MODULOS[j];

 
                             if(sCampo==l_Creacion){                                   
                                if(CREACIONES[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Edicion){                                 
                                if(EDICION[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Borrar){                                 
                                if(BORRAR[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Cancelar){                                 
                                if(CANCELAR[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Consultar){                                 
                                if(CONSULTAR[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Listar){                                 
                                if(LISTAR[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }
                             if(sCampo==l_Ejecutar){                                 
                                if(EJECUTAR[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Impresion){                                 
                                if(IMPRESION[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }
                             
                             if(sCampo==l_Etiquetas){                                 
                                if(ETIQUETAS[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }


                             if(sCampo==l_Carga){                                 
                                if(CARGA[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_Excel){                                 
                                if(EXCEL[j]=="SI"){
                                    formulariop.elements[k].checked=true;
                                }
                             }

                             if(sCampo==l_PDF){                                 
                                if(PDF[j]=="SI"){
                                    formulariop.elements[k].checked=true;
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

function Ver_Detalles(datos){    
    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ambiente_calificaciones_deta_consultar.ctrl.php";
      
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
        var url = UBICACION_CONTROL + "/ambiente_calificaciones_deta_consultar.ctrl.php";
 
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


function Ambiente_Clasificaciones_Deta_Combo(datos){ 

    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/ambiente_clasificaciones_deta_consultar.ctrl.php";
      
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

               document.getElementById("cb_nIDAmbiente_Clasificacion_Deta").innerHTML=l_Registros;
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}