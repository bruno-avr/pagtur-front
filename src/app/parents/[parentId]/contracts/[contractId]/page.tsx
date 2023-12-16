"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import ParentAPI from "@/services/API/UserAPI";
import ContractDetails from "./contract-details"
import ContractAPI from "@/services/API/ContractAPI";
import Breadcrumb from "@/components/breadcrumb";
import PaymentAPI, { AddPayment } from "@/services/API/PaymentAPI";

export async function getContract(token: string, contractId: string) {
  const requester = new RequesterClass(token);
  const api = new ContractAPI(requester);
  const response = await api.getContract(contractId);
  return response;
}

export async function deactivateContract(token: string, contractId: string) {
  const requester = new RequesterClass(token);
  const api = new ContractAPI(requester);
  const response = await api.deactivateContract(contractId);
  return response;
}

export async function addPayment(token: string, contractId: string, payment: AddPayment) {
  const requester = new RequesterClass(token);
  const api = new PaymentAPI(requester);
  const response = await api.addPayment(contractId, payment);
  return response;
}

export default async function ContractPage() {
  return (
    <Breadcrumb>
      <div className="container mt-5">
        <div className="row">
          <ContractDetails />
        </div>
      </div>
    </Breadcrumb>
  )
}
