import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
    const { setEdicion, eliminarPaciente } = usePacientes();

    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

    const formatearFecha = (fecha) => {
        let nuevaFecha;
        if (fecha.includes("T00:00:00.000Z")) {
            nuevaFecha = new Date(fecha.split("T")[0].split("-"));
        } else {
            nuevaFecha = new Date(fecha);
        }
        const opciones = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return nuevaFecha.toLocaleDateString("es-ES", opciones);
    };

    return (
        <div className="flex justify-between mx-5 my-10 bg-white shadow-md px-5 py-5 rounded-xl">
            <div>
                <p className="font-bold uppercase text-indigo-800 my-2">
                    Nombre:{" "}
                    <span className="font-normal normal-case text-black">
                        {nombre}
                    </span>
                </p>
                <p className="font-bold uppercase text-indigo-800 my-2">
                    Propietario:{" "}
                    <span className="font-normal normal-case text-black">
                        {propietario}
                    </span>
                </p>
                <p className="font-bold uppercase text-indigo-800 my-2">
                    Email:{" "}
                    <span className="font-normal normal-case text-black">
                        {email}
                    </span>
                </p>
                <p className="font-bold uppercase text-indigo-800 my-2">
                    Fecha Alta:{" "}
                    <span className="font-normal normal-case text-black">
                        {formatearFecha(fecha)}
                    </span>
                </p>
                <p className="font-bold uppercase text-indigo-800 my-2">
                    Sintomas:{" "}
                    <span className="font-normal normal-case text-black">
                        {sintomas}
                    </span>
                </p>
            </div>

            <div className="flex flex-col items-center justify-evenly">
                <button
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg hover:scale-105 duration-75"
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>
                <button className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg hover:scale-105 duration-75" onClick={() => eliminarPaciente(_id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Paciente;
