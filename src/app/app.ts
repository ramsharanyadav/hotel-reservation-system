import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoomService } from './services/room';
import { Room } from './models/room';
import { RoomGridComponent } from './components/room-grid/room-grid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomGridComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'Hotel Reservation System';
  rooms: Room[] = [];
  numRooms: number = 1;
  lastBookingMsg: string = '';

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }

  bookRooms() {
    if (this.numRooms < 1 || this.numRooms > 5) {
      alert('You can only book between 1 and 5 rooms.');
      return;
    }

    const success = this.roomService.bookRooms(this.numRooms);
    if (!success) {
      this.lastBookingMsg = 'Not enough rooms available.';
    } else {
      const info = this.roomService.getLastBooking();
      this.lastBookingMsg =
        `Booked Rooms: ${info?.rooms.join(', ')} | Travel Time: ${info?.travelTime} min`;
    }
  }

  reset() {
    this.roomService.resetRooms();
    this.lastBookingMsg = '';
  }

  randomize() {
    this.roomService.resetRooms();
    const rooms = this.roomService.getRooms();
    rooms.forEach(r => {
      if (Math.random() < 0.3) {
        r.occupied = true;
      }
    });
    this.lastBookingMsg = 'Random occupancy applied.';
  }

  // === Status counts ===
  getAvailableRoomsCount(): number {
    return this.rooms.filter(r => !r.occupied).length;
  }

  getBookedRoomsCount(): number {
    return this.rooms.filter(r => r.occupied).length;
  }
}
