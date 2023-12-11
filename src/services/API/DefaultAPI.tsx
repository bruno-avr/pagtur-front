import { RequesterClass } from "../Requester/Requester";

export type SigninUser = {
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

export default class DefaultAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async login(data: {username: string, password: string}) {
      const response = await this.requester.post('/user/login', data);
      if (response.status === 201) return response.data;
      throw new Error(response.data.errors);
    }
  
    async signin(user: SigninUser, address: Address) {
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
