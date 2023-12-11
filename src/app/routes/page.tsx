"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import RouteCards from "./route-cards";
import RouteAPI from "@/services/API/RouteAPI";

export async function getRoutes(token: string) {
  const requester = new RequesterClass(token);
  const api = new RouteAPI(requester);
  const response = await api.getRoutes();
  return response;
}

export default async function Routes() {
  return (
    <div className="container mt-5">
      <div className="row">
        <RouteCards />
      </div>
    </div>
  )
}
