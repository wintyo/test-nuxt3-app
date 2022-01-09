<script setup lang="ts">
import { Todo } from '~/types/Todo';

type Props = {
  todo: Todo;
};

const props = defineProps<Props>();

const emit = defineEmits({
  remove: undefined,
});
</script>

<template>
  <div class="component-todo-item">
    <div class="component-todo-item__title">{{ props.todo.title }}</div>
    <div>{{ props.todo.detail }}</div>
    <div class="close" @click="emit('remove')"></div>
  </div>
</template>

<style lang="scss" scoped>
.component-todo-item {
  position: relative;
  padding: 8px;
  border: solid 1px #ccc;

  & + & {
    margin-top: 10px;
  }
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    content: '';
    width: 15px;
    height: 3px;
    background-color: #aaa;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
}
</style>
