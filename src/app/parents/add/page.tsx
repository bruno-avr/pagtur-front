"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import AddForm from "./add-form";
import UserAPI, { AddUser, Address } from "@/services/API/UserAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function addUser(token: string, user: AddUser, address: Address) {
  const requester = new RequesterClass(token);
  const api = new UserAPI(requester);
  const response = await api.addUser(user, address);
  return response;
}

export default async function AddUser() {
  return (
    <Breadcrumb>
      <div className="container-xxl bg-white pt-4 pb-4">
        <div className="container-fluid h-custom h-100 align-items">
          <div className="d-flex justify-content-center">
              <AddForm />
          </div>
        </div>
      </div>
    </Breadcrumb>
  )
}
