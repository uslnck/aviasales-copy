import Ticket from "../ticket";
import NoTicketsFound from "../no-tickets-found";
import "./ticket-list.scss";
import { useSelector } from "react-redux";
import {
  RootState,
  useGetSearchIdQuery,
  useGetTicketsQuery,
  useAppDispatch,
} from "../../store";
import { Spin } from "antd";
import { useEffect } from "react";
import { applyFilters } from "../../store/filters-slice";

function TicketList() {
  const dispatch = useAppDispatch();

  const { displayCount } = useSelector((state: RootState) => state.tickets);

  const {
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
    threeTransfersChecked,
    selectedFilter,
  ]);

  useEffect(() => {
    console.log(ticketsObject);
    if (!stop) refetch();
  }, [refetch, stop, ticketsObject]);

  const { filteredTickets } = useSelector((store: RootState) => store.filters);

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
