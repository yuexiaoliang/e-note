<script setup lang="ts">
import { useEditor } from '@/hooks/editor';

const editorState = useEditor();
const { editorValue } = editorState;
</script>

<template>
  <div class="editor-area">
    <textarea v-model="editorValue" class="editor-area-text"></textarea>
  </div>
</template>

<style lang="scss" scoped>
.editor-area {
  flex: 1;
  height: 100%;
  border-right: 1px solid #333;

  &-text {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 1rem;
    line-height: 1.5;
    border: none;
    outline: none;
    resize: none;
  }
}
</style>
