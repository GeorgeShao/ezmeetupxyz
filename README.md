# ezmeetup.xyz

meetings simplified - a platform that allows students to easily organize online meetups and study sessions.

**NOTE:** To save on hosting demo costs, I've switched to a free Heroku dyno so the app will no longer have a secure connection / work at [ezmeetup.xyz](http://www.ezmeetup.xyz). To try it out, please visit [ezmeetupxyz.herokuapp.com/](https://ezmeetupxyz.herokuapp.com/) instead. The app may take a min or two to startup since the server sleeps after 30 mins of inactivity to save costs.

## Development

Frontend: React

Backend: Node.js

Hosted on: Heroku

The following provides a guide on how to setup your dev environment, build, and run this project.

1. Clone the repo.

```git clone https://github.com/GeorgeShao/ezmeetupxyz.git```

2. Change directory to the project folder.

```cd ezmeetupxyz```

3. Build the React frontend into static files.

```npm run build```

4. Start the React frontend & Node.js backend.

```npm start```

## Inspiration
I was inspired to create ezmeetup when I realized how annoying it was to setup a meeting with others. During quarantine, some friends and I were meeting online for a study session. We considered using FaceTime, but about half of us had Androids instead of iPhones so that wasn't an option. We considered using Discord, but setting up a Discord server or groupchat and inviting everyone would be time-consuming and annoying. We considered using Google Meet but we would have to either schedule the meeting beforehand or share contact info so that we could give each other the auto-generated meet link. Finally, we considered Zoom but it was annoying to download and install for everyone. Ultimately, we resorted to using Discord, but these problems could have all been avoided if a meeting platform existed that didn't have these issues.

Introducing ezmeetup...

## What it does
Introducing ezmeetup, a platform that allows students to easily organize online meetups and study sessions.

Ezmeetup allows you to instantly create a meeting with a custom meeting code. It works cross-platform on the web, no account required, no download/install required, and no sharing contact info or a long and complicated invite/meeting link required.

Overall, it simplifies the process of creating small online meetups with friends.

## How to use it
Let’s pretend I’m a student. Class has just ended and I want to organize an online study session with some friends. All I have to do is give my friends the link [ezmeetup.xyz](http://www.ezmeetup.xyz) and a custom meeting code.

For this example, let’s use my name “george”.

When the time comes, all everyone has to do is go to [ezmeetup.xyz](http://www.ezmeetup.xyz) and enter the custom meeting code "george". No account creation required. No download/install required. No exchanging email addresses required, and of course it works on the web cross-platform so everyone can use it.

This meeting code does not have to be created beforehand. Anyone can go onto the website and instantly have a meeting setup for you with any code you want just by going to the url.This means that unlike Zoom and Google Meet, if the meeting host is running late or absent, you don’t need to wait for them and you can begin the meeting anytime you’d like.

When people join the meeting via the link, a peer-to-peer mesh network connection will be established between all of them and they will be able to see and hear each other.

If you’d like a more generic meeting code, you can also just head to ezmeetup.xyz and just click the “Create room with random code” button for an auto-generated code.

The React frontend and Node.js backend is hosted on Heroku. Feel free to try it out yourself at [ezmeetup.xyz](http://www.ezmeetup.xyz) today.

## How we built it / how it works
Ezmeetup uses a React frontend and a Node.js backend. THe React frontend provides the GUI for seeing the video feeds of others in the meeting. The Node.js backend acts as a signaling server for the peer-to-peer mesh network the video feeds are sent over.

## Challenges we ran into
I had many issues with socketio. It took awhile to fix them all, but I eventually managed to get everything functioning as intended. I haven't built many React and Node.js apps in the past, so this was some great practice.

## Accomplishments that we're proud of
I'm proud that I managed to get the project fully functioning as intended in the end!

## What we learned
I learned a lot about React, Node.js, and working with p2p video & audio. This was also my first time working with Heroku by myself so I learned about setting up a custom domain and using their ACM to link a SSL certificate.

## What's next for ezmeetup.xyz
I want to further improve the GUI of the meeting video feeds and add more features such as a chat, muting functionality, and the ability to upload/share files.
