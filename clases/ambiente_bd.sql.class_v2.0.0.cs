// ----------------------------------------------------------------------------------
// ambiente_bd.sql.class_v2.0.0.cs
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 19/08/2019
// ----------------------------------------------------------------------------------
// V2.0.0
// ----------------------------------------------------------------------------------

// Clases que manejo de las campanas
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using clHerramientas_v2011.asp;


namespace Ambiente_BD
{

class cltbl_Ambiente_BD_v2_0_0
{
 
	 // --------------------------------------------------------
	 // Constantes
     // Generales
     private  String Ascendente="Ascendente";
	 private  String Descendente="Descendente";
	 private  int TiempoMaximo=2000;
	 private  int Tamaxo=1000000;


	 // Base de datos
	 private  String NombreDeLaTabla = "tbl_ambiente_bd";
     private  String NombreDeLaVista = "tbl_ambiente_bd";
     private  String NombreCampoLlave ="nIDBd";
     private  String NombreCampoOrdenamiento="nIDBd";
	 private  String Ordenamiento="Descendente";
     private  int LimiteInferior=-1;
     private  int LimiteSuperior=-1;
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // Atributos
	 // Generales
	 private  int contNumDatos=0;
	 private  String servidor;
	 private  String usuario;
	 private  String password;
	 private  basededatos;

	 private  dt;
	 private  dtgrabar;

	 public  estructura;
	 private  tipos;
	 private  contCampos;
	  
	 // Estados
	 private  bandTieneAlgunError=FALSE;
	 private  bandTieneDatosCargados=FALSE;
     private  bandTieneDatosParaConectarse=FALSE;

	 // Mensajes
 
	 // --------------------------------------------------------
	 // Propiedades
	 public function DatosParaConectarse( servidor,  usuario,  password,  basededatos){
	    this->servidor= servidor;
	    this->usuario= usuario;
	    this->password= password;
	    this->basededatos= basededatos;

        this--> bandTieneDatosParaConectarse=TRUE;
	 }

	 public function setInformacion_Leer( registro) {

		if( this->contCampos<=0){
			 this->contNumDatos=0;
			unset( this->dtgrabar);
			 this->CargarCampos("LEER");
		}

		if( this->contCampos<=0){
			 this->contNumDatos=0;
			unset( this->dtgrabar);

			 this->bandTieneAlgunError=TRUE;
		     this->ErrorActual="No tiene una SCHEMA cargado";       
		    return FALSE;
		}


		for( i=0; i< this->contCampos; i= i+1){			
			 this->dtGrabar[ this->contNumDatos][ this->estructura[ i]]= registro[ i];			 
		}
			
		 this->contNumDatos= this->contNumDatos+1;
		 this->bandTieneDatosCargados=TRUE; 
 
		return TRUE;
	 }

	 public function setInformacion_Grabar( registro) {

		if( this->contCampos<=0){
			 this->contNumDatos=0;
			unset( this->dtgrabar);
			 this->CargarCampos("GRABAR");
		}

		if( this->contCampos<=0){
			 this->contNumDatos=0;
			unset( this->dtgrabar);

			 this->bandTieneAlgunError=TRUE;
		     this->ErrorActual="No tiene una SCHEMA cargado";       
		    return FALSE;
		}


		for( i=0; i< this->contCampos; i= i+1){					 
			 this->dtGrabar[ this->contNumDatos][ this->estructura[ i]]= registro[ i];			 
		}
			
		 this->contNumDatos= this->contNumDatos+1;
		 this->bandTieneDatosCargados=TRUE;

		return TRUE;
	 }


	 public function CampoDeOrdenamientoDeLaTabla( Campos){
		 this->NombreCampoOrdenamiento= Campos;
	 }

	 public function FormaDeOrdenamiento( Forma){
		 this->Ordenamiento= Forma;
	 }

	 public function dtBase(){
		return  this->dtGrabar;
	 }

	 // FAQ
	 public function CualEsElMensajeDeErrordelObjeto(){
		if( this->bandTieneAlgunError==TRUE){
			return  this->ErrorActual;
		} else {
			return "No tiene";
		}
	 }

