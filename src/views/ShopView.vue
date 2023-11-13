<template>
  <div>
<!--    <header class="bg-dark text-white py-5">-->
<!--      <div class="container">-->
<!--        <h1 class="text-center">Product Catalog</h1>-->
<!--      </div>-->
<!--    </header>-->

    <div class="container-fluid mt-4">
      <div class="row">
        <nav class="col-md-3 sidebar bg-dark text-white">
          <h1 class="mt-4">Shop Categories</h1>
              <button @click="getAllProducts()">All</button>
          <div v-for="item in Categories" :key="item.id" class="list-unstyled">
              <button @click="getCategory(item)"> {{item}}</button>
          </div>
        </nav>


          <div class="col-md-9">
            <div class="row">
              <div class="col-md-4" v-for="item in Products" :key="item.id">
                <button v-if="isDisabled" v-on:click="editProduct(item)">Edit</button>
            <section class="shoe-section">
                <div v-on:click="singleProductPreviev(item.name, item.description, item.imageData,item.price,item.id)" class="card product-card">

                  <img :src="getFirstImage(item.imageData)" >

                  <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <div class="product-details">
                      <div class="product-price">{{ item.price }}</div>
                    </div>

                  </div>
                </div>

            </section>
              </div>
            </div>
          </div>

      </div>
    </div>
    <footer class="bg-dark text-white text-center py-3">
      &copy; 2021 Product Catalog. All rights reserved.
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import configuration from "../../public/configuration.json";

export default {
  data: () => ({
    Products: [],
    Products2: [],
    Categories: new Set(),
    isDisabled: false,
  }),
  methods: {
    getAllProducts() {

        const headers = {
          'Content-Type': 'application/json',
        };
        axios.get(configuration.apiUrl + "/api/product/all",{headers: headers})
            .then((response) => {
              this.Products = response.data;

              this.Products2 = response.data;

              this.Products2.forEach(value => {
                this.Categories.add(value.category);
              });

            })
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });
    },
    async checkPrivilages() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        try {
          const response = await axios.get(configuration.apiUrl + "/api/users/check", { headers: headers });
          this.User = response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('JWT token not found in localStorage. You may want to redirect to a login page or take appropriate action.');
      }

      if (this.User.adminPermission == "1") {
        this.isDisabled = !this.isDisabled;
      }
    },
    getCategory(item) {

      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        category: item
      };
      axios.post(configuration.apiUrl + "/api/product/getAllByCategory",body,{headers: headers})
          .then((response) => {
            this.Products = response.data;
          })
          .catch((error) => {
            // Handle errors
            console.error('Error:', error);
          });
    },
    editProduct(item) {
      this.$router.push({
        name: "editPage",
        params: {
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          checkedNew:item.checkedNew,
          id:item.id,
        }

      });

    },
    singleProductPreviev(name, description, imageData, price, id) {
      let modifiedImageData = imageData.trim().replace(/,$/, '');

      const imageArray = [];

      modifiedImageData.split(',').forEach(image => {
        imageArray.push(image);
      });

      this.$router.push({
        name: "singleProduct",
        params: {
          name: name,
          description: description,
          imageData: imageArray,
          price: price,
          id: id,
        }
      });
    },
    getFirstImage(imageData) {
      if (imageData) {
        const imageArray = imageData.split(',');
        return imageArray[0]; // return the first image
      }
      return ''; // return a default value or handle appropriately
    }

  },
  mounted() {
    this.getAllProducts()
    this.checkPrivilages()
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.shoe-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.shoe-box img {
  max-width: 100%;
}

.shoe-box h2 {
  margin-top: 10px;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  align-items: stretch;
}

.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
}

.sidebar h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  width: 100%; /* Set the width to 100% to make the content wider */
}

.shoe-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Add this to space out the shoes evenly */
  gap: 20px;
  padding: 20px;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  width: 100%; /* Make each shoe box wider */
  border-radius: 5px; /* Add rounded corners */
}


.product-image {
  width: 100%;
  height: 200px; /* Increase the height to accommodate larger images */
  background-size: contain;
  background-position: center;
  border-radius: 5px 5px 0 0;
}

.card-title {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.product-description {
  color: #888;
  margin-top: 10px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.product-price {
  font-weight: bold;
}

.shoe-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  width: 300px; /* Increase the width to make each shoe card wider */
  border-radius: 5px;
}



.card-title {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.product-description {
  color: #888;
  margin-top: 10px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.product-price {
  font-weight: bold;
}


</style>