"use client"

import { redirect } from "next/navigation";
import { login } from "../page";
import toast from "react-hot-toast";

export default async function LoginForm() {
  async function submit (formData: FormData) {
    try {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const user = await login(username, password);
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("username", user.username);
      localStorage.setItem("name", user.name);
      localStorage.setItem("type", user.type);
      localStorage.setItem("id", user.id);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    redirect('/home');
  }

  return (
    <form action={submit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="username">Nome de usuário:</label>
        <input id="username" name="username" className="form-control" />
      </div>

      <div className="form-outline mb-5">
        <label className="form-label" htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" className="form-control" />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary btn-block mb-4">Entrar</button>
      </div>

      <div className="text-center">
        <p>Ainda não tem uma conta? <a href="/register">Registrar</a></p>
      </div>
    </form>
  )
}