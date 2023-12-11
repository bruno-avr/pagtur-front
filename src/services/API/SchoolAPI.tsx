import { RequesterClass } from "../Requester/Requester";
import { Address } from "./DefaultAPI";

export type AddSchool = {
  name: string,
  phone: string
}

export type School = {
  name: string,
  phone: string,
  address: Address,
  id: string
}

export default class SchoolAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async getSchools() {
      const response = await this.requester.get(`/school`);
      if (response.status === 200) return response.data.schools as School[];
      throw new Error(response.data.errors);
    }
  
    async addSchool(school: AddSchool, address: Address) {
      const response = await this.requester.post('/school', {
        ...school,
        address: {
          create: address
        }
      });
      if (response.status === 201) return response.data;
      throw new Error(response.data.errors);
    }
  }
