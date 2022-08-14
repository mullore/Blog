<template></template>

<script lang="ts">
import {
  createGeometry,
  createCamera,
  createRender,
  createOrbitControls,
  createRenderPass,
  createLight,
  reSize,
} from '../../types/hooks/UnrealBloom';
export default {
  setup() {
    createCamera();
    createRender();
    createOrbitControls();
    createRenderPass();
    createLight();
    createGeometry();
    reSize();
  },
};
</script>

<style scoped>
</style>