<template>
  <div :key="task.id" v-for="task in tasks">
    <h3>
      <Task @toggle-reminder="$emit('toggle-reminder', task.id)" :task="task" @delete-task="$emit('delete-task', task.id)" />
    </h3>
  </div>
</template>

<script>
import Task from './Task'

export default {
  name: 'tasks',
  props: {
    tasks: Array,
  },
  components: {
    Task,
  },
  emits: ['delete-task', 'toggle-reminder'],
}
</script>
