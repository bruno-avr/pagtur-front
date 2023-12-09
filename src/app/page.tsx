"use server"

import DefaultAPI from "@/services/API/DefaultAPI";
import Requester from "@/services/Requester/Requester";
import LoginForm from "./components/login-form";
import Navbar from "./components/navbar";
// import {useEffect} from "react"

export async function login(username: string, password: string) {
  const api = new DefaultAPI(Requester);
  const response = await api.login({ username, password });
  return response;
}

export default async function Home() {
  // useEffect(() => {}, [])
  // console.log(toast)
  // const poss = await prisma.user.findUnique();
  let error;

  return (
    <Navbar />
  )
}
