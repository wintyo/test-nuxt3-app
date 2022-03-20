<script setup lang="ts">
import SetupTodoFormByPug from '~/components/SetupTodoFormByPug.vue';
import SetupTodoItemByPug from '~/components/SetupTodoItemByPug.vue';

import { reactive } from 'vue';
import { Todo } from '~/types/Todo';

type State = {
  todoList: Todo[];
};

const state = reactive<State>({
  todoList: [],
});

const onSubmitTodo = (todo: Todo) => {
  state.todoList.push(todo);
};

const onRemoveTodo = (index: number) => {
  state.todoList.splice(index, 1);
};
</script>

<template lang="pug">
div
  | Hello, Nuxt3! (Using setup by pug)
  SetupTodoFormByPug(@submit="onSubmitTodo")
  hr
  div
    template(v-for="(todo, index) in state.todoList")
      SetupTodoItemByPug(
        :todo="todo"
        @remove="() => onRemoveTodo(index)"
      )
</template>
