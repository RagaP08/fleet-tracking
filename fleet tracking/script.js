/* =====================================
   FLEET TRACKING SYSTEM - JAVASCRIPT
===================================== */

// VEHICLE DATABASE (DEMO DATA)

let vehicles = [
    {
        id: "TRK-101",
        name: "Tata Prima",
        type: "Heavy Truck",
        driver: "Rajesh Kumar",
        location: "Technopark, Trivandrum",
        lat: 8.5570,
        lng: 76.8810,
        speed: 65,
        fuel: 85,
        status: "Active"
    },
    {
        id: "TRK-102",
        name: "Ashok Leyland",
        type: "Delivery Truck",
        driver: "Arun Mohan",
        location: "Kowdiar, Trivandrum",
        lat: 8.5241,
        lng: 76.9366,
        speed: 48,
        fuel: 60,
        status: "Active"
    },
    {
        id: "TRK-103",
        name: "Mahindra Bolero",
        type: "Utility Vehicle",
        driver: "Suresh Kumar",
        location: "Kazhakkoottam, Trivandrum",
        lat: 8.5700,
        lng: 76.8750,
        speed: 0,
        fuel: 35,
        status: "Idle"
    },
    {
        id: "TRK-104",
        name: "Tata 407",
        type: "Transport Truck",
        driver: "Vijay Prasad",
        location: "Pattom, Trivandrum",
        lat: 8.5245,
        lng: 76.9530,
        speed: 0,
        fuel: 20,
        status: "Maintenance"
    },
    {
        id: "TRK-105",
        name: "Eicher Pro",
        type: "Cargo Truck",
        driver: "Vijay Prasad",
        location: "Vellayambalam, Trivandrum",
        lat: 8.5100,
        lng: 76.9620,
        speed: 55,
        fuel: 75,
        status: "Active"
    },
    {
        id: "TRK-106",
        name: "Tata Ace",
        type: "Mini Truck",
        driver: "Anil Raj",
        location: "Attingal, Trivandrum",
        lat: 8.6960,
        lng: 76.8150,
        speed: 42,
        fuel: 50,
        status: "Active"
    }
];


// RECENT TRIPS

const trips = [
    {
        vehicle: "TRK-101",
        from: "Technopark",
        to: "Kollam",
        distance: "68 km",
        time: "09:30 AM"
    },
    {
        vehicle: "TRK-102",
        from: "Kowdiar",
        to: "Neyyattinkara",
        distance: "24 km",
        time: "10:15 AM"
    },
    {
        vehicle: "TRK-105",
        from: "Vellayambalam",
        to: "Kochi",
        distance: "205 km",
        time: "11:00 AM"
    },
    {
        vehicle: "TRK-106",
        from: "Attingal",
        to: "Varkala",
        distance: "15 km",
        time: "11:45 AM"
    }
];


// =====================================
// CURRENT DATE
// =====================================

document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


// =====================================
// DASHBOARD STATISTICS
// =====================================

function updateStatistics() {

    const total = vehicles.length;

    const active = vehicles.filter(
        v => v.status === "Active"
    ).length;

    const idle = vehicles.filter(
        v => v.status === "Idle"
    ).length;

    const maintenance = vehicles.filter(
        v => v.status === "Maintenance"
    ).length;

    document.getElementById("totalVehicles").textContent = total;
    document.getElementById("activeVehicles").textContent = active;
    document.getElementById("idleVehicles").textContent = idle;

    document.getElementById("maintenanceVehicles").textContent =
        maintenance;

    const utilization = total
        ? Math.round((active / total) * 100)
        : 0;

    document.getElementById("utilizationValue").textContent =
        utilization + "%";

    document.getElementById("utilizationRing").style.background =
        `conic-gradient(#2563eb ${utilization * 3.6}deg, #e5e7eb 0deg)`;

    document.getElementById("utilActive").textContent = active;
    document.getElementById("utilIdle").textContent = idle;
    document.getElementById("utilService").textContent = maintenance;
}


