<?php
include('database.php');
if(isset($_POST ['id'])){
    $id = $_POST['id'];
    $nombre = $_POST ['nombre'];
    $apellido = $_POST ['apellido'];
    $query = "UPDATE usuarios SET nombre = '$nombre', apellido = '$apellido' WHERE id = $id";
    $resultado = mysqli_query($conexion,$query);
    if(!$resultado){
        die('senetencia ha fallado');
    }
    echo "se registro correctamente";
}

?>
