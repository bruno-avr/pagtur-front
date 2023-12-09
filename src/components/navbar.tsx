"use client"

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/signin') return null;

  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      redirect('/login');
    };
  }, [])
  
  if (!user) return null;

  const exit = () => {
    setUser(null);
    localStorage.clear();
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/logo.png" alt="Bootstrap" height="24" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">{'kkk'+pathname+'kkk'}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">{user.name + "dd"}</a>
            </li>
          </ul>
          <span className="navbar-text">
              <Link className="nav-link" href="/login" onClick={exit}>Sair</Link>
          </span>
        </div>
      </div>
    </nav>
  )
}