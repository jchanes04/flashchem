<script lang="ts">
	import type { SetInfo } from "$lib/client";

    export let item: SetInfo = undefined
    export let isActive = false
    export let isHover = false

    let itemClasses = '';
	
	$: {
		const classes = []
		
		if (isActive) {
			classes.push('active')
		}
		if (isHover) {
			classes.push('hover')
		}
		itemClasses = classes.join(' ')
	}
</script>

<div class="select-item {itemClasses}">
    <div>
		{item.type.toUpperCase()} - {item.name}
	</div>
	<div>
		{item.difficulty.toUpperCase()}
	</div>
</div>

<style lang="scss">
	.select-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 28px;
		line-height: 28px;
        padding: 0 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

		* {
			display: inline-block;
		}
	}

	.active {
		background-color: var(--button-1);
	}

	.hover {
		background-color: var(--button-1-hover);
	}
</style>