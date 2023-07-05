import "./main.scss";
import Transfers from "../transfers";
import Tickets from "../tickets";

function Main() {
  return (
    <main>
      <div className="main-container">
        <Transfers />
        <Tickets />
      </div>
    </main>
  );
}

export default Main;
