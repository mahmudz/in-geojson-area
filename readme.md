# inGeojsonArea - Determines if the point is inside a geojson polygons/multipolygons
Takes a Point and geojson data and determines if the points/point inside the polygons/multipolygons.

## Installation
```html
<script src="https://npmcdn.com/@mahmudz/in-geojson-area@2.0.0/dist/inGeojsonArea.umd.js"></script>
```


## Usage
```js
// For single point
inGeojsonArea.isThis([-81.124464, 29.333577], geojson);

// returns true/false

// For multiple points
let points = [
    [-81.034568, 29.26713],
    [-81.070634, 29.32152],
    [-81.127800, 29.30534],
    [-81.129795, 29.33732],
    [-81.115580, 29.31668],
    [-81.153647, 29.27097],
    [-81.125568, 29.27082],
    [-81.033497, 29.27037],
    [-81.030707, 29.26957],
    [-81.028637, 29.26857],
    [-81.124464, 29.33357]
];

const results = inGeojsonArea.isThis([-81.124464, 29.333577], geojson);

// returns array of points & is inside area response
// [
//     {  point: [-81.034568, 29.26713], isInside: true },
//     {  point: [-81.070634, 29.32152], isInside: false },
//     ...
// ]
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)