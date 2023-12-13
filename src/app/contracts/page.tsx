"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import ContractCards from "./contracts-cards";
import ContractAPI from "@/services/API/ContractAPI";

export async function getContracts(token: string) {
  const requester = new RequesterClass(token);
  const api = new ContractAPI(requester);
  const response = await api.getContracts();
  return response;
}

export default async function Contracts() {
  return (
    <div className="container mt-5">
      <div className="row">
        <ContractCards />
      </div>
    </div>
  )
}
