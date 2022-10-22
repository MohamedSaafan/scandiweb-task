# Small E-Commerce Application

## Table of content

- [Features](#features)
- [Preview screen shots](#preview-screen-shots)
- [Live preview](#live-preview)
- [Running locally](#running-locally)

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

## Preview screen shots

![products preview](/docs/products.png "products listing page")
![currency selector preview](/docs/currency.png "global currency selector dropdown")
![cart-overlay preview](/docs/cart-overlay.png "mini cart overlay component")
![cart preview](/docs/cart.png " cart listing page")

## Live Preview

This project is deployed in vercel and available to preview here [click to preview the output](https://scandiweb-task-self.vercel.app/products).
It's backend is a simple graphql server hosted in heroku at that [link](https://sleepy-waters-11578.herokuapp.com/)

## Running Locally

- Install the dependencies using `npm install`
- clone [this](https://github.com/scandiweb/junior-react-endpoint) repo and run it on your **local** machine before you run the project.
  - **_ to run this Graphql project follow these steps _**
  - make sure that you have `yarn` installed in your computer
  - run the command `yarn ` to install the dependencies
  - run the command `yarn build` to build the project
  - run the command ` yarn start` to start the graphql server
- then run ` npm start` to run the project
