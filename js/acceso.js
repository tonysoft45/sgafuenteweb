// ----------------------------------------------------------------------------------
// acceso.js
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. IDEATECH
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 20/08/2018
// ----------------------------------------------------------------------------------



GLOBAL_ROL="";

// *******************************************************************/
var isMobile = {
mobilecheck : function() {
return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)))
}
}


// *******************************************************************/


 

function fn_Acceso_Clic(){

	var Usuario = document.getElementById("txt_usuario1").value;
	var Password = document.getElementById("txt_password1").value;    

	var Token = document.getElementById("txt_Token").value;    
	var Navegador = document.getElementById("txt_Navegador").value;    
	var Guid = document.getElementById("txt_GUID").value;    
	var NumeroSesion = document.getElementById("txt_Sesion").value;    

	if(Usuario.length<=0){           
        $("#modal_falla").modal("show");
        return;
    }

	if(Password.length<=0){        
        $("#modal_falla").modal("show");
        return;
	}

	if(NumeroSesion.length<=0){
        
    }
	
	var arreglo=new Array();
	arreglo.push( { "usuario":Usuario, "password":Password, "token":Token, "navegador":Navegador, "guid":Guid, "numerosesion":NumeroSesion } );  

	if(arreglo.length>0){       
        // Enviar para procesdar
        resultado=Validar_Usuario(arreglo); 
    } else {
        document.getElementById("lbl_mensaje_falla").innerHTML="NO ES POSIBLE VALIDAR EL ACCESO";         
        $("#modal_falla").modal("show");
        return;
    }     	
}

function Validar_Usuario(datos){ 

    if(datos.length>0){
        ob = JSON.stringify(datos);

        var xmlhttp = new XMLHttpRequest();
        var url = "control/usuarios_consultar_todoscampos.ctrl.php";
      
        xmlhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               var l_Resultado=this.responseText;  
               console.log(l_Resultado);  

          
               var obResultado=JSON.parse(l_Resultado);
                              
               var contador=obResultado.length;
               var i=0;               
               var l_Registros="";
                               
               var registros=new Array();                                
               var l_nIDIxA=0;                
               // ----------------------------------------------------------------
               // Construye la respuesta de la consulta
               // Campos
               
               for(i=0;i<contador;i++){
                   l_Registros="";                    

                   if(obResultado[i]["retorno"]=="TRUE"){ 
						Ingresar()
					  
                   } else {
					   // NO VALIDO					         
					   $("#modal_falla").modal("show");
					   return;

				   }
               }    
 
               // ----------------------------------------------------------------
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    
}
 
function Ingresar(){
	var Usuario = document.getElementById("txt_usuario1").value;
	var Password = document.getElementById("txt_password1").value;  
	var nIDSesion = document.getElementById("txt_ID").value;    
 
	if(Usuario.length<=0){           
        $("#modal_falla").modal("show");
        return;
    }

	if(Password.length<=0){           
        $("#modal_falla").modal("show");
        return;
	} 
	
	var arreglo=new Array();
	arreglo.push( { "usuario":Usuario, "password":Password, "idsesion":nIDSesion } );  


  	if(arreglo.length>0){
        ob = JSON.stringify(arreglo);

        var xmlhttp = new XMLHttpRequest();
        var url = "control/relauxs_grabar.ctrl.php";
      
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
               
               for(i=0;i<contador;i++){
                   l_Registros="";                    

                   if(obResultado[i]["retorno"]=="TRUE"){ 
						$("#modal_exitoso").modal("show");

						var l_Pagina="web/menu.php";
						window.open(l_Pagina,"_self");
				 	   					  
                   } else {
					   // NO VALIDO
					   
					   $("#modal_falla").modal("show");
					   return;

				   }
               }     
               // ----------------------------------------------------------------
           }        
        };
    
        xmlhttp.open("POST", url, true);
        xmlhttp.send(ob);
    }    

	 

}

function Cerrar_Clic(){
	// Enviarlo al lugar correspondiente


}