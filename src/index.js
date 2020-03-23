function toPolygons(geojson) {
	try {
		var polygons = [];
		geojson.features.forEach(feature => {
			if(feature.type == 'Feature') {
				if(feature.geometry.type == 'Polygon') {
					polygons.push(turf.polygon([feature.geometry.coordinates[0]]));
				}else if(feature.geometry.type == 'MultiPolygon'){
					let coordinatesSets = feature.geometry.coordinates;
					coordinatesSets.forEach(set => {
						polygons.push(turf.polygon(set));
					})
				}
			}
		})
		
		return polygons;
	} catch (error) {
		console.log(error);
	}
}

function areThey(points, geojson) {
	try {
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
			isInside = false;
		})

		return result;
	} catch (error) {
		console.log(error);
	}
}

function isThis(point, geojson) {
	try {
		let polygons = toPolygons(geojson);
		let isInside = false;

		for (var i = 0; i < polygons.length; i++) {
			if (turf.booleanPointInPolygon(turf.point(point), polygons[i])) {
				isInside = true;
				break;
			}
		}

		return isInside;
	} catch (error) {
		console.log(error);
	}
}


if ((typeof turf) == undefined) {
	throw 'turf is required to use this library. '
} else {
	module.exports = {
		areThey,
		isThis
	}
}