	 public function CualEsElNumeroDeRegistrosCargados(){
		return  this->contNumDatos;
	 }

	 public function CualEsLaFormaDeOrdenamiento(){
		return  this->Ordenamiento;
	 } 

	 public function setLimiteInferior( Limite){
		 this->LimiteInferior= Limite;
	 }

	 public function setLimiteSuperior( Limite){
		 this->LimiteSuperior= Limite;
	 }

	 public function get_Estructura( indice){
		 return  this->estructura[ indice];
	 }

	 public function get_NumCampos(){
		 return  this->contCampos;
	 }

	 public function get_CampoLlave(){

		return  this->NombreCampoLlave;
	 }
	 
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // CONSTRUCTORES
	 function __construct() {
		 this->Inicializacion();
     }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // INICIALIZACION
	 public function Inicializacion(){
		 this->InicializaAtributos();
		 this->InicializacionContenido();
	 }

	 private function InicializaAtributos(){
		 this->bandTieneAlgunError=FALSE;
		 this->bandTieneDatosCargados=FALSE;
		 this->bandTieneDatosParaConectarse=FALSE;

		 this->ErrorActual="No tiene";
		 this->Ordenamiento= this->Ascendente;

		 this->contNumDatos=0;	
		
		 this->contCampos=0;
	 }

	 public function InicializacionContenido(){
		 this->contNumDatos=0;
		 this->bandTieneAlgunError=FALSE;
	 }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // ACTIVIDADES
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // MISCELANEO
	 private function vEstado( lbEstado,  l_NombreCampo){
         // Bandera que indica el estado del registro 0-Activo, 1-Eliminado, 2-Cancelado, 3-Cerrado/Finalizado, -1 No definido

          Cadena="";
	     switch( lbEstado){
		     case 0: // Activo
		          Cadena="Activo";
		          break;
		     case 1: // Eliminado
		          Cadena="Eliminado";
		         break;
		     case 2: // Cancelado
		          Cadena = "Cancelado";
				 break;
		     case 3: // Cerrado/Finalizo
		          Cadena = "Cerrado/Finalizado";
		         break;
		     default: // Otro
		          Cadena = "No definido";
				 break;
	      }

	  return  Cadena;
	 }

     public function CONVERTIR_ESPECIALES_HTML( str){
        str=trim( str);
        str = mb_convert_encoding( str,  'UTF-8');
       return  str;
     }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // CONSULTAR
	 private function Consultar( condicion){
		// Abrea la conexion         
		 sqli=sqli_connect( this->servidor, this->usuario, this->password, this->basededatos);

		if(sqli_connect_errno()){
		    this->bandTieneAlgunError=TRUE;
		    this->ErrorActual="Error No se puede conectar a la base de datos";       
		   return FALSE;
		}

		 txtConsulta="";
		 txtConsulta = "SELECT *";
		 txtConsulta =  txtConsulta . " FROM ";
		 txtConsulta =  txtConsulta .  this->NombreDeLaVista;
		 txtConsulta =  txtConsulta . " WHERE ";
		 txtConsulta =  txtConsulta .  condicion;
		 txtConsulta =  txtConsulta . " ORDER BY " .  this->NombreCampoOrdenamiento;

		if( this->CualEsLaFormaDeOrdenamiento()== this->Ascendente){
		    txtConsulta= txtConsulta . " ASC";
		} else {
			  txtConsulta= txtConsulta . " DESC";
		}

		if( this->LimiteInferior>=0){
			 txtConsulta =  txtConsulta . " LIMIT " .  this->LimiteInferior . "," .  this->LimiteSuperior;
		}
 
		//' Ejecuta la consulta
		 res=sqli_query( sqli, txtConsulta);

		// Cargar la informacion
		 contador=0;

		// Inicia los datos
		 this->contNumDatos=0;
		unset( this->dtgrabar);

		if( this->contCampos<=0){
			 this->contNumDatos=0;
			unset( this->dtgrabar);
			 this->CargarCampos("LEER");
		}
 
		if( res){
			 
			while( registro=sqli_fetch_array( res, sqlI_ASSOC)){
				 l_Registros=array();
				 
				for( i=0; i< this->contCampos; i= i+1){					
					  l_Valor= registro[ this->estructura[ i]];
					 //echo "<br> Valor:" .  l_Valor;

					 switch( this->tipos[ i]){
						case "CADENA":  l_Valor=stripslashes( l_Valor);		
						                l_Valor=trim( l_Valor);		
						                l_Valor= this->CONVERTIR_ESPECIALES_HTML( l_Valor);			                					 
						               array_push( l_Registros, l_Valor);
						               break;
						case "FECHA":   l_Valor=stripslashes( l_Valor);	
						                l_Valor=trim( l_Valor);	
						               array_push( l_Registros, l_Valor);					                
						               break;
						case "NUMERO": array_push( l_Registros, l_Valor);	                
						               break;
					 }

					 
					if(( this->contCampos-1)== i){
						array_push( l_Registros,0);
					} else {
						if(( this->contCampos-2)== i){
							array_push( l_Registros,1);
						} else {
							if(( this->contCampos-3)== i){
								array_push( l_Registros,0);
							}
						}
					}
					
				}

				//print_r( l_Registros);
			             
				 this->setInformacion_Leer( l_Registros);

				unset( l_Registros);				  			 
			}  
	   } else {
		    this->bandTieneDatosCargados=FALSE;
	   }

	   sqli_close( sqli);
	   return TRUE;
	}

