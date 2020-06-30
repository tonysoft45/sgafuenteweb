// ----------------------------------------------------------------------------------
// entradadeproductos_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 29/08/2019
// ----------------------------------------------------------------------------------

function Listado_Grabar_Entrada(datos){    
    if(datos.length>0){         
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/entradas_grabar.ctrl.php";
 
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


function Consultar_Descripcion_Producto(datos){    
    if(datos.length>0){       
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/cat_productos_consultar_descripcion.ctrl.php";
 
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
                        //$("#modal_exitoso").modal("show");

                        document.getElementById("txt_Descripcion").value=obResultado[i]["producto"];

                        document.getElementById("bt_Anexar").style="visibility:visible";
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


function Buscar_Producto(datos){

    if(datos.length>0){
        $("#modal_espera").modal("show");
 
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        //var url = UBICACION_CONTROL + "/cat_productos_consultar_todos.ctrl.php";
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar_todos.ctrl.php";

        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado); 
               var i=0;
               var l_Codigo_IZeta="";                
               var l_Descripcion="";

               if(obResultado[i]["retorno"]=="TRUE"){ 
                    l_Codigo_IZeta=obResultado[i]["Codigo"];                   
                    l_Descripcion=obResultado[i]["Producto"];

                    document.getElementById("txt_Codigo_IZeta").value=l_Codigo_IZeta;                     
                    document.getElementById("txt_Descripcion").value=l_Descripcion;
                    document.getElementById("txt_Serie").value=l_Codigo_IZeta; 
                    
                    document.getElementById("txt_Codigo_IZeta").readOnly=true;

                    document.getElementById("txt_Serie").select();

               } else {
                   // No encontrado                    
                   document.getElementById("lbl_mensaje_falla").innerHTML="Codigo No encontrado";                
                   $("#modal_falla").modal("show");                    
                   $("#modal_espera").modal("hide");
                   obVerificar=setInterval(Ocultar_Espera,500);          
               }
 
              
               // ----------------------------------------------------------------     
               $("#modal_espera").modal("hide");                   
               obVerificar=setInterval(Ocultar_Espera,500);            
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}


function Buscar_Producto_PackingList(datos){

    if(datos.length>0){
         
        var l_Codigo_IZeta=datos[0]["codigo_izeta"];       
        var l_Serie=datos[0]["serie"];      
        var l_Descripcion=datos[0]["descripcion"];
        var l_Cantidad=datos[0]["cantidad"];
        var l_Pedimento=datos[0]["pedimento"];
        var l_nIDPackingList=datos[0]["nidpackinglist"];
        var l_nIDCat_Proveedor=datos[0]["nidcat_proveedor"];
        var l_nIDCat_Almacen=datos[0]["nidcat_almacen"];
        var l_nIDUsuario=datos[0]["nidusuario"];
        var l_NoFactura=datos[0]["nofactura"];
        var l_Comentarios=datos[0]["comentarios"];

        $("#modal_espera").modal("show");
       
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        //var url = UBICACION_CONTROL + "/cat_productos_consultar_todos.ctrl.php";
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar_todos_serial.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado); 
               var i=0;               

               if(obResultado[i]["retorno"]=="TRUE"){ 
                   listadodeproductos.push( { "codigo_izeta":l_Codigo_IZeta,"serie":l_Serie, "descripcion":l_Descripcion, "cantidad":l_Cantidad, "pedimento":l_Pedimento, "nidpackinglist":l_nIDPackingList, "nidcat_proveedor":l_nIDCat_Proveedor, "nidcat_almacen":l_nIDCat_Almacen, "nidusuario":l_nIDUsuario, "nofactura":l_NoFactura, "comentarios":l_Comentarios  } );

                   // Presentar la informacion en el listado
                   fn_Presentar_Detalles();
 
                   document.getElementById("txt_Codigo_IZeta").value="";   
                   document.getElementById("txt_Serie").value="";                 
                   document.getElementById("txt_Descripcion").value="";
                   document.getElementById("txt_Cantidad").value="";
                   document.getElementById("txt_Pedimento").value="";

                   document.getElementById("txt_Codigo_IZeta").readOnly=false;

                   document.getElementById("txt_Codigo_IZeta").select();

               } else {
                   // No encontrado                    
                   document.getElementById("lbl_mensaje_falla").innerHTML="Codigo No encontrado en el PackingList";                
                   $("#modal_falla").modal("show");                    
                   $("#modal_espera").modal("hide");
                   obVerificar=setInterval(Ocultar_Espera,500);          
               }
 
              
               // ----------------------------------------------------------------     
               $("#modal_espera").modal("hide");                   
               obVerificar=setInterval(Ocultar_Espera,1000);            
               // ----------------------------------------------------------------             
           
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    


}


function fn_Presentar_Detalles(){
    // Presenta la inforamción en la pantalla 
    var l_Linea="";  
    l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

    l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo IZeta</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Serie </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "    <label style='cursor:pointer;' > Descripcion </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Pedimento </label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "   <label style='cursor:pointer;' > Cantidad </label>";
    l_Linea=l_Linea + "</div>";

    
    l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
    l_Linea=l_Linea + "<label style='cursor:pointer;' > Acciones</label>";
    l_Linea=l_Linea + "</div>";

    l_Linea=l_Linea + "</div>";
    for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo_izeta"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["serie"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["descripcion"] + "</label>";
        l_Linea=l_Linea + "</div>";  
 
        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["pedimento"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
        l_Linea=l_Linea + "</div>";  

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<a class='nav-link' style='color: #53BEFE;cursor:pointer;margin-left: -20px; margin-right: -20px;' onclick=\"fn_Eliminar_Producto("+ i + ")\">Eliminar</a>";
        l_Linea=l_Linea + "</div>";   
   
        l_Linea=l_Linea + "</div>";
    }

    document.getElementById("contenido_productos").innerHTML=l_Linea;  

}

function fn_Eliminar_Producto(indice){
    var listadodeproductos_tmp=[];

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

    fn_Presentar_Detalles();

}
 