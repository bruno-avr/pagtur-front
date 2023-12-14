"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import RouteCards from "./route-cards";
import RouteAPI from "@/services/API/RouteAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function getRoutes(token: string) {
  const requester = new RequesterClass(token);
  const api = new RouteAPI(requester);
  const response = await api.getRoutes();
  return response;
}

export async function getRoutesPerSchool(token: string, schoolId: string) {
  const requester = new RequesterClass(token);
  const api = new RouteAPI(requester);
  const response = await api.getRoutesPerSchool(schoolId);
  return response;
}

export default async function Routes() {
  return (
    <Breadcrumb hasAddButton>
      <div className="container mt-5">
        <div className="row">
          <RouteCards />
        </div>
      </div>
    </Breadcrumb>
  )
}
