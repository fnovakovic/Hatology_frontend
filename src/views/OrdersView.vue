<template>
  <div class="main">
    <p class="title">Orders:</p>
    <div class="table-container">
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Last name</th>
        <th>Email</th>
        <th>Number</th>
        <th>Address</th>
        <th>DateTime</th>
        <th>Delivered</th>
        <th>Deliver</th>
      </tr>

      <tr class="item" v-for="item in Orders" :key="item.id">
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.firstName }}</td>
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.lastName }}</td>
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.email }}</td>
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.number }}</td>
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.adress }}</td>
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.dateTime }}</td>
        <td @click="inspect(item.firstName, item.lastName, item.email, item.number, item.adress, item.dateTime, item.delivered, '',item.productName,item.quantity,item.needToPay,item.productPrice,item.products)">{{ item.delivered }}</td>
        <button @click="deliverOrder(item)" class="orange-button">Deliver</button>
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
    Orders: [],
    Ord: [],
    DeliveredOrders: [],
    Arr: [],
  }),
  methods: {

    async getAllOrders() {
      const jwtToken = localStorage.getItem('jwt');

      if (jwtToken) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };

       await axios.get(configuration.apiUrl + "/api/orders/all", { headers: headers })
            .then((response) => {
              this.Orders = response.data;
              this.Ord = response.data;
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });

        this.removeOrdersWithoutTheProduct();
      } else {
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }


    },
    removeOrdersWithoutTheProduct(){

      const jwtToken = localStorage.getItem('jwt');

      if (jwtToken) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };
        for (const tmp of this.Ord) {
            if(tmp.products === undefined || tmp.products.length === 0){
              const body = {
                id: Number(tmp.userId)
              };
              axios.post(configuration.apiUrl + "/api/orders/removeOrder",body, { headers: headers })
                  .then((responsee) => {
                    this.fetchAgain()
                  })
                  .catch((error) => {
                    // Handle errors
                    console.error('Error:', error);
                  });
            }

        }
      } else {
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }

    },
    fetchAgain() {
      const jwtToken = localStorage.getItem('jwt');

      if (jwtToken) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };

        axios.get(configuration.apiUrl + "/api/orders/all", { headers: headers })
            .then((response) => {
              this.Orders = response.data;
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });
      } else {
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }


    },
     deliverOrder(item){
      const jwtToken = localStorage.getItem('jwt');
      const body = {
        userId: item.userId
      }
      if (jwtToken) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        };

        axios.post(configuration.apiUrl + "/api/orders/delete", body,{ headers: headers })
            .then((response) => {
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });
        }
    },
    inspect(firstName,lastName, email,number, adress, dateAndTime, delivered,deliveredTime,productName,quantity,needToPay,productPrice,products) {

      if(deliveredTime == ""){
        deliveredTime = "Not sent";
      }
      const imageArray = [];
      const imageArray2 = [];

      for (const tmp of products) {
        imageArray.push(tmp.name);
        imageArray2.push(tmp.price);
      }

      this.$router.push({
        name: "singleOrderView",
        params: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          number: number,
          adress: adress,
          dateAndTime: dateAndTime,
          delivered: delivered,
          deliveredTime: deliveredTime,
          needToPay: needToPay,
          products: imageArray,
          products2: imageArray2
        }

      });
    },

  },

  mounted() {
    this.getAllOrders();

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
