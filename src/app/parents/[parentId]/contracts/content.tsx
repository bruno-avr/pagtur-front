'use client'

import { useEffect, useState } from "react";
import { getContracts, getParent } from "./page";
import Link from "next/link";
import { User } from "@/services/API/UserAPI";
import { Contract } from "@/services/API/ContractAPI";
import { useGlobalContext } from "@/context/store";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";

export default function Content() {
  const { parentId } = useParams() as { parentId: string };
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [parent, setParent] = useState({} as User);
  const [contracts, setContracts] = useState([] as Contract[]);

  const getData = async () => {
    const dataParent = await getParent(user.accessToken, parentId);
    setParent(dataParent);
    const dataContracts = await getContracts(user.accessToken);
    setContracts(dataContracts);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Breadcrumb hasAddButton>
    {/* <Breadcrumb hasAddButton defaultPathnames={['Responsáveis', parent.name, 'Contratos']}> */}
      <div className="container mt-5">
        <div className="row">
          <div>
            <p>{parent.name}</p>
            <p>{contracts.length}</p>
          </div>
        </div>
      </div>
    </Breadcrumb>
  )
  
}
