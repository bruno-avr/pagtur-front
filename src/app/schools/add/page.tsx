"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import AddForm from "./add-form";
import SchoolAPI, { AddSchool } from "@/services/API/SchoolAPI";
import { Address } from "@/services/API/UserAPI";

export async function addSchool(token: string, school: AddSchool, address: Address) {
  const requester = new RequesterClass(token);
  const api = new SchoolAPI(requester);
  const response = await api.addSchool(school, address);
  return response;
}

export default async function AddSchool() {
  return (
    <div className="container-xxl bg-white pt-4 pb-4">
      <div className="container-fluid h-custom h-100 align-items">
        <div className="d-flex justify-content-center">
            <AddForm />
        </div>
      </div>
    </div>
  )
}
