<template>
  <ul class="error-messages">
    <template v-for='(messages,field) in errors'>
      <li :key='index' v-for='(message,index) in messages'>{{field}} {{message}}</li>
    </template>
  </ul>
</template>
<script>
export default {
  props:{
    errors:{
      required:true,
      type:Object
    }
  }
}
</script>