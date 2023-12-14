"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import Content from "./content"
import ParentAPI from "@/services/API/UserAPI";
import ContractAPI from "@/services/API/ContractAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function getParent(token: string, userId: string) {
  const requester = new RequesterClass(token);
  const api = new ParentAPI(requester);
  const response = await api.getUser(userId);
  return response;
}

export async function getContracts(token: string) {
  const requester = new RequesterClass(token);
  const api = new ContractAPI(requester);
  const response = await api.getContracts();
  return response;
}

export default async function Parent() {
  return (
    <Content />
  )
}
