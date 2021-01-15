$(document).ready(function () {
    obtenerTareas();
    let modificar = false;
    function obtenerTareas() {
        $.ajax({
            url: "listar.php",
            type: "GET",
            success: function (tareas) {
                let tasks = JSON.parse(tareas);
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr taskId="${task.id}">
                            <td>
                               ${task.nombre}
                            </td>
                            <td>${task.apellido}</td>
                            <td>
                                <button class="task-update btn btn-primary">EDITAR</button>
                            </td>
                            <td>
                                <button class="btn btn-danger" data-toggle="modal" data-target="#modal2">ELIMINAR</button>
                            </td>
                        </tr>
                        `
                });
                $('#tasks').html(template);
            }
        });
    }
    $('#task-form').submit(e => {
        const datos = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            id: $('#taskId').val(),
        }
        const url = modificar === false ? 'insertar.php' : 'modificar.php';
        $.post(url, datos, (response) => {
            obtenerTareas(); 
        });
        
    });
    $(document).on('click', '.task-delete', (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('taskId');
        console.log(id);
        $.post('eliminar.php', { id }, (response) => {
            obtenerTareas();
        });
    });
    $(document).on('click', '.task-update', (e)=>{
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr('taskId');
        console.log(id);
        $.post('getTarea.php',{id},(response)=>{
            console.log(response);
            const task = JSON.parse(response);  
            $('#nombre').val(task.nombre);
            $('#apellido').val(task.apellido);
            $('#taskId').val(task.id);
            modificar = true;
        });
        $('#modal1').modal('show');
    }); 
});
