<template></template>

<script lang="ts">
import {
	creatGeometry,
	createCamera,
	createGui,
	createState,
	createOrbitControls,
	createBloom,
	createRender,
	animate,
} from '@/types/hooks/PointBillborads';
export default {
	setup() {
		//
		createGui();
		createState();
		//
		creatGeometry();
		createCamera();
		createBloom();
		createRender();
		createOrbitControls();
		animate();
	},
};
</script>

<style scoped>
</style>
