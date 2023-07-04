import "./ticket.scss";
import {
  formattedStartEnd,
  formattedDuration,
} from "../../utils/helpers/fns-date";
import { ITicketProps } from "../../types";
import { separatedPrice, separatedStops, suffixedStops } from "./utils";

const Ticket = ({ carrier, price, flightForth, flightBack }: ITicketProps) => {
  const {
    origin: originForth,
    destination: destinationForth,
    stops: stopsForth,
    date: dateForth,
    duration: durationForth,
  } = flightForth;

  const {
    origin: originBack,
    destination: destinationBack,
    stops: stopsBack,
    date: dateBack,
    duration: durationBack,
  } = flightBack;

  const logoUrl = `//pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className="ticket">
      <div className="price-company-container">
        <span className="price">{separatedPrice(price)} Р</span>
        <img className="company" src={logoUrl}></img>
      </div>
      <div className="route-container-first">
        <div className="route-hours">
          <span className="route">
            {originForth} – {destinationForth}
          </span>
          <span className="hours">
            {formattedStartEnd(dateForth, durationForth)}
          </span>
        </div>
        <div className="flight-time">
          <span className="flight">В ПУТИ</span>
          <span className="time">{formattedDuration(durationForth)}</span>
        </div>
        <div className="change-cities">
          <span className="change">{suffixedStops(stopsForth.length)}</span>
          <span className="cities">{separatedStops(stopsForth)}</span>
        </div>
      </div>
      <div className="route-container-second">
        <div className="route-hours">
          <span className="route">
            {originBack} – {destinationBack}
          </span>
          <span className="hours">
            {formattedStartEnd(dateBack, durationBack)}
          </span>
        </div>
        <div className="flight-time">
          <span className="flight">В ПУТИ</span>
          <span className="time">{formattedDuration(durationBack)}</span>
        </div>
        <div className="change-cities">
          <span className="change">{suffixedStops(stopsBack.length)}</span>
          <span className="cities">{separatedStops(stopsBack)}</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
