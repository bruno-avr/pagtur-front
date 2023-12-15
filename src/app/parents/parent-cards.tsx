'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getParents } from "./page";
import Link from "next/link";
import { Address, User } from "@/services/API/UserAPI";
import Loading from "@/components/loading";

export default function SchoolCards() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [parents, setParents] = useState([] as User[]);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    const data = await getParents(user.accessToken);
    setParents(data);
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

  return parents.map(parent => (
    <div className="col-sm-4 mb-3">
      <div className="card mb-3">
        <div className="card-header text-center">
          <h4 className="card-title mt-2">{parent.name}</h4>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Nome de usuário:</strong> {parent.username}</p>
          <p className="card-text"><strong>Endereço:</strong> {formatAddress(parent.address)}</p>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <Link
            href={`/parents/${parent.id}/contracts`}
            className="btn btn-dark"
            style={{ textDecoration: 'none' }}
          >
            Acessar contratos
          </Link>
        </div>
      </div>
    </div>
  ))  
}
