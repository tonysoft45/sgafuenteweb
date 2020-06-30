<!DOCTYPE html>
<html>
<head>
    <?php   
        // ----------------------------------------------------------------------------------
        // interfaces.php
        // ----------------------------------------------------------------------------------
        // Autor. Ing. Antonio Barajas del Castillo
        // ----------------------------------------------------------------------------------
        // Empresa. Softernium SA de CV
        // ----------------------------------------------------------------------------------
        // Descripcion. Modulo para editar datos de un perfil.
        // ----------------------------------------------------------------------------------
        // Fecha Ultima Modificación
        // 26/11/2019
        // ----------------------------------------------------------------------------------
        // V2.0.0
        // ----------------------------------------------------------------------------------
        ob_start();
        session_start();

        /*
       
        // ***********************************************************************************
        // ----------------------------------------------
        // SEGURIDAD
        $l_nIDUsuario=0;  
        $l_nIDSesion=0;
        $l_Usuario="";
        $l_Imagen="";       
        include_once "../clases/relauxs.mysql.class_v2.0.0.php";  
        include_once "../clases/usuarios.mysql.class_v2.0.0.php";   
        include_once "../bd/conexion.php";         
        include_once "../utilerias/utilerias.php";
         
        // Conexion con la base de Datos
        $l_Regreso=RegresaConexion();
        $CONEXION=json_decode($l_Regreso,true);  
 
 
        if(isset($_SESSION['NUMERODESESION'])){
            // Extrae el ID de la Sesion
            
            
            $l_Condicion="bEstado=0 and IDSesion='" . $_SESSION['NUMERODESESION'] . "'";      
            $tbl_RelaUxS = new  cltbl_RelaUxS_v2_0_0();
            $tbl_RelaUxS->Inicializacion();
             
            $tbl_RelaUxS->DatosParaConectarse($CONEXION["servidor"],$CONEXION["usuario"],$CONEXION["password"],$CONEXION["bd"]);
            $tbl_RelaUxS->Leer($l_Condicion);
            if($tbl_RelaUxS->CualEsElNumeroDeRegistrosCargados()>0){
               
                $registros=$tbl_RelaUxS->dtBase();
                $l_nIDSesion=$registros[0]["nIDSesion"];
                $l_nIDUsuario=$registros[0]["nIDUsuario"];

                if($l_nIDSesion>0){
                    // Si se encontro la sesion
                     
                    if($l_nIDUsuario>0){
                        // Si se encontro el usuario

                        // Buscar el usuario
                        $tbl_Usuario = new  cltbl_Usuarios_v2_0_0();                       
                        $tbl_Usuario->Inicializacion();
                        $tbl_Usuario->DatosParaConectarse($CONEXION["servidor"],$CONEXION["usuario"],$CONEXION["password"],$CONEXION["bd"]);
                        $tbl_Usuario->CargarCampos("LEER");
                        $l_Condicion="nIDUsuario=" . $l_nIDUsuario . " and Activo='SI' and bEstado=0 and (Web='SI' or App='SI')";
                        $tbl_Usuario->Leer($l_Condicion);
                        if($tbl_Usuario->CualEsElNumeroDeRegistrosCargados()>0){
                            $registros=$tbl_Usuario->dtBase();
                            $l_Imagen=$registros[0]["Imagen"];
                            $l_Usuario=$registros[0]["Usuario"];
                        } else {
                            // No se encontro el usuario
                            session_destroy();
                            header("Location: ../index.php");                            
                        }
                    } else {
                        // No se encontro el usuario
                        session_destroy();
                        header("Location: ../index.php"); 
                    }
                } else {
                    // No se encontro la sesion
                    session_destroy();
                    header("Location: ../index.php");
                }
            } else {
                // No encontrado 
                session_destroy();
                header("Location: ../index.php");
            }
            echo "        <input id='txt_nIDSesion' type='hidden' name='nIDSesion' value='" . $l_nIDSesion . "' style='visibility:hidden;position:absolute;top:1px;left:1px;'>\n";  	
            echo "        <input id='txt_Sesion' type='hidden' name='Sesion' value='" . $_SESSION['NUMERODESESION'] . "' style='visibility:hidden;position:absolute;top:1px;left:1px;'>\n";  	
            echo "        <input id='txt_nIDUsuario' type='hidden' name='nIDUsuario' value='" . $l_nIDUsuario . "' style='visibility:hidden;position:absolute;top:1px;left:1px;'>\n";  	
            echo "        <input id='txt_Usuario' type='hidden' name='Usuario' value='" . $l_Usuario . "' style='visibility:hidden;position:absolute;top:1px;left:1px;'>\n";  	
            echo "        <input id='txt_Imagen' type='hidden' name='Imagen' value='" . $l_Imagen . "' style='visibility:hidden;position:absolute;top:1px;left:1px;'>\n";  	
             	   	  
        } else {
            //echo "NO TIENE SESION";
            session_destroy();
            header("Location: ../index.php");

        }
        */
   
        // ----------------------------------------------
        // ***********************************************************************************


        // ----------------------------------------------
        // Carga la imagen de fondo
        include_once "../clases/ambiente_bannerapp.mysql.class_v2.0.0.php";
        $l_IMAGENFONDOAPP="";
        $l_UBICACION="../adjuntos/";
        $l_Condicion="bEstado=0";
        $tbl_bannerapp = new  cltbl_Ambiente_BannerApp_v2_0_0();
        $tbl_bannerapp->Inicializacion();
        $tbl_bannerapp->DatosParaConectarse($CONEXION["servidor"],$CONEXION["usuario"],$CONEXION["password"],$CONEXION["bd"]);
        $tbl_bannerapp->Leer($l_Condicion);
        if($tbl_bannerapp->CualEsElNumeroDeRegistrosCargados()>0){
	        $registros=$tbl_bannerapp->dtBase();
	        $l_IMAGENFONDOAPP=$registros[0]["Imagen"];
        }  
        // ----------------------------------------------

        // ----------------------------------------------
        $l_Modulo="Inicio"; 
        $l_Accion="";   //Listado/Crear/Editar/Eliminar/Consultar/Imprimir  
        include_once "../parametros/modulos.php";        
        // ----------------------------------------------

    ?>
	<title>
		 SGA
	</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=dev-width, initial-scale=1, shrink-to-fit=no">
	<meta http-equiv="x-ua-compatible" content="ie-edge">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/estilos.css">

    <script type="text/javascript" src="../lib/jquery-3.3.1.slim.min.js"></script>
	<script type="text/javascript" src="../lib/popper.min.js"></script>
    <script type="text/javascript" src="../lib/bootstrap.min.js"></script>

    <script>
        var CAMPO_ORDENAMIENTO="<?php echo $CAMPO_ORDENAMIENTO ?>";
        var FORMA_ORDENAMIENTO="<?php echo $FORMA_ORDENAMIENTOO ?>";
        var ULTIMA_CONSULTA="<?php echo $ULTIMA_CONSULTA ?>";

        var UBICACION_CONTROL="<?php echo $UBICACION_CONTROL ?>";

        var MODULO="<?php echo $l_Modulo+"hh" ?>";

        function fn_Posicionar_Fondo(){
            var X=window.innerWidth;
            var Y=window.innerHeight;

	        // ------------------------------------------------------------------------
            // Configuracion del cuerpo
	        document.getElementById("idBody").style.width=X +"px";
	        document.getElementById("idBody").style.height=Y +"px";
	        // ------------------------------------------------------------------------

	        // Calculando el punto Medio
	        var PMX=X/2;
	        var PMY=Y/2;

	        var iPMX=parseInt(PMX);
	        var iPMY=parseInt(PMY);


	        // ------------------------------------------------------------------------
            // Configuracion de la imagen Principal	        	     
            document.getElementById("FondoPrincipal1").style.left=PMX+"px";
            document.getElementById("FondoPrincipal1").style.top=PMY+"px";	          
	        document.getElementById("FondoPrincipal1").style.visibility="visible";
	        // ------------------------------------------------------------------------
        }

        function deshabilitaRetroceso(){

            // -----------------------------------------------
            // Evita el retroceso
            window.location.hash="no-back-button";
            window.location.hash="Again-No-back-button" //chrome
            window.onhashchange=function(){window.location.hash="no-back-button";}
            // -----------------------------------------------

            // -----------------------------------------------
            // Bloquea q ingrese al sitio desde un dispositivo Movil.
            fn_Posicionar_Fondo();         
            // -----------------------------------------------
        }

        function Resize()
        {
            fn_Posicionar_Fondo(); 
        }
        window.onresize=Resize;

    </script>
    
    <script type="text/javascript" src="../js/ambiente_imagenapp_rest.ctrl.js"></script>
    <script type="text/javascript" src="../vistas/ambiente_imagenapp.vista.js"></script>
    <script type="text/javascript" src="../utilerias/utilerias.js"></script>
    

