import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContextgit rm --cached server/.env';
import { toast, Toaster } from 'react-hot-toast'; // Notification popup ke liye

const socket = io('http://localhost:5008');

const NotificationListener = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // User ko unke unique room mein join karwana
            socket.emit("join_room", user.id);

            // Notification listen karna
            socket.on("notification", (data) => {
                toast.success(data.message, {
                    duration: 5000,
                    position: 'top-right',
                });
            });
        }

        return () => socket.off("notification");
    }, [user]);

    return <Toaster />; // Yeh UI mein popup dikhayega
};

export default NotificationListener;