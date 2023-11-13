import {createRouter, createWebHashHistory} from 'vue-router'
import MainPage from "@/components/MainPage.vue";
import AddProductView from "@/views/addProductView.vue";
import OrdersView from "@/views/OrdersView.vue";
import LoginView from "@/views/LoginView.vue";
import SingleOrderView from "@/views/SingleOrderView.vue";
import SingleProductView from "@/views/SingleProductView.vue";
import ShopView from "@/views/ShopView.vue";
import ContactPageView from "@/views/ContactPageView.vue";
import OrderProductView from "@/views/OrderProductView.vue";
import ContactsPageView from "@/views/ContactsPageView.vue";
import SingleContactView from "@/views/SingleContactView.vue";
import EditPageView from "@/views/EditPageView.vue";

const routes = [
  {
    path: '/mainPage',
    name: 'mainPage',
    component: MainPage
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProductView
  },
  {
    path: '/orderProduct',
    name: 'orderProduct',
    component: OrderProductView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  },{
    path: '/contactPage',
    name: 'contactPage',
    component: ContactPageView
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsPageView
  },
  {
    path: '/name/:name/email/:email/comment/:comment',
    name: 'singleContact',
    component: SingleContactView,
    props: (route) => ({
      name: route.params.name,
      email: route.params.email,
      comment: route.params.comment,

    })
  },
  {
    path: '/name/:name/price/:price/description/:description/category/:category/checkedNew/:checkedNew/id/:id',
    name: 'editPage',
    component: EditPageView,
    props: (route) => ({
      name: route.params.name,
      price: route.params.price,
      description: route.params.description,
      category: route.params.category,
      checkedNew: route.params.checkedNew,
      id: route.params.id,

    })
  },
  {
    path: '/name/:name/description/:description/imageData/:imageData+/price/:price/id/:id',
    name: 'singleProduct',
    component: SingleProductView,
    props: (route) => ({
      name: route.params.name,
      description: route.params.description,
      // count: route.params.count,
      imageData: route.params.imageData,
      price: route.params.price,
      id: route.params.id,

    })
  },
  {
    path: '/firstName/:firstName/lastName/:lastName/email/:email/number/:number/adress/:adress/dateAndTime/:dateAndTime/delivered/:delivered/deliveredTime/:deliveredTime/needToPay/:needToPay/products/:products*/products2/:products2*',
    name: 'singleOrderView',
    component: SingleOrderView,
    props: (route) => ({
      firstName: route.params.firstName,
      lastName: route.params.lastName,
      email: route.params.email,
      number: route.params.number,
      adress: route.params.adress,
      dateAndTime: route.params.dateAndTime,
      delivered: route.params.delivered,
      deliveredTime: route.params.deliveredTime,
      needToPay: route.params.needToPay,
      products:route.params.products,
      products2:route.params.products2
    }),
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
