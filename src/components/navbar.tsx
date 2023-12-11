"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../context/store";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === '/login') return null;
  if (pathname === '/signin') return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="Bootstrap" height="24" />
        </a>
      </div>
    </nav>
  );

  const { user, signout } = useGlobalContext();

  const paths = {
    driver: [
      {name: 'Escolas', pathname: '/schools'},
      {name: 'Rotas', pathname: '/routes'}
    ],
    parent: [

    ]
  }

  const currPaths = user ? paths.driver : paths.parent;
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="pagtur" height="24" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {currPaths.map(path => (
              <li className="nav-item">
                <a className={`nav-link${pathname.substring(0, path.pathname.length) === path.pathname ? ' active' : ''}`} href={path.pathname}>{path.name}</a>
              </li>
            ))}
          </ul>
          <span className="navbar-text">
              <Link className="nav-link" href="/login" onClick={signout}>Sair</Link>
          </span>
        </div>
      </div>
    </nav>
  )
}