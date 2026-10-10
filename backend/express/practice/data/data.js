// data/data.js
// Practice data for a Recipe API.
// Use: import { recipes } from './data/data.js'

export const recipes = [
  { id: 1,  name: 'Masala Omelette',cuisine: 'Indian',        category: 'breakfast', difficulty: 'easy',   prepMinutes: 10,  vegetarian: true,  spiceLevel: 2, rating: 4.4, ingredients: ['eggs', 'onion', 'green chilli', 'coriander'] },
  { id: 2,  name: 'Paneer Butter Masala',cuisine: 'Indian',        category: 'dinner',    difficulty: 'medium', prepMinutes: 40,  vegetarian: true,  spiceLevel: 2, rating: 4.8, ingredients: ['paneer', 'tomato', 'butter', 'cream', 'garam masala'] },
  { id: 3,  name: 'Chicken Biryani',cuisine: 'Indian',        category: 'dinner',    difficulty: 'hard',   prepMinutes: 90,  vegetarian: false, spiceLevel: 3, rating: 4.9, ingredients: ['basmati rice', 'chicken', 'yogurt', 'onion', 'saffron'] },
  { id: 4,  name: 'Margherita Pizza', cuisine: 'Italian',       category: 'dinner',    difficulty: 'medium', prepMinutes: 60,  vegetarian: true,  spiceLevel: 0, rating: 4.7, ingredients: ['flour', 'tomato', 'mozzarella', 'basil'] },
  { id: 5,  name: 'Spaghetti Carbonara',cuisine: 'Italian',       category: 'dinner',    difficulty: 'medium', prepMinutes: 25,  vegetarian: false, spiceLevel: 0, rating: 4.6, ingredients: ['spaghetti', 'eggs', 'pancetta', 'parmesan', 'black pepper'] },
  { id: 6,  name: 'Tiramisu', cuisine: 'Italian',       category: 'dessert',   difficulty: 'hard',   prepMinutes: 45,  vegetarian: true,  spiceLevel: 0, rating: 4.9, ingredients: ['mascarpone', 'eggs', 'coffee', 'ladyfingers', 'cocoa'] },
  { id: 7,  name: 'Chicken Tacos',cuisine: 'Mexican',       category: 'lunch',     difficulty: 'easy',   prepMinutes: 30,  vegetarian: false, spiceLevel: 2, rating: 4.5, ingredients: ['chicken', 'tortilla', 'lime', 'onion', 'coriander'] },
  { id: 8,  name: 'Guacamole',cuisine: 'Mexican',       category: 'snack',     difficulty: 'easy',   prepMinutes: 10,  vegetarian: true,  spiceLevel: 1, rating: 4.3, ingredients: ['avocado', 'lime', 'onion', 'tomato', 'coriander'] },
  { id: 9,  name: 'Bean Burrito', cuisine: 'Mexican',       category: 'lunch',     difficulty: 'easy',   prepMinutes: 20,  vegetarian: true,  spiceLevel: 2, rating: 4.2, ingredients: ['black beans', 'tortilla', 'rice', 'cheese', 'salsa'] },
  { id: 10, name: 'Chicken Katsu Curry', cuisine: 'Japanese',      category: 'dinner',    difficulty: 'medium', prepMinutes: 50,  vegetarian: false, spiceLevel: 1, rating: 4.6, ingredients: ['chicken', 'panko', 'curry roux', 'rice', 'carrot'] },
  { id: 11, name: 'Vegetable Sushi Rolls',cuisine: 'Japanese',      category: 'lunch',     difficulty: 'hard',   prepMinutes: 60,  vegetarian: true,  spiceLevel: 0, rating: 4.4, ingredients: ['sushi rice', 'nori', 'cucumber', 'avocado', 'carrot'] },
  { id: 12, name: 'Mochi Ice Cream',cuisine: 'Japanese',      category: 'dessert',   difficulty: 'hard',   prepMinutes: 75,  vegetarian: true,  spiceLevel: 0, rating: 4.7, ingredients: ['glutinous rice flour', 'sugar', 'ice cream', 'cornstarch'] },
  { id: 13, name: 'Green Thai Curry',cuisine: 'Thai',          category: 'dinner',    difficulty: 'medium', prepMinutes: 35,  vegetarian: false, spiceLevel: 3, rating: 4.7, ingredients: ['green curry paste', 'coconut milk', 'chicken', 'basil', 'bamboo shoots'] },
  { id: 14, name: 'Mango Sticky Rice',cuisine: 'Thai',          category: 'dessert',   difficulty: 'medium', prepMinutes: 40,  vegetarian: true,  spiceLevel: 0, rating: 4.8, ingredients: ['sticky rice', 'mango', 'coconut milk', 'sugar'] },
  { id: 15, name: 'Veg Fried Rice',cuisine: 'Chinese',       category: 'lunch',     difficulty: 'easy',   prepMinutes: 20,  vegetarian: true,  spiceLevel: 1, rating: 4.1, ingredients: ['rice', 'carrot', 'peas', 'soy sauce', 'spring onion'] },
  { id: 16, name: 'Kung Pao Chicken', cuisine: 'Chinese',       category: 'dinner',    difficulty: 'medium', prepMinutes: 35,  vegetarian: false, spiceLevel: 3, rating: 4.5, ingredients: ['chicken', 'peanuts', 'dried chilli', 'soy sauce', 'ginger'] },
  { id: 17, name: 'Greek Salad', cuisine: 'Mediterranean', category: 'lunch',     difficulty: 'easy',   prepMinutes: 10,  vegetarian: true,  spiceLevel: 0, rating: 4.2, ingredients: ['cucumber', 'tomato', 'feta', 'olives', 'onion'] },
  { id: 18, name: 'Falafel Wrap',cuisine: 'Mediterranean', category: 'lunch',     difficulty: 'medium', prepMinutes: 45,  vegetarian: true,  spiceLevel: 1, rating: 4.6, ingredients: ['chickpeas', 'parsley', 'garlic', 'pita', 'tahini'] },
  { id: 19, name: 'Pancakes',  cuisine: 'American',      category: 'breakfast', difficulty: 'easy',   prepMinutes: 20,  vegetarian: true,  spiceLevel: 0, rating: 4.5, ingredients: ['flour', 'eggs', 'milk', 'butter', 'maple syrup'] },
  { id: 20, name: 'Chocolate Chip Cookies', cuisine: 'American',      category: 'dessert',   difficulty: 'easy',   prepMinutes: 30,  vegetarian: true,  spiceLevel: 0, rating: 4.8, ingredients: ['flour', 'butter', 'sugar', 'eggs', 'chocolate chips'] }
]