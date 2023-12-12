'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getRoutes } from "./page";
import { Route } from "@/services/API/RouteAPI";

export default function RouteCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [routes, setRoutes] = useState([] as Route[]);

  const getData = async () => {
    const data = await getRoutes(user.accessToken);
    setRoutes(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return routes.map(route => (
    <div className="col-sm-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{route.departureTime} - {route.returnTime}</h5>
          <p className="card-text">{route.schools.map(s => s.name).join(', ')}</p>
        </div>
      </div>
    </div>
  ))
}
