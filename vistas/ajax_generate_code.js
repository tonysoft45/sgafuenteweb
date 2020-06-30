/*
$(document).ready(function() {
    $("#codeForm").submit(function(){
        $.ajax({
            url:'../control/generate_code.php',
            type:'POST',
            data: {formData:$("#content").val(), ecc:$("#ecc").val(), size:$("#size").val()},
            success: function(response) {
                $(".showQRCode").html(response);  
            },
         });
    });
});
*/

function Enviar(){
    var l_Datos=document.getElementById("datos").value;
    var l_Calidad=document.getElementById("calidad").value;
    var l_Tamaxo=document.getElementById("tamaxo").value;

    $.ajax({
        url:'../control/generate_code.php',
        type:'POST',
        data: {datos:l_Datos, calidad:l_Calidad, tamaxo:l_Tamaxo},
        success: function(response) {
            
            
            //document.getElementById("showQRCode").innerHTML=response;     
            document.getElementById("qr").src=response;
        },
     });


}