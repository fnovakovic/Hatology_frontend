<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="main">

        <div class="form-group">
          <p>Name</p>
        <input type="text" v-model="namee" maxlength="20" class="input-field" placeholder="Name">
        </div>

          <div class="form-group">
            <p>Price</p>
        <input type="number" v-model="pricee" class="input-field" placeholder="Price">
          </div>



        <div class="form-group">
          <p>Category</p>
          <input type="text" v-model="categoryy"  maxlength="15" list="browsers" name="browser" class="form-control" placeholder="Select or type a category">
          <datalist id="browsers" class="custom-datalist">
            <option v-for="item in Categories" :key="item.id" :value="item">{{ item }}</option>
          </datalist>
        </div>

        <p>Check</p>
        <label class="container">Yes
          <input v-model="checkedNeww"  type="radio" checked="checked" value="Yes" name="radio">
        </label>
        <label class="container">No
          <input v-model="checkedNeww" type="radio" checked="checked" value="No" name="radio">
        </label>

        <div class="form-group">
          <p>Description</p>
          <textarea type="textarea" v-model="descriptionn" maxlength="150"  class="form-control" placeholder="Description"></textarea>
        </div>

        <button @click="back" class="orange-button">Return</button>
        <button @click="deleteProduct()" class="orange-button">Delete</button>
        <button @click="editProduct()" class="orange-button">Edit</button>
      </div>
    </div>
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
  data: () => ({
    namee: "",
    categoryy: "",
    pricee: "",
    checkedNeww: "",
    descriptionn: "",
    Products: [],
    Categories: new Set()

  }),
  props: {
    name: String,
    price: String,
    description: String,
    category: String,
    checkedNew: String,
    id: Number,
  },
  methods: {
    back() {
      this.$router.push({ name: "shop" });
    },
    deleteProduct() {
      const jwtToken = localStorage.getItem('jwt');

      if (jwtToken) {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      };
      const body = {
        id: this.id

      };
      axios.post(configuration.apiUrl + "/api/product/removeProduct",body,{headers: headers})
          .then((response) => {
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });

      this.back()
      } else {
      console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }


    },
    async editProduct() {
      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken) {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      };

        this.namee = escapeHTML(this.namee);
        this.descriptionn = escapeHTML(this.descriptionn);
        this.pricee = escapeHTML(this.pricee);
        this.categoryy = escapeHTML(this.categoryy);



      const body = {
        id:this.id,
        name:this.namee,
        description:this.descriptionn,
        price:this.pricee,
        category:this.categoryy,
        checkedNew:this.checkedNeww,
        previousPrice:this.price,

      };

       await axios.post(configuration.apiUrl + "/api/orders/updatePrice",body,{headers: headers})
            .then((response) => {
            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });


      axios.post(configuration.apiUrl + "/api/product/updateProduct",body,{headers: headers})
          .then((response) => {
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });




      this.back()
      } else {
      console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }


    },getAllProducts() {
      const headers = {
        'Content-Type': 'application/json',
      };
      axios.get(configuration.apiUrl + "/api/product/all",{headers: headers})
          .then((response) => {
            this.Products = response.data;

            this.Products.forEach(value => {
              this.Categories.add(value.category);
            });

          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });



    },
  },
  mounted() {
    this.namee = this.name;
    this.pricee = this.price;
    this.descriptionn = this.description;
    this.categoryy = this.category;
    this.checkedNeww = this.checkedNew;
    this.getAllProducts()
  }
};
</script>

<style scoped>
.main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #f56a25; /* Orange border */
  border-radius: 5px;
  background-color: #808080; /* Black background */
  box-shadow: black;
  color: black; /* White text */
}

.input-field {
  margin: 8px 0;
  font-size: 1.2rem;
  padding: 5px; /* Add padding */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px;
}

button {
  background-color: #f56a25; /* Orange background */
  color: black; /* Black text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f56a25; /* Slightly darker orange on hover */
}
</style>
