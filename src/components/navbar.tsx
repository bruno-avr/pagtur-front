"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faDoorOpen, faRoute, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "./breadcrumb";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === '/login') return null;

  const { user, signout } = useGlobalContext();

  const pathsDict = {
    '/schools': 'Escolas',
    '/routes': 'Rotas',
    '/parents': 'Responsáveis',
    '/finances': 'Financeiro'
  } as {[key: string]: string}

  const paths = {
    driver: [
      { name: '/schools', icon: faSchool },
      { name: '/routes', icon: faRoute },
      { name: '/parents', icon: faUsers },
      { name: '/finances', icon: faDollarSign }
    ],
    parent: [

    ]
  }

  const currPaths = user ? paths.driver : paths.parent;
  
  return (
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
  )
}