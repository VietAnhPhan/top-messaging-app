# Project: Messaging App

The App get inspired from WhatApps

📌 Table of Contents
Features

Tech Stack

Getting Started

Prerequisites

Installation

Running Locally

Usage

Contributing

License

Contact

✨ Features
Our messaging app delivers the core functionality expected of a modern chat platform:

One-on-One Chat: Private conversations between two users.

Rich Media Support: Ability to send images (with size limits).

Message History: Persistent storage for all chat records.

User Authentication: Secure login and registration using  JWT Auth.

Responsive UI: Optimized for desktop, tablet, and mobile devices.

💻 Tech Stack
The application is built using a modern, scalable architecture:

Frontend

Framework: React

For building a fast, component-based user interface.

Styling

[Tailwind CSS / Styled Components]

Utility-first CSS framework for rapid UI development.

Backend

Server

PLACEHOLDER: Node.js (Express) 

Robust and scalable API server.

Real-Time

API

RESTful API

Defines how the client communicates with the server.

Database

Primary DB: PostgreSQL 

Stores user data, messages, and chat metadata.

🚀 Getting Started
Follow these instructions to set up and run the project locally on your machine.

Prerequisites
You must have the following software installed on your system:

Node.j

npm

Installation
Clone the repository and install dependencies for both the client and server.

### 1. Clone the repository

### 2. Install Server Dependencies

### OR yarn install

### 3. Install Client Dependencies

Running Locally
Before running the application, you need to configure environment variables.

Configure Environment Variables:

Create a .env file in the server/ directory and add:

PORT=[PLACEHOLDER: 5000]
DATABASE_URL=[PLACEHOLDER: Your Database Connection String]
JWT_SECRET=[PLACEHOLDER: A long, random string]

Create a .env file in the client/ directory and add:

NODE_ENV=development
VITE_SUPABASE_PROJECT_URL=
VITE_SUPABASE_API_KEY="
VITE_SERVER_DOMAIN=
VITE_LOCAL_HOST=

Start the Backend Server:

cd server/
npm run dev

The server will be running on http://localhost:[YOUR PORT]

Start the Frontend Client:

cd ../client/
npm run dev

The client will be running on http://localhost:[YOURPORT]

🛠 Usage
Register: Navigate to http://localhost:[YOURPORT]/sign-up and create a new account.

Login: Use your credentials to access the chat dashboard.

Find Friends: Use the search bar to find and add other users by their username or ID.

Start Chatting: Select a user or group from the sidebar to open a conversation and send your first message!

🤝 Contributing
We welcome contributions! If you have suggestions or want to improve the codebase, please follow these steps:

Fork the project.

Create a new feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License
Distributed under the MIT License. See LICENSE for more information.

📧 Contact
Viet Anh Phan - vietanhphan2810@gmail.com
Project Link: https://github.com/VietAnhPhan/top-messaging-app-front-end
