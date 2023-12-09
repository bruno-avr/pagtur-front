import { RequesterClass } from "../Requester/Requester";

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
  }
