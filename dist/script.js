$(document).ready(function() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiYXN0YW1tIiwiYSI6ImNqcndhZjRwMjBhbnEzeXA5bjdiOTFibDMifQ.jWDAYxxH4ZqCnt4ZkihzHw';
	shp("data.zip").then(function(geojson) {
		let points = [
			[-81.03459538464868, 29.2676691091238],
			[-81.127800, 29.305349],
			[-81.129795, 29.337322],
			[-81.115580, 29.316688],
			[-81.1536497, 29.2709837],
			[-81.125568, 29.270802],
			[-81.0336497, 29.2709837],
			[-81.0305707, 29.2699357],
			[-81.0282637, 29.2643857]
		];

		// console.log(inGeojsonArea(points[0], geojson[0]));
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [-81.03459538464868, 29.26766910912382],
            scrollZoom: true,
            zoom: 10
		});

		var marker = [];

		map.on('load', function() {

			var id = new Date().getTime().toString();

			map.addSource(id, {
				'type': 'geojson',
				'data': geojson[0]
			});
			map.addLayer({
				'id': id,
				'type': 'line',
				'source': id,
				'paint': {
					'line-color': '#75CFF0'
				},
				'filter': ['==', '$type', 'Polygon']
			});
			map.addLayer({
				'id': id,
				'type': 'line',
				'source': id,
				'paint': {
					'line-color': '#75CFF0'
				},
				'filter': ['==', '$type', 'Polygon']
			});

			let coordinatesSets = geojson[0].features[0].geometry.coordinates;
			var polygons = [];
			coordinatesSets.forEach(set => {
				polygons.push(turf.polygon(set));
			})
			var inside = false;
			for (var i = 0; i < points.length; i++) {
				for (var j = 0; j < polygons.length; j++) {
					if (turf.booleanPointInPolygon(turf.point(points[i]), polygons[j])) {
						inside = true;
						break;
					}
				}

				if(inside) {
					marker.push(new mapboxgl.Marker().setLngLat(points[i]).addTo(map));
				}else{
					marker.push(new mapboxgl.Marker({
						color: '#FFB1CE'
					}).setLngLat(points[i]).addTo(map));
				}
				inside = false;
			}


		});
	});
});
