function toPolygons(geojson) {
	var polygons = [];
	let coordinatesSets = geojson.features[0].geometry.coordinates;
	coordinatesSets.forEach(set => {
		polygons.push(turf.polygon(set));
	})

	return polygons;
}

function areThey(points, geojson) {
	let polygons = toPolygons(geojson);
	let result = [];
	let isInside = false;
	points.forEach(point => {
		for (var i = 0; i < polygons.length; i++) {
			if (turf.booleanPointInPolygon(turf.point(point), polygons[i])) {
				isInside = true;
				break;
			}
		}
		result.push({ point, isInside })
	})

	return result;
}

function isThis(point, geojson) {
	let polygons = toPolygons(geojson);
	let isInside = false;

	for (var i = 0; i < polygons.length; i++) {
		if (turf.booleanPointInPolygon(turf.point(point), polygons[i])) {
			isInside = true;
			break;
		}
	}

	return isInside;
}


if ((typeof turf) == undefined) {
	throw 'turf is required to use this library. '
} else {
	module.exports = {
		areThey,
		isThis
	}
}

