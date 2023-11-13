<template>
  <div class="main">
    <p class="title">Orders:</p>
    <div class="table-container">
      <table class="table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Answer</th>

        </tr>

        <tr class="item" v-for="item in Contacts" :key="item.id">
          <td @click="inspect(item.name, item.email,item.comment)">{{ item.name }}</td>
          <td @click="inspect(item.name, item.email,item.comment)">{{ item.email }}</td>

          <button @click="deleteContact(item.userId)" class="orange-button">Delete</button>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import configuration from "../../public/configuration.json";


export default {

  data: () => ({
    Contacts: [],
    DeliveredOrders: [],
  }),
  methods: {

    getAllContacts() {
      const jwtToken = localStorage.getItem('jwt');

      if (jwtToken) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };

        axios.get(configuration.apiUrl + "/api/contact/all", { headers: headers })
            .then((response) => {
              this.Contacts = response.data;
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });
      } else {
        // Handle the case where 'jwt' token is not available in localStorage
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }


    },
    deleteContact(id) {
      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };
        const body = {
          userId: id
        }

        axios.post(configuration.apiUrl + "/api/contact/delete", body,{ headers: headers })
            .then((response) => {
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });
      } else {
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }


    },
    inspect(name,email,comment) {
      this.$router.push({
        name: "singleContact",
        params: {
          name: name,
          email: email,
          comment: comment
        }
      });
    },

  },

  mounted() {
    this.getAllContacts();
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  max-width: 1270px;
  margin: auto;
  padding: 20px;
}

.row {
  padding: 15px 0;
}

.title {
  color: black; /* Orange color */
  font-size: 1.21875rem;
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #f56a25; /* Orange border */
}

th {
  background-color: #f56a25; /* Orange background */
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #f56a25;
  color: black; /* Black text */
}

tr {
  background-color: #808080; /* Black background */
  border-bottom: 1px solid #f56a25;
  color: white; /* White text */
}

tr:nth-child(even) {
  background-color: #808080; /* Dark gray background */
}

td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #f56a25;
  color: white; /* White text */
}

/* Style for the "Deliver" button */
.orange-button {
  background-color: #f56a25; /* Orange background */
  color: black; /* Black text */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 5px; /* Add some spacing between buttons */
}

.orange-button:hover {
  background-color: #f56a25; /* Slightly darker orange on hover */
}

/* Style for the "Delete" button */
.black-button {
  background-color: #f56a25; /* Black background */
  color: black; /* Orange text */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-top: 5px; /* Add some spacing between buttons */
}
.table-container {
  overflow-x: auto; /* Enable horizontal scroll */
  margin-bottom: 20px; /* Add some spacing to prevent overflow */
}

</style>


<!--.black-button:hover {-->
<!--background-color: #808080; /* Dark gray background on hover */-->
<!--}-->
