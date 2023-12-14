"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import AddForm from "./add-form";
import ContractAPI, { AddContract } from "@/services/API/ContractAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function addContract(token: string, contract: AddContract) {
  const requester = new RequesterClass(token);
  const api = new ContractAPI(requester);
  const response = await api.addContract(contract);
  return response;
}

export default async function AddContract() {
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
