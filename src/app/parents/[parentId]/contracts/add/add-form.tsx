"use client"

import { redirect, useParams, usePathname } from "next/navigation";
import { addContract } from "./page";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/store";
import { useEffect, useState } from "react";
import { getSchools } from "@/app/schools/page";
import { School } from "@/services/API/SchoolAPI";
import { Route } from "@/services/API/RouteAPI";
import { getRoutesPerSchool } from "@/app/routes/page";
import { getParent } from "../page";
import { User } from "@/services/API/UserAPI";
import { AddContract } from "@/services/API/ContractAPI";

export default function AddForm() {
  const { parentId } = useParams() as { parentId: string };
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>
  const pathname = usePathname();

  const [parent, setParent] = useState({} as User);
  const [schools, setSchools] = useState([] as School[]);
  const [school, setSchool] = useState(null as School | null);
  const [routes, setRoutes] = useState([] as Route[]);
  const [route, setRoute] = useState(null as Route | null);

  async function getData() {
    const dataParent = await getParent(user?.accessToken as string, parentId);
    setParent(dataParent);
    const res = await getSchools(user?.accessToken as string);
    setSchools(res);
  }

  useEffect(() => {
    getData();
  }, []);

  async function selectSchool(s: School) {
    setSchool(s);
    setRoute(null);
    const res = await getRoutesPerSchool(user?.accessToken || '', s.id);
    setRoutes(res);
  }

  async function submit (formData: FormData) {
    try {
      if (!school) throw new Error('Escolha uma escola.');
      if (!route) throw new Error('Escolha um horário.');
      const contract = {
        student: formData.get('student'),
        monthlyPayment: Number(formData.get('monthlyPayment')),
        startDate: new Date(formData.get('startDate') as string),
        parentId,
        routeId: route.id,
        schoolId: school?.id
      } as AddContract

      await addContract(user?.accessToken || '', contract);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    redirect(pathname.substring(0, pathname.length - '/add'.length));
  }

  return (
    <form action={submit}>
      <div className="container row g-4 mt-2">
        <div className="col-12">
          <label>Criando novo contrato para: {parent.name}</label>
        </div>
        <div className="col-6">
          <label>Escola:&nbsp;&nbsp;</label>
          <div className="btn-group ml-5">
            <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {school ? school.name : 'Selecionar escola'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {schools.map(s => (<li><button type="button" className="dropdown-item" onClick={() => selectSchool(s)}>{s.name}</button></li>))}
            </ul>
          </div>
        </div>
        {!!routes?.length && (
          <>
          <div className="col-6">
            <label>Horário:&nbsp;&nbsp;</label>
            <div className="btn-group ml-5">
              <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {route ? `${route.departureTime} - ${route.returnTime}` : 'Selecionar horário'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {routes.map(r => (<li><button type="button" className="dropdown-item" onClick={() => {setRoute(r)}}>{`${r.departureTime} - ${r.returnTime}`}</button></li>))}
              </ul>
            </div>
          </div>
  
          <div className="col-md-6">
            <label className="form-label" htmlFor="student">Nome do aluno:</label>
            <input id="student" name="student" className="form-control" required />
          </div>
  
          <div className="col-md-3">
            <label className="form-label" htmlFor="monthlyPayment">Valor da mensalidade (R$):</label>
            <input type="number" id="monthlyPayment" name="monthlyPayment" className="form-control" required min={0} />
          </div>
  
          <div className="col-md-3">
            <label className="form-label" htmlFor="startDate">Data de início:</label>
            <input type="date" id="startDate" name="startDate" className="form-control" required />
          </div>
  
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block mb-4">Adicionar contrato</button>
          </div>
          </>
        )}
      </div>
    </form>
  )
}