import "./tickets.scss";
import Filters from "../filters";
import ShowMoreButton from "../show-more-button";
import TicketList from "../ticket-list";

function Tickets() {
  return (
    <div className="tickets-container">
      <Filters />
      <TicketList />
      <ShowMoreButton />
    </div>
  );
}

export default Tickets;
