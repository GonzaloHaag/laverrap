import express from "express";
import { supabase } from '../db/supabase.js';
const AuthRouter = express.Router();


AuthRouter.post('/register',async(req,res) => {
    const { email, password } = req.body;
    if(email.trim() === '' || password.trim() === '') {
        return res.status(400).json({message:'Faltan campos'})
    }
    try {
        const { error } = await supabase.auth.signUp({
            email: email,
            password:password
        });
        if(error) {
            return res.status(400).json({message:'Error al registrarse'})
        }
        return res.status(200).json({message:'Usuario registrado exitosamente.'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Error en el servidor al crear un usuario'})
    }
});

AuthRouter.post('/login',async(req,res) => {
    const { email, password } = req.body;
    if(email.trim() === '' || password.trim() === '') {
        return res.status(400).json({message:'Faltan campos'})
    }
    try {
        const { data,error } = await supabase.auth.signInWithPassword({
            email: email,
            password
        });
        if(error) {
            return res.status(400).json({message:error.message})
        }
        return res.status(200).json({
            user: data.user,
            session: data.session,
            access_token: data.session.access_token // devuelvo el token al front
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Error en el servidor al loguearse'})
    }
})

export default AuthRouter;
