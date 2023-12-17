"use server"

import { RequesterClass } from "@/services/Requester/Requester";
import Breadcrumb from "@/components/breadcrumb";
import Charts from "./charts";
import PaymentAPI from "@/services/API/PaymentAPI";

export async function getContractData(token: string) {
  const requester = new RequesterClass(token);
  const api = new PaymentAPI(requester);
  const response = await api.getData();
  return response;
}

export default async function Finances() {
  return (
    <Breadcrumb>
      <div className="container mt-5">
        <div className="row">
          <Charts />
        </div>
      </div>
    </Breadcrumb>
  )
}
