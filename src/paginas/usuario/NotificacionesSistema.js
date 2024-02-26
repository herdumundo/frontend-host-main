import React from 'react';
import Layout from '../../componentes/plantillas/ContenedorPrincipal';
import NotificacionesSistema from '../../funcionalidades/usuario/NotificacionesSistema';

/**
 * Componente notifificaciones del sistema
 * @return {JSX.Element}
 */
export default function Main() {
  return (
    <Layout titulo={'Notificaciones del sistema.'}>
      <NotificacionesSistema></NotificacionesSistema>
    </Layout>
  );
}
