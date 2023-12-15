"use client"

import { redirect } from "next/navigation";
import { addUser } from "./page";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/store";

export default function AddForm() {
  const { user } = useGlobalContext();

  async function submit (formData: FormData) {
    try {
      const newUser = {
        name: formData.get("name") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      }

      const newAddress = {
        street: formData.get("street") as string,
        number: formData.get("number") as string,
        complement: formData.get("complement") as string,
        neighborhood: formData.get("neighborhood") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postalCode: formData.get("postalCode") as string
      }

      await addUser(user?.accessToken || '', newUser, newAddress);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    redirect(`/parents`);
  }

  return (
    <form action={submit}>
      <div className="container row g-4 mt-2">
        <div className="col-md-12">
          <label className="form-label" htmlFor="name">Nome:</label>
          <input id="name" name="name" className="form-control" required />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="username">Nome de usuário:</label>
          <input id="username" name="username" className="form-control" required />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" className="form-control" required />
        </div>
        
        <div className="col-md-10">
          <label className="form-label" htmlFor="street">Rua:</label>
          <input id="street" name="street" className="form-control" required />
        </div>

        <div className="col-md-2">
          <label className="form-label" htmlFor="number">Número:</label>
          <input id="number" name="number" className="form-control" required />
        </div>
        
        <div className="col-md-6">
          <label className="form-label" htmlFor="complement">Complemento:</label>
          <input id="complement" name="complement" className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="neighborhood">Bairro:</label>
          <input id="neighborhood" name="neighborhood" className="form-control" required />
        </div>
        
        <div className="col-md-5">
          <label className="form-label" htmlFor="postalCode">CEP:</label>
          <input id="postalCode" name="postalCode" className="form-control" required />
        </div>

        <div className="col-md-5">
          <label className="form-label" htmlFor="city">Cidade:</label>
          <input id="city" name="city" className="form-control" required />
        </div>

        <div className="col-md-2">
          <label className="form-label" htmlFor="state">Estado:</label>
          <input id="state" name="state" className="form-control" required />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success btn-block mb-4 mt-3">Adicionar responsável</button>
        </div>
      </div>
    </form>
  )
}