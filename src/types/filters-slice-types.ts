import { ITicket } from ".";

export interface IFiltersSliceState {
  selectedFilter: string;
  filteredTickets: ITicket[];
}
