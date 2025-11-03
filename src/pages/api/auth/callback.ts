import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  // Supabase maneja la sesión automáticamente en el cliente
  // Solo redirigimos al dashboard
  return redirect('/dashboard');
};
