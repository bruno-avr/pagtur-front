"use server"

import DefaultAPI from "@/services/API/DefaultAPI";
import Requester from "@/services/Requester/Requester";
import LoginForm from "./login-form";

export async function login(username: string, password: string) {
  const api = new DefaultAPI(Requester);
  const response = await api.login({ username, password });
  return response;
}

export default async function Login() {
  return (
    <div className="container-xxl bg-white">
      <section className="vh-100">
        <div className="container-fluid h-custom h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="logo.png" className="img-fluid" alt="Logo" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
