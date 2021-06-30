// let data;
// const week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

// // init()

// function parse(data) {
//     // индекс для быстрого поиска
//     const index = {}
//     const center = [0,0];
    
//     // representatives опорные точки (все точки)
    
//     // находим среднюю точку
//     data.representatives.forEach(({id, c}) => {
//         index[id] = c;
//         center[0] += c[0];
//         center[1] += c[1];
//     });
//     center[0] = center[0] / data.representatives.length;
//     center[1] = center[1] / data.representatives.length;
//     console.log(`representatives count: ${data.representatives.length}`)
    
//     // congestion - замедления 
//     data.congestion = data.congestion.map(({f, t, d}) => {
//         const arr = [];
//         for (let i = 0; i < d.length; i += 2) {
//             arr.push(100 - Number(`0x${d[i]}${d[i + 1]}`));
//         }

//         return { f, t, d: arr };
//     })

//     return { data, index, center }
// }

// // async function init() {
// //     // data = await load();
// //     console.log(data)
// // }


// function initialize() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 8,
//         center: {lat: 55.755865, lng: 37.617520},
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });


//     let lines;
//     let markers;

//     function createLines() {
//         markers = Object.keys(data.index).map((key) => {
            
//             return new google.maps.Marker({
//                 position: new google.maps.LatLng(data.index[key][1], data.index[key][0]),
//                 icon: {
//                   path: google.maps.SymbolPath.CIRCLE,
//                   strokeWeight: 2,
//                   scale: 4,

//                 },
//                 // draggable: true,
//                 map,
//               });
//         })
//         lines = data.data.congestion.map(({f, t, d}) => {
//             const from = data.index[f];
//             const to = data.index[t];

//             return {
//                 line: new google.maps.Polyline({
//                     path: [new google.maps.LatLng(from[1], from[0]), new google.maps.LatLng(to[1], to[0])],
//                     strokeColor: "dodgerblue",
//                     strokeOpacity: 1.0,
//                     strokeWeight: 2,
//                     geodesic: true,
//                     map,
//                 }),
//                 data: d
//             }
//         })
//     }

//     function clear() {
//         lines?.forEach((line) => line.line.setMap(null));
//         lines = null;
//         debugger;
//         markers?.forEach((marker) => marker.setMap(null));
//         markers = null;
//     }

//     function changeColor() {
//         lines?.forEach(({line, data}) => {
//             const value = data[range.value];
//             line.setOptions({
//                 strokeColor: `rgb(255,0,0,${value / 100})`,
//                 // strokeWeight: Math.min(value, 1)
//             });
//         })
//     }


//     function onChangeRange() {
//         changeColor()
//         const minutes = range.value * 15;
//         minute = '0' + Math.floor((minutes) % 60),
//         hour =   '0' + Math.floor((minutes / (60)) % 24);
//         day =    Math.floor((minutes / (60 * 24)) % 7);
//         date.innerText = `${week[day]} ${hour.slice(-2)}:${minute.slice(-2)}`;
//     }
    
//     // событеи изменения бегунка
//     range.oninput = onChangeRange

//     file.onchange = ({ target }) => {
//         const reader = new FileReader();
//         reader.readAsText(event.target.files[0], "UTF-8");
//         reader.onload = function (event) {
//             data = parse(JSON.parse(event.target.result));
//             clear();
//             createLines();
//             onChangeRange();
//             map.setCenter(new google.maps.LatLng(data.center[1], data.center[0]))
//         }
//     }

//     clearBtn.onclick = clear;
// }

// google.maps.event.addDomListener(window, 'load', initialize);