import Transfers from "./components/transfers";
import TicketList from "./components/ticket-list";

function Aviasales() {
  return (
    <>
      <header>
        <div className="header-logo-container">
          <img src="background.svg" className="background"></img>
          <img src="plane.svg" className="plane"></img>
        </div>
      </header>
      <main>
        <div className="main-container">
          <Transfers />
          <TicketList />
        </div>
      </main>
    </>
  );
}

export default Aviasales;
