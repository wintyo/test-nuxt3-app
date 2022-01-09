<template>
  <div>
    Hello, Nuxt3!
    <TodoForm @submit="onSubmitTodo" />
    <hr />
    <div>
      <template v-for="(todo, index) in state.todoList">
        <TodoItem :todo="todo" @remove="() => onRemoveTodo(index)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Todo } from '~/types/Todo';
import TodoForm from '~/components/TodoForm.vue';
import TodoItem from '~/components/TodoItem.vue';

type State = {
  todoList: Todo[];
};

export default defineComponent({
  components: {
    TodoForm,
    TodoItem,
  },
  setup() {
    const state = reactive<State>({
      todoList: [],
    });

    return {
      state,
      onSubmitTodo: (todo: Todo) => {
        state.todoList.push(todo);
      },
      onRemoveTodo: (index: number) => {
        state.todoList.splice(index, 1);
      },
    };
  },
});
</script>
