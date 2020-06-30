// ----------------------------------------------------------------------------------
// contenedores_rest.ctrl.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 25/05/2020
// ----------------------------------------------------------------------------------

function Listado_Grabar_Contenedor(datos){    
    if(datos.length>0){
        var l_nIDPackingList=datos[0]["nidpackinglist"]

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/contenedores_grabar.ctrl.php";
 
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
                        fn_Contenedores_Continuar_Deta(obResultado[i]["folio"],l_nIDPackingList);
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

        var l_Accion=datos[0]["accion"];

        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/cat_productos_consultar_todos.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado); 
               var i=0;
               var l_Codigo_IZeta="";
               var l_Codigo_SAP="";
               var l_Descripcion="";

               if(obResultado[i]["retorno"]=="TRUE"){ 
                    l_Codigo_IZeta=obResultado[i]["Codigo_IZeta"];
                    l_Codigo_SAP=obResultado[i]["Codigo_SAP"];
                    l_Descripcion=obResultado[i]["Producto"];

                    document.getElementById("txt_Codigo_IZeta").value=l_Codigo_IZeta;
                    document.getElementById("txt_Codigo_SAP").value=l_Codigo_SAP;
                    document.getElementById("txt_Parts_Name").value=l_Descripcion;

                    document.getElementById("txt_Cantidad").select();

               } else {
                   // No encontrado                    
                   document.getElementById("lbl_mensaje_falla").innerHTML="Codigo No encontrado";                
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

/*
function Buscar_Producto_PackingList(datos){

    if(datos.length>0){
         
        var l_nIDContenedor_Deta=datos[0]["nidcontenedor_deta"];
        var l_nIDContenedor=datos[0]["nidcontenedor"];
        var l_Codigo_IZeta=datos[0]["codigo_izeta"];
        var l_Codigo_SAP=datos[0]["codigo_sap"];
        var l_Parts_Name=datos[0]["parts_name"];
        var l_Cantidad=datos[0]["cantidad"];
        var l_PrecioDividido=datos[0]["preciodividido"];
        var l_nIDPackingList=datos[0]["nidpackinglist"];

        $("#modal_espera").modal("show");
       
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/packinglist_deta_consultar_codigo.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

               var obResultado=JSON.parse(l_Resultado); 
               var i=0;               

               if(obResultado[i]["retorno"]=="TRUE"){ 
                   listadodeproductos.push( { "nidcontenedor_deta":l_nIDContenedor_Deta,"nidcontenedor":l_nIDContenedor, "codigo_izeta":l_Codigo_IZeta,"codigo_sap": l_Codigo_SAP, "parts_name":l_Parts_Name, "cantidad":l_Cantidad, "preciodividido":l_PrecioDividido, "nidpackinglist":l_nIDPackingList } );     

                   // Presentar la informacion en el listado
                   fn_Presentar_Detalles();
 
                   document.getElementById("txt_Codigo_IZeta").value="";
                   document.getElementById("txt_Codigo_SAP").value="";
                   document.getElementById("txt_Parts_Name").value="";
                   document.getElementById("txt_Cantidad").value="";
                   document.getElementById("txt_PrecioDividido").value="";
               
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
*/

function Buscar_Producto_PackingList(datos){

    if(datos.length>0){

        var l_nIDContenedor_Deta=datos[0]["nidcontenedor_deta"];
        var l_nIDContenedor=datos[0]["nidcontenedor"];
        var l_Codigo_IZeta=datos[0]["codigo_izeta"];
        var l_Codigo_SAP=datos[0]["codigo_sap"];
        var l_Parts_Name=datos[0]["parts_name"];
        var l_Cantidad=datos[0]["cantidad"];
        var l_PrecioDividido=datos[0]["preciodividido"];
        var l_nIDPackingList=datos[0]["nidpackinglist"];

        listadodeproductos.push( { "nidcontenedor_deta":l_nIDContenedor_Deta,"nidcontenedor":l_nIDContenedor, "codigo_izeta":l_Codigo_IZeta,"codigo_sap": l_Codigo_SAP, "parts_name":l_Parts_Name, "cantidad":l_Cantidad, "preciodividido":l_PrecioDividido, "nidpackinglist":l_nIDPackingList } );     

        // Presentar la informacion en el listado
        fn_Presentar_Detalles();

        document.getElementById("txt_Codigo_IZeta").value="";
        document.getElementById("txt_Codigo_SAP").value="";
        document.getElementById("txt_Parts_Name").value="";
        document.getElementById("txt_Cantidad").value="";
        document.getElementById("txt_PrecioDividido").value="";
    
        document.getElementById("txt_Codigo_IZeta").select();
    }    
}




function fn_Presentar_Detalles(){
      // Presenta la inforamción en la pantalla  
      var l_Linea="";
      
      /*
      l_Linea="<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";
      l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block;height:40px; cursor:pointer;background-color:#F4F5F5;'>";
      l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo Zeta Premia1</label>";
      l_Linea=l_Linea + "</div>";
  
      l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height:40px;cursor:pointer;background-color:#F4F5F5;'>";
      l_Linea=l_Linea + "    <label style='cursor:pointer;' > Codigo SAP</label>";
      l_Linea=l_Linea + "</div>";
  
      l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height:40px;cursor:pointer;background-color:#F4F5F5;'>";
      l_Linea=l_Linea + "   <label style='cursor:pointer;' > Nombre de la parte1 </label>";
      l_Linea=l_Linea + "</div>";
  
      l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height:40px;cursor:pointer;background-color:#F4F5F5;'>";
      l_Linea=l_Linea + "   <label style='cursor:pointer;' > Cantidad </label>";
      l_Linea=l_Linea + "</div>";
  
      l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height:40px;cursor:pointer;background-color:#F4F5F5;'>";
      l_Linea=l_Linea + "<label style='cursor:pointer;' > Precio Dividido</label>";
      l_Linea=l_Linea + "</div>";

      l_Linea=l_Linea + "<div class='col d-flex justify-content-left align-items-center' style='text-align:center; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; height:40px;cursor:pointer;background-color:#F4F5F5;'>";
      l_Linea=l_Linea + "<label style='cursor:pointer;' > Acciones</label>";
      l_Linea=l_Linea + "</div>";
  
      l_Linea=l_Linea + "</div>";
      for(i=0;i<listadodeproductos.length;i++){
          l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
  
          l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
          l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo_izeta"] + "</label>";
          l_Linea=l_Linea + "</div>";  
  
          l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
          l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo_sap"] + "</label>";
          l_Linea=l_Linea + "</div>";  
  
          l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
          l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["parts_name"] + "</label>";
          l_Linea=l_Linea + "</div>";  
  
          l_Linea=l_Linea + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
          l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
          l_Linea=l_Linea + "</div>";  
  
          l_Linea=l_Linea + "<div class='col d-flex justify-content-end align-items-right' style='text-align:right; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
          l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["preciodividido"] + "</label>";
          l_Linea=l_Linea + "</div>";  

          l_Linea=l_Linea + "<div class='col d-flex justify-content-start align-items-left' style='text-align:center; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>"; 
          l_Linea=l_Linea + "<a class='nav-link' style='color: #53BEFE;cursor:pointer;margin-right: -20px;' onclick=\"fn_Eliminar_Producto("+ i + ")\">Eliminar</a>";
          l_Linea=l_Linea + "</div>";   
     
          l_Linea=l_Linea + "</div>";
      }
      */

     l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;padding-bottom:10px;'>";

     l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
     l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo Zeta Premia </label>";
     l_Linea=l_Linea + "</div>";  

     l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
     l_Linea=l_Linea + "<label style='cursor:pointer;' > Codigo SAP </label>";
     l_Linea=l_Linea + "</div>";  

     l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
     l_Linea=l_Linea + "<label style='cursor:pointer;' > Nombre de la Parte </label>";
     l_Linea=l_Linea + "</div>";  

     l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
     l_Linea=l_Linea + "<label style='cursor:pointer;' > Cantidad </label>";
     l_Linea=l_Linea + "</div>";  

     l_Linea=l_Linea + "<div class='col-md d-flex justify-content-left align-items-center' style='height:40px;text-align:left; font-size:10px; font-family:Arial black, Gadget, sans-serif;vertical-aling:middle;display:block; cursor:pointer;background-color:#F4F5F5;'>";
     l_Linea=l_Linea + "<label style='cursor:pointer;' > Precio Dividido </label>";
     l_Linea=l_Linea + "</div>";  

     l_Linea=l_Linea + "</div>";

     
     for(i=0;i<listadodeproductos.length;i++){
        l_Linea=l_Linea + "<div class='row align-item-end h-20 align-items-center' style='border-bottom: #D9DADA 2px solid;cursor:pointer;'>";
        
        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo_izeta"] + "</label>";
        l_Linea=l_Linea + "</div>";    

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["codigo_sap"] + "</label>";
        l_Linea=l_Linea + "</div>";    

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["parts_name"] + "</label>";
        l_Linea=l_Linea + "</div>";    

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["cantidad"] + "</label>";
        l_Linea=l_Linea + "</div>";    

        l_Linea=l_Linea + "<div class='col-md d-flex justify-content-start align-items-left' style='text-align:left; font-size:8px; vertical-aling:middle;display:block; cursor:pointer;'>";
        l_Linea=l_Linea + "<label style='cursor:pointer;' >" +   listadodeproductos[i]["preciodividido"] + "</label>";
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

function Consultar_Contenedor(datos){    
    if(datos.length>0){
        
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = UBICACION_CONTROL + "/contenedor_consultar_todos.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

          
               var obResultado=JSON.parse(l_Resultado);
               var i=0;        
                
               if(obResultado[i]["retorno"]=="TRUE"){ 
                    document.getElementById("txt_nIDCat_Proveedor").value=obResultado[i]["nIDCat_Proveedor"];
                    document.getElementById("txt_Proveedor").value=obResultado[i]["Proveedor"];
                    document.getElementById("txt_NoFactura").value=obResultado[i]["NoFactura"];
                                    
               }            
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}

function Cancelar_Contenedor(datos){       
    if(datos.length>0){
       ob = JSON.stringify(datos);

       var xmlhttp = new XMLHttpRequest();
       var url = UBICACION_CONTROL + "/contenedores_eliminar.ctrl.php";
       
       document.getElementById("bt_Cancelar").style.visibility="hidden";
       $("#modal_espera").modal("show");
      
       xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  

               console.log(l_Resultado);
               var obResultado=JSON.parse(l_Resultado);
    
               if(obResultado[0]["retorno"]=="TRUE"){

                     $("#modal_exitoso").modal("show");
                     $("#modal_espera").modal("hide");                   
                     obVerificar=setInterval(Ocultar_Espera,500);    
                     
               } else {     
                    document.getElementById("bt_Cancelar").style.visibility="visible";               
                    console.log(obResultado[0]["msg"]);   
                    console.log(obResultado);                          
                    document.getElementById("lbl_mensaje_falla").innerHTML=obResultado[0]["msg"];
                    $("#modal_falla").modal("show");       
                    
                    $("#modal_espera").modal("hide");                   
                    obVerificar=setInterval(Ocultar_Espera,500);    
               }
               return obResultado;
           }
       };

       xmlhttp.open("POST", url, true);
       xmlhttp.send(ob);
    }  
}