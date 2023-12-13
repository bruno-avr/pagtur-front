import { RequesterClass } from "../Requester/Requester";

export type AddUser = {
  name: string,
  username: string,
  password: string
}

export type Address = {
  street: string,
  number: string,
  complement: string,
  neighborhood: string,
  city: string,
  state: string,
  postalCode: string
}

export type User = {
  name: string,
  username: string,
  id: string,
  address: Address
}

export default class UserAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async getUser(userId: string) {
      const response = await this.requester.get(`/user/${userId}`);
      if (response.status === 200) return response.data;
      throw new Error(response.data.errors);
    }
  
    async getParents() {
      const response = await this.requester.get(`/user/parents`);
      if (response.status === 200) return response.data.parents;
      throw new Error(response.data.errors);
    }

    async addUser(user: AddUser, address: Address) {
      const response = await this.requester.post('/user', {
        ...user,
        address: {
          create: address
        }
      });
      if (response.status === 201) return response.data;
      throw new Error(response.data.errors);
    }
  }
