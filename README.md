#  Smart Parking System Mobile App Documentation

Welcome to the official documentation for the **Smart Parking System**. This system is built to optimize urban parking through efficient, location-based booking of parking spaces — with a cash-only payment model.

---

## Table of Contents

* [User Guide](#user-guide)

  * [Getting Started](#getting-started)
  * [Main Features](#main-features)
* [Admin Guide](#admin-guide)

  * [Admin Roles](#admin-roles)
  * [Dashboard Features](#dashboard-features)
* [API Documentation](#api-documentation)

  * [Authentication](#authentication)
  * [Users](#users)
  * [Parking Lots](#parking-lots)
  * [Spots](#spots)
  * [Bookings](#bookings)
  * [Admin Reports](#admin-reports)
* [Notes](#notes)
* [Support](#support)

---

## User Guide

### Getting Started

1. **Download and Install App**

   * Available on Android (via Play Store or APK).
   * iOS support is under development.

2. **Create Account / Login**

   * Provide a valid email and phone number.
   * Secure your account with a strong password.

### Main Features

1. **View Nearby Parking Lots**

   * Map-based UI with location filtering.
   * View real-time availability of parking spots.

2. **Search and Filter**

   * Search by city, area, street.
   * Filter based on security level, price per hour, etc.

3. **Book a Spot**

   * Select a parking spot from the available list.
   * Booking is recorded with status `PENDING`.
   * System provides duration, cost, and cash payment instructions.

4. **Cash Payment Process**

   * User pays to the on-site parking attendant.
   * After payment, user confirms it in the app.
   * Status updates to `CONFIRMED` and a receipt is generated.

5. **Cancel or Modify Booking**

   * Allowed before confirmation.

6. **View Booking History**

   * Complete log of past and current bookings.

---

## Admin Guide

### Admin Roles

* **SUPER\_ADMIN**: System-wide access to manage users, parking lots, and reports.
* **SPOT\_ADMIN**: Limited access to manage specific parking lots and view spot-level reports.

### Dashboard Features

1. **Manage Users**

   * View list of all users.
   * Activate/deactivate accounts.

2. **Manage Parking Lots**

   * Add/edit/delete lots.
   * Assign regions, cities, areas, and streets.
   * View capacity and spot status.

3. **Spot Management**

   * Add/edit parking spots.
   * Monitor availability and maintenance status.

4. **Reports**

   * Booking frequency.
   * Occupancy rates.
   * User activity logs.

5. **Notification Management**

   * Send alerts and messages to users.

---

## API Documentation

> **Base URL**: `https://api.smartparking.app/v1`

### Authentication

* `POST /auth/login` – Login
* `POST /auth/refresh` – Refresh Token

> All protected endpoints require a Bearer token.

### Users

* `POST /users/register` – Register
* `GET /users/me` – Get Profile
* `PATCH /users/me` – Update Profile

### Parking Lots

* `GET /parking-lots` – List All
* `GET /parking-lots/:id` – Get Details
* `POST /parking-lots` – Create *(Admin only)*
* `PATCH /parking-lots/:id` – Update
* `DELETE /parking-lots/:id` – Delete

### Spots

* `GET /parking-lots/:id/spots` – List by Lot
* `GET /spots/:id/status` – Spot Status
* `PATCH /spots/:id` – Update *(Admin only)*

### Bookings

* `POST /bookings` – Create

  ```json
  {
    "parkingLotId": "uuid",
    "parkingSpotId": "uuid",
    "startTime": "ISO8601",
    "hours": 2,
    "paymentMethod": "CASH"
  }
  ```

* `GET /bookings/me` – List My Bookings

* `PATCH /bookings/:id/confirm` – Confirm Cash Payment

* `DELETE /bookings/:id` – Cancel Booking

### Admin Reports

* `GET /admin/reports` – System Report
* `GET /admin/reports/occupancy` – Occupancy by Lot
* `GET /admin/reports/users` – User Activity

---

## Notes

* All dates and times must be in ISO 8601 format.
* All UUIDs follow RFC4122 standards.
* Authentication tokens expire after 1 hour by default.

---

## Support

For bug reports, feature requests, or technical assistance:

* Email: `support@smartparking.app`
* GitHub Issues: [SmartParking Issues](https://github.com/your-repo/issues)

---

© 2025 Smart Parking Corp. All Rights Reserved.
