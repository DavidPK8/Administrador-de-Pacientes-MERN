import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha.split("T")[0]);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar el formulario
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }

        setAlerta({
            msg: "Paciente agregado correctamente",
            error: false,
        });

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

        // Reiniciar el formulario
        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setSintomas("");
        setId(null);
    };

    const { msg } = alerta;

    return (
        <>
            <h2 className="font-black text-3xl text-center">
                Administrador de Pacientes
            </h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y{" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            {msg && <Alerta alerta={alerta} />}

            <form
                className="bg-white shadow-md rounded-md py-10 px-5 mb-10 lg:mb-0"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-700 font-bold"
                    >
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(event) => setPropietario(event.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 font-bold">
                        Email Propietario
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(event) => setFecha(event.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 font-bold"
                    >
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los Sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={(event) => setSintomas(event.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={id ? "Guardar Cambios" : "Agregar Paciente"}
                />
            </form>
        </>
    );
};

export default Formulario;
