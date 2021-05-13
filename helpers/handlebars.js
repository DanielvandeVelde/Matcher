const handlebarsHelpers = {};

handlebarsHelpers.mapFunctionalities = (content, handleClick, handleForm) => {
	return `<script>
     (() => {
      ${handlebarsHelpers.mapMarkers(content)}
	  ${handlebarsHelpers.mapClick(handleClick)}
	  ${handlebarsHelpers.formHandling(handleForm)}
      }
     )(mymap);
      </script>`;
};

handlebarsHelpers.mapMarkers = (content) => {
	let markers = "";
	if (content) {
		if (Array.isArray(content)) {
			content.map((item) => {
				markers += `marker = L.marker([
				${parseFloat(item.loc.coordinates[1])},
				${parseFloat(item.loc.coordinates[0])}
			]).addTo(mymap); `;
			});
		} else {
			markers += `marker = L.marker([
			${parseFloat(content.loc.coordinates[1])},
			${parseFloat(content.loc.coordinates[0])}
		]).addTo(mymap); `;
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
				marker = L.marker(e.latlng).addTo(mymap).on("click", onMarkerClick);
			} else {
				marker = L.marker(e.latlng).addTo(mymap).on("click", onMarkerClick);
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

module.exports = handlebarsHelpers;
