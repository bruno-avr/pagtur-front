"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import AddForm from "./add-form";
import RouteAPI, { AddRoute } from "@/services/API/RouteAPI";
import Breadcrumb from "@/components/breadcrumb";

export async function addRoute(token: string, route: AddRoute, schoolIds: string[]) {
  const requester = new RequesterClass(token);
  const api = new RouteAPI(requester);
  const response = await api.addRoute(route, schoolIds);
  return response;
}

export default async function AddRoute() {
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
