# Mynx

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/DevAnupShourya/Mynx)](https://github.com/DevAnupShourya/Mynx/issues)
[![GitHub Stars](https://img.shields.io/github/stars/DevAnupShourya/Mynx)](https://github.com/DevAnupShourya/Mynx/stargazers)

## Current State 🏃🏻‍♂️
The project is currently in the alpha stage of development. This means that it has not been fully tested and may contain bugs.

## Known Limitations 📣
- The project does not support all of the features that are planned for the final release.
- The project may be unstable and may crash or behave unexpectedly.

## Target Completion Date ⏱
The basic version of this project is done.

## Feedback and Suggestions 💥
I would appreciate any feedback or suggestions you have for the project. Please feel free to submit a pull request or issue on GitHub.

## Introduction 🦾
Welcome to Mynx: World in Pixels, the ultimate social media platform designed to connect individuals through a vibrant and visually captivating experience. With an intuitive interface and cutting-edge features, Mynx empowers users to express their creativity, share their life moments, and engage with a global community. Whether you're an aspiring photographer, artist, or simply looking to connect with like-minded individuals, Mynx offers a unique platform to showcase your talents and foster meaningful connections. Join us today and embark on a journey where the world unfolds pixel by pixel.

## Features ✨

- **User Profiles:** Each user gets a personalized profile where they can add a profile picture, bio, and other details.

- **Posts :** Users can share their thoughts, ideas, and updates with the community.

- **Interactions:** Users can like, comment, and reply to posts, promoting engagement and discussion.

- **Follow System:** Users can follow each other to stay connected and receive updates from their favorite users.

- **Notifications:** Users receive notifications for interactions on their activity and updates from followed users.

- **Search and Discovery:** Users can search for specific posts or discover new content based on their interests.

- **Live:** Users can go live online to thier community and share insights of their lifes.

- **Chats:** Users can chat to each other privetly and securely or can make a group of 8 users and talk to each other.

## Tech Stack 🧠

Mynx  is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to ensure a modern and efficient web application.
- **Backend**
    - Node.js
    - Express
    - MongoDB
- **Frontend**
    - ReactJS
    - Redux
    - NextUI
    - Tailwind CSS
    - SASS
- **Testing**
    - Jest (Frontend)
    - Mocha (Backend)
- **Deployment**
    - Vercel
    - Render

## Installation ℹ

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com:DevAnupShourya/mynx.git
   ```

2. Navigate to the project directory:

    ```bash
    cd api || cd client
    ```
3. Install dependencies:

    ```bash
    npm install
    ```    
4. Set up environment variables:
    - Create a .env file in the root directory and add the required environment variables. (Example: MongoDB URI, JWT secret, etc.)
5. Run the development server:

    ```bash
    npm run dev || npm run server
    ```
6. Open your browser and navigate to http://localhost:5173 to see the app in action.    

## Contribution 💨

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request. Here's how you can contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make the necessary changes and commit them:   

   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push your changes to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on the main repository from your forked branch. Provide a clear description of your changes and their purpose.

6. Wait for feedback and reviews. Once your pull request is approved, it will be merged into the main branch.

## Feedback and Suggestions 💥
I would appreciate any feedback or suggestions you have for the project. Please feel free to submit a pull request or issue on GitHub.

## Commit Messages 💌
- style 💄 : [msg]
- build 🏗️: [msg]
- refactor ♻️ : [msg]
- test 🧪 : [msg]
- fix 🧱 : [msg]
- feat 🚀 : [msg]
- docs 📃 : [msg]
- ci 🎡 : [msg]

## Acknowledgments 💯
We want to express our gratitude to the open-source community and all the contributors who helped make Mynx.

If you have any questions or need assistance, feel free to contact us or join our community discussions.

Happy Mynxing !

### Features to Implement 🧠
#### Backend :
- [ ] : Add tests
- [ ] : Add MongoDB Aggregation Pipeline instead for search queries.
- [ ] : Add RabbitMQ or Redis to enable fast chatting instead to direct saving into DB.
#### Frontend :`
- [ ] : Add tests
- [ ] : Redirect User to /login when trying to access protected routes and not logged in.