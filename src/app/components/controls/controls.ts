import { Component } from '@angular/core';
import { RoomService } from '../../services/room';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.html',
  styleUrls: ['./controls.css'],
  standalone: true
})
export class ControlsComponent {

  constructor(private roomService: RoomService) {}

  reset() {
    this.roomService.resetRooms();
  }

  randomize() {
    this.roomService.resetRooms();
    const rooms = this.roomService.getRooms();
    rooms.forEach(r => {
      if (Math.random() < 0.3) { // ~30% random occupancy
        r.occupied = true;
      }
    });
  }
}
