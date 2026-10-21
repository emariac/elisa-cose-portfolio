/// <reference types="vite/client" />
export const sitePath = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");
export const routePath = () => "/" + window.location.pathname.slice(import.meta.env.BASE_URL.length);
