'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getRoutes } from "./page";
import { Route } from "@/services/API/RouteAPI";
import Loading from "@/components/loading";

export default function RouteCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [routes, setRoutes] = useState([] as Route[]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const data = await getRoutes(user.accessToken);
    setRoutes(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />

  return routes.map(route => (
    <div className="col-sm-4 mb-3">
      <div className="card mb-3">
        <div className="card-header text-center">
          <h4 className="card-title mt-2">{route.departureTime} - {route.returnTime}</h4>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Escolas:</strong> {route.schools.map(s => s.name).join(', ')}</p>
        </div>
      </div>
    </div>
  ))
}
