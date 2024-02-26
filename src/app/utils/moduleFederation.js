/* eslint-disable camelcase */

/**
 * Función que carga el componente de module federation
 * @param {*} url
 * @param {*} scope
 * @return {Promise} Promesa con la funcion de deinicialización
 */
export function loadScope(url, scope) {
  const element = document.createElement('script');
  const promise = new Promise((resolve, reject) => {
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;
    element.crossorigin = 'anonymous';
    element.onload = () => resolve(window[scope]);
    element.onerror = reject;
  });
  document.head.appendChild(element);
  return promise.finally(() => document.head.removeChild(element));
}

/**
 * Carga un módulo
 * @param {string} url La url en la que está cargada el módulo
 * @param {string} scope
 * @param {string} module El módulo que se desea cargar
 * @return {*} El módulo solicitado
 */
export async function loadModule(url, scope, module) {
  try {
    const container = await loadScope(url, scope);
    await __webpack_init_sharing__('default');
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  } catch (error) {
    console.error('Error loading module:', error);
    throw error;
  }
}
