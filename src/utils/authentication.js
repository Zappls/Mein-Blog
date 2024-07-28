import supabase from "./database.js";

export const login = async (req, res) => {
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

export const logout = async (req, res) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    res.status(401).json({ ok: false, message: "Logout failed" });
  }
  return res.status(200).json({ ok: true });
};
