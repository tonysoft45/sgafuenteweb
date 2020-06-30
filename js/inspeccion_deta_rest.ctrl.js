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
var listadodeproductos=new Array();
var listadodeproductos_serie=new Array();

function Listado_Detalles_Inspeccion(datos){    
    if(datos.length>0){
        var l_nIDUsuario=datos[0]["nidusuario"];

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inspeccion_deta_consultar_todos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;  
                console.log(l_Resultado);  

                var obResultado=JSON.parse(l_Resultado);
                var contador=obResultado.length;
 
                for(i=0;i<contador;i++){  
                    if(obResultado[i]["retorno"]=="TRUE"){ 
                        Cargar_Detalles( obResultado[i]["nIDPackingList_Deta"], obResultado[i]["nIDPackingList"], 
                                         obResultado[i]["nIDProducto"], obResultado[i]["Codigo"],obResultado[i]["CodigoQR"],obResultado[i]["Producto"], obResultado[i]["Descripcion"],
                                         obResultado[i]["Cantidad"], obResultado[i]["CantidadCaja"], obResultado[i]["Cajas"], obResultado[i]["PesoBruto"], obResultado[i]["PesoNeto"],
                                         obResultado[i]["TotalM3"],obResultado[i]["Carton"],obResultado[i]["Estatus"], obResultado[i]["Estado"],obResultado[i]["TotalLeer"],obResultado[i]["nIDProducto_Serie"],  l_nIDUsuario, obResultado[i]["CodigoDeBarras"],obResultado[i]["nIDCat_Estado"] );
                    }
                }

                Detalles_Inspeccion()
                //fn_Mostrar_Detalles();

                
           }
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }
}

function Cargar_Detalles(l_nIDPackingList_Deta, l_nIDPackingList,  
                         l_nIDProducto, l_Codigo, l_CodigoQR, l_Producto, l_Descripcion, 
                         l_Cantidad, l_CantidadCaja, l_Cajas, l_PesoBruto,l_PesoNeto, 
                         l_TotalM3, l_Carton, l_Estatus, l_Estado, l_TotalLeer, l_nIDProducto_Serie, nIDUsuario,l_CodigoDeBarras, l_nIDCat_Estado ){
     
    l_Codigo=l_Codigo.trim();
    l_CodigoQR=l_CodigoQR.trim();
    l_Producto=l_Producto.trim();
    l_Descripcion=l_Descripcion.trim();
    l_Estatus=l_Estatus.trim();
    l_Estado=l_Estado.trim();
    l_CodigoDeBarras=l_CodigoDeBarras.trim()


    // Carga 
    var bandEncontrado=0;
    var i;
    for(i=0;i<listadodeproductos.length;i++){
        if(l_nIDPackingList_Deta==listadodeproductos[i]["nidpackinglist_deta"]){
            
          
            
            if(l_TotalLeer==listadodeproductos[i]["leidos"]){
                listadodeproductos[i]["estatus"]="INSPECCIONADO";
            }  

            listadodeproductos[i]["ubicacion"]="AREA DE INSPECCION";

            bandEncontrado=1;
        }  
    }

    if(bandEncontrado==0){
        listadodeproductos.push( { "nidpackinglist_deta":l_nIDPackingList_Deta,"nidpackinglist":l_nIDPackingList, 
                               "nidproducto":l_nIDProducto,"codigo": l_Codigo, "codigoqr": l_CodigoQR,  
                               "producto":l_Producto, "descripcion":l_Descripcion, "cantidad":l_Cantidad, "cantidadcaja":l_CantidadCaja, 
                               "cajas":l_Cajas,"pesobruto":l_PesoBruto, "pesoneto":l_PesoNeto, "totalm3":l_TotalM3, "carton":l_Carton, "estatus":l_Estatus, "estado":l_Estado, 
                               "totalleer":l_TotalLeer, "nidproducto_serie": l_nIDProducto_Serie, "nidusuario":nIDUsuario , "ubicacion":"SIN UBICACION", "leidos":0, "codigodebarras":l_CodigoDeBarras,"nidcat_estado":l_nIDCat_Estado } );  
    }

}

