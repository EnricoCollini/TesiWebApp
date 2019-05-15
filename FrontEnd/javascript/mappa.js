//Definizione variabili

//tutti i markers globali
window.mapMarkers = [];

//tutti i layer globali
window.mapLayers = [];

window.mymap = L.map('mapid', { zoomControl: false }).setView([40.74, -73.96], 12);

window.events = {};

window.tweets = [];

window.polygons = [];

window.poligono = (i, c, tf, pf, tl) => {
    this.id = i;
    this.coordinates = [];
    this.coordinates.push(c);
    this.numTotFollowers = tf;
    this.percPosMedia = Math.round(pf);
    this.numLoc = tl;
}

window.icon = {
    concert: L.icon({
        iconUrl: "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Marker_red-20.png",
        iconSize: [16, 16],
        iconAnchor: [7, 7]
    }),
    theater: L.icon({
        iconUrl: "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Marker-20.png",
        iconSize: [16, 16],
        iconAnchor: [7, 7]
    }),
    comedy: L.icon({
        iconUrl: "https://cdn3.iconfinder.com/data/icons/web-ui-color/128/Marker_green-20.png",
        iconSize: [16, 16],
        iconAnchor: [7, 7]
    }),
    sports: L.icon({
        iconUrl:
            "https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Marker-2-20.png",
        iconSize: [16, 16],
        iconAnchor: [7, 7]
    })
};


L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

//Sezione Funzioni
//get database datas
getDbDatas = async () => {
    let data = await fetch("https://databaseservertesi.herokuapp.com/locations/");
    let json = await data.json();
    console.log(json);

    window.events = json;
}



//inizializza i poligoni
function createPolygon(pol, id) {
    var tf = calcolaTot(pol);
    var pp = calcolaPercPos(pol);
    var tot = pol.length;
    poligon1 = new poligono(id, pol, tf, pp, tot);
    return poligon1;
}
function calcolaTot(pol) {
    var tot = 0;
    for (var i = 0; i < pol.length; i++) {
        var lat = pol[i][0];
        for (var j = 0; j < events.locations.length; j++) {
            if (events.locations[j].locLat == lat) {
                tot += events.locations[j].locFollowersNum;
            }
        }
        return tot;
    }
}
function calcolaPercPos(pol) {
    var tot = 0;
    for (var i = 0; i < pol.length; i++) {
        var lat = pol[i][0];
        var lon = pol[i][1];
        for (var j = 0; j < events.locations.length; j++) {
            if (events.locations[j].locLat == lat && events.locations[j].locLon == lon) {
                pos = events.locations[j].locPercPos;
                tot += pos;
            }
        }

    }
    result = tot / pol.length;
    return result;
}
function creatuttipoligoni() {
    var musicPol1 = [
        [40.7618, -73.9834],
        [40.7576, -73.9858],
        [40.7528, -73.9863],
        [40.7535, -73.981]];
    var musicPol2 = [
        [40.74, -73.99],
        [40.7306, -74.0002],
        [40.7285, -74.0051], [40.72, -73.9936],
        [40.72, -73.99],
        [40.72, -73.98],
        [40.7213, -73.9881]];
    var musicPol3 = [
        [40.7193, -73.9616],
        [40.72, -73.96],
        [40.7223, -73.9578],
        [40.7194, -73.9388],
        [40.7095, -73.9233],
        [40.7041, -73.9181],
        [40.7149, -73.9518],
        [40.71, -73.9635]];
    var musicPol4 = [
        [40.7095, -73.9233],
        [40.7041, -73.9181]];
    var pol1 = createPolygon(musicPol1, 1, "music");
    var pol2 = createPolygon(musicPol2, 2, "music");
    var pol3 = createPolygon(musicPol3, 3, "music");
    var pol4 = createPolygon(musicPol4, 4, "music");
    poligoni.push(pol1);
    poligoni.push(pol2);
    poligoni.push(pol3);
    poligoni.push(pol4);

    var theaterPol1 = [
        [40.78, -73.95],
        [40.7633, -73.9708],
        [40.7744, -73.9635],
        [40.8097, -73.9502]];
    var theaterPol2 = [
        [40.7629, -73.9837],
        [40.7612, -73.9842],
        [40.758, -73.9875],
        [40.7563, -73.9876],
        [40.7389, -73.9808],
        [40.7306, -74.0002],
        [40.7566, -73.9883],

        [40.77, -74],
        [40.7738, -73.9831],
    ];
    var theaterPol3 = [
        [40.69, -73.96],
        [40.676, -73.9801],
        [40.6459, -73.9581]
    ];
    var pol5 = createPolygon(theaterPol1, 5, "theater");
    var pol6 = createPolygon(theaterPol2, 6, "theater");
    var pol7 = createPolygon(theaterPol3, 7, "theater");
    poligoni.push(pol5);
    poligoni.push(pol6);
    poligoni.push(pol7);


    var comedyPol1 = [
        [40.7738, -73.9831],
        [40.78, -73.95],
        [40.7649, -73.9799],
        [40.7711, -73.98]
    ];
    var comedyPol2 = [
        [40.746, -73.9997],
        [40.7303, -74.0011]
    ];
    var pol8 = createPolygon(comedyPol1, 8, "comedy");
    var pol9 = createPolygon(comedyPol2, 9, "comedy");
    poligoni.push(pol8);
    poligoni.push(pol9);

}
function createpopuplocations(poligono, tipo) {
    var text = "<div>";
    console.log(poligono.numLoc);
    for (var i = 0; i < poligono.numLoc; i++) {
        var lat = poligono.coordinates[0][i][0];
        var lon = poligono.coordinates[0][i][1];
        if (tipo == "M") {
            for (var j = 0; j < musicLocations.length; j++) {
                if (musicLocations[j].locLat == lat && musicLocations[j].locLon == lon) {
                    text += '<div class="popupcontainer" style="border-top: 1px solid black; margin-bottom: 10px; text-align: center;"> <button  class="Mbutton" type="button" onclick="openThat' + tipo + 'Marker(' + j + ')">' + musicLocations[j].locName + '</button>' + '<section><svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="45" height="45" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 4;"> <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <circle class="circle-chart__circle" stroke="red" stroke-width="2" stroke-dasharray="' + musicLocations[j].locPercPos + ',100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <g class="circle-chart__info"> <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">' + musicLocations[j].locPercPos + '%</text> </g> </svg></section></div>';
                }
            }
        } else if (tipo == "T") {
            for (var j = 0; j < theaterLocations.length; j++) {
                if (theaterLocations[j].locLat == lat && theaterLocations[j].locLon == lon) {
                    text += '<div class="popupcontainer" style="border-top: 1px solid black; margin-bottom: 10px; text-align: center;"><button type="button" onclick="openThat' + tipo + 'Marker(' + j + ')">' + theaterLocations[j].locName + '</button>' + '<section><svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="45" height="45" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 4;"> <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <circle class="circle-chart__circle" stroke="blue" stroke-width="2" stroke-dasharray="' + theaterLocations[j].locPercPos + ',100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <g class="circle-chart__info"> <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">' + theaterLocations[j].locPercPos + '%</text> </g> </svg></section></div>';
                }
            }
        } else if (tipo == "C") {
            for (var j = 0; j < comedyLocations.length; j++) {
                if (comedyLocations[j].locLat == lat && comedyLocations[j].locLon == lon) {
                    text += '<div class="popupcontainer" style="border-top: 1px solid black; margin-bottom: 10px; text-align: center;"><button class="Cbutton" type="button" onclick="openThat' + tipo + 'Marker(' + j + ')">' + comedyLocations[j].locName + '</button>' + '<section><svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="45" height="45" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 4;"> <circle class="circle-chart__background" stroke="#66757F" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <circle class="circle-chart__circle" stroke="green" stroke-width="2" stroke-dasharray="' + comedyLocations[j].locPercPos + ',100" stroke-linecap="square" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" /> <g class="circle-chart__info"> <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">' + comedyLocations[j].locPercPos + '%</text> </g> </svg></section></div>';
                }
            }
        }
    }
    text += "</div>";
    return text;

}
//collega poligono con marker
function openThatMMarker(j) {
    for (var i in musicMarkers) {
        var markerID = musicMarkers[i].options.title;
        if (markerID == musicLocations[j].locName) {
            musicMarkers[i].openPopup();
            console.log(musicLocations[j].locName);
        };
    }
}
function openThatTMarker(j) {
    for (var i in theaterMarkers) {
        var markerID = theaterMarkers[i].options.title;
        if (markerID == theaterLocations[j].locName) {
            theaterMarkers[i].openPopup();
            console.log(theaterLocations[j].locName);
        };
    }
}
function openThatCMarker(j) {
    for (var i in comedyMarkers) {
        var markerID = comedyMarkers[i].options.title;
        if (markerID == comedyLocations[j].locName) {
            comedyMarkers[i].openPopup();
            console.log(comedyLocations[j].locName);
        };
    }
}

