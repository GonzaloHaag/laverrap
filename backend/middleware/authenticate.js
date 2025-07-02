import { supabase } from '../db/supabase.js';

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token faltante' });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ message: 'Formato del token inválido' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    // Agregar el usuario al objeto request para uso posterior
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Error al validar el token' });
  }
} 