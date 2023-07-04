import { ISegment } from ".";

export interface ITicketProps {
  carrier: string;
  price: number;
  flightForth: ISegment;
  flightBack: ISegment;
}
