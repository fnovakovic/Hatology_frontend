<template>
  <div class="container">
    <h1 class="display-4 mb-4">Contact Us</h1>
    <form @submit="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" maxlength="30" class="form-control" >
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" maxlength="30" v-model="email" class="form-control" >
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea type="textarea" id="message" maxlength="100" v-model="comment" class="form-control" ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import configuration from "../../public/configuration.json";
function escapeHTML(text) {
  const element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}
export default {
  data() {
    return {
      name: '',
      email: '',
      comment: '',
    };
  },
  methods: {
    submitForm() {

      this.name = escapeHTML(this.name);
      this.email = escapeHTML(this.email);
      this.comment = escapeHTML(this.comment);

      const body = {
        name: this.name,
        email: this.email,
        comment: this.comment
      }
        const headers = {
          'Content-Type': 'application/json',
        };

        axios.post(configuration.apiUrl + "/api/contact/createContact", body,{ headers: headers })
            .then((response) => {

            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });

      this.$router.push({
        name: "mainPage"
      });
    },
  },
};
</script>

<style scoped>
/* Add custom CSS to style the contact form */
.container {
  padding: 20px;
  text-align: center;
}

.contact-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  padding: 10px;
}

.btn-primary {
  background-color: #f56a25;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #f44a05;
}
</style>