	public function ContarRegistros( condicion){
		 // Declara variables
		  contador=0;

		 // Abrea la conexion
		  sqli=sqli_connect( this->servidor, this->usuario, this->password, this->basededatos);

	     if(sqli_connect_errno()){
		    this->bandTieneAlgunError=TRUE;
		    this->ErrorActual="Error No se puede conectar a la base de datos";
		   return -1;
		 }
	 
		  txtConsulta="";
		  txtConsulta = "SELECT count(" .  this->NombreCampoLlave .") as Total";
		  txtConsulta =  txtConsulta . " FROM ";
		  txtConsulta =  txtConsulta .  this->NombreDeLaVista;
		  txtConsulta =  txtConsulta . " WHERE ";
		  txtConsulta =  txtConsulta .  condicion;
	 
		 //' Ejecuta la consulta
		  res=sqli_query( sqli, txtConsulta);

		 // this->contNumDatos=0;
		 if( res){
			if( registro=sqli_fetch_array( res, sqlI_ASSOC)){
				if( registro['Total']!=NULL){
					 contador= registro['Total'];
			   }
			}
		 }

		 sqli_close( sqli);
		 return  contador;
	 }	  

	 public function CargarCampos( l_Tipo){
		 
	   // Abrea la conexion         
	    sqli=sqli_connect( this->servidor, this->usuario, this->password, this->basededatos);

	   if(sqli_connect_errno()){
		   this->bandTieneAlgunError=TRUE;
		   this->ErrorActual="Error No se puede conectar a la base de datos";       		   
		  return FALSE;
	   }

	    this->contCampos=0;
	   unset( this->estructura);
	   unset( this->tipos);

	    l_Tabla= this->NombreDeLaVista;
	   if( l_Tipo=="GRABAR"){
		     l_Tabla= this->NombreDeLaTabla;
	   }
	   
        l_Retorna=FALSE;
	    txtConsulta="";
	    txtConsulta = "SHOW COLUMNS";
	    txtConsulta =  txtConsulta . " FROM ";
	    txtConsulta =  txtConsulta .  l_Tabla;
 
	   //' Ejecuta la consulta
	    res=sqli_query( sqli, txtConsulta);
 
	   if( res){
		 
		      bandEncontrado=0;
		     while( row =  res->fetch_assoc()){
				 campo =  row['Field'];
				 tipo= row['Type'];

				 bandEncontrado=0;
				for( i=0; i< this->contCampos; i= i+1){

					if( this->estructura[ i]== campo){
						 bandEncontrado=1;
						break;
					}
				}

				if( bandEncontrado==0){
					 this->estructura[ this->contCampos]= campo;
					 this->tipos[ this->contCampos]= tipo;
					 this->contCampos= this->contCampos+1;
				}
			 }
 		 
			  this->estructura[]="Crear";	 
			  this->estructura[]="Cambiar";			 
			  this->estructura[]="Eliminar";			  
 
			  this->contCampos=count( this->estructura);
 
			 for( i=0; i< this->contCampos; i= i+1){
				  tipos=(string) this->tipos[ i];

				  pos=strpos( tipos,'var');
				 if( pos===false){					 
				 } else {
					 this->tipos[ i]="CADENA";					 
				 }
				 
				  pos=strpos( tipos,'int');
				 if( pos===false){
				 } else {
				    this->tipos[ i]="NUMERO";				    
				 }

				  pos=strpos( tipos,'dec');
				 if( pos===false){
				 } else {
				    this->tipos[ i]="NUMERO";				    
				 }

				  pos=strpos( tipos,'text');
				 if( pos===false){
				 } else {
				    this->tipos[ i]="CADENA";				    
				 }

				  pos=strpos( tipos,'date');
				 if( pos===false){
				 } else {
				    this->tipos[ i]="FECHA";				    
				 }

			     //echo " <BR> POS:" .  i . " - " .  this->estructura[ i] . " -" .  this->tipos[ i];		  			  
			}
 
		    // echo "<br> Columnas: " .  this->contCampos;

		      l_Retorna=TRUE;
		 }  
	 

	     sqli_close( sqli);
	     return  l_Retorna;
     }

	
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // BORRAR
	 private function BorrarPorCondicion( l_Condicion){
		 // Abrea la conexion
		  sqli=sqli_connect( this->servidor, this->usuario, this->password, this->basededatos);

		 if(sqli_connect_errno()){
			 this->bandTieneAlgunError=TRUE;
			 this->ErrorActual="Error No se puede conectar a la base de datos";
			return -1;
		 }

		 // Declara variables
		  txtInsercion="";
		  fechalocal="";
		  UtileriasDatos = new clHerramientasv2011();

		  txtInsercion = "DELETE FROM " .  this->NombreDeLaTabla . " WHERE " .  l_Condicion;
		        
		  res=sqli_query( sqli, txtInsercion);
		 if( res==FALSE){
		   sqli_close( sqli);
           return FALSE;
		 }

		 sqli_close( sqli);
		 return TRUE;
	 }

