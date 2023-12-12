'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getParents } from "./page";
import { School } from "@/services/API/SchoolAPI";

export default function SchoolCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [parents, setParents] = useState([] as School[]);

  const getData = async () => {
    const data = await getParents(user.accessToken);
    setParents(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return parents.map(parent => (
    <div className="col-sm-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{parent.name}</h5>
          {/* <p className="card-text">{parent.phone}</p> */}
        </div>
      </div>
    </div>
  ))
  
}
