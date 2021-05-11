    const mymap = L.map('mapid').setView([52, 5], 2);
    let marker;

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        noWrap: true,
        bounds: [
            [-90, -180],
            [90, 180]
          ],
        accessToken: 'pk.eyJ1IjoiZGFuZmllbGRlciIsImEiOiJja29lNnVvcHAwMmdpMnVsenJtN3MyMXd1In0.gqLtr0Oao-J5aqvMKwrNxw'
    }).addTo(mymap);

    const onMapClick = e => {
        if (marker) {
            mymap.removeLayer(marker)
            marker = L.marker(e.latlng).addTo(mymap).on('click', onMarkerClick);
        } else {
        marker = L.marker(e.latlng).addTo(mymap).on('click', onMarkerClick);
    }}

    const onMarkerClick = () => {
        mymap.removeLayer(this);
    }

    mymap.on('click', onMapClick);

    const form = document.getElementById('form');
    form.onsubmit = () => {
        if (marker) {
        let lat = document.createElement("input");
        lat.setAttribute("type", "hidden");
        lat.setAttribute("name", "lat");
        lat.value = marker._latlng.lat;
        form.insertBefore(lat, form.childNodes[form.childElementCount]);
        let lng = document.createElement("input");
        lng.setAttribute("type", "hidden");
        lng.setAttribute("name", "lng");
        lng.value = marker._latlng.lng;
        form.insertBefore(lng, form.childNodes[form.childElementCount]);
        }
    }