     private function BorrarTemporal( l_nID,  l_Observaciones){
         if( this->ActualizarEstado( l_nID,1, l_Observaciones)==TRUE){
             return TRUE;
         } else {
             return FALSE;
         }
     }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // CAMBIAR
	 private function ActualizarEstado( l_nID,  l_bEstado,  l_Observaciones){
		 // Abrea la conexion
		  sqli=sqli_connect( this->servidor, this->usuario, this->password, this->basededatos);

		 if(sqli_connect_errno()){
			 this->bandTieneAlgunError=TRUE;
			 this->ErrorActual="Error No se puede conectar a la base de datos";
			return -1;
		 }

		 // Declara variables
		  txtInsercion="";
		  fechalocal="";
		  UtileriasDatos = new clHerramientasv2011();

		  txtInsercion = "UPDATE " .   this->NombreDeLaTabla;
          txtInsercion =  txtInsercion . " SET ";
          txtInsercion =  txtInsercion . " bEstado=" .  l_bEstado . ",";

	      l_FechaLocal =  UtileriasDatos->getFechaYHoraActual_General();
          l_FechaLocal =  UtileriasDatos->ConvertirFechaYHora( l_FechaLocal);
          txtInsercion =  txtInsercion . " FechaModificacion='".  l_FechaLocal . "',";

          txtInsercion =  txtInsercion . " Observaciones='".  l_Observaciones . "'";
          txtInsercion =  txtInsercion . " WHERE " .  this->NombreCampoLlave . "=" . l_nID;

		  res=sqli_query( sqli, txtInsercion);
		 if( res==FALSE){
		      sqli_close( sqli);
             return FALSE;
		 }

		 sqli_close( sqli);
		 return TRUE;
	 }     
     // --------------------------------------------------------

