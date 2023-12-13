'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getContracts } from "./page";
import { School } from "@/services/API/SchoolAPI";

export default function SchoolCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [contracts, setContracts] = useState([] as School[]);

  const getData = async () => {
    const data = await getContracts(user.accessToken);
    setContracts(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return contracts.map(contract => (
    <div className="col-sm-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{contract.name}</h5>
          {/* <p className="card-text">{contract.phone}</p> */}
        </div>
      </div>
    </div>
  ))
  
}
