<template>
  <div class="app-container">
    <div class="top-var">
      <div class="site-mark">Logbook Activities</div>
      <div class="auth-user">
        <img class="user-avatar" src="" alt="" />
        <div class="user-name">
          Name
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
