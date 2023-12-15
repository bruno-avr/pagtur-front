"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Breadcrumb({ hasAddButton, defaultPathnames, children } : { hasAddButton?: boolean, defaultPathnames?: string[], children: any }) {
  const pathname = usePathname();
  if (pathname === '/login') return null;

  const pathsDict = {
    '/schools': 'Escolas',
    '/routes': 'Rotas',
    '/parents': 'Responsáveis',
    '/contracts': 'Contratos',
    '/finances': 'Financeiro',
    '/add': 'Adicionar'
  } as {[key: string]: string}

  // const hasAddButton = new Set(['/schools', '/routes', '/parents', '/contracts']);

  const pathnamesStr = pathname.slice(1).split('/');
  const pathnames = pathname.slice(1).split('/').map((path, index) => ({ name: path, index })).filter(path => !!defaultPathnames?.length || pathsDict[`/${path.name}`]);
  const lastPathname = pathnames.pop();

  if (!lastPathname) return null;
  
  return (
    <div>
      <div className="bg-light">
        <div className="container pt-3 pb-2">
          <div className="row">
            <div className="col-8">
              <p>
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
                      {defaultPathnames?.length ? defaultPathnames[path.index] : pathsDict[`/${path.name}`]}
                    </Link>
                    {' /'}
                    </>
                  ))
                }
                <h1>
                  <Link
                    href={`/${pathnamesStr.slice(0, lastPathname.index+1).join('/')}`}
                    className="text-dark"
                    style={{textDecoration: 'none'}}
                  >
                    {defaultPathnames?.length ? defaultPathnames[defaultPathnames.length-1] : pathsDict[`/${lastPathname.name}`]}
                  </Link>
                </h1>
              </p>
            </div>
            {!!hasAddButton && (
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
      {children}
    </div>
  )
}