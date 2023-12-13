'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/store";
import { getContracts, getParent } from "./page";
import Link from "next/link";
import { User } from "@/services/API/UserAPI";
import { Contract } from "@/services/API/ContractAPI";

export default function Content({ parentId }: { parentId: string }) {
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
    <div>
      <p>{parent.name}</p>
      <p>{contracts.length}</p>
    </div>
  )
  
}
