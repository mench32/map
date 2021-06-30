<script lang="ts">
    import { onMount } from "svelte";
    
	type Item<T> = {
		data: any;
		element: T;
	}
    

    export let range: number;
    export let data: Record<string, any>;
    export let selectedPoint: Item<google.maps.Marker>|null = null;

        $: console.log(data)
    $: console.log(selectedPoint)

    let lines: Item<google.maps.Polyline>[] = [];
    let markers: Item<google.maps.Marker>[] = [];

    let mapElement: HTMLElement;
    let map: google.maps.Map;

    onMount(() => {
        map = new google.maps.Map(mapElement, {
            zoom: 8,
            center: {lat: 55.755865, lng: 37.617520},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    });

	function updteColor(value: number = 0) {
        console.log('updteColor');
        lines.forEach(({element, data}) => {
            element.setOptions({
                strokeColor: `rgb(255,0,0,${data[value] / 100})`,
            });
        })
    }

    function createMarkers(value: Record<string, any>) {
        markers.forEach(({ element }) => element.setMap(null));
        markers = [];

        markers = Object.keys(value.index).map((key) => {
            const element = new google.maps.Marker({
                position: new google.maps.LatLng(value.index[key][1], value.index[key][0]),
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeWeight: 2,
                    scale: 4,
                },
                map,
            });
            google.maps.event.addListener(element, 'click', () => {
                if (selectedPoint?.data === key) {
                    selectedPoint = null;
                } else {
                    selectedPoint = {
                        data: key,
				        element,
                    };
                }
                createLines(data);
                updteColor(range);
            });

            return {
				data: key,
				element,
			}
        });
    }

    function createLines(value: Record<string, any>) {
        console.log('createLinesAndMarkers')
        lines.forEach(({ element }) => element.setMap(null));
        lines = [];

        const tooltip = new google.maps.InfoWindow({
            content: 'message',
        });

        lines = value.data.congestion
            .filter(({ f }) => {
                // debugger;
                return Number(selectedPoint?.data) === f
            })
            .map(({f, t, d}) => {
                const from = value.index[f];
                const to = value.index[t];
                const element = new google.maps.Polyline({
                    path: [new google.maps.LatLng(from[1], from[0]), new google.maps.LatLng(to[1], to[0])],
                    strokeColor: "dodgerblue",
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                    geodesic: true,
                    map,
                })
                google.maps.event.addListener(element, 'click', (event) => {
                    tooltip.close();
                    tooltip.setContent(`value: ${d[range]}`);
                    tooltip.setPosition(event.latLng);
                    tooltip.open(map);
                });  


                return {
                    data: d,
                    element,
                };
            });
    }    


    $: {
        if (data) {
            createLines(data);
            createMarkers(data);
            range = 0
            updteColor();
            map.setCenter(new google.maps.LatLng(data.center[1], data.center[0]))
        }
    }
    $: {
        updteColor(range);
    }
</script>

<div class="map" bind:this={mapElement} />

<style>
	.map {
		flex: 1;
	}
</style>