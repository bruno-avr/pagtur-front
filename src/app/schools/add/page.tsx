"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import AddForm from "./add-form";
import SchoolAPI, { AddSchool } from "@/services/API/SchoolAPI";
import { Address } from "@/services/API/DefaultAPI";

export async function addSchool(token: string, school: AddSchool, address: Address) {
  const requester = new RequesterClass(token);
  const api = new SchoolAPI(requester);
  const response = await api.addSchool(school, address);
  return response;
}

export default async function AddSchool() {
  return (
    <div className="container-xxl">
      <section className="vh-100">
        <div className="container-fluid h-custom h-100 align-items">
          <h1 className="text-center mt-4">Adicionar uma escola</h1>
          <div className="d-flex justify-content-center">
            <AddForm />
          </div>
        </div>
      </section>
    </div>
  )
}
