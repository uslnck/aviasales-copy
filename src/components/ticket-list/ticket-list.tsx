import Filters from "../filters";
import ShowMoreButton from "../show-more-button";
import Ticket from "../ticket";
import "./ticket-list.scss";
import { useEffect } from "react";
import { fetchSearchId, fetchTickets } from "../../store/tickets-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Spin } from "antd";
import { ITicket } from "../../types";

function TicketList() {
  const { searchId, tickets, fetchTicketsStatus, displayCount } = useSelector(
    (state: RootState) => state.tickets
  );

  const {
    allTransfersChecked: allTransfers,
    zeroTransfersChecked: zeroTransfers,
    oneTransferChecked: oneTransfer,
    twoTransfersChecked: twoTransfers,
    threeTransfersChecked: threeTransfers,
  } = useSelector((state: RootState) => state.checkboxes);

  const { selectedFilter: order } = useSelector(
    (state: RootState) => state.filters
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(fetchSearchId() as any);
  }, [dispatch]);

  useEffect(() => {
    if (searchId.length !== 0) {
      for (let i = 0; i < 21; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(fetchTickets() as any);
      }
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (fetchTicketsStatus === "rejected") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchTickets() as any);
    }
  }, [dispatch, fetchTicketsStatus]);

  const loadingStatus = (): JSX.Element | undefined => {
    if (tickets.length === 0) return <Spin size="large" />;
  };

  const filterTickets = (): ITicket[] => {
    const mutableTickets = Array.from(tickets);
    if (allTransfers) {
      return mutableTickets;
    }

    if (zeroTransfers || oneTransfer || twoTransfers || threeTransfers) {
      const transferCount = zeroTransfers
        ? 0
        : oneTransfer
        ? 1
        : twoTransfers
        ? 2
        : 3;

      return mutableTickets.filter(
        (t) =>
          t.segments[0].stops.length === transferCount ||
          t.segments[1].stops.length === transferCount
      );
    }
    return mutableTickets;
  };

  const organizeTickets = (filteredTickets: () => ITicket[]): ITicket[] => {
    const ticketsToOrganize = Array.from(filteredTickets());

    switch (order) {
      case "cheapest":
        return ticketsToOrganize.sort((a, b) => a.price - b.price);
      case "fastest":
        return ticketsToOrganize.sort(
          (a, b) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration)
        );
      default:
        return ticketsToOrganize;
    }
  };

  const noTicketsFound = (): JSX.Element | undefined => {
    if (!zeroTransfers && !oneTransfer && !twoTransfers && !threeTransfers)
      return <div className="not-found">ПОДХОДЯЩИХ РЕЙСОВ НЕ НАЙДЕНО</div>;
  };

  return (
    <div className="ticket-container">
      <Filters />
      <ul className="ticket-list">
        {loadingStatus() ||
          noTicketsFound() ||
          organizeTickets(filterTickets)
            .slice(0, displayCount)
            .map((ticket, i) => <Ticket key={i} {...ticket} />)}
      </ul>
      <ShowMoreButton />
    </div>
  );
}

export default TicketList;
