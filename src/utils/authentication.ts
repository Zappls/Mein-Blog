import supabase from "./database.js";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ ok: false, message: "Email and/or password missing" });
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    res.status(401).json({ ok: false, message: "Authentication error" });
  }
  return res.status(200).json({ ok: true, data });
};

export const logout = async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    res.status(401).json({ ok: false, message: "Logout failed" });
  }
  return res.status(200).json({ ok: true });
};
