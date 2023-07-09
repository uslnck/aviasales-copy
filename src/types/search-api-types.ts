import { ITicket } from ".";

export interface IResponse {
  tickets: ITicket[];
  stop: boolean;
}

export interface IQueryArgs {
  searchId: string;
}
