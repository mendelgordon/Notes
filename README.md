# Notes

The goal of this project is to create a web app where users can easily sign in and access a notepad, with their notes being saved to their account.

Vite was used to create this React app
Firebase is being used to authenticate users with Google, and to store the notes in a Realtime Database

## Installation

npm install
You'll need to create a Firebase project and add a web app to it, then copy the config object into [here](src/config/firebase.js)
I hosted this app on Firebase Hosting, but you can host it anywhere you want, such as Netlify or Vercel
In your Firebase project, you'll need to enable Google authentication, anonymous authentication, and Realtime Database with the following rules:

    ```json
    {
    "rules": {
        "users": {
        "$uid": {
            ".read": "$uid === auth.uid",
            ".write": "$uid === auth.uid"
        }
        }
    }
    }
    ```

## Usage from web

Go to [nots.web.app](https://nots.web.app) and press add note to get started

Notes are saved automatically to your anonymous account (no sign in required)

If you want to access your notes from another device, press the "Sign in with Google" button and sign in with your Google account

> ⚠️ Please note that if you sign in with a Google account, you will not be able to access your notes from your anonymous account, so if you plan on signing in with Google, please make sure to log in before creating any notes
