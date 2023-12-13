"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faDoorOpen, faFileContract, faHome, faPlus, faRoute, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
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

  const pathnamesStr = pathname.slice(1).split('/');
  const pathnames = pathname.slice(1).split('/').map((path, index) => ({ name: path, index })).filter(path => pathsDict[`/${path.name}`]);
  const lastPathname = pathnames.pop();
  
  return (
    <div>
      <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src="/white_logo.png" alt="pagtur" height="24" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {currPaths.map(path => (
                <li className="nav-item">
                  <Link className={`nav-link${pathname.substring(0, path.name.length) === path.name ? ' active' : ''}`} href={path.name}>
                    <FontAwesomeIcon
                      icon={path.icon}
                    />
                    &nbsp;&nbsp; 
                    {pathsDict[path.name]}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="navbar-text">
              <Link className="nav-link" href="/login" onClick={signout}>
                <FontAwesomeIcon
                  icon={faDoorOpen}
                />
                &nbsp;&nbsp; 
                Sair
              </Link>
            </span>
          </div>
        </div>
      </nav>
      {!!lastPathname && (
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
                  {pathnames.map((path) => (
                    <>
                    {' '}
                    <Link
                      href={`/${pathnamesStr.slice(0, path.index+1).join('/')}`}
                      className="text-dark"
                      style={{textDecoration: 'none'}}
                    >
                      {pathsDict[`/${path.name}`]}
                    </Link>
                    {' /'}
                    </>
                  ))}
                </h5>
                <h1>
                  <Link
                    href={`/${pathnamesStr.slice(0, lastPathname.index+1).join('/')}`}
                    className="text-dark"
                    style={{textDecoration: 'none'}}
                  >
                    {pathsDict[`/${lastPathname.name}`]}
                  </Link>
                </h1>
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
      )}
    </div>
  )
}