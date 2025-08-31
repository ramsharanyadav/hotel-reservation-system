export interface Room {
  id: number;           // room number like 101, 202, 1007
  floor: number;        // floor number
  occupied: boolean;    // whether booked or not
  bookedBy?: string;    // optional guest reference (future use)
}
