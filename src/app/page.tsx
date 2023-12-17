'use client'

import Link from "next/link";
import { useGlobalContext } from "../context/store";
import Image from "next/image";
import { faDollarSign, faFileContract, faRoute, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const { user } = useGlobalContext();
  const services = {
    driver: [
      { name: '/schools', icon: faSchool, title: 'Escolas' },
      { name: '/routes', icon: faRoute, title: 'Rotas' },
      { name: '/parents', icon: faUsers, title: 'Responáveis' },
      { name: '/finances', icon: faDollarSign, title: 'Financeiro' }
    ],
    parent: [
      { name: '/contracts', icon: faFileContract, title: 'Contratos' },
    ]
  }

  const currServices = user?.type === 'DRIVER' ? services.driver : services.parent;

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1>{user?.type === 'DRIVER' ? 'Motorista' : 'Responsável'}</h1>
        <hr />
        <Image
          src="/dark_logo.png"
          width={500}
          height={142}
          alt="Picture of the author"
        />
        <hr />
      </div>
      <div className="row g-4 justify-content-center">
        {currServices.map((service, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow">
              <div className="card-body text-center">
                <h5 className="card-title mb-3">
                  <FontAwesomeIcon
                    icon={service.icon}
                  />
                  &nbsp;&nbsp;
                  {service.title}
                </h5>
                <Link href={service.name} className="btn btn-primary">
                  Ir para serviço
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
