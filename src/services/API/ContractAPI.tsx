import { RequesterClass } from "../Requester/Requester";

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
  }
