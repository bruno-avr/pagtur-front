"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import ContractCards from "./contract-cards"
import ParentAPI from "@/services/API/UserAPI";
import ContractAPI from "@/services/API/ContractAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function getParent(token: string, userId: string) {
  const requester = new RequesterClass(token);
  const api = new ParentAPI(requester);
  const response = await api.getUser(userId);
  return response;
}

export async function getContractsByParent(token: string, parentId: string) {
  const requester = new RequesterClass(token);
  const api = new ContractAPI(requester);
  const response = await api.getContractsByParent(parentId);
  return response;
}

export default async function Parent() {
  return (
    <Breadcrumb hasAddButton>
      <div className="container mt-5">
        <div className="row">
          <ContractCards />
        </div>
      </div>
    </Breadcrumb>
  )
}
