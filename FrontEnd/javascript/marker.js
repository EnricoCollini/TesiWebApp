window.addMarker = async (caterogy = '', epsi) => {
    if (!caterogy) {
        console.log('nessuna categoria passata');
    }

    window.mymap.eachLayer(function (layer) {
        window.mymap.removeLayer(layer);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    mapMarkers = [];
    let epsilon = 1;
    let filteredEvents = [];
    filteredEvents = window.events.locations.filter(event => event.locTax === caterogy);

    if (filteredEvents[0].locTax === 'theater') {
        epsilon = 4;
    }
    if (filteredEvents[0].locTax === 'concert') {
        epsilon = 4.6;
    }
    if (filteredEvents[0].locTax === 'comedy') {
        epsilon = 9.5;
    }
    if (filteredEvents[0].locTax === 'sports') {
        epsilon = 9.5;
    }

    filteredEvents.forEach(event => {
        let customMarkerPopup = customMarkerPopupGetter(event);
        mapMarkers.push(markerGetter(event, customMarkerPopup));
    });



    let layer = new L.LayerGroup(mapMarkers.filter(event => event.category === caterogy).map(event => event.marker));

    mapLayers.push({
        layer: layer,
        category: caterogy
    });

    layer.addTo(window.mymap);

    let layersToRemove = mapLayers.filter(layer => layer.category !== caterogy);
    layersToRemove.forEach(layer => layer.layer.clearLayers());


    const data = mapMarkers.map(function (marker) {
        return {
            location: {
                accuracy: 30,
                latitude: marker.marker._latlng.lat,
                longitude: marker.marker._latlng.lng
            }
        }
    });


    var dbscanner = jDBSCAN().eps(epsilon).minPts(2).distance('HAVERSINE').data(data);

    //{},{},{},{}
    //0,1,2,0,1,1,2,0,0
    let scannedData = dbscanner();

    //0,1,2
    const uniqueValues = [...new Set(scannedData.map(item => item))];

    const polygonData = mapMarkers.map(function (marker) {
        return [
            marker.marker._latlng.lat,
            marker.marker._latlng.lng
        ];
    });

    const polygonsGroups = [];
    //                    1
    uniqueValues.forEach(value => {
        window.polygons = [];
        scannedData.forEach((polygonGroup, index) => {
            if (polygonGroup === value) {
                window.polygons.push(polygonData[index]);
            }
        })
        polygonsGroups.push(window.polygons);
    })

    polygonsGroups.forEach(polygon => {
        polygon.sort();
        let customPopup = customPopupGetter(polygon);

        window.polygon = new L.polygon(polygon, { color: '#FBBC05', fillOpacity: customPopup[1] * 1.5 }).bindPopup(customPopup[0], { maxHeight: 320, minWidth: 200, autoPanPadding: [10, 65] });
        window.mymap.addLayer(window.polygon);
    });


}


let markerGetter = (event, customMarkerPopup) => {
    return {
        marker: L.marker([event.locLat, event.locLon],
            { title: event.locName, icon: window.icon[event.locTax] })
            .bindPopup(customMarkerPopup,
                {
                    maxWidth: 240, maxHeight: 320, autoPan: true, closeButton: true, autoPanPadding: [10, 65]
                })
            .on('popupopen', onMarkerClick),
        category: event.locTax
    };
}


let customMarkerPopupGetter = (event) => {
    return `<div id='classe'><h2>Info Location </h2> <h4> Name: ${event.locName}<br>Address:  ${event.locAddress}
 <br> Number of Followers: ${event.locFollowersNum}<br>
 <br> Positivity: 
        <section><svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
         <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> 
         <circle class="circle-chart__circle" stroke="#FBBC05" stroke-width="2" stroke-dasharray="${event.locPercPos} ,100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> 
         <g class="circle-chart__info"> 
            <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">
               ${event.locPercPos}%
            </text> 
         </g> 
         </svg>
         </section>
    <br> Neutrality:
        <section><svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
         <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> 
         <circle class="circle-chart__circle" stroke="#FBBC05" stroke-width="2" stroke-dasharray="${event.locPercNeu} ,100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> 
         <g class="circle-chart__info"> 
            <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">
               ${event.locPercNeu}%
            </text> 
         </g> 
         </svg>
         </section>
    <br> Negativity: 
        <section><svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
         <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> 
         <circle class="circle-chart__circle" stroke="#FBBC05" stroke-width="2" stroke-dasharray="${event.locPercNeg} ,100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> 
         <g class="circle-chart__info"> 
            <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">
               ${event.locPercNeg}%
            </text> 
         </g> 
         </svg>
         </section>
    <br><a href="${event.locUrl}" target="_blank"><button class="MButton">Website</button></a><br><br>
</div>`
};

let customPopupGetter = (polygon) => {
    let questi = [];
    polygon.forEach(pol => {
        for (let index = 0; index < window.events.locations.length; index++) {
            if (pol[0] === window.events.locations[index].locLat && pol[1] === window.events.locations[index].locLon) {
                console.log("metch");
                questi.push(window.events.locations[index]);
            }
        }
    });
    let listaLoc = "";
    questi.forEach(pl => {
        listaLoc += customl(pl);
    })

    console.log(mapMarkers);

    return ["<div id='classe'><h2>Area Details</h2>  <h4>Number of locations: " + questi.length +
        "<br>Tot Followers: " + cTot(questi) +
        "<br> Mean Followers: " + Math.round(cTot(questi) / questi.length) +
        "<br>Mean positivity: " +
        '<section> <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="80" height="80" xmlns="http://www.w3.org/2000/svg"> <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <circle class="circle-chart__circle" stroke="#FBBC05" stroke-width="2" stroke-dasharray="' +
        mPos(questi) + ',100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <g class="circle-chart__info"> <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">' + mPos(questi) + '%</text> </g> </svg>  </section>'
        + "<p> Locations <font> &#8628 </font></p>"
        + "</div>" + listaLoc, mPos(questi) / 100];
};

let customl = (cus) => {
    return "<div style='border-top: 1px solid black;text-align: center;margin-top:10px; margin.bottom:10px;';>" + `<button  class="Mbutton" type="button" onclick="openMarker('` + cus.locName + `')" > ` + cus.locName + '</button > ' +
        '<section> <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="80" height="80" xmlns="http://www.w3.org/2000/svg"> <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <circle class="circle-chart__circle" stroke="#FBBC05" stroke-width="2" stroke-dasharray="' +
        cus.locPercPos + ',100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <g class="circle-chart__info"> <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">' + cus.locPercPos + '%</text> </g> </svg>  </section>'
        + "</div>";
}



function openMarker(titolo) {
    mapMarkers.forEach(mar => {
        if (titolo === mar.marker.options.title) {
            mar.marker.openPopup();
        }
    });
}

let cTot = (questi) => {
    tot = 0;
    questi.forEach(q => {
        tot += q.locFollowersNum;
    });
    return tot;
}

let mPos = (questi) => {
    tot = 0;
    questi.forEach(q => {
        tot += q.locPercPos;
    });
    return Math.round(tot / questi.length);
}
