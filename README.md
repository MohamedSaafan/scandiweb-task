# Small E-Commerce Application

## Deployments

This project is deployed in vercel and available to preview here [click to preview the output](https://scandiweb-task-self.vercel.app/products).
It's backend is a simple graphql server hosted in heroku at that [link](https://sleepy-waters-11578.herokuapp.com/)

**Note** if you want to run the application **_locally_** then you have to clone [this](https://github.com/scandiweb/junior-react-endpoint) repo and run it on your **local** machine before you run the project.

## Features

- Fetching all products from the graphql API and listing at at the `/products` route.

- Global currency which the website calculate and display prices based on.
- Ability to filter all the products based on their category.
- Ability to see all the product details under `/products/${id}` route.
- Ability to add an item to cart.
- Ability to view cart items under `/cart` or via the cart-overlay componet by clicking the **cart** item in the navbar
- Abilit to increase and decrease the amount of each product in the cart.
- having a small cart layout component.
- displaying the status (whether it's in stock or not) of each product in the product-list page
- item's on the cart won't be added to the cart again , rather it will display a piece of info indicating it's **_already_** in the cart
