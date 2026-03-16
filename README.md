# Employees-Dashboard
## High-Performance Data Grid & Identity Verification App

## Project Overview

This project is a React-based web application that demonstrates high-performance data handling, identity verification, and analytics visualization.

The application fetches large datasets from an API and renders them using **custom virtualization** for better performance. It also includes a **camera-based identity verification system** with a signature overlay and a final analytics dashboard.

---

# Features

## 1. Authentication System

* Simple login interface
* Protected routes using React Context
* Users must log in to access dashboard pages

---

## 2. High Performance Grid (List Page)

The list page displays large data from an API.


### Custom Virtualization

Since the dataset can be large, the application implements **custom virtualization**.

Only the rows visible in the viewport plus a small buffer are rendered.
This improves performance and reduces DOM load.

Key idea:

* Track scroll position
* Calculate visible rows
* Render only required rows

---

## 3. Identity Verification (Details Page)

Each record has a details page accessible through **dynamic routing**.

Route:

```
/details/:id
```

### Camera Capture

The browser **Camera API** is used to capture a profile photo directly from the user's device.

### Signature Overlay

After capturing the photo, an **HTML5 Canvas overlay** is displayed.
The user can sign their name using a **mouse or touch input**.

### Image Merge

The captured photo and the signature drawing are programmatically merged into a **single image** using Canvas.

Output format:

* Base64 Image

This final merged image represents the **identity verification record**.

---

## 4. Analytics Dashboard

The analytics page displays verification results and visual insights.

### Verification Result

Displays the final merged **photo + signature image**.

### Salary Distribution Chart

A custom **SVG bar chart** is implemented to visualize salary distribution by city.

External charting libraries such as **Chart.js or D3** are not used.

### City Location Mapping

City data from the API is mapped to geographic coordinates.

Example mapping:

```
Dhaka → [23.8103, 90.4125]
Chittagong → [22.3569, 91.7832]
Khulna → [22.8456, 89.5403]
```

These coordinates are used to display markers on the map.

---

# Technologies Used

* React
* React Router
* Tailwind CSS
* HTML5 Canvas
* Browser Camera API
* SVG (for charts)

---



# 🐞 Intentional Bug
Description:
The application contains a logical bug in the data processing layer, specifically within the salary aggregation logic.

What is it: The code is intentionally configured to extract data from the wrong index of the employee array. Instead of targeting row[5] (which contains the Salary string), it attempts to process row[4] (which contains the Start Date).

Where is it: Located in the Analytics.jsx file, inside the data.forEach loop where the citySalary object is being populated.

Why did I choose it: I chose this bug to demonstrate the critical importance of data mapping and index validation when working with raw array-based API responses. Since the application relies on manual parsing of indices, a single digit error can lead to a complete failure of the analytics dashboard (showing $0 or NaN), highlighting the need for robust data schemas.

---

# Conclusion

This project demonstrates:

* High performance rendering using virtualization
* Browser-based identity verification
* Canvas image processing
* SVG-based data visualization
* Map-based geographic data representation

It focuses on performance, browser APIs, and clean component architecture in React.

---
