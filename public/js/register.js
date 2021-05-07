    const mymap = L.map('mapid').setView([52, 5], 2);
    let marker;
    const markerArray = [];

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGFuZmllbGRlciIsImEiOiJja29lNnVvcHAwMmdpMnVsenJtN3MyMXd1In0.gqLtr0Oao-J5aqvMKwrNxw'
    }).addTo(mymap);

    const onMapClick = e => {
        marker = L.marker(e.latlng).addTo(mymap).on('click', onMarkerClick);
        markerArray.push(e.latlng);
    }

    function onMarkerClick() {
        mymap.removeLayer(this);
    }

    mymap.on('click', onMapClick);

    const form = document.getElementById('form');
    form.onsubmit = () => {
        let input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "latlng")
        input.value = markerArray;
        form.insertBefore(input, form.childNodes[form.childElementCount])
    }