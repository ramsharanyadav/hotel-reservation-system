# Hotel Room Reservation System

## 📌 Problem Statement
A hotel has **97 rooms** across **10 floors**:
- Floors 1–9 → 10 rooms each (e.g., 101–110, 201–210).
- Floor 10 → 7 rooms (1001–1007).
- Booking rules:
  - A guest can book up to 5 rooms.
  - Prefer booking on the same floor.
  - If not possible, minimize travel time (horizontal = 1 min, vertical = 2 min).
- Deliverables:
  - Form to enter number of rooms and book them.
  - Visualization of bookings.
  - Button to generate random occupancy.
  - Button to reset bookings.

---

## 🚀 Tech Stack
- npm 11
- TypeScript
- Node.js

---

## 📂 Project Structure
src/app/
├── components/
│ ├── booking-form/ # input for number of rooms
│ ├── controls/ # reset + random occupancy
│ ├── room-grid/ # hotel floors & rooms visualization
├── models/
│ └── room.ts # Room interface
├── services/
│ └── room.ts # Booking & travel time logic
├── app.ts # root component



---

## ⚙️ Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/ramsharanyadav/hotel-reservation-system.git
   cd hotel-reservation-system
   npm install
   ng serve -o

## github page url ##

```bash
https://ramsharanyadav.github.io/hotel-reservation-system/




