<template></template>

<script lang="ts">
import {
    attribute,
    createGeometry,
    createCamera,
    createRender,
    createListener,
    render,
    animate,
} from '../../types/hooks/pointsWanves';
export default {
    setup() {
        attribute();
        createGeometry();
        createCamera();
        createRender();
        createListener();
        render();
        animate();
    },
};
</script>

<style>
</style>
