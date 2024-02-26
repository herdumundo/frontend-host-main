import useSelectorLocal from './useSelectorLocal';
import { useNavigate } from 'react-router-dom';

/**
 * Hook que sobreescribe useNavigate para usar una ruta base local
 * @return {function}
 */
export default function useNavigateLocal() {
  const navigate = useNavigate();
  const rutaBase = useSelectorLocal((state) => state.app.rutaBase);

  return (ruta) => {
    console.log(rutaBase);
    navigate(`${rutaBase}/${ruta}`.replaceAll('//', '/'));
  };
}
