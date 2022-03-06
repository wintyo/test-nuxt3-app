<template lang="pug">
div
  form(@submit="onSubmit")
    input(
      v-model="title"
      type="text"
      placeholder="タイトル"
    )
    br
    textarea(
      v-model="detail"
      placeholder="詳細"
    )
    br
    button(
      :disabled="cmpIsDisabled"
    ) 登録
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Todo } from '~/types/Todo';

@Options({
  emits: {
    submitTodo: (todo: Todo) => !!todo,
  },
})
export default class ClassDecoratorTodoFormByPug extends Vue {
  title = '';
  detail = '';

  get cmpIsDisabled() {
    return this.title === '' || this.detail === '';
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.$emit('submitTodo', {
      title: this.title,
      detail: this.detail,
    });
    this.title = '';
    this.detail = '';
  }
}
</script>

<style lang="scss" scoped>
//
</style>
