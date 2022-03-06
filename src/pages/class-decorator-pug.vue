<template lang="pug">
div
  | Hello, Nuxt3! (Using class decorator)
  ClassDecoratorTodoFormByPug(@submitTodo="onSubmitTodo")
  hr
  div
    template(v-for="(todo, index) in todoList")
      ClassDecoratorTodoItemByPug(
        :todo="todo"
        @remove="onRemoveTodo(index)"
      )
</template>

<script lang="ts">
// vue-tscでは型チェックは中途半端
import { Options, Vue } from 'vue-class-component';
import ClassDecoratorTodoFormByPug from '~/components/ClassDecoratorTodoFormByPug.vue';
import ClassDecoratorTodoItemByPug from '~/components/ClassDecoratorTodoItemByPug.vue';

import { Todo } from '~/types/Todo';

@Options({
  components: {
    ClassDecoratorTodoFormByPug,
    ClassDecoratorTodoItemByPug,
  },
})
export default class ClassDecoratorPageByPug extends Vue {
  todoList: Todo[] = [];

  onSubmitTodo(todo: Todo) {
    this.todoList.push(todo);
  }

  onRemoveTodo(index: number) {
    this.todoList.splice(index, 1);
  }
}
</script>

<style lang="scss" scoped>
//
</style>
