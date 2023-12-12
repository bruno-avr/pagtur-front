"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import ParentCards from "./parent-cards";
import ParentAPI from "@/services/API/UserAPI";

export async function getParents(token: string) {
  const requester = new RequesterClass(token);
  const api = new ParentAPI(requester);
  const response = await api.getParents();
  console.log(response)
  return response;
}

export default async function Parents() {
  return (
    <div className="container mt-5">
      <div className="row">
        <ParentCards />
      </div>
    </div>
  )
}
