import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private rooms: Room[] = [];

  constructor() {
    this.generateRooms();
  }

  /** Generate all 97 rooms across 10 floors */
  private generateRooms(): void {
    // Floors 1-9 → 10 rooms each
    for (let floor = 1; floor <= 9; floor++) {
      for (let i = 1; i <= 10; i++) {
        const roomNumber = floor * 100 + i;
        this.rooms.push({
          id: roomNumber,
          floor: floor,
          occupied: false,
        });
      }
    }

    // Floor 10 → only 7 rooms (1001–1007)
    for (let i = 1; i <= 7; i++) {
      this.rooms.push({
        id: 1000 + i,
        floor: 10,
        occupied: false,
      });
    }
  }

  /** Get all rooms */
  getRooms(): Room[] {
    return this.rooms;
  }

  /** Reset all bookings */
  resetRooms(): void {
    this.rooms.forEach((r) => (r.occupied = false));
  }

  /** Calculate travel time across multiple rooms */
  private totalTravelTime(rooms: Room[]): number {
    if (rooms.length < 2) return 0;

    // Sort by floor + room
    const sorted = [...rooms].sort((a, b) => a.id - b.id);

    let total = 0;
    for (let i = 0; i < sorted.length - 1; i++) {
      const r1 = sorted[i];
      const r2 = sorted[i + 1];

      if (r1.floor === r2.floor) {
        // horizontal move → difference in room number suffix
        total += Math.abs((r1.id % 100) - (r2.id % 100));
      } else {
        // vertical move + horizontal difference
        total += Math.abs(r1.floor - r2.floor) * 2;
        total += Math.abs((r1.id % 100) - (r2.id % 100));
      }
    }
    return total;
  }

  /** Optimized booking */

  lastBooking: { rooms: number[]; travelTime: number } | null = null;

  /** Optimized booking ensuring correct count */
  bookRooms(count: number): boolean {
    const available = this.rooms.filter((r) => !r.occupied);

    if (available.length < count) return false;

    let bestCombo: Room[] | null = null;
    let bestTime = Number.MAX_SAFE_INTEGER;

    // === 1) Try same floor ===
    for (let floor = 1; floor <= 10; floor++) {
      const sameFloor = available.filter((r) => r.floor === floor);
      if (sameFloor.length >= count) {
        // pick *any* combination of count rooms from that floor
        const combos = this.getCombinations(sameFloor, count);
        for (const combo of combos) {
          const time = this.totalTravelTime(combo);
          if (time < bestTime) {
            bestCombo = combo;
            bestTime = time;
          }
        }
      }
    }

    // === 2) Across floors ===
    if (!bestCombo) {
      const combos = this.getCombinations(available, count);
      for (const combo of combos) {
        const time = this.totalTravelTime(combo);
        if (time < bestTime) {
          bestCombo = combo;
          bestTime = time;
        }
      }
    }

    if (bestCombo) {
      bestCombo.forEach((r) => (r.occupied = true));
      this.lastBooking = {
        rooms: bestCombo.map((r) => r.id),
        travelTime: bestTime,
      };
      return true;
    }

    return false;
  }

  /** Generate all combinations of k rooms from given set */
  private getCombinations(arr: Room[], k: number): Room[][] {
    const result: Room[][] = [];
    const helper = (start: number, path: Room[]) => {
      if (path.length === k) {
        result.push([...path]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        path.push(arr[i]);
        helper(i + 1, path);
        path.pop();
      }
    };
    helper(0, []);
    return result;
  }

  getLastBooking() {
    return this.lastBooking;
  }
}
