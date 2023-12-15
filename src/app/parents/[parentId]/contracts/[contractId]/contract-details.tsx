'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Address, User } from "@/services/API/UserAPI";
import { Contract } from "@/services/API/ContractAPI";
import { useGlobalContext } from "@/context/store";
import { useParams } from "next/navigation";
import { getParent } from "../page";
import { deactivateContract, getContract } from "./page";
import Loading from "@/components/loading";

export default function ContractDetails() {
  const { contractId } = useParams() as { parentId: string, contractId: string };
  const { user } = useGlobalContext();
  if (user?.type !== 'DRIVER') return <h1 className="text-center">Acesso negado!</h1>

  const [contract, setContract] = useState(null as Contract | null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const dataContract = await getContract(user.accessToken, contractId) as Contract;
    setContract(dataContract);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

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
    await deactivateContract(user.accessToken, contract.id);
    setContract(curr => ({...curr, active: false} as Contract))
  }

  const getModal = () => (
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

  return (
    <div className="container">
      {getModal()}
      <h2 className="mb-5">Detalhes do contrato</h2>
      
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
            <strong>Start Date:</strong> {new Date(contract.startDate).toLocaleDateString('pt-BR')}
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
            <strong>Name:</strong> {contract.parent.name}
          </p>
          <p className="card-text">
            <strong>Username:</strong> {contract.parent.username}
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
                </tr>
              </thead>
              <tbody>
                {contract.payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.referringMonth}</td>
                    <td>{formatCurrency(payment.value)}</td>
                    <td>{paytmentMethodDict[payment.method]}</td>
                    <td>{new Date(payment.date).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>Sem pagamentos realizados.</p>}
        </div>
      </div>
      
      {!!contract.active && (
        <div className="d-flex justify-content-center mt-5">
          <div className="d-grid col-6">
            <button type="button" className="btn btn-danger btn-block mb-4" data-bs-toggle="modal" data-bs-target="#confirmDeactivation">Desativar contrato</button>
          </div>
        </div>
      )}
    </div>
  )
}