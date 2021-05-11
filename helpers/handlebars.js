const handlebarsHelpers = {};

handlebarsHelpers.overviewMapMaker = (content) => {
	return `<script>
     const addMarkers = () => {
      ${handlebarsHelpers.mapMarkers(content)}
      }
     addMarkers();
      </script>`;
};

handlebarsHelpers.mapMarkers = (content) => {
	let markers = "";
	content.map((item) => {
		markers += `marker = L.marker([
				${parseFloat(item.loc.coordinates[1])},
				${parseFloat(item.loc.coordinates[0])}
			]).addTo(mymap); `;
	});
	return markers;
};

module.exports = handlebarsHelpers;
