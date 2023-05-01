
# React Native Expo Chat App with Node.js, Express.js, and Socket.io

This is a simple chat application built using React Native Expo and server is built on Node.js, Express.js, and Socket.io. The application has some registration functionalities and allows users to create chat rooms, which can be public or private. Users can share the room code with others to join the room and chat with each other.




## Features

- User registration and authentication
- Ability to create public or private chat rooms
- Ability to join public or private chat rooms using the room code
- Real-time chat using Socket.io
- Private rooms must need the room password


## Installation

- Clone the repository: `git clone https://github.com/hammad177/chat-app.git`
- Install dependencies: `npm install && cd server && npm install`
- Start the server: `npm run server`
- Start the Expo app: `npm start`

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server folder

`MONGODB_URI`

`JWT_ACCESS_KEY`

and for the expo app you need to create a folder in the root directory `constants and add file index.js` 

```javascript
export const BASE_URL = "your_server_base_url";

export const AUTH_TOKEN_KEY = "auth_token_key";

export const ROOM_TOKEN_KEY = "room_token_key";

```

## Usage

- Create a new account or log in to an existing one.
- Create a new chat room or join an existing one using the room code.
- Chat with other users in real-time.

## Technologies Used

**Client:** React Native(expo), Native Base Components

**Server:** Node, Express, Socket.io, MongoDB
