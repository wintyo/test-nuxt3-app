<script setup lang="ts">
import { reactive, computed } from 'vue';
import { Todo } from '~/types/Todo';

const emit = defineEmits({
  submit: (todo: Todo) => todo,
});

const formData = reactive<Todo>({
  title: '',
  detail: '',
});

const cmpIsDisabled = computed(() => {
  return formData.title === '' || formData.detail === '';
});

const onSubmit = (event: Event) => {
  event.preventDefault();
  emit('submit', { ...formData });
  formData.title = '';
  formData.detail = '';
};

defineExpose({
  formData,
  onSubmit,
});
</script>

<template>
  <div>
    <form @submit="onSubmit">
      <input v-model="formData.title" type="text" placeholder="タイトル" />
      <br />
      <textarea v-model="formData.detail" placeholder="詳細" />
      <br />
      <button :disabled="cmpIsDisabled">登録</button>
    </form>
  </div>
</template>
