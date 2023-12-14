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
    // try {
    //   const newUser = {
    //     name: formData.get("name") as string,
    //     username: formData.get("username") as string,
    //     password: formData.get("password") as string,
    //   }

    //   const newAddress = {
    //     street: formData.get("street") as string,
    //     number: formData.get("number") as string,
    //     complement: formData.get("complement") as string,
    //     neighborhood: formData.get("neighborhood") as string,
    //     city: formData.get("city") as string,
    //     state: formData.get("state") as string,
    //     postalCode: formData.get("postalCode") as string
    //   }

    //   await addUser(user?.accessToken || '', newUser, newAddress);
    // } catch (error: any) {
    //   toast.error(error.message);
    //   return;
    // }
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
            <label className="form-label" htmlFor="username">Nome de usuário:</label>
            <input id="username" name="username" className="form-control" />
          </div>
  
          <div className="col-md-6">
            <label className="form-label" htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" className="form-control" />
          </div>
          
          <div className="col-md-10">
            <label className="form-label" htmlFor="street">Rua:</label>
            <input id="street" name="street" className="form-control" />
          </div>
  
          <div className="col-md-2">
            <label className="form-label" htmlFor="number">Número:</label>
            <input id="number" name="number" className="form-control" />
          </div>
          
          <div className="col-md-6">
            <label className="form-label" htmlFor="complement">Complemento:</label>
            <input id="complement" name="complement" className="form-control" />
          </div>
  
          <div className="col-md-6">
            <label className="form-label" htmlFor="neighborhood">Bairro:</label>
            <input id="neighborhood" name="neighborhood" className="form-control" />
          </div>
          
          <div className="col-md-5">
            <label className="form-label" htmlFor="postalCode">CEP:</label>
            <input id="postalCode" name="postalCode" className="form-control" />
          </div>
  
          <div className="col-md-5">
            <label className="form-label" htmlFor="city">Cidade:</label>
            <input id="city" name="city" className="form-control" />
          </div>
  
          <div className="col-md-2">
            <label className="form-label" htmlFor="state">Estado:</label>
            <input id="state" name="state" className="form-control" />
          </div>
  
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block mb-4">Registrar</button>
          </div>
          </>
        )}
      </div>
    </form>
  )
}