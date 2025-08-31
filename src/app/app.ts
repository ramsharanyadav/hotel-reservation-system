import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from './services/room';
import { Room } from './models/room';
import { RoomGridComponent } from './components/room-grid/room-grid';
import { BookingFormComponent } from './components/booking-form/booking-form';
import { ControlsComponent } from './components/controls/controls';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoomGridComponent, BookingFormComponent, ControlsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'Hotel Reservation System';
  rooms: Room[] = [];   // ✅ define rooms property

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }
}
