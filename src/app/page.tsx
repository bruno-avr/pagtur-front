'use client'

import { useGlobalContext } from "../context/store";

export default function Home() {
  const { user } = useGlobalContext();
  if (user?.type === 'DRIVER') {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cadastrar escolas</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="/schools" className="btn btn-primary">Ir para serviço</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Ir para serviço</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
