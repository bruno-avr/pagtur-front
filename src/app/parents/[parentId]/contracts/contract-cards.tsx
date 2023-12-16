'use client'

import { useEffect, useState } from "react";
import { getContractsByParent, getParent } from "./page";
import Link from "next/link";
import { User } from "@/services/API/UserAPI";
import { Contract } from "@/services/API/ContractAPI";
import { useGlobalContext } from "@/context/store";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

export default function ContractCards({ isParent } : { isParent?: boolean }) {
  const { parentId: parentIdAux } = useParams() as { parentId: string };
  const { user } = useGlobalContext();
  if ((isParent && user?.type !== 'PARENT') || (!isParent && user?.type !== 'DRIVER') || !user) return <h1 className="text-center">Acesso negado!</h1>
  
  const parentId = isParent ? user.id : parentIdAux

  const [parent, setParent] = useState({} as User);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([] as Contract[]);

  const getData = async () => {
    const dataParent = await getParent(user.accessToken, parentId);
    setParent(dataParent);
    const dataContracts = await getContractsByParent(user.accessToken, parentId);
    setContracts(dataContracts);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />

  if (!contracts.length) {
    return <h3 className="text-center mt-4">Nenhum contrato encontrado.</h3>
  }

  return contracts.map(contract => (
    <div className="col-sm-4 mb-3">
      <div className="card mb-3">
        <div className="card-header text-center">
          <h4 className="card-title mt-2">{contract.student}</h4>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Responsável:</strong> {parent.name}</p>
          <p className="card-text"><strong>Escola:</strong> {contract.school.name}</p>
          <p className="card-text">
            <strong>Horários:</strong> {`${contract.route.departureTime} - ${contract.route.returnTime}`}
          </p>
          <p className="card-text">
            <strong>Status: <label className={contract.active ? 'text-success' : 'text-danger'}>{contract.active ? 'Ativo' : 'Inativo'}</label></strong>
          </p>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <Link
            href={isParent ? `/contracts/${contract.id}` : `/parents/${parent.id}/contracts/${contract.id}`}
            className="btn btn-dark"
            style={{ textDecoration: 'none' }}
          >
            Acessar detalhes
          </Link>
        </div>
      </div>
    </div>
  ))
  
}