// =====================================
// VEHICLE TABLE
// =====================================

function renderVehicles(data = vehicles) {

    const table = document.getElementById("vehicleTable");

    table.innerHTML = "";

    data.forEach(vehicle => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>${vehicle.id}</strong></td>

            <td>
                <div class="vehicle-name">
                    <i class="fas fa-truck"></i>
                    <div>
                        <strong>${vehicle.name}</strong>
                        <small>${vehicle.type}</small>
                    </div>
                </div>
            </td>

            <td>${vehicle.driver}</td>

            <td>${vehicle.location}</td>

            <td>${vehicle.speed} km/h</td>

            <td>
                <div class="fuel-cell">
                    ${vehicle.fuel}%
                    <div>
                        <span style="width:${vehicle.fuel}%"></span>
                    </div>
                </div>
            </td>

            <td>
                <span class="status ${vehicle.status.toLowerCase()}">
                    ${vehicle.status}
                </span>
            </td>

            <td>
                <button class="action-btn"
                    onclick="showVehicle('${vehicle.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;

        table.appendChild(row);
    });

    document.getElementById("vehicleCount").textContent =
        `Showing ${data.length} of ${vehicles.length} vehicles`;
}


// =====================================
// VEHICLE SEARCH
// =====================================

function searchVehicles() {

    const searchValue =
        document.getElementById("vehicleSearch")
        .value.toLowerCase();

    const status =
        document.getElementById("statusFilter").value;

    const filtered = vehicles.filter(vehicle => {

        const matchesSearch =
            vehicle.id.toLowerCase().includes(searchValue) ||
            vehicle.name.toLowerCase().includes(searchValue) ||
            vehicle.driver.toLowerCase().includes(searchValue) ||
            vehicle.location.toLowerCase().includes(searchValue);

        const matchesStatus =
            status === "All" || vehicle.status === status;

        return matchesSearch && matchesStatus;
    });

    renderVehicles(filtered);
}

document.getElementById("vehicleSearch")
    .addEventListener("input", searchVehicles);

document.getElementById("statusFilter")
    .addEventListener("change", searchVehicles);


// GLOBAL SEARCH

document.getElementById("globalSearch")
    .addEventListener("input", function() {

        document.getElementById("vehicleSearch").value =
            this.value;

        document.getElementById("statusFilter").value = "All";

        searchVehicles();

        document.getElementById("vehicles")
            .scrollIntoView({ behavior: "smooth" });
    });


// =====================================
// INTERACTIVE MAP
// =====================================

// Initial map location: Trivandrum

const map = L.map("map").setView(
    [8.5241, 76.9366],
    11
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: '&copy; OpenStreetMap contributors'
    }
).addTo(map);


// Vehicle map markers

let markers = [];

function getMarkerColor(status) {

    if (status === "Active") return "#16a34a";

    if (status === "Idle") return "#f59e0b";

    return "#dc2626";
}