     // --------------------------------------------------------
     // Ejecucion
	 private function Grabar( Tabla){				 
		// Abrea la conexion
		 sqli=sqli_connect( this->servidor, this->usuario, this->password, this->basededatos);
 
		if(sqli_connect_errno()){
		    this->bandTieneAlgunError=TRUE;
		    this->ErrorActual="Error No se puede conectar a la base de datos";		    
		   return -1;
		}
	 
 
		// Declara variables
		 txtInsercion="";
		 fechalocal="";
		 UtileriasDatos = new clHerramientasv2011();

		// Carga los campos
		 
		 l_FechaLocal =  UtileriasDatos->getFechaYHoraActual_General();
		 l_FechaLocal =  UtileriasDatos->ConvertirFechaYHora( l_FechaLocal);

 
		for ( i=0; i< this->contNumDatos;  i= i+1){
			 
			  l_Campos="";
			  l_Informacion="";
 
			 if( Tabla[ i]["Crear"]){
		 
			    // Campos
				 l_Campos="";
				 numCampos= this->contCampos;
				 numCampos= numCampos-3;				 
		        for( j=1; j< numCampos; j= j+1){					 
			         l_Campos= l_Campos .  this->estructura[ j] . ",";
				} 
				 l_Campos=substr( l_Campos,0,strlen( l_Campos)-1);
			 
				// Información a grabar
				 l_Informacion="";
				for( j=1; j< numCampos; j= j+1){		
					 	  
			        switch( this->tipos[ j]){
						case "CADENA":  l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this->estructura[ j]]) . "', ";
						               break;
						case "FECHA":  if(  this->estructura[ j]=="FechaModificacion"   ){
										     if(strlen( Tabla[ i][ this->estructura[ j]])==0){
										         Tabla[ i][ this->estructura[ j]]= l_FechaLocal;
									         } 
									   } else {
										  if(  this->estructura[ j]=="FechaCreacion"   ){
											if(strlen( Tabla[ i][ this->estructura[ j]])==0){
										         Tabla[ i][ this->estructura[ j]]= l_FechaLocal;
									         } 
										  }
									   }
		
						                l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this->estructura[ j]]) . "', ";
						               break;
						case "NUMERO":  l_Informacion= l_Informacion .  Tabla[ i][ this->estructura[ j]] . ", ";
						               break;
					}
				} 
				 l_Informacion=substr( l_Informacion,0,strlen( l_Informacion)-2);
			 
				 txtInsercion = "INSERT INTO " .  this->NombreDeLaTabla;
				 txtInsercion = " " .  txtInsercion . "(" .  l_Campos . ") VALUES (" .  l_Informacion . ")";

