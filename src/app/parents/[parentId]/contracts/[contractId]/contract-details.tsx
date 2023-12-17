'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Address, User } from "@/services/API/UserAPI";
import { Contract } from "@/services/API/ContractAPI";
import { useGlobalContext } from "@/context/store";
import { useParams } from "next/navigation";
import { getParent } from "../page";
import { addPayment, deactivateContract, getContract } from "./page";
import Loading from "@/components/loading";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AddPayment, Payment } from "@/services/API/PaymentAPI";

export default function ContractDetails({ isParent } : { isParent?: boolean }) {
  const { contractId } = useParams() as { parentId: string, contractId: string };
  const { user } = useGlobalContext();
  if ((isParent && user?.type !== 'PARENT') || (!isParent && user?.type !== 'DRIVER') || !user) return <h1 className="text-center">Acesso negado!</h1>

  const paymentMethods = [
    {name: 'PIX', id: 'PIX'},
    {name: 'Cartão de crédito', id: 'CREDIT_CARD'},
    {name: 'Dinheiro físico', id: 'CASH'}
  ]

  const now = new Date();
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const today = now.getFullYear()+"-"+(month)+"-"+(day);

  const timeZoneDate = (date: Date | null) => {
    if (!date) return null;
    const timeZoneOffset = -3 * 60; // Brasília Time is UTC-3
    date.setMinutes(date.getMinutes() - timeZoneOffset);
    return date;
  }

  const [contract, setContract] = useState(null as Contract | null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(timeZoneDate(new Date(today)) as null | Date);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [referringMonth, setReferringMonth] = useState('');
  const [possibleMonths, setPossibleMonths] = useState([] as string[]);

  const getData = async () => {
    const dataContract = await getContract(user.accessToken, contractId) as Contract;
    setContract(dataContract);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (contract) {
      const months = iterateMonths();
      setPossibleMonths(months);
    }
  }, [contract]);

  if (loading) return <Loading />

  const paytmentMethodDict = {
    'PIX': 'PIX',
    'CREDIT_CARD': 'Cartão de crédito',
    'CASH': 'Dinheiro físico'
  }

  function formatCurrency(value: number) {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  
    return formattedValue;
  }

  const formatAddress = (address: Address) => {
    let formattedAddress = `${address.street}, ${address.number}, `
    if (address.complement) formattedAddress += `${address.complement}, `
    formattedAddress += `${address.neighborhood}, ${address.postalCode}, ${address.city} - ${address.state}`
    return formattedAddress
  }

  if (!contract) return null;

  const handleDeactivation = async () => {
    try {
      await deactivateContract(user.accessToken, contract.id);
      setContract(curr => ({...curr, active: false} as Contract))
      toast.success('Contrato desativado');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const getDeactivationModal = () => (
    <div className="modal fade" id="confirmDeactivation" tabIndex={-1} aria-labelledby="confirmDeactivationLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="confirmDeactivationLabel">Confirmar desativação</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Tem certeza que deseja desativar esse contrato?<br />
            Essa ação não poderá ser revertida.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeactivation}>Desativar</button>
          </div>
        </div>
      </div>
    </div>
  )
  
  function compareDates(a: Payment, b: Payment) {
    const dateA = new Date(a.referringMonth.replace(/(\d{2})\/(\d{4})/, "$2-$1"));
    const dateB = new Date(b.referringMonth.replace(/(\d{2})\/(\d{4})/, "$2-$1"));
  
    return dateB.getTime() - dateA.getTime();
  }

  async function handleAddPayment () {
    try {
      if (!user || !contract) throw new Error('Usuário ou contrato não encontrados')
      const newPayment = {
        date,
        method: paymentMethod.id,
        referringMonth,
        value: contract.monthlyPayment,
        confirmant: user.type
      } as AddPayment

      const payment = await addPayment(user.accessToken, contract.id, newPayment);
      setContract(c => {
        const payments = [...(c as Contract).payments]
        payments.push(payment)
        payments.sort(compareDates)
        return ({
          ...c,
          payments
        }) as Contract;
      });
      setReferringMonth('');
      toast.success('Pagamento registrado com sucesso');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function iterateMonths() {
    if (!contract) return []
    const startDate = new Date(contract.startDate)
    const currentDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)) //one year from now
    let currentMonth = startDate.getMonth();
    let currentYear = startDate.getFullYear();
  
    const resultArray = [] as string[];
  
    while (
      currentYear < currentDate.getFullYear() ||
      (currentYear === currentDate.getFullYear() && currentMonth <= currentDate.getMonth())
    ) {
      const monthYearString = `${(currentMonth + 1).toString().padStart(2, '0')}/${currentYear}`;
  
      if (!contract.payments.find(p => p.referringMonth === monthYearString)) {
        resultArray.push(monthYearString);
      }
  
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
    }
  
    return resultArray;
  }

  const getPaymentModal = () => (
    <div className="modal fade" id="recordPayment" tabIndex={-1} aria-labelledby="recordPaymentLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="recordPaymentLabel">Registrar pagamento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action={handleAddPayment}>
            <div className="modal-body">
              <div className="w-100 justify-content-center d-flex">
                <div className="container row g-4 mt-2">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="paymentDate">Data do pagamento:</label>
                    <input type="date" id="paymentDate" name="paymentDate" className="form-control" defaultValue={today} required onChange={(d) => setDate(timeZoneDate(d.target.valueAsDate))} />
                  </div>
          
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="paymentValue">Valor da mensalidade (R$):</label>
                    <input type="number" id="paymentValue" name="paymentValue" className="form-control" value={contract.monthlyPayment} required disabled />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="method">Método de pagamento:</label><br />
                    <div className="btn-group ml-5">
                      <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        {paymentMethod.name}
                      </button>
                      <ul className="dropdown-menu">
                        {paymentMethods.map(m => (<li><button type="button" className="dropdown-item" onClick={() => setPaymentMethod(m)}>{m.name}</button></li>))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="referringMonth">Mês de referência:</label><br />
                    <div className="btn-group ml-5">
                      <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        {referringMonth ? referringMonth : 'Selecionar mês'}
                      </button>
                      <ul className="dropdown-menu">
                        {possibleMonths.map(m => (<li><button type="button" className="dropdown-item" onClick={() => setReferringMonth(m)}>{m}</button></li>))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-success" data-bs-dismiss="modal" disabled={!date || !referringMonth}>Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container">
      {getDeactivationModal()}
      {getPaymentModal()}
      <div className="row">
        <div className="col-6">
          <h2 className="mb-5">Detalhes do contrato</h2>
        </div>
        {!!contract.active && !!possibleMonths.length && (
          <div className="col-6 justify-content-end d-flex">
            <div>
              <button type="button" className="btn btn-success btn-block mb-4" data-bs-toggle="modal" data-bs-target="#recordPayment">
                <FontAwesomeIcon
                  icon={faPlus}
                />
                {' Registrar pagamento'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Informações gerais</h4>
          <p className="card-text">
            <strong>Aluno:</strong> {contract.student}
          </p>
          <p className="card-text">
            <strong>Mensalidade:</strong> {formatCurrency(contract.monthlyPayment)}
          </p>
          <p className="card-text">
            <strong>Início do contrato:</strong> {new Date(contract.startDate).toLocaleDateString('pt-BR')}
          </p>
          <p className="card-text">
            <strong>Status: <label className={contract.active ? 'text-success' : 'text-danger'}>{contract.active ? 'Ativo' : 'Inativo'}</label></strong>
          </p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title mb-4">Informações da escola</h4>
          <p className="card-text">
            <strong>Nome:</strong> {contract.school.name}
          </p>
          <p className="card-text">
            <strong>Telefone:</strong> {contract.school.phone}
          </p>
          <p className="card-text">
            <strong>Endereço:</strong> {formatAddress(contract.school.address)}
          </p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title mb-4">Informações do responsável</h4>
          <p className="card-text">
            <strong>Nome:</strong> {contract.parent.name}
          </p>
          <p className="card-text">
            <strong>Nome de usuário:</strong> {contract.parent.username}
          </p>
          <p className="card-text">
            <strong>Endereço:</strong> {formatAddress(contract.parent.address)}
          </p>
        </div>
      </div>
      
      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title mb-4">Informações da rota</h4>
          <p className="card-text">
            <strong>Horário de ida:</strong> {contract.route.departureTime}
          </p>
          <p className="card-text">
            <strong>Horário de volta:</strong> {contract.route.returnTime}
          </p>
          <p className="card-text">
            <strong>Escolas presentes na rota:</strong> {contract.route.schools.map(s => s.name).join(', ')}.
          </p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h4 className="card-title mb-4">Pagamentos</h4>
          {contract.payments.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Referente ao mês</th>
                  <th>Valor</th>
                  <th>Método</th>
                  <th>Pago em</th>
                  <th>Confirmado por</th>
                </tr>
              </thead>
              <tbody>
                {contract.payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.referringMonth}</td>
                    <td>{formatCurrency(payment.value)}</td>
                    <td>{paytmentMethodDict[payment.method]}</td>
                    <td>{new Date(payment.date).toLocaleDateString('pt-BR')}</td>
                    <td>{payment.confirmant === 'DRIVER' ? 'Motorista' : 'Responsável'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>Sem pagamentos realizados.</p>}
        </div>
      </div>
      
      {!!contract.active && !isParent && (
        <div className="d-flex justify-content-center mt-5">
          <div className="d-grid col-6">
            <button type="button" className="btn btn-danger btn-block mb-4" data-bs-toggle="modal" data-bs-target="#confirmDeactivation">Desativar contrato</button>
          </div>
        </div>
      )}
    </div>
  )
}