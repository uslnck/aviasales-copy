import Filters from "../filters";
import ShowMoreButton from "../show-more-button";
import Ticket from "../ticket";
import NoTicketsFound from "../no-tickets-found";
import "./ticket-list.scss";
import { useEffect } from "react";
import { fetchSearchId, fetchTickets } from "../../store/tickets-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Spin } from "antd";
import { filterTickets, organizeTickets } from "../../store/tickets-slice";
// import { filterTickets, organizeTickets } from "@store/actions";

function TicketList() {
  const {
    searchId,
    processedTickets,
    tickets,
    fetchTicketsStatus,
    displayCount,
    searchCompleted,
  } = useSelector((state: RootState) => state.tickets);

  const {
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    threeTransfersChecked,
  } = useSelector((state: RootState) => state.checkboxes);

  const { selectedFilter } = useSelector((state: RootState) => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(fetchSearchId() as any);
  }, [dispatch]);

  useEffect(() => {
    if (searchId.length !== 0 && !searchCompleted) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchTickets() as any);
    }
  }, [dispatch, searchId, searchCompleted, tickets]);

  useEffect(() => {
    if (fetchTicketsStatus === "rejected") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(fetchTickets() as any);
    }
  }, [dispatch, fetchTicketsStatus]);

  useEffect(() => {
    dispatch(
      organizeTickets({
        selectedFilter,
      })
    );

    dispatch(
      filterTickets({
        zeroTransfersChecked,
        oneTransferChecked,
        twoTransfersChecked,
        threeTransfersChecked,
      })
    );
  }, [
    dispatch,
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    threeTransfersChecked,
    selectedFilter,
  ]);

  return (
    <div className="ticket-container">
      <Filters />
      <ul className="ticket-list">
        {processedTickets.length === 0 ? (
          <Spin size="large" />
        ) : !zeroTransfersChecked &&
          !oneTransferChecked &&
          !twoTransfersChecked &&
          !threeTransfersChecked ? (
          <NoTicketsFound />
        ) : (
          processedTickets
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
      <ShowMoreButton />
    </div>
  );
}

export default TicketList;
