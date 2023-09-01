<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPath } from '@/ipc/app';
import { openPath } from '@/ipc/shell';
import { getSettings, getSettingsPath } from '@/ipc/common';

const settings = ref({});
const settingsPath = ref('');

onMounted(async () => {
  settingsPath.value = await getSettingsPath();
  settings.value = JSON.parse(await getSettings(), null, 2);
});

const open = async () => {
  openPath(await getPath('documents'));
};
</script>

<template>
  <div>
    <button @click="open">open</button>

    <div>{{ settingsPath }}</div>

    <div>{{ settings }}</div>
  </div>
</template>
@/ipc/app
