<script setup lang="ts">
import { useEditor } from '@/hooks/editor';

const editorState = useEditor();
const { editorHTML } = editorState;
</script>

<template>
  <div v-html="editorHTML" class="editor-preview markdown-body"></div>
</template>

<style lang="scss" scoped>
.editor-preview {
  flex: 1;
  height: 100%;
  padding: 10px;
}
</style>
