import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.sendChatNotification = functions.firestore
  .document('chatrooms/{chatId}/messages/{messageId}')
  .onCreate(
    async (
      snapshot: functions.firestore.QueryDocumentSnapshot,
      context: functions.EventContext,
    ) => {
      const messageData = snapshot.data() as {
        senderName: string;
        text: string;
      };
      const chatId = context.params.chatId;

      // Fetch all users from the top-level 'users' collection
      const usersSnapshot = await admin.firestore().collection('users').get();
      const allUsers = usersSnapshot.docs.map((doc) => doc.id);

      // For each user, check their preferences
      // and send a notification if appropriate
      for (const userId of allUsers) {
        const userDoc = await admin
          .firestore()
          .collection('users')
          .doc(userId)
          .get();
        const userData = userDoc.data();
        const token = userData?.pushToken;

        // Check user's preferences for this chat room
        const userPreferencesDoc = await admin
          .firestore()
          .collection('userPreferences')
          .doc(userId)
          .get();
        const userPreferencesData = userPreferencesDoc.data();
        const roomsPromptedForNotifications =
          userPreferencesData?.roomsPromptedForNotifications || [];

        // Only send a notification if the user
        // has been prompted for this chat room
        if (token && roomsPromptedForNotifications.includes(chatId)) {
          const payload = {
            notification: {
              title: 'New Message',
              body: `${messageData.senderName}: ${messageData.text}`,
            },
            data: {
              chatId: chatId,
              click_action: `pentiachat://room/${chatId}`,
            },
            token: token,
          };

          try {
            await admin.messaging().send(payload);
          } catch (error) {
            console.error('Error sending notification:', error);
          }
        }
      }
    },
  );