</head>
<body id="idBody" onload="deshabilitaRetroceso()">
    <div class="container" >
        <!-- ENCABEZADO -->         
		<div class="row align-item-end h-50" style='background-color:#DFE1E1;'>
			<?php  include_once "../parametros/encabezado.php" ?>
        </div>          
        <!-- FIN ENCABEZADO -->         
 
        <!-- MENU -->         
    	<div class="row align-item-end bg-light h-30">
            <?php include_once "../parametros/barra_menu.php" ?>   
            <br>
            <br>
        </div>
         <!-- FIN MENU -->

         <!-- BARRA DE NAVEGACION -->         
		<div class="row align-item-end h-20 bg-dark">			 
            <?php include_once "../parametros/barra_navegacion.php" ?>         
        </div>
         <!-- FIN BARRA DE NAVEGACION -->         
         
       
        <!-- BUSQUEDA -->
        <div class="row align-items-center h-30">
               
        </div>
        <!-- FIN BUSQUEDA -->    
    
        <!-- BOTONES -->
        <div class="row align-items-center h-30">
            
        </div>
        <!-- FIN BOTONES -->
          
        <!-- ENCABEZADOS LISTADO -->
        <div class="row align-item-end h-20 align-items-center" style='border-bottom: #DDE0E1 2px solid;'>			 
            
        </div>
        <!-- FIN ENCABEZADOS LISTADO -->

         <!-- REGISTROS -->
         <div id='contenido'> 
               
         </div>

         <div class="row">
			<div class="col-12  fixed-bottom ">			 
            <?php if(strlen($l_IMAGENFONDOAPP)>0){ ?>
                    <img src="<?php echo $l_UBICACION . $l_IMAGENFONDOAPP ?>" alt="" class="img-responsive center-block" style="opacity: 0.3;width: 580px;height: 390px;margin-top: -400px;margin-left: -290px;left: 50%;top: 10%;position: absolute;" width="580" height="390" > 
                <?php } ?>
			 </div>
         </div>		 
         <!-- FIN REGISTROS -->  
	</div>
    <!-- FIN -->

    <!-- MENSAJES -->    
    <div class="modal fade" id="modal_espera">
     	<div class="modal-dialog">
     	    <div class="modal-content" style='background-color:#CCCCCC;'>
     	     				
	            <!-- CABEZERA -->
     	        <div class="modal-header">
     	     	    <h4 class="modal-title"></h4>
     	     	    <button type="button" class="close" data-dismiss="modal" onclick="">&times;</button>
     	        </div>

     	        <!-- CUERPO -->
     	        <div class="modal-body justify-content-center align-items-center " style='color:#fff;'>
     	     	   <center><label id='lbl_mensaje_falla'> ESPERE UN MOMENTO  </label></center>
     	        </div>

     	        <!-- PIE DE PAGINA -->
     	        <div class="modal-footer">
     	     	    <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
     	        </div>
     	     </div>
         </div>     	 
     </div>
      <!-- FIN MENSAJES -->    
      
      <!-- SEGURIDAD Y PROCESOS --->
      <script>
		$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
  			if (!$(this).next().hasClass('show')) {
    			$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  			}
  			var $subMenu = $(this).next(".dropdown-menu");
  			$subMenu.toggleClass('show');

  			$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
    			$('.dropdown-submenu .show').removeClass("show");
  			});

  			return false;
        });
        
       // fn_Consultar_Imagen_Clic('');

    </script>
    <!-- FIN PROCESAR --->
</body>
</html>
