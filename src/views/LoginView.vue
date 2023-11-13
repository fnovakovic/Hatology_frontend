<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email"  maxlength="20" type="email" class="form-control" id="email" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" maxlength="15" type="password" class="form-control" id="password" placeholder="Password">
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import configuration from "../../public/configuration.json";
function escapeHTML(text) {
  const element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.email = escapeHTML(this.email);
      this.password = escapeHTML(this.password);

      axios.post(configuration.apiUrl + "/auth/login", {
        email: this.email,
        password: this.password
      }).then(response => {
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt", response.data.jwt);
          this.$router.push({ name: "orders"});

      });
    }
  }
};
</script>
<style scoped>

</style>
