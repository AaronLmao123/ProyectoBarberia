$(document).ready(function () {
    // Array inicial de servicios
    let services = [
        {
            id: "Corte1",
            Nombre: "Personalizado",
            Description: "Asesoría en tienda",
            Costo: "120$",
        },
        {
            id: "Corte2",
            Nombre: "Undercut",
            Description: "Laterales muy apurados y una parte superior ligeramente más larga",
            Costo: "170$",
        },
    ];

    // Cargar servicios en la tabla
    function loadServices() {
        let servicesTableBody = $("#services-table-body");
        servicesTableBody.empty();
        services.forEach((service) => {
            servicesTableBody.append(`
                <tr>
                    <td>${service.id}</td>
                    <td>${service.Nombre}</td>
                    <td>${service.Description}</td>
                    <td>${service.Costo}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-service-btn" data-id="${service.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-service-btn" data-id="${service.id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    }

    // Mostrar alerta
    function showAlert(message, type) {
        $("#alert-container").html(`
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
        setTimeout(() => {
            $("#alert-container").html(""); // Limpiar alerta después de 3 segundos
        }, 3000);
    }

    // Manejar envío de formulario
    $("#service-form").submit(function (event) {
        event.preventDefault(); // Prevenir envío de formulario por defecto
        let serviceId = $("#service-id").val();
        let serviceName = $("#service-name").val();
        let serviceDescription = $("#service-description").val();
        let serviceCost = $("#service-cost").val();
        let method = serviceId ? "PUT" : "POST";

        if (method === "PUT") {
            // Agregar nuevo servicio
            let newId = "Corte" + (services.length + 1);
            services.push({
                id: newId,
                Nombre: serviceName,
                Description: serviceDescription,
                Costo: serviceCost,
            });
        } else {
            // Actualizar servicio existente
            let service = services.find((s) => s.id === serviceId);
            if (service) {
                service.Nombre = serviceName;
                service.Description = serviceDescription;
                service.Costo = serviceCost;
            }
        }

        loadServices(); // Actualizar tabla de servicios
        showAlert("Servicio guardado", "success"); // Mostrar alerta de éxito
        $("#serviceModal").modal("hide"); // Cerrar modal
    });

    // Editar servicio
    $(document).on("click", ".edit-service-btn", function () {
        let serviceId = $(this).data("id");
        let service = services.find((s) => s.id === serviceId);
        if (service) {
            $("#service-id").val(service.id);
            $("#service-name").val(service.Nombre);
            $("#service-description").val(service.Description);
            $("#service-cost").val(service.Costo);
            $("#serviceModalLabel").text("Editar servicio"); // Cambiar título del modal
            $("#serviceModal").modal("show");
        }
    });

    // Eliminar servicio
    $(document).on("click", ".delete-service-btn", function () {
        let serviceId = $(this).data("id");
        services = services.filter((service) => service.id !== serviceId);
        loadServices(); // Actualizar tabla de servicios
        showAlert("Servicio eliminado exitosamente", "success"); // Mostrar alerta de éxito
    });

    // Resetear formulario al cerrar modal
    $("#serviceModal").on("hidden.bs.modal", function () {
        $("#service-form")[0].reset(); // Limpiar formulario
        $("#service-id").val("");
        $("#serviceModalLabel").text("Agregar Servicio"); // Cambiar título del modal
    });

    // Inicializar tabla de servicios
    loadServices();
});
