<template />

<script lang="ts">
import {
    createGeometry,
    createCamera,
    createRender,
    animate,
    createListen,
} from '@/types/hooks/pointSprites';
export default {
    setup() {
        createGeometry();
        createCamera();
        createRender();
        createListen();
        animate();
    },
};
</script>

<style>
</style>
