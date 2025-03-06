import { createApp } from 'vue'
import App from './App.vue'
import FoodItem from './components/FoodItem.vue'
import Country from './components/Country.vue'
import CommentForm from './components/CommentForm.vue'
import Comment from './components/Comment.vue'

const app = createApp(App)
app.component('food-item', FoodItem)
app.component('country', Country)
app.component('comment-form', CommentForm)
app.component('comment', Comment)
app.mount('#app')