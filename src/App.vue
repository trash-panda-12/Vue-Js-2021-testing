<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask()" />



    <!-- v-if means show if the variable showAddTask is true -->
    <div v-if="showAddTask">
      <!-- @add-task is a response to an emit from the AddTask component. When it gets emitted, do the addTask function in the method list  -->
      <AddTask @add-task = "addTask" />
    </div>

    <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },

  data() {
    return {
      tasks: [],
      showAddTask: false,
    }
  },

  methods: {
    // Add the task from the event emitter to the current array of tasks ([...this.tasks])
    addTask(task) {
      this.tasks = [...this.tasks, task]
    },


    deleteTask(id) {
      if (confirm('Are you sure?')) {
        // We want everything back EXCEPT the ID of the task that emitted the signal
        this.tasks = this.tasks.filter((task) => task.id !== id )
      }
    },
    toggleReminder(id){
      // We Map every single one in the array, but only change the one tat matches the specific ID of the components that triggered it
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task )
    },
    toggleAddTask() {
      this.showAddTask = !(this.showAddTask)
    }
  },

  created() {
    this.tasks = [
      {
        id: 1,
        text: 'Doctors Apppointment',
        day: 'March 1st 2021',
        reminder: true,
      },
      {
        id: 2,
        text: 'Parents Apppointment',
        day: 'March 22st 2021',
        reminder: false,
      },
      {
        id: 3,
        text: 'Dentist',
        day: 'March 33st 2021',
        reminder: true,
      },
    ]
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
