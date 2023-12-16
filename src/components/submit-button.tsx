"use client"
import LoginForm from "@/components/login-form";
import DefaultAPI from "@/services/API/DefaultAPI";
import Requester from "@/services/Requester/Requester";
import { redirect } from "next/navigation";
import { toast } from 'react-hot-toast';
// import {useEffect} from "react"

export default function SubmitButton({error}) {
  return (
    <button type="submit" className="btn btn-primary btn-block mb-4">{error}</button>
  )
}
