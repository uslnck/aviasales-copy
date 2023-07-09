import Ticket from "../ticket";
import NoTicketsFound from "../no-tickets-found";
import "./ticket-list.scss";
import { useDispatch, useSelector } from "react-redux";
import store, {
  RootState,
  useGetSearchIdQuery,
  useGetTicketsQuery,
} from "../../store";
import { Spin } from "antd";
import { useEffect, useMemo } from "react";
import { ITicket } from "../../types";
import { applyFilters } from "../../store/filters-slice";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

function TicketList() {
  const { displayCount } = useSelector((state: RootState) => state.tickets);
  const dispatch = useAppDispatch();

  const {
    allTransfersChecked,
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    threeTransfersChecked,
  } = useSelector((state: RootState) => state.checkboxes);

  const { selectedFilter } = useSelector((state: RootState) => state.filters);

  const { data: searchIdObject = { searchId: "" } } = useGetSearchIdQuery();
  const { searchId } = searchIdObject;

  const {
    data: ticketsObject = { tickets: [], stop: false },
    isLoading,
    refetch,
  } = useGetTicketsQuery(searchId);
  const { tickets, stop } = ticketsObject;

  useEffect(() => {
    dispatch(applyFilters(tickets));
  }, [
    dispatch,
    tickets,
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    allTransfersChecked,
    selectedFilter,
  ]);

  const { filteredTickets } = useSelector((store: RootState) => store.filters);

  useEffect(() => {
    if (!stop) refetch();
  }, [refetch, stop, ticketsObject]);

  if (isLoading) return <Spin size="large" />;

  return (
    <ul className="ticket-list">
      {!zeroTransfersChecked &&
      !oneTransferChecked &&
      !twoTransfersChecked &&
      !threeTransfersChecked ? (
        <NoTicketsFound />
      ) : (
        filteredTickets
          .slice(0, displayCount)
          .map((ticket, i) => (
            <Ticket
              key={i}
              flightForth={ticket.segments[0]}
              flightBack={ticket.segments[1]}
              price={ticket.price}
              carrier={ticket.carrier}
            />
          ))
      )}
    </ul>
  );
}

export default TicketList;
