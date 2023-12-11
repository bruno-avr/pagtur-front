"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import AddForm from "./add-form";
import RouteAPI, { AddRoute } from "@/services/API/RouteAPI";

export async function addRoute(token: string, route: AddRoute, schoolIds: string[]) {
  const requester = new RequesterClass(token);
  const api = new RouteAPI(requester);
  const response = await api.addRoute(route, schoolIds);
  return response;
}

export default async function AddRoute() {
  return (
    <div className="container-xxl">
      <section className="vh-100">
        <div className="container-fluid h-custom h-100 align-items">
          <h1 className="text-center mt-4">Adicionar uma rota</h1>
          <div className="d-flex justify-content-center">
            <AddForm />
          </div>
        </div>
      </section>
    </div>
  )
}
