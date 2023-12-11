"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import SchoolCards from "./school-cards";
import SchoolAPI from "@/services/API/SchoolAPI";

export async function getSchools(token: string) {
  const requester = new RequesterClass(token);
  const api = new SchoolAPI(requester);
  const response = await api.getSchools();
  return response;
}

export default async function Schools() {
  return (
    <div className="container mt-5">
      <div className="row">
        <SchoolCards />
      </div>
    </div>
  )
}
