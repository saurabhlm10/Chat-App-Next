import axios from "axios";
import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "ap2",
  }
);

let heartbeatInterval: ReturnType<typeof setInterval>;

export const heartbeatStarter = () => {
  heartbeatInterval = setInterval(heartbeat, 5000);
};

export const heartbeatStopper = () => {
  clearInterval(heartbeatInterval)
};



export const heartbeat = async () => {
  await axios.post('/api/heartbeat')
}; 

// const heartbeatInterval = 5000; // Interval in milliseconds

// // Send heartbeat message to the server
// const sendHeartbeat = () => {
//   pusherServer.trigger('heartbeat-channel', 'heartbeat-event', { /* additional data */ });
// };

// // Start the heartbeat mechanism
// const startHeartbeat = () => {
//   setInterval(sendHeartbeat, heartbeatInterval);
// };

// // Initialize Pusher and start the heartbeat mechanism
// export function initPusher() {
//   pusherClient.connection.bind('connected', () => {
//     startHeartbeat();
//   });
// }
