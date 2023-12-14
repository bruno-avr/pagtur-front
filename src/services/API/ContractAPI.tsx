import { RequesterClass } from "../Requester/Requester";

export type AddContract = {
  student: string
  monthlyPayment: number
  startDate: Date | string
  parentId: string
  routeId: string
  schoolId: string
  payment: 'PIX' | 'BOLETO' | 'CREDIT_CARD'
}

export type Contract = {
  id: string
}

export default class ContractAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async getContracts() {
      const response = await this.requester.get(`/contract`);
      if (response.status === 200) return response.data.contracts;
      throw new Error(response.data.errors);
    }

    async addContract(contractData: AddContract) {
      const contract = {
        student: contractData.student,
        monthlyPayment: contractData.monthlyPayment,
        startDate: contractData.startDate,
        active: true,
        parent: { connect: contractData.parentId },
        route: { connect: contractData.routeId },
        school: { connect: contractData.schoolId },
        payment: contractData.payment
      }
      const response = await this.requester.post('/contract', contract);
      if (response.status === 201) return response.data;
      throw new Error(response.data.errors);
    }
  }
