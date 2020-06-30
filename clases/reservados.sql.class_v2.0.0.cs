// ----------------------------------------------------------------------------------
// reservados.sql.class_2.0.0.cs
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 12/12/2019
// ----------------------------------------------------------------------------------
// V2.0.0
// ----------------------------------------------------------------------------------

// Clases que manejo de las campanas
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

using clHerramientas_v2011;

namespace Reservados
{

class cltbl_Reservados_v2_0_0
{
 
	 // --------------------------------------------------------
	 // Constantes
     // Generales
     private  String Ascendente="Ascendente";
	 private  String Descendente="Descendente";
	 private  int TiempoMaximo=2000;
	 private  long Tamaxo=1000000;


	 // Base de datos
	 private  String NombreDeLaTabla = "tbl_reservados";
     private  String NombreDeLaVista = "tbl_reservados";
     private  String NombreCampoLlave ="nIDReservado";
	 private  String NombreCampoOrdenamiento="Folio";
	 private  String NombreCampoParaNoRepetir="Folio";
	 private  String TipoDatoCampoParaNoRepetir="NUMERO"; //CADENA,FECHA,NUMERO
	 private  String Ordenamiento="Descendente";
     private  long LimiteInferior=-1;
     private  long LimiteSuperior=-1;
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // Atributos
	 // Generales
	 private  long contNumDatos=0;
	 private  String servidor;
	 private  String usuario;
	 private  String password;
	 private  String basededatos;

	 private  DataTable dt = new DataTable();
	 private  DataTable dtgrabar = new DataTable();

	 public  String[] estructura = new ArrayList();
	 public  String[] tipos = new ArrayList();
	 public  String[] campos_obligatorios = new ArrayList();
	 public  String[] campos_obligatorios_tipo = new ArrayList();
	 public  String[] campos_obligatorios_leyendas = new ArrayList();
	 public  String[] campos_obligatorios_rango1=new ArrayList();
	 public  String[] campos_obligatorios_rango2= new ArrayList();
	 public  String[] campos_obligatorios_comparativa1=new ArrayList();
	 public  String[] campos_obligatorios_comparativa2=new ArrayList();
	 public  String[] campos_obligatorios_mostrarleyenda=new ArrayList();
	 public  String[] campos_obligatorios_valorescomparar1=new ArrayList();
	 public  String[] campos_obligatorios_valorescomparar2=new ArrayList();

	 
	 public  int[] posicion_compararI = new ArrayList();
	 public  int[] valores_compararI_1 = new ArrayList();
	 public  int[] valores_compararI_2 = new ArrayList();
	 public  int[] valores_compararI_3 = new ArrayList();
	 public  int[] valores_compararI_4 = new ArrayList();
	 public  int[] valores_compararI_5 = new ArrayList();
	 public  int[] valores_compararI_6 = new ArrayList();
	 public  int[] valores_compararI_7 = new ArrayList();
	 public  int[] valores_compararI_8 = new ArrayList();
	 public  int[] valores_compararI_9 = new ArrayList();
	 public  int[] valores_compararI_10 = new ArrayList();

	 public  int[] posicion_compararF = new ArrayList();
	 public  int[] valores_compararF_1 = new ArrayList();
	 public  int[] valores_compararF_2= new ArrayList();
	 public  int[] valores_compararF_3=new ArrayList();
	 public  int[] valores_compararF_4 = new ArrayList();
	 public  int[] valores_compararF_5 = new ArrayList();
	 public  int[] valores_compararF_6 = new ArrayList();
	 public  int[] valores_compararF_7 = new ArrayList();
	 public  int[] valores_compararF_8 = new ArrayList();
	 public  int[] valores_compararF_9 = new ArrayList();
	 public  int[] valores_compararF_10 = new ArrayList();

	 public  String[] campos_listado = new ArrayList();
	 public  String[] campos_busqueda = new ArrayList();
	 public  String[] campos_busqueda_tipo = new ArrayList();
	 public  String[] campos_especiales = new ArrayList();
	 public  String[] campos_especiales_tipo = new ArrayList(); //CHEKCBOX, RADIOBUTTON, IMAGEN
	 public  String[] campos_combo = new ArrayList();
	 private int contCampos;
	  
	 // Estados
	 private  Bool bandTieneAlgunError=false;
	 private  Bool bandTieneDatosCargados=false;
     private  Bool bandTieneDatosParaConectarse=false;

	 // Mensajes
 
