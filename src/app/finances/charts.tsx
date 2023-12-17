'use client'

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import { getContractData } from "./page";
import Loading from "@/components/loading";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

export default function Charts() {
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [referingMonthData, setReferingMonthData] = useState({
    REFERING_MONTH: [],
    DATE: []
  });
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('REFERING_MONTH' as 'REFERING_MONTH' | 'DATE');

  const getData = async () => {
    function formatData(data: any) {
      return data.map((item: any) => ({
        "name": item.month as string,
        "receita": item.totalValue as number
      }))
    }
    const data = await getContractData(user.accessToken);
    setReferingMonthData({
      REFERING_MONTH: formatData(data.referingMonth),
      DATE: formatData(data.date),
    })
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />

  const formatMoney = (value: number) => (
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value as number)
  )

  return (
    <div className="row justify-content-center">
      <h2 className="text-center mb-3">Receita por mês</h2>
      <BarChart width={1000} height={250} data={referingMonthData[type]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width={100} tickFormatter={formatMoney} />
        <Tooltip formatter={formatMoney} />
        <Legend />
        <Bar dataKey="receita" fill="#198754" />
      </BarChart>
      <div className="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={type === 'REFERING_MONTH'} onClick={() => {
          setType('REFERING_MONTH');
        }} />
        <label className="btn btn-outline-success" htmlFor="btnradio1">Por mês de referência</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={type === 'DATE'} onClick={() => {
          setType('DATE');
        }} />
        <label className="btn btn-outline-success" htmlFor="btnradio2">Por data de recebimento</label>
      </div>
    </div>
  );

}
