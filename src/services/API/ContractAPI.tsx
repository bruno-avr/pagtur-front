import { RequesterClass } from "../Requester/Requester";
import { User } from "./UserAPI";
import { School } from "./SchoolAPI";
import { Route } from "./RouteAPI";

export type AddContract = {
  student: string
  monthlyPayment: number
  startDate: Date | string
  parentId: string
  routeId: string
  schoolId: string
}

export type Contract = {
  id: string
  student: string
  monthlyPayment: number
  startDate: Date
  active: boolean

  parent: User
  route: Route
  school: School
  
  payments: Payment[]
}

export type Payment = {
  id: string,
  date: Date,
  value: number,
  method: 'PIX' | 'CREDIT_CARD' | 'CASH',
  referringMonth: string
}

export default class ContractAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async getContract(contractId: string) {
      const response = await this.requester.get(`/contract/${contractId}`);
      if (response.status === 200) return response.data;
      throw new Error(response.data.errors);
    }
  
    async getContractsByParent(parentId: string) {
      const response = await this.requester.get(`/contract/parent/${parentId}`);
      if (response.status === 200) return response.data.contracts;
      throw new Error(response.data.errors);
    }
  
    async deactivateContract(contractId: string) {
      const response = await this.requester.post(`/contract/deactivate/${contractId}`, {});
      if (response.status !== 201) throw new Error(response.data.errors);
    }

    async addContract(contractData: AddContract) {
      const contract = {
        student: contractData.student,
        monthlyPayment: contractData.monthlyPayment,
        startDate: contractData.startDate,
        active: true,
        parent: { connect: { id: contractData.parentId } },
        route: { connect: { id: contractData.routeId } },
        school: { connect: { id: contractData.schoolId } }
      }
      const response = await this.requester.post('/contract', contract);
      if (response.status === 201) return response.data;
      throw new Error(response.data.errors);
    }
  }