	 // --------------------------------------------------------
	 // Propiedades
	 public Boolean setDatosParaConectarse( String servidor,  String usuario,  String password,  String basededatos){
	    this.servidor= servidor;
	    this.usuario= usuario;
	    this.password= password;
	    this.basededatos= basededatos;

        this.bandTieneDatosParaConectarse=TRUE;

        return true;
	 }

	 public Boolean setInformacion_Leer(String[] registro) {

		if( this.contCampos<=0){
			 this.contNumDatos=0;
			 this.dtgrabar=null;
			 this.CargarCampos("LEER");
		}

		if( this.contCampos<=0){
			 this.contNumDatos=0;
			 this.dtgrabar=null;

			 this.bandTieneAlgunError=TRUE;
		     this.ErrorActual="No tiene una SCHEMA cargado";       
		     return false;
		}


		for( i=0; i< this.contCampos; i= i+1){			
			 this.dtGrabar[this.contNumDatos][ this.estructura[i]]= registro[i];			 
		}
			
		 this.contNumDatos= this.contNumDatos+1;
		 this.bandTieneDatosCargados=TRUE; 
 
		 return true;
	 }

	 public Boolean setInformacion_Grabar(String[] registro) {

		if( this.contCampos<=0){
			this.contNumDatos=0;
			this.dtgrabar=null;
			this.CargarCampos("GRABAR");
		}

		if( this.contCampos<=0){
			 this.contNumDatos=0;
			 this.dtgrabar=null;

			 this.bandTieneAlgunError=true;
		     this.ErrorActual="No tiene una SCHEMA cargado";       
		     return false;
		}


		for( i=0; i< this.contCampos; i= i+1){					 
			 this.dtGrabar[ this.contNumDatos][ this.estructura[i]]= registro[i];			 
		}
			
		 this.contNumDatos= this.contNumDatos+1;
		 this.bandTieneDatosCargados=true;

		return true;
	 }


	 public boolean setCampoDeOrdenamientoDeLaTabla(String[] Campos){
		 this.NombreCampoOrdenamiento= Campos;
         return true;
	 }

	 public boolean setormaDeOrdenamiento(String Forma){
		 this.Ordenamiento= Forma;
	 }

	 public DataTable getdtBase(){
		return this.dtGrabar;
	 }

	 // FAQ
	 public String getCualEsElMensajeDeErrordelObjeto(){
		if( this.bandTieneAlgunError==true){
			return  this.ErrorActual;
		} else {
			return "No tiene";
		}
	 }

	 public int getCualEsElNumeroDeRegistrosCargados(){
		return  this.contNumDatos;
	 }

	 public String getCualEsLaFormaDeOrdenamiento(){
		return  this.Ordenamiento;
	 } 

	 public void setLimiteInferior(int Limite){
		 this.LimiteInferior= Limite;
	 }

	 public void setLimiteSuperior(int Limite){
		 this.LimiteSuperior= Limite;
	 }

	 public String[] get_Estructura(int indice){
		 return  this.estructura[ indice];
	 }

	 public int get_NumCampos(){
		 return  this.contCampos;
	 }

	 public String get_CampoLlave(){
		return  this.NombreCampoLlave;
	 }


	 public String[] get_CampoIrrepetible(){
		return  this.NombreCampoParaNoRepetir;
	 }

	 public String[] get_TipoDatoIrrepetible(){
		return  this.TipoDatoCampoParaNoRepetir;
	 }
	 
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // CONSTRUCTORES
	 public cltbl_Interfaces_v2_0_0() {
		 this.Inicializacion();
     }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // INICIALIZACION
	 public void Inicializacion(){
		 this.InicializaAtributos();
		 this.InicializacionContenido();
		 this.Cargar_Campos_Obligatorios();
		 this.Cargar_Campos_Listado();
		 this.Cargar_Campos_Busqueda();
		 this.Cargar_Campos_Especiales();
		 this.Cargar_Campos_Combo();
	 }

	 private void InicializaAtributos(){
		 this.bandTieneAlgunError=false;
		 this.bandTieneDatosCargados=false;
		 this.bandTieneDatosParaConectarse=false;

		 this.ErrorActual="No tiene";
		 this.Ordenamiento= this.Ascendente;

		 this.contNumDatos=0;	
		
		 this.contCampos=0;
	 }

	 public void InicializacionContenido(){
		 this.contNumDatos=0;
		 this.bandTieneAlgunError=false;
	 }

