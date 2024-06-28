## Overview

This project is a pharmacy website built using Next.js with Firebase authentication. It allows users to purchase products, add reviews, and provides administrators with tools to manage categories and products through a secure admin dashboard.

### Features

- **Authentication:** Utilizes Firebase authentication with Google login for seamless user access.
- **Admin Dashboard:** Enables administrators to perform CRUD operations on categories and products.
- **User Interaction:** Users can browse and purchase products, add reviews, and provide ratings for products.
- **Responsive Design:** Ensures the website is accessible and functional across various devices.
- **Pages:**
  - **Home:** Features a hero section with highlights about the pharmacy, displays categories and featured products.
  - **Products:** Lists detailed information about available products, including reviews and ratings.
  - **Admin Dashboard:** Secure area accessible only to administrators for managing site content.

## Technologies Used

- **Frontend:** Next.js, TypeScript, CSS
- **Backend:** Express.js, Typescript, Mongoose
- **Database:** MongoDb

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kamrulhasandev/Pharmacy-Client
   cd Pharmacy-Server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
   ```bash
   npm start
   ```

## Live Links

- **Deployed API**: [https://pharmacy-client-hazel.vercel.app/](https://pharmacy-client-hazel.vercel.app/)
