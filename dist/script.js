$(document).ready(function() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiYXN0YW1tIiwiYSI6ImNqcndhZjRwMjBhbnEzeXA5bjdiOTFibDMifQ.jWDAYxxH4ZqCnt4ZkihzHw';
	shp("data.zip").then(function(geojson) {
		let points = [
			[-81.03459538464868, 29.2676691091238],
			[-81.070634, 29.321528],
			[-81.127800, 29.305349],
			[-81.129795, 29.337322],
			[-81.115580, 29.316688],
			[-81.1536497, 29.2709837],
			[-81.125568, 29.270802],
			[-81.0336497, 29.2709837],
			[-81.0305707, 29.2699357],
			[-81.0282637, 29.2643857],
			[-81.124464, 29.333577]
		];

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
				'type': 'fill',
				'source': id,
				'paint': {
					'fill-color': '#1A73E8',
					'fill-opacity': 0.2
				},
				'filter': ['==', '$type', 'Polygon']
			});

			map.addLayer({
				'id': id + '_line',
				'type': 'line',
				'source': id,
				'paint': {
					'line-color': '#1A73E8'
				},
				'filter': ['==', '$type', 'Polygon']
			});

			map.addSource('sourceTwo', {
				'type': 'geojson',
				'data': geojson[1]
			});
			map.addLayer({
				'id': 'layerTwo',
				'type': 'fill',
				'source': 'sourceTwo',
				'paint': {
					'fill-color': '#26528C',
					'fill-opacity': 0.2
				},
				'filter': ['==', '$type', 'Polygon']
			});

			map.addLayer({
				'id': 'layerTwo_line',
				'type': 'line',
				'source': 'sourceTwo',
				'paint': {
					'line-color': '#4289E4'
				},
				'filter': ['==', '$type', 'Polygon']
			});


			var pointsPos = inGeojsonArea.areThey(points, geojson[0]);
			console.log(pointsPos);

			var isThis = inGeojsonArea.isThis(points[2], geojson[0]);
			console.log(isThis);
			
			pointsPos.forEach(point => {
				if(point.isInside) {
					marker.push(new mapboxgl.Marker().setLngLat(point.point).addTo(map));
				}else{
					marker.push(new mapboxgl.Marker({
						color: '#FFB1CE'
					}).setLngLat(point.point).addTo(map));
				}
			});
		});
	});
});