	 public void Cargar_Campos_Obligatorios(){	 
	//** CAMPOS */
		 this .campos_obligatorios=null;
		 this .campos_obligatorios= new ArrayList();
		  this .campos_obligatorios.add("Perfil");		 
		  this .campos_obligatorios.add("nIDAmbiente_Clasificacion");		 		 

		//** TIPOS */		
		this .campos_obligatorios_tipo=null;
		 this .campos_obligatorios_tipo= new ArrayList();
		  this .campos_obligatorios_tipo.add("CADENA"); // CADENA/NUMERO/FECHA		 
		  this .campos_obligatorios_tipo.add("NUMERO"); // CADENA/NUMERO/FECHA		 

		//** RANGO INICIAL */		
		 this .campos_obligatorios_rango1=null;
		 this .campos_obligatorios_rango1= new ArrayList();
		  this .campos_obligatorios_rango1.add("");  		 
		  this .campos_obligatorios_rango1.add(0);  		 

		//** COMPARATIVA INICIAL */				
		 this .campos_obligatorios_comparativa1=null;
		 this .campos_obligatorios_comparativa1= new ArrayList();
		  this .campos_obligatorios_comparativa1.add("SIN COMPARAR");   // SIN COMPARAR, IGUAL, MAYOR, MENOR, MAYORIGUAL, MENORIGUAL, COMPARADOCON		 
		  this .campos_obligatorios_comparativa1.add("MAYOR");   // SIN COMPARAR, IGUAL, MAYOR, MENOR, MAYORIGUAL, MENORIGUAL, COMPARADOCON		 
		 
		//** RANGO FINAL */		
		this .campos_obligatorios_rango2=null;
		 this .campos_obligatorios_rango2= new ArrayList();
		  this .campos_obligatorios_rango2.add("");  		 
		  this .campos_obligatorios_rango2.add(1000000);   
		
		//** COMPARATIVA FINAL */		
		this .campos_obligatorios_comparativa2=null;
		 this .campos_obligatorios_comparativa2= new ArrayList();
		  this .campos_obligatorios_comparativa2.add("SIN COMPARAR");   // SIN COMPARAR, IGUAL, MAYOR, MENOR, MAYORIGUAL, MENORIGUAL, COMPARADO CON		 
		  this .campos_obligatorios_comparativa2.add("MENORIGUAL");   // SIN COMPARAR, IGUAL, MAYOR, MENOR, MAYORIGUAL, MENORIGUAL, COMPARADO CON		 
		 
		//**LEYENDAS */
		 this .campos_obligatorios_leyendas=null;
		 this .campos_obligatorios_leyendas= new ArrayList();			 
		  this .campos_obligatorios_leyendas.add("Nombre del Perfil"); 
		  this .campos_obligatorios_leyendas.add("Clasificacion");	
		 
		 this .campos_obligatorios_mostrarleyenda=null;
		 this .campos_obligatorios_mostrarleyenda= new ArrayList();			 
		  this .campos_obligatorios_mostrarleyenda.add("SI");  // SI,NO
		  this .campos_obligatorios_mostrarleyenda.add("SI");	
		 

		 this .campos_obligatorios_valorescomparar1=null;
		 this .campos_obligatorios_valorescomparar1= new ArrayList();			 
		  this .campos_obligatorios_valorescomparar1.add("");  // SI,NO
	 
		 this .campos_obligatorios_valorescomparar2=null;
		 this .campos_obligatorios_valorescomparar2= new ArrayList();			 
		  this .campos_obligatorios_valorescomparar2.add("");  // SI,NO 		

	 }

	 public void Cargar_Campos_Listado(){	 
		 this.campos_listado=null;
		 this.campos_listado=new ArrayList();
		
		this.campos_listado.add("Perfil");
		this.campos_listado.add("Clasificacion");	
		this.campos_listado.add("Almacen");			 
		this.campos_listado.add(this.NombreCampoLlave);	 
	 }