//todo da rifare
function getTweets(ind, nome) {
    tweets = [];
    var nome = events.locations[ind].locName;
    console.log(nome);
    var baseUrl = "https://twittermapserver.herokuapp.com/tweets/";
    var url = baseUrl + nome;
    var urls = url.toString();
    console.log(urls);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tweets.push(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", urls, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    setTimeout(function () {
        console.log(tweets[0].statuses[0].user.name);
        mypop = '<p>' + tweets[0].statuses[0].user.name + '</p>';
    }, 3000);
}

//todo da rifare
function onMarkerClick(e) {
    var popup = e.target.getPopup();
    console.log(popup._latlng.lng);
    var lat = popup._latlng.lat
    var lon = popup._latlng.lng;
    while (tweets.length) { tweets.pop(); }
    var mypop = "</h4><div id='scroll'> <h2>Tweets</h2>";

    for (var i = 0; i < events.locations.length; i++) {
        if (events.locations[i].locLat == lat && events.locations[i].locLon == lon) {
            console.log(events.locations[i].locName);
            tweets = [];
            var baseUrl = "https://twittermapserver.herokuapp.com/tweets/";
            var url = baseUrl + events.locations[i].locName;
            console.log(url);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    tweets.push(JSON.parse(this.responseText));
                }
            };
            xhttp.open("GET", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            setTimeout(function () {
                console.log(tweets);
                for (var i = 0; i < tweets[0].statuses.length; i++) {
                    mypop += '<p class="twe">' + tweets[0].statuses[i].text + '</p>';
                }
                mypop += '</div>'
                popup.setContent(popup._content + mypop);
            }, 3000);

        }
    }



}