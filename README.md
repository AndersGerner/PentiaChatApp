# Chat Application

This is a chat application built with React Native, Firebase, and other modern technologies. The app allows users to communicate in real-time, send images, and receive push notifications.

## Folder Structure

```bash
├── functions
│ ├── src
│ │ ├── index.ts
├── src
│ ├── components
│ │ ├── ChatInput.tsx
│ │ ├── ChatMessageRow.tsx
│ │ └── ...
│ ├── hooks
│ │ ├── useChatMessages.ts
│ │ └── ...
│ ├── services
│ │ ├── firebaseConfig.ts
│ │ ├── firestoreChatMessageService.ts
│ │ ├── firestoreUserService.ts
│ │ ├── pushNotificationService.ts
│ │ └── ...
│ ├── navigation
│ │ └── AppNavigator.ts
│ └── scenes
│ ├── ChatScreen.tsx
│ └── ...
└── ...
```

- `components`: Contains reusable UI components.
- `hooks`: Custom React hooks to encapsulate logic.
- `services`: Services for Firebase configuration, Firestore operations, and push notifications.
- `navigation`: Navigation configurations and routes.
- `scenes`: Individual screen components for the app.

## How to Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/chat-application.git
   cd chat-application
   ```
2. **Install dependencies**

   ```bash
   yarn install
   ``` 

   or  

   ```bash
   npm install
   ```
   
3. **Run the project**
   In one terminal window, run:
   ```bash
   npm run start:clear
   ```   
   In a different terminal window run:
   ```bash
   npx react-native run-ios
   ```
   ```bash
   npx react-native run-android
   ```

4. **Cloud functions**
   The functions directory contains Firebase Cloud Functions that handle backend operations like sending notifications. After making any changes to these functions, deploy them using:
   ```bash
   npm run deploy:functions
   ```
   
## To-Do List

### Completed Tasks:
- [x] Set up Firebase authentication.
- [x] Implement chat functionality with Firestore.
- [x] Create custom hooks for chat messages.
- [x] Design the login screen.
- [x] Implement Google login functionality.
- [x] Implement image picker for chat.
- [x] Enhance the UI for the login screen with a welcome headline.
- [x] Implement Facebook login functionality.
- [x] Test the image upload feature on different devices and simulators.
- [x] Set up push notifications for new messages on Android.

### Pending Tasks:
- [ ] Set up push notifications for new messages on iOS.
- [ ] Design and implement other app screens (e.g., user profile, settings).
- [ ] Improve chat screen design
- [ ] Use avatar from users login method
- [ ] Review and update Firebase Storage rules for better security.
- [ ] Optimize the app for performance and responsiveness.
- [ ] Setup localization

