import { Link } from "react-router-dom";

const AdminNav = () => {
    return (
        <nav className="flex gap-10">
            <Link
                to="/admin/perfil"
                className="font-bold uppercase text-gray-500 hover:scale-125 duration-75"
            >Perfil</Link>

            <Link
                to="/admin/cambiar-password"
                className="font-bold uppercase text-gray-500 hover:scale-125 duration-75"
            >Cambiar Password</Link>
        </nav>
    );
};

export default AdminNav;
