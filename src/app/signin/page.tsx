"use server"

import DefaultAPI, { SigninAddress, SigninUser } from "@/services/API/DefaultAPI";
import Requester from "@/services/Requester/Requester";
import SigninForm from "./signin-form";

export async function signin(user: SigninUser, address: SigninAddress) {
  const api = new DefaultAPI(Requester);
  const response = await api.signin(user, address);
  return response;
}

export default async function Signin() {
  return (
    <div className="container-xxl">
      <section className="vh-100">
        <div className="container-fluid h-custom h-100 align-items">
          <h1 className="text-center mt-4">Registro de usuário</h1>
          <div className="d-flex justify-content-center align-items-center h-100">
            <SigninForm />
          </div>
        </div>
      </section>
    </div>
  )
}
