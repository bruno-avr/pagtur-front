'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getSchools } from "./page";
import { School } from "@/services/API/SchoolAPI";
import { Address } from "@/services/API/UserAPI";
import Loading from "@/components/loading";

export default function SchoolCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [schools, setSchools] = useState([] as School[]);  const [loading, setLoading] = useState(true);


  const getData = async () => {
    const data = await getSchools(user.accessToken);
    setSchools(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />

  const formatAddress = (address: Address) => {
    let formattedAddress = `${address.street}, ${address.number}, `
    if (address.complement) formattedAddress += `${address.complement}, `
    formattedAddress += `${address.neighborhood}, ${address.postalCode}, ${address.city} - ${address.state}`
    return formattedAddress
  }

  return schools.map(school => (
    <div className="col-sm-4 mb-3">
      <div className="card mb-3">
        <div className="card-header text-center">
          <h4 className="card-title mt-2">{school.name}</h4>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Telefone:</strong> {school.phone}</p>
          <p className="card-text"><strong>Endereço:</strong> {formatAddress(school.address)}</p>
        </div>
      </div>
    </div>
  ))  
}
