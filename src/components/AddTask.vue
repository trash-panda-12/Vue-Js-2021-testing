<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label for=""> Task</label>
      <input type="text" name="text" v-model="text" placeholder="Add Task">
    </div>

    <div class="form-control">
      <label for=""> Date</label>
      <input v-model="day" type="text" name="day" placeholder="Add Day & Time">
    </div>

    <div class="form-control form-control-check">
      <label for=""> Set Reminder</label>
      <input type="checkbox" name="reminder" v-model="reminder">
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
  export default {
    name: 'AddTask',


    methods: {
      onSubmit(event) {
        event.preventDefault();
        if (!this.text) {
          alert('Please add a task')
          return
        }

        const newTask = {
          // id: Math.floor(Math.random() * 100000),
          // This is making a new task using the current values on our binded data (the v-model attributes)
          text: this.text,
          day: this.day,
          reminder: this.reminder
        }

        this.$emit('add-task', newTask)

        // Reset the binded fields after we've saved them
        this.text = ''
        this.day = ''
        this.reminder = false

        console.log(newTask)

      }
    },

    // Here we list the data the component uses. These are specified with v-model or :model.
    // This is called "binding" the data
    data() {
      return {
        text: '',
        day: '',
        reminder: false,
      }
    }
  }
</script>

<style scoped>
  .add-form {
    margin-bottom: 40px;
  }
  .form-control {
    margin: 20px 0;
  }
  .form-control label {
    display: block;
  }
  .form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
  }
  .form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form-control-check label {
    flex: 1;
  }
  .form-control-check input {
    flex: 2;
    height: 20px;
  }
</style>