function Detalles_Inspeccion(){    
    if(listadodeproductos.length>0){
      
        ob = JSON.stringify(listadodeproductos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/inspeccion_deta_consultar_todos_leidos.ctrl.php";
 
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;  
                console.log(l_Resultado);  

                var obResultado=JSON.parse(l_Resultado);  
              
                if(obResultado[0]["retorno"]=="TRUE"){                      
                   // $("#modal_exitoso").modal("show");
 
                    //document.getElementById("txt_Etiqueta").value="";
                    
                    for(x=0;x<obResultado.length;x=x+1){
                        if(obResultado[x]["retorno"]=="TRUE"){      
                            var l_nIDPackingList_Deta=obResultado[x]["nidpackinglist_deta"];
                            var l_nIDPackingList=obResultado[x]["nidpackingList"];
                            var l_nIDProducto=obResultado[x]["nidproducto"];
                            var l_Serie=obResultado[x]["serie"];
                            var l_Codigo=obResultado[x]["codigodebarras"];
                            var l_nIDCat_Estado=obResultado[x]["nidcat_estado"];
                            var l_nIDUsuario=obResultado[x]["nidusuario"];
                            var l_Estado=obResultado[x]["estado"];
                            var l_nIDProducto_Serie=obResultado[x]["nidproducto_serie"];
    
                            var bandEncontrado=0;
                            var i;
                            for(i=0;i<listadodeproductos_serie.length;i++){
                                if(l_Codigo==listadodeproductos_serie[i]["codigo"]){
                                     bandEncontrado=1; 
                                }  
                            }
    
    
                            if(bandEncontrado==0){
                                listadodeproductos_serie.push( { "nidpackinglist_deta":l_nIDPackingList_Deta,"nidpackinglist":l_nIDPackingList, 
                                                                 "nidproducto":l_nIDProducto,"codigo": l_Codigo, 
                                                                 "nidproducto_serie": l_nIDProducto_Serie, "serie":l_Serie, "nidcat_estado":l_nIDCat_Estado, "nidusuario":l_nIDUsuario } );  
        
                                // Busca el detalle del packinglist
        
                                var bandEncontrado=0;
                                var i;
                                for(i=0;i<listadodeproductos.length;i++){
                                    if(l_nIDPackingList_Deta==listadodeproductos[i]["nidpackinglist_deta"]){
                                        
                                        listadodeproductos[i]["leidos"]=listadodeproductos[i]["leidos"]+1;
                                        
                                        listadodeproductos[i]["estado"]=l_Estado;
        
        
                                        if(listadodeproductos[i]["totalleer"]==listadodeproductos[i]["leidos"]){
                                            listadodeproductos[i]["estatus"]="INSPECCIONADO";
                                        }  
                            
                                        listadodeproductos[i]["ubicacion"]="AREA DE INSPECCION";
                            
                                        bandEncontrado=1;
        
                                        break;
                                    }  
                                }
        
                           }  
                        } 
                      

                    }
                   
                    fn_Mostrar_Detalles();
  
                } else {        
                    fn_Mostrar_Detalles();
                     
                }
           }
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }
}

 
function fn_Encima_Deta(i,actividad){
    var registro = document.getElementById("id_"+i);

    document.getElementById("id_"+i).style.background="#DEE0E2";
}

function fn_Dejar_Deta(i,actividad){
    var registro = document.getElementById("id_"+i);

    document.getElementById("id_"+i).style.background="#FFF";
}

function fn_Encima_Deta_I(i,actividad){
    var registro = document.getElementById("id_"+i);

    document.getElementById("id_"+i).style.background="#DEE0E2";
}

function fn_Dejar_Deta_I(i,actividad){
    var registro = document.getElementById("id_"+i);

    document.getElementById("id_"+i).style.background="#00FF00";
}


