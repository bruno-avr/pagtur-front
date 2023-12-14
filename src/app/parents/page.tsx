"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import ParentCards from "./parent-cards";
import ParentAPI from "@/services/API/UserAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function getParents(token: string) {
  const requester = new RequesterClass(token);
  const api = new ParentAPI(requester);
  const response = await api.getParents();
  return response;
}

export default async function Parents() {
  return (
    <Breadcrumb hasAddButton>
      <div className="container mt-5">
        <div className="row">
          <ParentCards />
        </div>
      </div>
    </Breadcrumb>
  )
}
