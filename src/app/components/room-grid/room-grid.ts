import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ import this
import { Room } from '../../models/room';
import { RoomService } from '../../services/room';

@Component({
  selector: 'app-room-grid',
  standalone: true,              // ✅ standalone
  imports: [CommonModule],       // ✅ must import CommonModule
  templateUrl: './room-grid.html',
  styleUrls: ['./room-grid.css']
})
export class RoomGridComponent implements OnChanges {
  @Input() rooms: Room[] = [];
  floors: { floor: number, rooms: Room[] }[] = [];
  lastBookedRooms: number[] = [];

  constructor(private roomService: RoomService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rooms'] && this.rooms.length > 0) {
      this.groupRoomsByFloor();
      const last = this.roomService.getLastBooking();
      this.lastBookedRooms = last ? last.rooms : [];
    }
  }

  private groupRoomsByFloor(): void {
    const grouped: { [key: number]: Room[] } = {};
    this.rooms.forEach(room => {
      if (!grouped[room.floor]) {
        grouped[room.floor] = [];
      }
      grouped[room.floor].push(room);
    });

    this.floors = Object.keys(grouped)
      .map(floor => ({ floor: +floor, rooms: grouped[+floor] }))
      .sort((a, b) => a.floor - b.floor);
  }

  isLastBooked(roomId: number): boolean {
    return this.lastBookedRooms.includes(roomId);
  }
}
