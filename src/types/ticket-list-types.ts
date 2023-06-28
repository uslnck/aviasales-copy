export interface ISegment {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
}

export interface ITicket {
  price: number;
  carrier: string;
  segments: ISegment[];
}
