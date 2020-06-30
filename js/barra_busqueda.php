<?php
// ----------------------------------------------------------------------------------
// barra_botones.php
// ----------------------------------------------------------------------------------
// Autor. Ing. Antonio Barajas del Castillo
// ----------------------------------------------------------------------------------
// Descripcion.  Es utilizada para indicar la ubicacion del sistema
// ----------------------------------------------------------------------------------
// Empresa. Softernium SA de CV.
// ----------------------------------------------------------------------------------
// Fecha Ultima Modificación
// 06/11/2019
// ----------------------------------------------------------------------------------

echo "mOdulo:" . $l_Modulo;
switch($l_Modulo){
  // ----------------------------------------------------------------------------------
  // Catalogos 
    case "cat_empresas":
      if($l_Accion!="Cargar"){
?> 
        <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
<?php
      }
      break;

    case "cat_centrosdeservicio":
        if($l_Accion!="Cargar"){
  ?> 
          <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
  <?php
        }
        break;

      case "cat_almacen":
          if($l_Accion!="Cargar"){
?> 
           <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
<?php
          }
          break;

      case "cat_racks":
            if($l_Accion!="Cargar"){
  ?> 
             <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
  <?php
            }
            break;

     case "cat_pasillos":
      if($l_Accion!="Cargar"){
?> 
        <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
<?php
      }
      break;

      case "cat_matriz":
        if($l_Accion!="Cargar"){
           
  ?> 
          <!-- BUSQUEDA -->
          <div class="row align-item-end h-20">	
            <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
              <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
                <tr>
                  <td>
                    <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                      <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                      <a class="nav-link" href="#" >
                        <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                      </a>                         
                    </form>
                  </td> 
                </tr>       
             </table>    
            </div>
          </div>
          <!-- FIN BUSQUEDA -->    
  <?php
        }
        break;
  

       case "cat_productos":
        if($l_Accion!="Cargar"){
  ?> 
           <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
  <?php
        }
        break;



      case "cat_proveedores":
        if($l_Accion!="Cargar"){
  ?> 
          <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
  <?php
        }
        break;

        case "cat_clientes":
          if($l_Accion!="Cargar"){
    ?> 
           <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
    <?php
          }
          break;




      // Catalogo de Clasificacion de Productos
      case "cat_tipos":
        if($l_Accion!="Cargar"){
  ?> 
           <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
  <?php
        }
        break;

      case "cat_subtipos":
          if($l_Accion!="Cargar"){
    ?> 
            <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
    <?php
          }
          break;

      case "cat_familias":
            if($l_Accion!="Cargar"){
      ?> 
               <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
      <?php
            }
            break;

      case "cat_presentaciones":
              if($l_Accion!="Cargar"){
        ?> 
                 <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
        <?php
              }
              break;

       case "cat_excepciones":
                if($l_Accion!="Cargar"){
          ?> 
                  <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
          <?php
                }
                break;

         case "cat_unidadesdemedida":
                  if($l_Accion!="Cargar"){
            ?> 
                     <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
            <?php
                  }
                  break;

         case "cat_estados":
                  if($l_Accion!="Cargar"){
            ?> 
                   <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
            <?php
                  }
                  break;

          case "cat_motivostraspaso":
                  if($l_Accion!="Cargar"){
            ?> 
                   <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
            <?php
                  }
                  break;

          case "cat_conceptosentrada":
                  if($l_Accion!="Cargar"){
            ?> 
                    <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
            <?php
                  }
                  break;

           case "cat_conceptossalida":
                  if($l_Accion!="Cargar"){
            ?> 
                    <!-- BUSQUEDA -->
        <div class="row align-item-end h-20">	
          <div class="col-12 align-middle d-flex align-items-center .hidden-md float-xs-right" style='vertical-aling:middle;display:block;font-size:10px; font-family:"Arial Black", Gadget, sans-serif'>
            <table style='width:100%;text-align:rigth;margin-left:-10px;'>          
              <tr>
                <td>
                  <form id='frm_Consultar' class="form-inline borderless" style='border-style: none;'> 
                    <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control" style='height: 30px; font-size:10px; font-family:"Arial Black", Gadget, sans-serif;  '>
                    <a class="nav-link" href="#" >
                      <button type="button" class="btn btn-primary" style='margin-left:-15px;font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
                    </a>                         
                  </form>
                </td> 
              </tr>       
           </table>    
          </div>
        </div>
        <!-- FIN BUSQUEDA -->    
            <?php
                  }
                  break;
   // ----------------------------------------------------------------------------------

   // ----------------------------------------------------------------------------------
           // Inventarios
             case "packinglist":
                    if($l_Accion!="Cargar"){
              ?> 
                      <!-- BUSQUEDA -->
                      <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                        <form id='frm_Consultar' class="form-inline"> 
                          <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                          <a class="nav-link" href="#" style='margin-left:-30px;'>
                            <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic('')">Buscar</button>
                          </a>                         
                        </form>
                      </div>          
                      <!-- FIN BUSQUEDA -->    
              <?php
                    }
                    break;

             case "recibo":
                      if($l_Accion!="Cargar"){
                ?> 
                        <!-- BUSQUEDA -->
                        <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                          <form id='frm_Consultar' class="form-inline"> 
                            <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                            <a class="nav-link" href="#" style='margin-left:-30px;'>
                              <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic('')">Buscar</button>
                            </a>                         
                          </form>
                        </div>          
                        <!-- FIN BUSQUEDA -->    
                <?php
                      }
                      break;


              case "entradasxcompras":
                      if($l_Accion!="Cargar"){
                ?> 
                        <!-- BUSQUEDA -->
                        <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                          <form id='frm_Consultar' class="form-inline"> 
                            <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                            <a class="nav-link" href="#" style='margin-left:-30px;'>
                              <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic('')">Buscar</button>
                            </a>                         
                          </form>
                        </div>          
                        <!-- FIN BUSQUEDA -->    
                <?php
                      }
                      break;        

                case "entradaporotrosconceptos":
                      if($l_Accion!="Cargar"){
                ?> 
                        <!-- BUSQUEDA -->
                        <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                          <form id='frm_Consultar' class="form-inline"> 
                            <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                            <a class="nav-link" href="#" style='margin-left:-30px;'>
                              <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic('')">Buscar</button>
                            </a>                         
                          </form>
                        </div>          
                        <!-- FIN BUSQUEDA -->    
                <?php
                      }
                      break;              
                      
                      
                case "salidaporotrosconceptos":
                        if($l_Accion!="Cargar"){
                  ?> 
                          <!-- BUSQUEDA -->
                          <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                            <form id='frm_Consultar' class="form-inline"> 
                              <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                              <a class="nav-link" href="#" style='margin-left:-30px;'>
                                <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic('')">Buscar</button>
                              </a>                         
                            </form>
                          </div>          
                          <!-- FIN BUSQUEDA -->    
                  <?php
                        }
                        break;

                // Traspasos 
                case "ordendesurtido":
                        if($l_Accion!="Cargar"){
                  ?> 
                          <!-- BUSQUEDA -->
                          <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                            <form id='frm_Consultar' class="form-inline"> 
                              <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                              <a class="nav-link" href="#" style='margin-left:-30px;'>
                                <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_PorFolio_Clic()">Buscar</button>
                              </a>                         
                            </form>
                          </div>          
                          <!-- FIN BUSQUEDA -->    
                  <?php
                        }
                        break;        
                        
                 case "traspasos_envio":
                          if($l_Accion!="Cargar"){
                    ?> 
                            <!-- BUSQUEDA -->
                            <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                              <form id='frm_Consultar' class="form-inline"> 
                                <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                                <a class="nav-link" href="#" style='margin-left:-30px;'>
                                  <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_PorFolio_Clic()">Buscar</button>
                                </a>                         
                              </form>
                            </div>          
                            <!-- FIN BUSQUEDA -->    
                    <?php
                          }
                          break;                  

                  case "traspasos_recepcion":
                          if($l_Accion!="Cargar"){
                    ?> 
                            <!-- BUSQUEDA -->
                            <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
                              <form id='frm_Consultar' class="form-inline"> 
                                <input id='Consulta' name='Consulta' type="text" placeholder="Busqueda por folio" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
                                <a class="nav-link" href="#" style='margin-left:-30px;'>
                                  <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic('')">Buscar</button>
                                </a>                         
                              </form>
                            </div>          
                            <!-- FIN BUSQUEDA -->    
                    <?php
                          }
                          break;                                    
  default:
?>  
      <!-- BUSQUEDA -->
      <div class="col-12"  style='vertical-aling:middle;display:block;font-size:14px; font-family:"Arial", Gadget, sans-serif'>                     
        <form id='frm_Consultar' class="form-inline"> 
         <input id='Consulta' name='Consulta' type="text" placeholder="Buscar" class="form-control mr-sm-2" style='height: 30px;font-size:10px; font-family:"Arial Black", Gadget, sans-serif; margin-left:-15px; '>
          <a class="nav-link" href="#" style='margin-left:-30px;'>
            <button type="button" class="btn btn-primary" style='font-size:12px; font-family:"Arial", Gadget, sans-serif;' onclick="fn_Listado_Clic()">Buscar</button>
         </a>                         
        </form>
      </div>          
      <!-- FIN BUSQUEDA -->    
<?php
      break;
} 
?>


    