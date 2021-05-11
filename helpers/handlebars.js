const handlebarsHelpers = {}

handlebarsHelpers.overviewMapMaker = content => {
      const markers = content.map(item => {
         return (`L.marker(${item.loc.coordinates[0]},${item.loc.coordinates[1]}).addTo(mymap);`)
      })

      return (
      `<script>
     const addMarkers = () => {
      ${handlebarsHelpers.mapMarkers(content)}
      }
     addMarkers();
      </script>`)
   }

handlebarsHelpers.mapMarkers = content => {
      let markers;
      content.map((item) => {
         if(item.loc.coordinates[0]) {
         markers += (`marker = L.marker([${parseFloat(item.loc.coordinates[1])},${parseFloat(item.loc.coordinates[0])}]).addTo(mymap);`)
      }})
      return markers 
}

module.exports = handlebarsHelpers;