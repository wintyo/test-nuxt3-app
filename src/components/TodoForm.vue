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

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { Todo } from '~/types/Todo';

export default defineComponent({
  emits: {
    submit: (todo: Todo) => todo,
  },
  setup(props, context) {
    const formData = reactive<Todo>({
      title: '',
      detail: '',
    });

    const cmpIsDisabled = computed(() => {
      return formData.title === '' || formData.detail === '';
    });

    return {
      formData,
      cmpIsDisabled,
      onSubmit: (event: Event) => {
        event.preventDefault();
        context.emit('submit', { ...formData });
        formData.title = '';
        formData.detail = '';
      },
    };
  },
});
</script>
