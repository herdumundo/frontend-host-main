import { useStore } from 'HostApp/Autenticacion';

import { shallow } from 'zustand/shallow';
import { EstadosSesion } from '../../funcionalidades/usuario/constantes/EstadosSesion';

/**
 * Hook que sobreescribe useNavigate para usar una ruta base local
 * @return {function}
 */
export default function useLogeado() {
  const estadoSesion = useStore((state) => state.datos.estadoSesion, shallow);

  console.log('Logeado');
  return estadoSesion === EstadosSesion.LOGEADO;
}
