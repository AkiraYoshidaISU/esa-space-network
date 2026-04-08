const DATA_PATH = "data/esa_agencies.json";

const tableBody = document.getElementById("agency-table-body");
const rowTemplate = document.getElementById("table-row-template");
const memberCountBadge = document.getElementById("member-count");
const clockNode = document.getElementById("utc-clock");
const searchInput = document.getElementById("search-input");

const map = L.map("map", {
  minZoom: 3,
  worldCopyJump: true
}).setView([50.4, 10.5], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);

const formatCoordinate = (value) => Number(value).toFixed(4);

const buildSearchIndex = (item) => {
  return [item.memberState, item.agency, item.city, item.country, item.address]
    .join(" ")
    .toLowerCase();
};

const renderTable = (rows) => {
  tableBody.innerHTML = "";

  const fragment = document.createDocumentFragment();

  rows.forEach((item) => {
    const row = rowTemplate.content.firstElementChild.cloneNode(true);

    row.querySelector('[data-key="memberState"]').textContent = item.memberState;
    row.querySelector('[data-key="agency"]').textContent = item.agency;
    row.querySelector('[data-key="city"]').textContent = item.city;
    row.querySelector('[data-key="country"]').textContent = item.country;
    row.querySelector('[data-key="address"]').textContent = item.address;
    row.querySelector('[data-key="lat"]').textContent = formatCoordinate(item.lat);
    row.querySelector('[data-key="lng"]').textContent = formatCoordinate(item.lng);

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
};

const renderMarkers = (rows) => {
  markerLayer.clearLayers();
  const bounds = [];

  rows.forEach((item) => {
    const marker = L.marker([item.lat, item.lng]);

    marker.bindPopup(`
      <strong>${item.memberState}</strong><br />
      ${item.agency}<br />
      ${item.city}, ${item.country}<br />
      ${item.address}<br />
      Lat/Lng: ${formatCoordinate(item.lat)}, ${formatCoordinate(item.lng)}
    `);

    markerLayer.addLayer(marker);
    bounds.push([item.lat, item.lng]);
  });

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [35, 35], maxZoom: 6 });
  }
};

const setMemberCount = (visible, total) => {
  memberCountBadge.textContent = `${visible} of ${total} ESA members visible`;
};

const showError = (message) => {
  tableBody.innerHTML = `<tr><td colspan="7">${message}</td></tr>`;
  memberCountBadge.textContent = "Data unavailable";
};

const tickClock = () => {
  const utc = new Date();
  const time = utc.toISOString().slice(11, 19);
  clockNode.textContent = time;
};

const init = async () => {
  tickClock();
  setInterval(tickClock, 1000);

  try {
    const response = await fetch(DATA_PATH, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Unable to load agency data: HTTP ${response.status}`);
    }

    const agencies = await response.json();
    const records = agencies.map((item) => ({
      ...item,
      searchIndex: buildSearchIndex(item)
    }));

    const total = records.length;
    renderTable(records);
    renderMarkers(records);
    setMemberCount(total, total);

    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      const filtered = query
        ? records.filter((item) => item.searchIndex.includes(query))
        : records;

      renderTable(filtered);
      renderMarkers(filtered);
      setMemberCount(filtered.length, total);
    });
  } catch (error) {
    showError(error.message);
  }
};

init();