				//echo  txtInsercion; 
			} else {
				
				if( Tabla[ i]["Cambiar"]==TRUE){
					
					  txtInsercion = "UPDATE " .   this->NombreDeLaTabla;
					  txtInsercion =  txtInsercion . " SET ";
					 
                     // Campos
					  l_Campo="";
					  l_Datos="";
				      numCampos= this->contCampos;
					  numCampos= numCampos-3;
					 
		             for( j=1; j< numCampos; j= j+1){	
						 //echo "CAMPO:" .  this->estructura[ j];
						  l_Informacion="";									 
						  l_Campo="";

						 if( this->estructura[ j]!="Fecha"){
							if( this->estructura[ j]!="FechaCreacion"){
								if( this->estructura[ j]!="bEstado"){
									 l_Campo= this->estructura[ j] . "=";		
								}
							}
						 }
						 
						  
						 switch( this->tipos[ j]){
							case "CADENA":  l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this->estructura[ j]]) . "', ";
										   break;
							case "FECHA":  if(  this->estructura[ j]=="FechaModificacion" ){
												 if(strlen( Tabla[ i][ this->estructura[ j]])==0){
													 Tabla[ i][ this->estructura[ j]]= l_FechaLocal;
													 l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this->estructura[ j]]) . "', ";
												 } 
										   }  

										   if(  this->estructura[ j]=="FechaCreacion" ){
											     
										   }  
										   
										   if(  this->estructura[ j]=="Fecha" ){
											     
										   }  

										   break;
							case "NUMERO": if(  this->estructura[ j]=="bEstado" ){
								 
										   } else {
											    l_Informacion= l_Informacion .  Tabla[ i][ this->estructura[ j]] . ", ";
										   }
							
							
										   break;
						 }

						  l_Campo= l_Campo .  l_Informacion;
						  l_Datos= l_Datos .  l_Campo;						 						 
				     } 
					  l_Datos=substr( l_Datos,0,strlen( l_Datos)-2);					 
					  txtInsercion= txtInsercion . " " .  l_Datos;

					  txtInsercion= txtInsercion . " WHERE ";
					  l_Campo= this->estructura[0] . "=";
					  txtInsercion= txtInsercion .  l_Campo;
					  txtInsercion= txtInsercion .  Tabla[ i][ this->estructura[0]];
 
					 //echo  txtInsercion;
			 
				 } else {
					if( Tabla[ i]["Eliminar"]==TRUE){
					 
						 txtInsercion = "DELETE FROM " .  this->NombreDeLaTabla . " WHERE " .  this->NombreCampoLlave . "=" . Tabla[ i][ this->estructura[0]];
					 
					}
				}
			}
 
	  
			 res=sqli_query( sqli, txtInsercion);

			if( res==FALSE){
				sqli_close( sqli);
				return FALSE;
			}
			 
		}

		sqli_close( sqli);
		return TRUE;
	}
     // --------------------------------------------------------

     // --------------------------------------------------------
	 // OPERACIONES
	 // ELIMINIAR
	 public function EliminarConCondicion( l_Condicion){
		 if( this->bandTieneAlgunError){
			return FALSE;
		 }

		 if( this->bandTieneDatosParaConectarse){
			  this->bandTieneAlgunError=TRUE;
			  this->ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			 return FALSE;
		 }

		 if(strlen( l_Condicion)<=0){
			  this->bandTieneAlgunError=TRUE;
			  this->ErrorActual="Error No tiene condicion";
			 return FALSE;
		 }

		 if ( this->BorrarPorCondicion( l_Condicion)==TRUE){
			 return TRUE;
		 } else {
			 return FALSE;
		 }
	 }

	 public function Ocultar( l_nID,  l_Observaciones){
		 if( this->bandTieneAlgunError){
			 return FALSE;
		 }

		 if( this->bandTieneDatosParaConectarse){
			  this->bandTieneAlgunError=TRUE;
			  this->ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			 return FALSE;
		 }

		 if ( this->BorrarTemporal( l_nID, l_Observaciones)==TRUE){
			 return TRUE;
		 } else {
			 return FALSE;
		 }
	 }

	 // CAMBIAR
	 public function CambiarEstado( l_nID,  l_Observaciones,  l_bEstado){
		 if( this->bandTieneAlgunError){
			return FALSE;
		 }

		 if( this->bandTieneDatosParaConectarse){
			 this->bandTieneAlgunError=TRUE;
			 this->ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			return FALSE;
		 }

		 if ( this->ActualizarEstado( l_nID, l_bEstado, l_Observaciones)==TRUE){
			 return TRUE;
		 } else {
			 return FALSE;
		 }
	 } 

	 // CARGAR
	 public function Leer( condicion){
		 if( this->bandTieneAlgunError){
			return FALSE;
		 }

		 if( this->bandTieneDatosParaConectarse){
			 this->bandTieneAlgunError=TRUE;
			 this->ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			return FALSE;
		 }

		 if(strlen( condicion)<=0){
			 this->bandTieneAlgunError=TRUE;
			 this->ErrorActual="Error No tiene Condicion";
			return FALSE;
		 }

		 if( this->Consultar( condicion)==TRUE){
			return TRUE;
		 } else {
			return FALSE;
		 }
	 }
 

	 // EJECUCION
	 public function Ejecutar(){
		 if( this->bandTieneAlgunError){
			return FALSE;
		 }
 
		 if( this->bandTieneDatosParaConectarse){
			 this->bandTieneAlgunError=TRUE;
			 this->ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			return FALSE;
		 }

		 if( this->contNumDatos<=0){
			return FALSE;
		 }

		 
		 if( this->Grabar( this->dtGrabar)==TRUE){
			return TRUE;
		 } else {
			return FALSE;
		 }
	 }
 
 }

}
