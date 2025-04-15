import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
    const { guardarPassword } = useAuth();

    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(password).every((value) => value === "")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: "El nuevo password debe tener al menos 6 caracteres",
                error: true,
            });
            return;
        }

        const respuesta = await guardarPassword(password);

        setAlerta(respuesta);

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    };

    const { msg } = alerta;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">
                Cambiar Password
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu{" "}
                <span className="text-indigo-600 font-bold">Password Aqui</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Password Actual
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_actual"
                                placeholder="Escribe tu Password Actual"
                                onChange={(event) =>
                                    setPassword({
                                        ...password,
                                        [event.target.name]: event.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Nuevo Password
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_nuevo"
                                placeholder="Escribe tu Nuevo Password"
                                onChange={(event) =>
                                    setPassword({
                                        ...password,
                                        [event.target.name]: event.target.value,
                                    })
                                }
                            />
                        </div>

                        <input
                            type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;
