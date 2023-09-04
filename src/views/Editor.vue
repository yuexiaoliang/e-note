<script setup lang="ts">
import InputArea from '@/components/EditorInputArea.vue';
import PreviewArea from '@/components/EditorPreviewArea.vue';
</script>

<template>
  <div class="view-editor">
    <InputArea />
    <PreviewArea />
  </div>
</template>

<style lang="scss" scoped>
.view-editor {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
