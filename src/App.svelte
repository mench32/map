<script lang="ts">
    import File from './File.svelte';
    import Range from './Range.svelte';
	import Map from './Map.svelte';
    
    let data: Record<string, any>;
	let range: number = 0;
</script>

<div class="layout">
    <File bind:data />
    <Range bind:value={range} />
    <Map {data} bind:range />
</div>    

<style>
    .layout {
        display: flex;
        flex-direction: column;
        align-items: stretch;
		height: 100%;
    }
</style>