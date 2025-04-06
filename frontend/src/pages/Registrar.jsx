import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({ msg: "Existen campos vacios", error: true });
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: "Los password no son iguales", error: true });
            return;
        }

        if (password.length < 6) {
            setAlerta({ msg: "El password es muy corto", error: true });
            return;
        }

        setAlerta({});

        // Crear el usuario en la api
        try {
            await clienteAxios.post("/veterinarios", {
                nombre,
                email,
                password,
            });

            // Mostrar alerta de exito
            setAlerta({
                msg: "Usuario Creado Correctamente, revisa tu email",
                error: false,
            });

            // Limpiar el formulario
            setNombre("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");
        } catch (error) {
            // Mostrar alerta en caso de que el usuario ya existe
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu cuenta y Administra tus{" "}
                    <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={(event) =>
                                setRepetirPassword(event.target.value)
                            }
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/"
                    >
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/olvide-password"
                    >
                        Olvide mi Password
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Registrar;
