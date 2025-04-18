import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: "Coloca tu Nuevo Password",
                    error: false,
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: `Hubo un error con el enlace: ${error.response.data.msg}`,
                    error: true,
                });
            }
        };

        if (token) comprobarToken();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ([password, repetirPassword].includes("")) {
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

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            setAlerta({
                msg: data.msg,
                error: false,
            });
            setPasswordModificado(true);
        } catch (error) {
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
                    Reestablece tu passsword y no Pierdas Acceso a tus{" "}
                    <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}

                {tokenValido && !passwordModificado && (
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Nuevo Password
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
                            value="Reestablecer Password"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                    </form>
                )}

                {passwordModificado && (
                    <Link
                        className="block text-center my-5 text-gray-500 text-3xl font-bold"
                        to="/"
                    >
                        Iniciar Sesion
                    </Link>
                )}
            </div>
        </>
    );
};

export default NuevoPassword;
