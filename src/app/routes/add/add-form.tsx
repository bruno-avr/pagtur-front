"use client"

import { redirect } from "next/navigation";
import { addRoute } from "./page";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/store";
import { useEffect, useState } from "react";
import { getSchools } from "@/app/schools/page";
import { School } from "@/services/API/SchoolAPI";
import Loading from "@/components/loading";

export default function AddForm() {
  const { user } = useGlobalContext();

  const [schools, setSchools] = useState([] as School[]);
  const [departureTime, setDepartureTime] = useState('08:00');
  const [returnTime, setReturnTime] = useState('08:00');
  const [selectedSchools, setSelectedSchools] = useState([] as string[]);
  const [loading, setLoading] = useState(true);

  async function submit () {
    try {
      if (!selectedSchools.length) throw new Error("Selecione pelo menos uma escola")
      const route = {
        departureTime,
        returnTime
      }
      await addRoute(user?.accessToken || '', route, selectedSchools);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    redirect(`/routes`);
  }

  const getData = async () => {
    const data = await getSchools(user?.accessToken || '');
    setSchools(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (e: any) => {
    setSelectedSchools(curr => {
      if (e.target.checked) {
        return [...curr, e.target.id]
      }
      return curr.filter(id => id !== e.target.id);
    })
  }

  function generateTimes() {
    let horarios = [];
    for (let horas = 0; horas < 24; horas++) {
      for (let minutos = 0; minutos < 60; minutos += 30) {
        let horaFormatada = horas.toString().padStart(2, '0');
        let minutosFormatados = minutos.toString().padStart(2, '0');
        horarios.push(`${horaFormatada}:${minutosFormatados}`);
      }
    }
    return horarios;
  }

  const timeComponent = (name: string, thisTime: string, times: string[], setTime: (time: string) => void) => (
    <div className="col-6">
      <label htmlFor="departureTime">{`${name}:`}&nbsp;&nbsp;</label>
      <div className="btn-group ml-5">
        <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {thisTime}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {times.map(time => (<li><button type="button" className="dropdown-item" onClick={() => {setTime(time)}}>{time}</button></li>))}
        </ul>
      </div>
    </div>
  )
  
  const times = generateTimes();

  return (
    <form action={submit}>
      <div className="container row g-4 mt-2">
        {timeComponent('Horário da ida', departureTime, times, (t) => {setDepartureTime(t); setReturnTime(t)})}
        {timeComponent('Horário da volta', returnTime, times.filter(t => t >= departureTime), setReturnTime)}
        <div className="col-12">
          <label className="form-label">Escolas selecionadas:</label>
          {loading ? <Loading /> : (
          <ul className="list-group">
            {schools.map(school => (
              <li className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" id={school.id} onClick={handleClick} />
                <label className="form-check-label stretched-link" htmlFor={school.id}>{school.name}</label>
              </li>
            ))}
          </ul>
          )}
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success btn-block mb-4 mt-3">Adicionar rota</button>
        </div>
      </div>
    </form>
  )
}