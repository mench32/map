<script lang="ts">
    const week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    export let value: number;
    let message: string = '';

    $: {
        if (typeof value === 'number') {
            const minutes = value * 15;
            const minute = '0' + Math.floor((minutes) % 60);
            const hour =   '0' + Math.floor((minutes / (60)) % 24);
            const day =    Math.floor((minutes / (60 * 24)) % 7);
            message = `${week[day]} ${hour.slice(-2)}:${minute.slice(-2)}`;
        } else {
            message = '';
        }
    }
</script>
<div class="range">
    <div class="message">{message}</div>
    <input on:change bind:value type="range" min={0} max={671} step={1} />
</div>
<style>
input {
    flex: 1;
    margin: 0;
    
}
.message {
    width: 100px;
}
.range {
    display: flex;
    align-items: center;
}

</style>

