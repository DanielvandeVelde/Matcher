const handlebarsHelpers = {};

handlebarsHelpers.mapFunctionalities = (content, handleClick, handleForm) => {
	return `<script>
     (() => {
		const redIcon = new L.Icon({
			iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		  });
      ${handlebarsHelpers.mapMarkers(content)}
	  ${handlebarsHelpers.mapClick(handleClick)}
	  ${handlebarsHelpers.formHandling(handleForm)}
      }
     )(mymap);
      </script>`;
};

handlebarsHelpers.mapMarkers = (content) => {
	let markers = ``;
	if (content) {
		if (Array.isArray(content)) {
			content.map((item, i) => {
				if (i === 0) {
					markers += `marker = L.marker([
					${parseFloat(item.loc.coordinates[1])},
					${parseFloat(item.loc.coordinates[0])}
				], {icon: redIcon}).addTo(mymap); `;
				} else {
					markers += `marker = L.marker([
					${parseFloat(item.loc.coordinates[1])},
					${parseFloat(item.loc.coordinates[0])}
				]).addTo(mymap); `;
				}
			});
		} else {
			markers += `marker = L.marker([
			${parseFloat(content.loc.coordinates[1])},
			${parseFloat(content.loc.coordinates[0])}
		], {icon: redIcon).addTo(mymap); `;
		}
	}
	return markers;
};

handlebarsHelpers.mapClick = (handleClick) => {
	let clickEvent = "";
	if (handleClick) {
		clickEvent = ` 
		const onMapClick = (e) => {
			if (marker) {
				mymap.removeLayer(marker);
				marker = L.marker(e.latlng, {icon: redIcon}).addTo(mymap).on("click", onMarkerClick);
			} else {
				marker = L.marker(e.latlng, {icon: redIcon}).addTo(mymap).on("click", onMarkerClick);
			}
		};
		mymap.on("click", onMapClick);
	
		function onMarkerClick() {
			marker = null;
			mymap.removeLayer(this);
		}`;
	}
	return clickEvent;
};

handlebarsHelpers.formHandling = (handleForm) => {
	let formEnhancement = "";
	if (handleForm) {
		formEnhancement = `
		hideInputs = () => {
			const latlabel = document.getElementById("latlabel");
			const lnglabel = document.getElementById("lnglabel");
			latlabel.style.display = "none";
			lnglabel.style.display = "none";
		};
		hideInputs();

		document.getElementById("form").onsubmit = () => {
			if (marker) {
				let lat = document.getElementById("lat");
				let lng = document.getElementById("lng");
				lat.value = marker._latlng.lat;
				lng.value = marker._latlng.lng;
			}
		};`;
	}
	return formEnhancement;
};

handlebarsHelpers.userCounter = (content) => {
	const amountNumber = `${content.length - 1} `;
	const amountWord = content.length === 2 ? `user` : `users`;
	const restOfSentence = ` would like to go within 250km of your favorite place`;
	return amountNumber + amountWord + restOfSentence;
};

handlebarsHelpers.createOverview = (content) => {
	let links = "";
	content.map((item, i) => {
		links +=
			i === 0
				? ``
				: `<a href="/profile/${item.username}">${item.name}, (${item.age})</a>`;
	});
	return links;
};

module.exports = handlebarsHelpers;
