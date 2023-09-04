import { ref, computed } from 'vue';
import { marked } from 'marked';
import { editorText } from './mock';

const editorValue = ref(editorText);

export const useEditor = () => {
  const editorHTML = computed(() => marked.parse(editorValue.value));

  return {
    editorValue,
    editorHTML
  };
};
