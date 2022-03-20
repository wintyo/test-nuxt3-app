<script setup lang="ts">
import SetupTodoForm from '~/components/SetupTodoForm.vue';
import SetupTodoItem from '~/components/SetupTodoItem.vue';

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

<template>
  <div>
    Hello, Nuxt3! (Using setup)
    <SetupTodoForm @submit="onSubmitTodo" />
    <hr />
    <div>
      <template v-for="(todo, index) in state.todoList">
        <SetupTodoItem :todo="todo" @remove="() => onRemoveTodo(index)" />
      </template>
    </div>
  </div>
</template>