	 public void Cargar_Campos_Busqueda(){	 
		 this .campos_busqueda=null;
		 this .campos_busqueda= new ArrayList();
 
		   this->campos_busqueda,"Perfil");
		  this->campos_busqueda,"Descripcion");	
		  this->campos_busqueda,"Email1");	
		  this->campos_busqueda,"Email2");	
		  this->campos_busqueda,"Email3");	
		  this->campos_busqueda,"Clasificacion");	
		  this->campos_busqueda,"IDAlmacen");		
		  this->campos_busqueda,"Almacen");			 

		 this .campos_busqueda_tipo=null;
		this .campos_busqueda_tipo=new ArrayList();
		
		// CADENA/NUMERO/FECHA
		 this .campos_busqueda_tipo.add("CADENA"); 
		 this .campos_busqueda_tipo.add("CADENA");	
		 this .campos_busqueda_tipo.add("CADENA");	
		 this .campos_busqueda_tipo.add("CADENA");
		 this .campos_busqueda_tipo.add("CADENA");
		 this .campos_busqueda_tipo.add("CADENA");
		 this .campos_busqueda_tipo.add("CADENA");
		 this .campos_busqueda_tipo.add("CADENA");
	 }

	 public void Cargar_Campos_Especiales(){	 
		 this .campos_especiales=null;
		 this .campos_especiales= ArrayList();
 		 
		  this .campos_especiales.add("Activo");
		  this .campos_especiales.add("App");
		  this .campos_especiales.add("Web");
		 
		 this .campos_especiales_tipo=null;
		 this .campos_especiales_tipo= ArrayList();
		
		  this .campos_especiales_tipo.add("CHEKCBOX"); //CHEKCBOX, RADIOBUTTON, IMAGEN		 		 	 
		  this .campos_especiales_tipo.add("CHEKCBOX"); //CHEKCBOX, RADIOBUTTON, IMAGEN		 		 	 
		  this .campos_especiales_tipo.add("CHEKCBOX"); //CHEKCBOX, RADIOBUTTON, IMAGEN		 		 	 
	 }

	 public void Cargar_Campos_Combo(){	 
		 this .campos_combo=null;
		 this .campos_combo= ArrayList();
		
		  this .campos_combo.add( this .NombreCampoLlave);	 
		  this .campos_combo.add("Usuario");		 	 
	 }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // ACTIVIDADES
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // MISCELANEO
	 private String vEstado( int lbEstado, String l_NombreCampo){
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

     public String CONVERTIR_ESPECIALES_HTML(String str){
        str=trim( str);
        str = mb_convert_encoding( str,  'UTF-8');
       return  str;
     }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // CONSULTAR
	 private Boolean Consultar(String condicion){
		// Abrea la conexion    
         SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }

		 
		 txtConsulta="";
		 txtConsulta = "SELECT *";
		 txtConsulta =  txtConsulta . " FROM ";
		 txtConsulta =  txtConsulta .  this .NombreDeLaVista;
		 txtConsulta =  txtConsulta . " WHERE ";
		 txtConsulta =  txtConsulta .  condicion;
		 txtConsulta =  txtConsulta . " ORDER BY " .  this .NombreCampoOrdenamiento;

		if( this.CualEsLaFormaDeOrdenamiento()== this.Ascendente){
		    txtConsulta= txtConsulta . " ASC";
		} else {
			  txtConsulta= txtConsulta . " DESC";
		}

		if( this .LimiteInferior>=0){
			 txtConsulta =  txtConsulta . " LIMIT " .  this .LimiteInferior . "," .  this .LimiteSuperior;
		}
 
		//' Ejecuta la consulta
        SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);
        Adaptador.fill(this.dtGrabar);

		// Cargar la informacion
		 contador=0;

		// Inicia los datos
		this .contNumDatos=0;
		this .dtgrabar=null;

		if( this .contCampos<=0){
			 this .contNumDatos=0;
			 this .dtgrabar=null;
			 this .CargarCampos("LEER");
		}
 
		if( dtGrabar.rows.count()>0){
			 
			while( Contador <dtGrabar.rows.count){
				 l_Registros= ArrayList();
				 
				for( i=0; i< this .contCampos; i= i+1){					
					  l_Valor= registro[ this .estructura[ i]];
					 //echo "<br> Valor:" .  l_Valor;

					 switch( this .tipos[ i]){
						case "CADENA":  l_Valor=stripslashes( l_Valor);		
						                l_Valor=trim( l_Valor);		
						                l_Valor= this .CONVERTIR_ESPECIALES_HTML( l_Valor);			                					 
						                 l_Registros, l_Valor);
						               break;
						case "FECHA":   l_Valor=stripslashes( l_Valor);	
						                l_Valor=trim( l_Valor);	
						                 l_Registros, l_Valor);					                
						               break;
						case "NUMERO":   l_Registros, l_Valor);	                
									   break;
									   
						case "DECIMAL":   l_Registros, l_Valor);	                
										break;			   
					 }

					 
					if(( this .contCampos-1)== i){
						  l_Registros,0);
					} else {
						if(( this .contCampos-2)== i){
							  l_Registros,1);
						} else {
							if(( this .contCampos-3)== i){
								  l_Registros,0);
							}
						}
					}
					
				}

				//print_r( l_Registros);
			             
				 this.setInformacion_Leer( l_Registros);

				l_Registros=null;	
                contador++;		  		
			}  
	   } else {
		    this.bandTieneDatosCargados=false;
	   }

	   Coneccion.Close();
       GC.Collect();


	   return true;
    }
    
    private Boolean Consultar_Directa( String consulta){
		// Abrea la conexion         
		 SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }

		 txtConsulta= consulta;		 
 
		//' Ejecuta la consulta
		 	//' Ejecuta la consulta
        SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);
        Adaptador.fill(this.dtGrabar);

		// Cargar la informacion
		 contador=0;

		// Inicia los datos
		 this .contNumDatos=0;
		 this .dtgrabar=null;

		if( this .contCampos<=0){
			 this .contNumDatos=0;
			 this .dtgrabar=null;
			 this .CargarCampos("LEER");
		}
 
		if( dtGrabar.rows.count()>0){
			 
			while( Contador <dtGrabar.rows.count){
				 l_Registros= ArrayList();
				 
				for( i=0; i< this .contCampos; i= i+1){					
					  l_Valor= registro[ this .estructura[ i]];
					 //echo "<br> Valor:" .  l_Valor;

					 switch( this .tipos[ i]){
						case "CADENA":  l_Valor=stripslashes( l_Valor);		
						                l_Valor=trim( l_Valor);		
						                l_Valor= this .CONVERTIR_ESPECIALES_HTML( l_Valor);			                					 
						                 l_Registros, l_Valor);
						               break;
						case "FECHA":   l_Valor=stripslashes( l_Valor);	
						                l_Valor=trim( l_Valor);	
						                 l_Registros, l_Valor);					                
						               break;
						case "NUMERO":   l_Registros, l_Valor);	                
									   break;
									   
						case "DECIMAL":   l_Registros, l_Valor);	                
										break;			   
					 }

					 
					if(( this .contCampos-1)== i){
						  l_Registros,0);
					} else {
						if(( this .contCampos-2)== i){
							  l_Registros,1);
						} else {
							if(( this .contCampos-3)== i){
								  l_Registros,0);
							}
						}
					}
					
				}
 
				 this .setInformacion_Leer( l_Registros);

				 l_Registros=null;
                contador++;			  			 
			}  
	   } else {
		    this .bandTieneDatosCargados=FALSE;
	   }

	    Coneccion.Close();
        GC.Collect();

	   return true;
	}

	public Boolean ContarRegistros(String condicion){
		 // Declara variables
		  contador=0;

		  SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }

	 
		  txtConsulta="";
		  txtConsulta = "SELECT count(" .  this .NombreCampoLlave .") as Total";
		  txtConsulta =  txtConsulta . " FROM ";
		  txtConsulta =  txtConsulta .  this .NombreDeLaVista;
		  txtConsulta =  txtConsulta . " WHERE ";
		  txtConsulta =  txtConsulta .  condicion;
	 		  
	 
		//' Ejecuta la consulta
        SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);
        Adaptador.fill(this.dtGrabar);


		 // this .contNumDatos=0;
		 if(  dtGrabar.rows.count()>0 ){
			if( Contador <dtGrabar.rows.count ){
				if( registro['Total']!=NULL){
					 contador= registro['Total'];
			   }
			}
		 }

		 Coneccion.Close();
         GC.Collect();

		 return  contador;
	 }	  

	 public CargarCampos( String l_Tipo){
		 
	   // Abrea la conexion         
	     SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }

	    this .contCampos=0;
	    this .estructura=null;;
	    this .tipos=null;

	    l_Tabla= this .NombreDeLaVista;
	   if( l_Tipo=="GRABAR"){
		     l_Tabla= this .NombreDeLaTabla;
	   }
	   
        l_Retorna=FALSE;
	    txtConsulta="";
	    txtConsulta = "SHOW COLUMNS";
	    txtConsulta =  txtConsulta . " FROM ";
	    txtConsulta =  txtConsulta .  l_Tabla;
 
	   //' Ejecuta la consulta
	   SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);

          SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);
        Adaptador.fill(this.dtGrabar);


 
	   if(  dtGrabar.rows.count()>0 ){
		 
		      bandEncontrado=0;
		     while( row =  res .fetch_assoc()){
				 campo =  row['Field'];
				 tipo= row['Type'];

				 bandEncontrado=0;
				for( i=0; i< this .contCampos; i= i+1){

					if( this .estructura[ i]== campo){
						 bandEncontrado=1;
						break;
					}
				}

				if( bandEncontrado==0){
					 this .estructura[ this .contCampos]= campo;
					 this .tipos[ this .contCampos]= tipo;
					 this .contCampos= this .contCampos+1;
				}
			 }
 		 
			  this .estructura[]="Crear";	 
			  this .estructura[]="Cambiar";			 
			  this .estructura[]="Eliminar";			  
 
			  this .contCampos=count( this .estructura);
 
			 for( i=0; i< this .contCampos; i= i+1){
				  tipos=(string) this .tipos[ i];

				  pos=strpos( tipos,'var');
				 if( pos===false){					 
				 } else {
					 this .tipos[ i]="CADENA";					 
				 }
				 
				  pos=strpos( tipos,'int');
				 if( pos===false){
				 } else {
				    this .tipos[ i]="NUMERO";				    
				 }

				  pos=strpos( tipos,'dec');
				 if( pos===false){
				 } else {
				    this .tipos[ i]="DECIMAL";				    
				 }

				  pos=strpos( tipos,'text');
				 if( pos===false){
				 } else {
				    this .tipos[ i]="CADENA";				    
				 }

				  pos=strpos( tipos,'date');
				 if( pos===false){
				 } else {
				    this .tipos[ i]="FECHA";				    
				 }

			     //echo " <BR> POS:" .  i . " - " .  this .estructura[ i] . " -" .  this .tipos[ i];		  			  
			}
 
		    // echo "<br> Columnas: " .  this .contCampos;

		      l_Retorna=TRUE;
		 }  
	 

	     Coneccion.Close();
         GC.Collect();

	     return  l_Retorna;
     }

	
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // BORRAR
	 private boolean BorrarPorCondicion(String l_Condicion){
		// Abrea la conexion         
	     SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }

		 // Declara variables
		  txtInsercion="";
		  fechalocal="";
		  UtileriasDatos = new clHerramientasv2011();

		  txtInsercion = "DELETE FROM " .  this .NombreDeLaTabla . " WHERE " .  l_Condicion;
		        
		   //' Ejecuta la consulta
	    SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);

		 if( Adaptador==FALSE){
		    Coneccion.Close();
            GC.Collect();
           return false;
		 }

		 Coneccion.Close();
         GC.Collect();
		 return true;
	 }

     private boolean BorrarTemporal( int l_nID,  String l_Observaciones){
         if( this .ActualizarEstado( l_nID,1, l_Observaciones)==TRUE){
             return TRUE;
         } else {
             return FALSE;
         }
     }
	 // --------------------------------------------------------

	 // --------------------------------------------------------
	 // CAMBIAR
	 private boolean ActualizarEstado(int l_nID,  int l_bEstado, String l_Observaciones){
		 // Abrea la conexion
		  // Abrea la conexion         
	     SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }

		 // Declara variables
		  txtInsercion="";
		  fechalocal="";
		  UtileriasDatos = new clHerramientasv2011();

		  txtInsercion = "UPDATE " .   this .NombreDeLaTabla;
          txtInsercion =  txtInsercion . " SET ";
          txtInsercion =  txtInsercion . " bEstado=" .  l_bEstado . ",";

	      l_FechaLocal =  UtileriasDatos .getFechaYHoraActual_General();
          l_FechaLocal =  UtileriasDatos .ConvertirFechaYHora( l_FechaLocal);
          txtInsercion =  txtInsercion . " FechaModificacion='".  l_FechaLocal . "',";

          txtInsercion =  txtInsercion . " Observaciones='".  l_Observaciones . "'";
		  txtInsercion =  txtInsercion . " WHERE " .  this .NombreCampoLlave . "=" . l_nID;
		 
		 //echo "txt:" .  txtInsercion;

		//' Ejecuta la consulta
	    SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);

		 if( Adaptador==FALSE){
		      Coneccion.Close();
            GC.Collect();
             return false;
		 }

		 Coneccion.Close();
            GC.Collect();
		 return true;
	 }     
     // --------------------------------------------------------

     // --------------------------------------------------------
     // Ejecucion
	 private function Grabar( Tabla){				 
		// Abrea la conexion
		 SqlConnection ConexionSQL;
         String CadenaConexion;
         SqlClient.SqlDataAdapter cmd;

         CadenaConexion="server=" + this.servidor + "; database=" + this.basededatos + "; login=" + this.usuario + "; password=" + this .password;
		 SqlConeccion  ConexionSQL=new SqlConnection(CadenaConexion);

         try{
             ConexionSQL.open();
         } catch(SqlException ex){
            this .bandTieneAlgunError=true;
		    this .ErrorActual="Error No se puede conectar a la base de datos";       
		    return false;
         }
	 
 
		// Declara variables
		 txtInsercion="";
		 fechalocal="";
		 UtileriasDatos = new clHerramientasv2011();

		// Carga los campos
		 
		 l_FechaLocal =  UtileriasDatos .getFechaYHoraActual_General();
		 l_FechaLocal =  UtileriasDatos .ConvertirFechaYHora( l_FechaLocal);

  
		for ( i=0; i< this .contNumDatos;  i= i+1){
			 
			  l_Campos="";
			  l_Informacion="";
 
			 if( Tabla[ i]["Crear"]){
		 
			    // Campos
				 l_Campos="";
				 numCampos= this .contCampos;
				 numCampos= numCampos-3;				 
		        for( j=1; j< numCampos; j= j+1){					 
			         l_Campos= l_Campos .  this .estructura[ j] . ",";
				} 
				 l_Campos=substr( l_Campos,0,strlen( l_Campos)-1);
			 
				// Información a grabar
				 l_Informacion="";
				for( j=1; j< numCampos; j= j+1){		
					 	  
			        switch( this .tipos[ j]){
						case "CADENA":  l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this .estructura[ j]]) . "', ";
						               break;
						case "FECHA":  if(  this .estructura[ j]=="FechaModificacion"   ){
										     //if(strlen( Tabla[ i][ this .estructura[ j]])==0){
										         Tabla[ i][ this .estructura[ j]]= l_FechaLocal;
									         // } 
									   } else {
										  if(  this .estructura[ j]=="FechaCreacion"   ){
											 // if(strlen( Tabla[ i][ this .estructura[ j]])==0){
										         Tabla[ i][ this .estructura[ j]]= l_FechaLocal;
									         // } 
										  }
									   }
		
						                l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this .estructura[ j]]) . "', ";
						               break;
						case "NUMERO":  l_Informacion= l_Informacion .  Tabla[ i][ this .estructura[ j]] . ", ";
									   break;
									   
						case "DECIMAL":  l_Informacion= l_Informacion .  Tabla[ i][ this .estructura[ j]] . ", ";
										break;			   
					}
				} 
				 l_Informacion=substr( l_Informacion,0,strlen( l_Informacion)-2);
			 
				 txtInsercion = "INSERT INTO " .  this .NombreDeLaTabla;
				 txtInsercion = " " .  txtInsercion . "(" .  l_Campos . ") VALUES (" .  l_Informacion . ")";

				 //echo  txtInsercion; 
			} else {
				
				if( Tabla[ i]["Cambiar"]==TRUE){
					
					  txtInsercion = "UPDATE " .   this .NombreDeLaTabla;
					  txtInsercion =  txtInsercion . " SET ";
					 
                     // Campos
					  l_Campo="";
					  l_Datos="";
				      numCampos= this .contCampos;
					  numCampos= numCampos-3;
					 
		             for( j=1; j< numCampos; j= j+1){	
						 //echo "CAMPO:" .  this .estructura[ j];
						  l_Informacion="";									 
						  l_Campo="";

						 // Campos excluidos
						 if( this .estructura[ j]!="FechaCreacion"){
							if( this .estructura[ j]!="bEstado"){
								 l_Campo= this .estructura[ j] . "=";		
							}
						 }			
						 
						  
						 switch( this .tipos[ j]){
							case "CADENA":  l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this .estructura[ j]]) . "', ";
										   break;
							case "FECHA":  if(  this .estructura[ j]=="FechaModificacion" ){
												 //if(strlen( Tabla[ i][ this .estructura[ j]])==0){
													 Tabla[ i][ this .estructura[ j]]= l_FechaLocal;
													 l_Informacion= l_Informacion . "'" . addslashes( Tabla[ i][ this .estructura[ j]]) . "', ";
												 //} 
										   }  

										   if(  this .estructura[ j]=="FechaCreacion" ){
											     
										   }  
										   

										   break;
							case "NUMERO": if(  this .estructura[ j]!="bEstado" ){
                                                 l_Informacion= l_Informacion .  Tabla[ i][ this .estructura[ j]] . ", ";										       
										   }							
							
										   break;

							case "DECIMAL":  						
						
									   		break;
										   
						 }

						  l_Campo= l_Campo .  l_Informacion;
						  l_Datos= l_Datos .  l_Campo;						 						 
				     } 
					  l_Datos=substr( l_Datos,0,strlen( l_Datos)-2);					 
					  txtInsercion= txtInsercion . " " .  l_Datos;

					  txtInsercion= txtInsercion . " WHERE ";
					  l_Campo= this .estructura[0] . "=";
					  txtInsercion= txtInsercion .  l_Campo;
					  txtInsercion= txtInsercion .  Tabla[ i][ this .estructura[0]];
 
					 //echo  txtInsercion;
			 
				 } else {
					if( Tabla[ i]["Eliminar"]==TRUE){
					 
						 txtInsercion = "DELETE FROM " .  this .NombreDeLaTabla . " WHERE " .  this .NombreCampoLlave . "=" . Tabla[ i][ this .estructura[0]];
					 
					}
				}
			}
 
	  
	    //' Ejecuta la consulta
	    SqlCommand comando = new SqlCommand();
        comando.Connection=Coneccion;
        comando.CommandType=CommandType.Text;
        comando.CommandText=txtConsulta;		  

        SqlDataAdapter Adaptador;
        Adaptador = new SqlDataAdapter(SqlCommand);

			if( Adaptador==FALSE){
				Coneccion.Close();
            GC.Collect();
				return FALSE;
			}
			 
		}

		Coneccion.Close();
            GC.Collect();
		return true;
	}
     // --------------------------------------------------------

     // --------------------------------------------------------
	 // OPERACIONES
	 // ELIMINIAR
	 public boolean EliminarConCondicion(String l_Condicion){
		 if( this .bandTieneAlgunError){
			return FALSE;
		 }

		 if( this .bandTieneDatosParaConectarse){
			  this .bandTieneAlgunError=TRUE;
			  this .ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			 return false;
		 }

		 if(strlen( l_Condicion)<=0){
			  this .bandTieneAlgunError=TRUE;
			  this .ErrorActual="Error No tiene condicion";
			 return false;
		 }

		 if ( this .BorrarPorCondicion( l_Condicion)==TRUE){
			 return true;
		 } else {
			 return false;
		 }
	 }

	 public boolean Ocultar( int l_nID, String l_Observaciones){
		 if( this .bandTieneAlgunError){
			 return false;
		 }

		 if( this .bandTieneDatosParaConectarse){
			  this .bandTieneAlgunError=TRUE;
			  this .ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			 return false;
		 }

		 if ( this .BorrarTemporal( l_nID, l_Observaciones)==TRUE){
			 return true;
		 } else {
			 return false;
		 }
	 }

	 // CAMBIAR
	 public boolean CambiarEstado( int l_nID, String l_Observaciones, int  l_bEstado){
		 if( this .bandTieneAlgunError){
			return false;
		 }

		 if( this .bandTieneDatosParaConectarse){
			 this .bandTieneAlgunError=TRUE;
			 this .ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			return false;
		 }

		 if ( this .ActualizarEstado( l_nID, l_bEstado, l_Observaciones)==TRUE){
			 return true;
		 } else {
			 return false;
		 }
	 } 

	 // CARGAR
	 public boolean Leer(String condicion){
		 if( this .bandTieneAlgunError){
			return false;
		 }

		 if( this .bandTieneDatosParaConectarse){
			 this .bandTieneAlgunError=TRUE;
			 this .ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			return false;
		 }

		 if(condicion.length()<=0){
			 this .bandTieneAlgunError=TRUE;
			 this .ErrorActual="Error No tiene Condicion";
			return false;
		 }

		 if( this .Consultar( condicion)==TRUE){
			return true;
		 } else {
			return false;
		 }
     }
     
     public boolean Leer_Directo(String consulta){
        if( this .bandTieneAlgunError){
           return false;
        }

        if( this .bandTieneDatosParaConectarse){
            this .bandTieneAlgunError=TRUE;
            this .ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
           return false;
        }

        if(strlen( consulta)<=0){
            this .bandTieneAlgunError=TRUE;
            this .ErrorActual="Error No tiene Condicion";
           return false;
        }

        if( this .Consultar_Directa( consulta)==TRUE){
           return true;
        } else {
           return false;
        }
    }
 

	 // EJECUCION
	 public boolean Ejecutar(){
		 if( this .bandTieneAlgunError){
			return false;
		 }
 
		 if( this .bandTieneDatosParaConectarse){
			 this .bandTieneAlgunError=TRUE;
			 this .ErrorActual="Error No tiene los datos para conectarse a la base de datos [Cargar]";
			return false;
		 }

		 if( this .contNumDatos<=0){
			return false;
		 }

		 
		 if( this .Grabar( this .dtGrabar)==TRUE){
			return true;
		 } else {
			return false;
		 }
	 }
 
 }

}