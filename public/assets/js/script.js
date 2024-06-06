
const setInfoModal = (nombre, balance, id) => {
    $("#nombreEdit").val(nombre);
    $("#balanceEdit").val(balance);
    $("#editButton").attr("onclick", `editUsuario('${id}')`);
};

const editUsuario = async (id) => {
    const name = $("#nombreEdit").val();
    const balance = $("#balanceEdit").val();

    // validar

    try {
        const { data } = await axios.put(
            `http://localhost:3000/usuario?id=${id}`,
            {
                name,
                balance,
            }
        );
        $("#exampleModal").modal("hide");
        location.reload();
    } catch (e) {
        alert("Algo salió mal..." + e);
    }
};

$("form:first").submit(async (e) => {
    e.preventDefault();
    let nombre = $("form:first input:first").val();
    let balance = Number($("form:first input:nth-child(2)").val());

    // Validar que balance sea un número


    try {
        const response = await fetch("http://localhost:3000/usuario", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                balance,
            }),
        });
        $("form:first input:first").val("");
        $("form:first input:nth-child(2)").val("");
        location.reload();
    } catch (e) {
        alert("Algo salió mal ..." + e);
    }
});

$("form:last").submit(async (e) => {
    e.preventDefault();
    let emisor = $("form:last select:first").val();
    let receptor = $("form:last select:last").val();
    let monto = $("#monto").val();
    if (!monto || !emisor || !receptor) {
        alert("Debe seleccionar un emisor, receptor y monto a transferir");
        return false;
    }

    // Validar que el emisor y el receptor no sean iguales
    if (emisor === receptor) {
        alert("El emisor y el receptor no pueden ser iguales");
        return false;
    }

    try {
        const response = await fetch("http://localhost:3000/transferencias", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emisor,
                receptor,
                monto,
            }),
        });
        const data = await response.json();
        location.reload();
    } catch (e) {
        console.log("aqui se cae")
        console.log(e);
        alert("Algo salió mal..." + e);
    }
});

const getUsuarios = async () => {
    const response = await fetch("http://localhost:3000/usuarios");
    let data = await response.json();
    $(".usuarios").html("");

    $.each(data, (i, c) => {

        // Formatear el balance como CLP

        $(".usuarios").append(`
              <tr>
                <td>${c.nombre}</td>
                <td>${c.balance}</td>
                <td>
                  <button
                    class="btn btn-warning mr-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onclick="setInfoModal('${c.nombre}', '${c.balance}', '${c.id}')"
                  >
                    Editar</button
                  ><button class="btn btn-danger" onclick="eliminarUsuario('${c.id}')">Eliminar</button>
                </td>
              </tr>
         `);

        // $("#emisor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
        // $("#receptor").append(`<option value="${c.nombre}">${c.nombre}</option>`);

        $("#emisor").append(`<option value="${c.id}">${c.nombre}</option>`);
        $("#receptor").append(`<option value="${c.id}">${c.nombre}</option>`);

    });
};

const eliminarUsuario = async (id) => {

    //     const confirmacion = confirm("¿Estás seguro de que deseas eliminar este usuario?")

    // if (!confirmacion) {
    //     return
    // }

    const response = await fetch(`http://localhost:3000/usuario?id=${id}`, {
        method: "DELETE",
    });
    getUsuarios();
};

const getTransferencias = async () => {
    const { data } = await axios.get("http://localhost:3000/transferencias");
    $(".transferencias").html("");

    data.forEach((t) => {

        // Formatear el balance como CLP


        $(".transferencias").append(`
       <tr>
         <td> ${formatDate(t.fecha)} </td>
         <td> ${t.emisor_nombre} </td>
         <td> ${t.receptor_nombre} </td>
         <td> ${t.monto} </td>
       </tr>
     `);
    });
};

getUsuarios();
getTransferencias();

const formatDate = (date) => {
    const dateFormat = moment(date).format("L");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
};
formatDate();
