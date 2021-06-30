<script lang="ts">
    import { parse } from './parser'
    export let data: any;

    function onChange(event: any): void {
        const reader = new FileReader();
        reader.readAsText(event.target.files[0], "UTF-8");
        reader.onload = function (event) {
            data = parse(JSON.parse(event.target.result));
        }
    }
</script>

<input on:change={onChange} type="file" />