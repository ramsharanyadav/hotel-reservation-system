import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoomService } from '../../services/room';

@Component({
  selector: 'app-booking-form',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css']
})
export class BookingFormComponent {
  numRooms: number = 1;
  lastBookingMsg: string = '';

  constructor(private roomService: RoomService) {}

  bookRooms() {
    if (this.numRooms < 1 || this.numRooms > 5) {
      alert('You can only book between 1 and 5 rooms.');
      return;
    }

    const success = this.roomService.bookRooms(this.numRooms);
    if (!success) {
      this.lastBookingMsg = 'Not enough rooms available to fulfill this booking.';
    } else {
      const info = this.roomService.getLastBooking();
      this.lastBookingMsg =
        `Booked Rooms: ${info?.rooms.join(', ')} | Travel Time: ${info?.travelTime} min`;
    }
  }
}
