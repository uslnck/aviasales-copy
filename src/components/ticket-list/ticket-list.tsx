import Ticket from "../ticket";
import NoTicketsFound from "../no-tickets-found";
import "./ticket-list.scss";
import { useSelector } from "react-redux";
import {
  RootState,
  useGetSearchIdQuery,
  useGetTicketsQuery,
} from "../../store";
import { Spin } from "antd";
import { useEffect, useMemo } from "react";
import { ITicket } from "../../types";

function TicketList() {
  const { displayCount } = useSelector((state: RootState) => state.tickets);

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

  const newTickets = useMemo(() => {
    const filterAndSort = (tickets: ITicket[]) => {
      let mutableTickets = [...tickets];

      const transferCount = zeroTransfersChecked
        ? 0
        : oneTransferChecked
        ? 1
        : twoTransfersChecked
        ? 2
        : 3;

      if (!allTransfersChecked)
        mutableTickets = mutableTickets.filter(
          (t) =>
            t.segments[0].stops.length === transferCount ||
            t.segments[1].stops.length === transferCount
        );

      switch (selectedFilter) {
        case "cheapest":
          return mutableTickets.sort((a, b) => a.price - b.price);
        case "fastest":
          return mutableTickets.sort(
            (a, b) =>
              a.segments[0].duration +
              a.segments[1].duration -
              (b.segments[0].duration + b.segments[1].duration)
          );
        default:
          return mutableTickets;
      }
    };

    return filterAndSort(tickets);
  }, [
    tickets,
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    allTransfersChecked,
    selectedFilter,
  ]);

  useEffect(() => {
    console.log(ticketsObject);
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
        newTickets
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
