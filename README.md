# A Food Ordering App

![alt text](<Screenshot 2024-04-22 at 9.48.58 PM.png>)

This is a simple food ordering app that allows users to order food from a restaurant. The app has a menu that displays the food items available for order. The user can select the food items they want to order and add them to their cart. The user can also view their cart and remove items from it. Once the user is done selecting their food items, they can place their order and view a summary of their order.

## Features

- User authentication
- Menu with food items available for order
- Cart to add and remove food items
- Order summary
- Admin can add, update, and delete food items
- Admin can change order status
- User is notified when their order is ready
- User can view order history
- Stripe payment integration

## Technologies Used

- React native
- TypeScript
- Supabase
- Expo
- Docker
- PostgreSQL
- Stripe

## Installation

1. Install node modules

    ```bash
    yarn
    ```

2. Start the app
    Make sure docker is running on the background

    ```bash
    npx supabase start
    ```

3. Set up Enviroment Variables

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your Supabase URL, Supabase public key, Stripe publishable key and Stripe secret key.

4. Open the app in the Expo Go app on your phone or in a simulator
