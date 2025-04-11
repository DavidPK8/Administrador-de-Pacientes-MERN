import { useContext } from 'react';
import PacientesProvider from '../context/PacientesProvider';

const usePacientes = () => {
    return useContext(PacientesProvider);
}

export default usePacientes;