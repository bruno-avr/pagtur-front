"use client"

import { redirect } from "next/navigation";
import { addSchool } from "./page";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/store";

export default function AddForm() {
  const { user } = useGlobalContext();

  async function submit (formData: FormData) {
    try {
      const school = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string
      }
      const address = {
        street: formData.get("street") as string,
        number: formData.get("number") as string,
        complement: formData.get("complement") as string,
        neighborhood: formData.get("neighborhood") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postalCode: formData.get("postalCode") as string
      }
      await addSchool(user?.accessToken || '', school, address);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    redirect(`/schools`);
  }

  return (
    <form action={submit}>
      <div className="container row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label" htmlFor="name">Nome da escola:</label>
          <input id="name" name="name" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="phone">Telefone:</label>
          <input id="phone" name="phone" className="form-control" />
        </div>
        <div className="col-md-10">
          <label className="form-label" htmlFor="street">Rua:</label>
          <input id="street" name="street" className="form-control" />
        </div>

        <div className="col-md-2">
          <label className="form-label" htmlFor="number">Número:</label>
          <input id="number" name="number" className="form-control" />
        </div>
        
        <div className="col-md-6">
          <label className="form-label" htmlFor="complement">Complemento:</label>
          <input id="complement" name="complement" className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="neighborhood">Bairro:</label>
          <input id="neighborhood" name="neighborhood" className="form-control" />
        </div>
        
        <div className="col-md-5">
          <label className="form-label" htmlFor="postalCode">CEP:</label>
          <input id="postalCode" name="postalCode" className="form-control" />
        </div>

        <div className="col-md-5">
          <label className="form-label" htmlFor="city">Cidade:</label>
          <input id="city" name="city" className="form-control" />
        </div>

        <div className="col-md-2">
          <label className="form-label" htmlFor="state">Estado:</label>
          <input id="state" name="state" className="form-control" />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-block mb-4">Adicionar</button>
        </div>
      </div>
    </form>
  )
}