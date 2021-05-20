<template>
  <!-- v-if means show if the variable showAddTask is true -->
  <div v-if="showAddTask">
    <!-- @add-task is a response to an emit from the AddTask component. When it gets emitted, do the addTask function in the method list  -->
    <AddTask @add-task = "addTask" />
  </div>

  <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder"/>
</template>

<script>
  import Tasks from '../components/Tasks'
  import AddTask from '../components/AddTask'
  export default{
    name: 'Home',
    props: {
      showAddTask: Boolean
    },
    components: {
      Tasks,
      AddTask
    },

    data() {
      return {
        tasks: [],
      }
    },

    methods: {
      // Add the task from the event emitter to the current array of tasks ([...this.tasks])
      async addTask(task) {
        const res = await fetch("api/tasks", {
          method: 'POST',
          headers: {
            'Content-type': 'application/JSON',
          },
          body: JSON.stringify(task)
        })

        const data = await res.json();

        this.tasks = [...this.tasks, data]
      },


      async deleteTask(id) {
        if (confirm('Are you sure?')) {
          // We want everything back EXCEPT the ID of the task that emitted the signal
          // this.tasks = this.tasks.filter((task) => task.id !== id )

          const res = await fetch(`api/tasks/${id}`, {
            method: 'DELETE',
            headers: {

            }
          })

          res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert("Error Deleting Task")
        }
      },

      async toggleReminder(id){
        const taskToToggle = await this.fetchTask(id);
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(updTask)
        })

        const data = await res.json()

        // We Map every single one in the array, but only change the one tat matches the specific ID of the components that triggered it
        this.tasks = this.tasks.map( (task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )

      },

      async fetchTasks() {
        const res = await fetch("api/tasks")
        const data = await res.json()
        return data
      },

      async fetchTask(id) {
        const res = await fetch(`api/tasks/${id}`)
        const data = await res.json()
        return data
      }

    },

    async created() {
      this.tasks = await this.fetchTasks()
    },
  }
</script>