function Imprimir_Etiqueta(datos){
    if(datos.length>0){
        var l_nID=datos[0]["id"];

        ob = JSON.stringify(datos);
 
        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/generate_code_barras.ctrl.php";
       
         xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var l_Resultado=this.responseText;     
                console.log(l_Resultado);
                              
             
                var obResultado=JSON.parse(l_Resultado);  
                
               
                if(obResultado[0]["retorno"]=="TRUE"){
                    console.log("correcto");     
                      
                   // $("#modal_exitoso").modal("show");
                   obVENTANA=window.open("barras_vistaprevia.php?l_id="+l_nID,"VISTA PREVIA","status=no,toolbar=no,menubar=no,scrollbars=yes,location=yes,width=1024, height=600");
 
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


function Validar_Detalles(datos){	 
    // La serie esta compuesta por nIDPackingList/nIDProducto/Serie

    console.log("CTRL");    
    console.log(datos);   
    
 
    if(datos.length>0){      
        var l_Codigo=datos[0]["codigo"];
        var l_nIDCat_Estado=datos[0]["nidcat_estado"];
        var l_Estado=datos[0]["estado"];
        var l_nIDPackingList=datos[0]["nid"];
        var l_nIDUsuario=datos[0]["nidusuario"];


        // Buscar el codigo      
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/validar_codigo.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;     
               console.log(l_Resultado);

               var obResultado=JSON.parse(l_Resultado);  
              
               if(obResultado[0]["retorno"]=="TRUE"){                      
                  // $("#modal_exitoso").modal("show");

                   document.getElementById("txt_Etiqueta").value="";
                   
                   var l_nIDProducto_Serie=obResultado[0]["nidproducto_serie"];
                   var l_nIDPackingList_Deta=obResultado[0]["nidpackinglist_deta"];
                   var l_nIDProducto=obResultado[0]["nidproducto"];
                   var l_Serie=obResultado[0]["serie"];

                   var bandEncontrado=0;
                   var i;
                   for(i=0;i<listadodeproductos_serie.length;i++){
                       if(l_Codigo==listadodeproductos_serie[i]["codigo"]){
                            bandEncontrado=1; 
                       }  
                   }
               
                   if(bandEncontrado==0){
                        listadodeproductos_serie.push( { "nidpackinglist_deta":l_nIDPackingList_Deta,"nidpackinglist":l_nIDPackingList, 
                                                         "nidproducto":l_nIDProducto,"codigo": l_Codigo, 
                                                         "nidproducto_serie": l_nIDProducto_Serie, "serie":l_Serie, "nidcat_estado":l_nIDCat_Estado, "nidusuario":l_nIDUsuario } );  

                        // Busca el detalle del packinglist

                        var bandEncontrado=0;
                        var i;
                        for(i=0;i<listadodeproductos.length;i++){
                            if(l_nIDPackingList_Deta==listadodeproductos[i]["nidpackinglist_deta"]){
                                
                                listadodeproductos[i]["leidos"]=listadodeproductos[i]["leidos"]+1;
                                
                                listadodeproductos[i]["estado"]=l_Estado;


                                if(listadodeproductos[i]["totalleer"]==listadodeproductos[i]["leidos"]){
                                    listadodeproductos[i]["estatus"]="INSPECCIONADO";
                                }  
                    
                                listadodeproductos[i]["ubicacion"]="AREA DE INSPECCION";
                    
                                bandEncontrado=1;

                                break;
                            }  
                        }

                        if(bandEncontrado==1){
                            fn_Mostrar_Detalles();
                        } else {
                            console.log(obResultado[0]["msg"]);   
                            console.log(obResultado);                          
                            document.getElementById("lbl_mensaje_falla").innerHTML="Codigo No encontrado en el packinglist"                  
                            $("#modal_falla").modal("show");
                            document.getElementById("bt_Recibo").style.visibility="visible";
                        }

                   } else {
                        console.log(obResultado[0]["msg"]);   
                        console.log(obResultado);                          
                        document.getElementById("lbl_mensaje_falla").innerHTML="Codigo Escaneado o Capturado"                  
                        $("#modal_falla").modal("show");
                        document.getElementById("bt_Recibo").style.visibility="visible";
                   }

                   // Mostrar los detalles
                   //fn_Cargar_Detalles_Seleccionado_Clic();


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


function fn_Mostrar_Detalles(){       
    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Descripcion </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Cantidad Total (Pc/Set)  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Cajas  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Total Escanear  </label>";
    l_Linea=l_Linea + "</div>";
     
    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Leidas  </label>";
    l_Linea=l_Linea + "</div>";
 
    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Ubicacion  </label>";
    l_Linea=l_Linea + "</div>";
    
    l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Estado  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Estatus  </label>";
    l_Linea=l_Linea + "</div>";

   
        l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-left align-items-center' style='height:50px;text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' > Acciones  </label>";
        l_Linea=l_Linea + "</div>";
     

    l_Linea=l_Linea + "</div>";

    for(i=0;i<listadodeproductos.length;i++){
        l_Estatus=listadodeproductos[i]["estatus"]
        

        if(l_Estatus=="INSPECCIONADO"){
            l_Linea=l_Linea + "<div id='id_" + i +"' class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;' onmouseover=\"fn_Encima_Deta_I("+i+")\" onmouseout=\"fn_Dejar_Deta_I("+i+")\">";

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
            l_Linea=l_Linea + "</div>";

            l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["descripcion"] + "</label>";
            l_Linea=l_Linea + "</div>";  

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style=' height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cajas"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["totalleer"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["leidos"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["ubicacion"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-start align-items-left' style='height:40px;text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estatus"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

           
            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='height:40px; text-align:center; font-size:8px; vertical-aling:middle;display:block; background-color:#00FF00;'>";
            if(ACCION=="Detalles"){
                l_Linea=l_Linea + "<label id='lb_Etiqueta' style='color:#2271b3; cursor:pointer;font-family:Arial black, Gadget, sans-serif;'> Imprimir Etiqueta " + " </label>";
            }
            l_Linea=l_Linea + "</div>"; 
            

            l_Linea=l_Linea + "</div>";

        } else {
            l_Linea=l_Linea + "<div id='id_" + i +"' class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;' onmouseover=\"fn_Encima_Deta("+i+")\" onmouseout=\"fn_Dejar_Deta("+i+")\">";

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
            l_Linea=l_Linea + "</div>";

            l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-start align-items-left text-break' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["descripcion"] + "</label>";
            l_Linea=l_Linea + "</div>";  

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cajas"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["totalleer"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["leidos"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["ubicacion"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left text-break' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-2 d-flex justify-content-start align-items-left text-break' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estatus"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col-md-1 d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            if(ACCION=="Detalles"){                
                l_Linea=l_Linea + "<label id='lb_Etiqueta' style='color:#2271b3; cursor:pointer;font-family:Arial black, Gadget, sans-serif;' onclick=\"fn_Imprimir_Etiqueta_Clic('" + listadodeproductos[i]["nidpackinglist_deta"] +  "')\"> Imprimir Etiqueta " + " </label>";            
            }
            l_Linea=l_Linea + "</div>"; 
            

            l_Linea=l_Linea + "</div>";
        }

        
    }
 
    document.getElementById("contenido_productos").innerHTML=l_Linea;  

}













//  *****************************************************************************************
// REVISAR




function fn_Anexar_Detalles(l_nIDPackingList_Deta, l_nIDPackingList, l_nIDInspeccion, l_nIDProducto_Serie,
                            l_nIDProducto, l_Codigo, l_CodigoQR, l_Serie, l_Producto, l_Descripcion, 
                            l_Cantidad, l_CantidadCaja, l_Cajas, l_PesoBruto,l_PesoNeto, 
                            l_TotalM3, l_Carton, l_Estatus, l_Estado, nIDUsuario,l_TotalLeer ){
     
    l_Codigo=l_Codigo.trim();
    l_CodigoQR=l_CodigoQR.trim();
    l_Producto=l_Producto.trim();
    l_Descripcion=l_Descripcion.trim();
    l_Estatus=l_Estatus.trim();
    l_Estado=l_Estado.trim();
    l_Leidos=1;

    var bandEncontrado=0;
    var i;
    for(i=0;i<listadodeproductos.length;i++){
        if(l_nIDInspeccion==listadodeproductos[i]["nidproducto_serie"]){
            listadodeproductos[i]["leidos"]=listadodeproductos[i]["leidos"]+1;
            
            if(l_TotalLeer==listadodeproductos[i]["leidos"]){
                listadodeproductos[i]["estatus"]="INSPECCIONADO";
            }

            listadodeproductos[i]["ubicacion"]="AREA DE INSPECCION";

            bandEncontrado=1;
        }
    }

    if(bandEncontrado==0){
        listadodeproductos.push( { "nidpackinglist_deta":l_nIDPackingList_Deta,"nidpackinglist":l_nIDPackingList, "nidproducto_serie":l_nIDProducto_Serie,
        "nidproducto":l_nIDProducto,"codigo": l_Codigo, "codigoqr": l_CodigoQR, "serie":l_Serie,
        "producto":l_Producto, "descripcion":l_Descripcion, "cantidad":l_Cantidad, "cantidadcaja":l_CantidadCaja, 
        "cajas":l_Cajas,"pesobruto":l_PesoBruto, "pesoneto":l_PesoNeto, "totalm3":l_TotalM3, "carton":l_Carton, "estatus":l_Estatus, "estado":l_Estado, 
         "nidusuario":nIDUsuario, "leidos": l_Leidos, "totalleer":l_TotalLeer } );     
    }

    var l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Descripcion </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Cantidad Total (Pc/Set)  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Cajas  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Leidas  </label>";
    l_Linea=l_Linea + "</div>";
 
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Ubicacion  </label>";
    l_Linea=l_Linea + "</div>";
    
    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Estado  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Estatus  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Acciones  </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "</div>";

    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        if(l_Estatus=="INSPECCIONADO"){
            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
            l_Linea=l_Linea + "</div>";

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["descripcion"] + "</label>";
            l_Linea=l_Linea + "</div>";  

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cajas"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["leidas"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["ubicacion"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;background-color:#00FF00;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estatus"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

        } else {
            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo"] + "</label>";
            l_Linea=l_Linea + "</div>";

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["descripcion"] + "</label>";
            l_Linea=l_Linea + "</div>";  

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cajas"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["leidas"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["ubicacion"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estado"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["estatus"] + "</label>";
            l_Linea=l_Linea + "</div>"; 

            l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
            l_Linea=l_Linea + "<label id='lb_Etiqueta' style='color:#2271b3; cursor:pointer;font-family:Arial black, Gadget, sans-serif;' onclick=\"fn_Imprimir_Etiqueta_Clic('" + l_nIDPackingList_Deta +  "')\"> Imprimir Etiqueta " + " </label>";
            l_Linea=l_Linea + "</div>"; 
        }

        l_Linea=l_Linea + "</div>";
    }
 
    document.getElementById("contenido_productos").innerHTML=l_Linea;  

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






function Listado_Detalles_Validacion_Inspeccion(datos){    
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


                        if(l_Estatus=="INSPECCIONADO"){
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