function createVehicleMarker(vehicle) {

    const color = getMarkerColor(vehicle.status);

    const markerIcon = L.divIcon({

        className: "custom-marker",

        html: `
            <div style="
                background:${color};
                width:30px;
                height:30px;
                border:3px solid white;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                color:white;
                font-size:12px;
                box-shadow:0 2px 8px #0004;
            ">
                <i class="fas fa-truck"></i>
            </div>
        `,

        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    const marker = L.marker(
        [vehicle.lat, vehicle.lng],
        { icon: markerIcon }
    );

    marker.bindPopup(`
        <div style="min-width:150px">
            <h3>${vehicle.id}</h3>
            <p><b>Vehicle:</b> ${vehicle.name}</p>
            <p><b>Driver:</b> ${vehicle.driver}</p>
            <p><b>Location:</b> ${vehicle.location}</p>
            <p><b>Speed:</b> ${vehicle.speed} km/h</p>
            <p><b>Fuel:</b> ${vehicle.fuel}%</p>
            <p><b>Status:</b> ${vehicle.status}</p>
        </div>
    `);

    return marker;
}


function renderMap(filter = "All") {

    markers.forEach(marker => map.removeLayer(marker));

    markers = [];

    vehicles.forEach(vehicle => {

        if (filter === "All" || vehicle.status === filter) {

            const marker = createVehicleMarker(vehicle);

            marker.addTo(map);

            markers.push(marker);
        }
    });
}


// MAP FILTER

function filterMap(status, button) {

    document.querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    renderMap(status);
}


// =====================================
// VEHICLE ACTIVITY
// =====================================

function renderActivity() {

    const container = document.getElementById("activityList");

    container.innerHTML = "";

    vehicles.slice(0, 4).forEach(vehicle => {

        const item = document.createElement("div");

        item.className = "activity-item";

        item.innerHTML = `
            <div class="vehicle-symbol">
                <i class="fas fa-truck"></i>
            </div>

            <div class="activity-info">
                <strong>${vehicle.id}</strong>
                <small>${vehicle.location}</small>
            </div>

            <span class="status ${vehicle.status.toLowerCase()}">
                ${vehicle.status}
            </span>
        `;

        container.appendChild(item);
    });
}


// =====================================
// RECENT TRIPS
// =====================================

function renderTrips() {

    const container = document.getElementById("tripList");

    container.innerHTML = "";

    trips.forEach(trip => {

        const item = document.createElement("div");

        item.className = "trip-item";

        item.innerHTML = `
            <div class="trip-icon">
                <i class="fas fa-route"></i>
            </div>

            <div class="trip-info">
                <strong>${trip.vehicle}</strong>
                <p>${trip.from} → ${trip.to}</p>
                <p>${trip.time}</p>
            </div>

            <div class="trip-distance">
                ${trip.distance}
            </div>
        `;

        container.appendChild(item);
    });
}


// =====================================
// VEHICLE DETAILS MODAL
// =====================================

function showVehicle(id) {

    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) return;

    document.getElementById("modalTitle").textContent =
        vehicle.id + " - Vehicle Information";

    document.getElementById("modalContent").innerHTML = `

        <div class="modal-details">

            <p><strong>Vehicle Name:</strong> ${vehicle.name}</p>

            <p><strong>Vehicle Type:</strong> ${vehicle.type}</p>

            <p><strong>Vehicle ID:</strong> ${vehicle.id}</p>

            <p><strong>Driver:</strong> ${vehicle.driver}</p>

            <p><strong>Location:</strong> ${vehicle.location}</p>

            <p><strong>Latitude:</strong> ${vehicle.lat}</p>

            <p><strong>Longitude:</strong> ${vehicle.lng}</p>

            <p><strong>Speed:</strong> ${vehicle.speed} km/h</p>

            <p><strong>Fuel Level:</strong> ${vehicle.fuel}%</p>

            <p><strong>Status:</strong> ${vehicle.status}</p>

        </div>
    `;

    document.getElementById("vehicleModal")
        .classList.add("show");
}


function closeModal() {

    document.getElementById("vehicleModal")
        .classList.remove("show");
}


// Close modal when clicking outside

document.getElementById("vehicleModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeModal();
        }
    });


// =====================================
// ADD NEW VEHICLE
// =====================================

function addVehicle() {

    const id = prompt("Enter Vehicle ID:");

    if (!id) return;

    if (vehicles.some(v => v.id.toLowerCase() === id.trim().toLowerCase())) {
        showMessage("Vehicle ID already exists.");
        return;
    }

    const name = prompt("Enter Vehicle Name:");

    if (!name) return;

    const driver = prompt("Enter Driver Name:");

    if (!driver) return;

    const location = prompt("Enter Vehicle Location:");

    if (!location) return;

    const newVehicle = {

        id: id.trim().toUpperCase(),
        name: name.trim(),
        type: "New Vehicle",
        driver: driver.trim(),
        location: location.trim(),

        // Demo coordinates: default to Trivandrum
        lat: 8.5241,
        lng: 76.9366,

        speed: 0,
        fuel: 100,
        status: "Idle"
    };

    vehicles.push(newVehicle);

    refreshDashboard();

    showMessage("New vehicle added successfully!");
}


