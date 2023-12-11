'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getSchools } from "./page";
import { School } from "@/services/API/SchoolAPI";

export default function SchoolCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [schools, setSchools] = useState([] as School[]);

  const getData = async () => {
    const data = await getSchools(user.accessToken);
    setSchools(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="col-sm-4 mb-3 mb-sm-0">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Adicionar escola</h5>
            <p className="card-text">Clique aqui para adicionar uma nova escola.</p>
            <a href="/schools/add" className="btn btn-primary">Adicionar</a>
          </div>
        </div>
      </div>
      {schools.map(school => (
        <div className="col-sm-4 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{school.name}</h5>
              <p className="card-text">{school.phone}</p>
            </div>
          </div>
        </div>
        ))}
    </>
  )
  
}
