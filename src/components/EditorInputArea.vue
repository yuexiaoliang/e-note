<script setup lang="ts">
import { ref } from 'vue';
import { debounce } from 'lodash-es';
import { useEditor } from '@/hooks/editor';
import { getCompletion } from '@/apis/openai';

const editorState = useEditor();
const { editorValue } = editorState;

const textRef = ref();
const loading = ref(false);

const onEnter = debounce(async () => {
  loading.value = true;
  const cursorEnd = textRef.value.selectionEnd;
  const frontValue = editorValue.value.substring(0, cursorEnd + 1);
  const followingValue = editorValue.value.substring(cursorEnd);

  try {
    const {
      data: { choices }
    } = await getCompletion(frontValue);
    const content = choices[0].message.content;
    editorValue.value = frontValue + content + followingValue;
  } finally {
    loading.value = false;
  }
}, 500);
</script>

<template>
  <div class="editor-area">
    <textarea v-model="editorValue" ref="textRef" class="editor-area-text" @keydown.enter="onEnter"></textarea>
  </div>

  <div v-if="loading" class="loading">AI助手正在编写中...</div>
</template>

<style lang="scss" scoped>
.editor-area {
  flex: 1;
  position: relative;
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

.loading {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  background-color: yellow;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
