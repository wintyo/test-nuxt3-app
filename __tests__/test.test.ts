import { mount } from '@vue/test-utils';
import TodoForm from '~/components/TodoForm.vue';
import SetupTodoForm from '~/components/SetupTodoForm.vue';
import Page from '~/pages/index.vue';

describe('テスト', () => {
  it('テスト', () => {
    const wrapper = mount(TodoForm);
    console.log(wrapper.vm.onSubmit);
  });
});
