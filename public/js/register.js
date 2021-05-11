const form = document.getElementById("form");
let marker;

const createMap = () => {
	const fieldset = document.getElementsByTagName("fieldset")[0];
	const div = document.createElement("div");
	div.setAttribute("id", "mapid");
	fieldset.insertBefore(div, document.getElementsByTagName("button")[0]);
	initMap();
};

const initMap = () => {
	const mymap = L.map("mapid").setView([52, 5], 2);

	L.tileLayer(
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
		{
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: "mapbox/streets-v11",
			tileSize: 512,
			zoomOffset: -1,
			noWrap: true,
			bounds: [
				[-90, -180],
				[90, 180],
			],
			accessToken:
				"pk.eyJ1IjoiZGFuZmllbGRlciIsImEiOiJja29lNnVvcHAwMmdpMnVsenJtN3MyMXd1In0.gqLtr0Oao-J5aqvMKwrNxw",
		}
	).addTo(mymap);

	const onMapClick = (e) => {
		if (marker) {
			mymap.removeLayer(marker);
			marker = L.marker(e.latlng).addTo(mymap).on("click", onMarkerClick);
		} else {
			marker = L.marker(e.latlng).addTo(mymap).on("click", onMarkerClick);
		}
	};
	mymap.on("click", onMapClick);

	function onMarkerClick() {
		marker = null;
		mymap.removeLayer(this);
	}
};

hideInputs = () => {
	const latlabel = document.getElementById("latlabel");
	const lnglabel = document.getElementById("lnglabel");
	latlabel.style.display = "none";
	lnglabel.style.display = "none";
};
hideInputs();

form.onsubmit = () => {
	if (marker) {
		let lat = document.getElementById("lat");
		let lng = document.getElementById("lng");
		lat.value = marker._latlng.lat;
		lng.value = marker._latlng.lng;
	}
};

createMap();
