import { RequesterClass } from "../Requester/Requester";
import { Address } from "./DefaultAPI";
import { School } from "./SchoolAPI";

export type AddRoute = {
  departureTime: string,
  returnTime: string
}

export type Route = {
  departureTime: string,
  returnTime: string,
  schools: School[]
}

export default class RouteAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async getRoutes() {
      const response = await this.requester.get(`/route`);
      if (response.status === 200) return response.data.routes as Route[];
      throw new Error(response.data.errors);
    }
  
    async addRoute(route: AddRoute, schoolIds:  string[]) {
      const response = await this.requester.post('/route', {
        ...route,
        schools: {
          connect: schoolIds.map(id => ({ id }))
        }
      });
      if (response.status === 201) return response.data;
      throw new Error(response.data.errors);
    }
  }