// =====================================
// EXPORT FLEET REPORT
// =====================================

function exportReport() {

    const headers = [
        "Vehicle ID",
        "Vehicle Name",
        "Driver",
        "Location",
        "Speed",
        "Fuel",
        "Status"
    ];

    const rows = vehicles.map(v => [
        v.id,
        v.name,
        v.driver,
        v.location,
        v.speed,
        v.fuel + "%",
        v.status
    ]);

    const csvContent = [
        headers,
        ...rows
    ].map(row =>
        row.map(value =>
            '"' + String(value).replace(/"/g, '""') + '"'
        ).join(",")
    ).join("\n");

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "fleet-tracking-report.csv";

    link.click();

    URL.revokeObjectURL(url);

    showMessage("Fleet report exported successfully!");
}


// =====================================
// PERFORMANCE ANALYTICS CHART
// =====================================

const chartContext =
    document.getElementById("performanceChart")
    .getContext("2d");

const chart = new Chart(chartContext, {

    type: "bar",

    data: {

        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        datasets: [{

            label: "Distance Travelled (KM)",

            data: [120, 190, 150, 240, 180, 210, 160],

            backgroundColor: "#3b82f6",

            borderRadius: 6,

            barThickness: 25
        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }
        },

        scales: {

            y: {
                beginAtZero: true,
                grid: {
                    color: "#edf1f7"
                },
                title: {
                    display: true,
                    text: "Distance (KM)"
                }
            },

            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});


// CHANGE CHART PERIOD

document.getElementById("chartPeriod")
    .addEventListener("change", function() {

        if (this.value === "previous") {

            chart.data.datasets[0].data =
                [100, 160, 130, 190, 170, 180, 140];

        } else {

            chart.data.datasets[0].data =
                [120, 190, 150, 240, 180, 210, 160];
        }

        chart.update();
    });


// =====================================
// MOBILE SIDEBAR
// =====================================

function toggleSidebar() {

    document.getElementById("sidebar")
        .classList.toggle("open");
}


// CLOSE SIDEBAR AFTER NAVIGATION

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", function() {

        document.querySelectorAll(".nav-link")
            .forEach(item => item.classList.remove("active"));

        this.classList.add("active");

        document.getElementById("sidebar")
            .classList.remove("open");
    });
});


// =====================================
// TOAST NOTIFICATION
// =====================================

let toastTimer;

function showMessage(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// =====================================
// REFRESH DASHBOARD
// =====================================

function refreshDashboard() {

    updateStatistics();

    renderVehicles();

    renderActivity();

    renderMap();

    renderTrips();
}


// =====================================
// DEMO VEHICLE MOVEMENT
// =====================================

// Simulates movement for active vehicles.
// This is NOT actual GPS tracking.

function simulateVehicleMovement() {

    vehicles.forEach(vehicle => {

        if (vehicle.status === "Active") {

            vehicle.lat += (Math.random() - 0.5) * 0.001;

            vehicle.lng += (Math.random() - 0.5) * 0.001;

            vehicle.speed = Math.floor(
                Math.random() * 40 + 35
            );
        }
    });

    renderMap();

    renderVehicles();

    renderActivity();
}


// =====================================
// INITIALIZE APPLICATION
// =====================================

refreshDashboard();

setTimeout(() => {
    map.invalidateSize();
}, 300);

// Update demo vehicle positions every 15 seconds

setInterval(simulateVehicleMovement, 15000);
