"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faDoorOpen, faFileContract, faHome, faPlus, faRoute, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Title() {
  const pathname = usePathname();
  if (pathname === '/login') return null;

  const { user, signout } = useGlobalContext();

  const pathsDict = {
    '/schools': 'Escolas',
    '/routes': 'Rotas',
    '/parents': 'Responsáveis',
    '/contracts': 'Contratos',
    '/finances': 'Financeiro',
    '/add': 'Adicionar'
  } as {[key: string]: string}

  const paths = {
    driver: [
      { name: '/schools', icon: faSchool },
      { name: '/routes', icon: faRoute },
      { name: '/parents', icon: faUsers },
      { name: '/contracts', icon: faFileContract },
      { name: '/finances', icon: faDollarSign }
    ],
    parent: [

    ]
  }

  const hasAddButton = new Set(['/schools', '/routes', '/parents', '/contracts']);

  const currPaths = user ? paths.driver : paths.parent;

  const pathnames = pathname.slice(1).split('/');
  const lastPathname = pathnames.pop();
  
  return (
    <div>
      <div className="container pt-3 pb-2">
        <div className="row">
          <div className="col-8">
            <h5>
              <Link href="/" className="text-dark">
                <FontAwesomeIcon
                  icon={faHome}
                />
              </Link>
              {' /'}
              {pathnames.map((path, index) => (
                <>
                {' '}
                <Link
                  href={`/${pathnames.slice(0, index+1).join('/')}`}
                  className="text-dark"
                  style={{textDecoration: 'none'}}
                >
                  {pathsDict[`/${path}`]}
                </Link>
                {' /'}
                </>
              ))}
            </h5>
            <h1>{pathsDict[`/${lastPathname}`]}</h1>
          </div>
          {hasAddButton.has(pathname) && (
            <div className="col-4 d-flex justify-content-end align-items-center">
              <Link className="btn btn-success" href={`${pathname}/add`}>
                <FontAwesomeIcon
                  icon={faPlus}
                />
                {' Adicionar'}
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  )
}