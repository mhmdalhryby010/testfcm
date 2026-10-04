
// =====================================================
// Firebase Cloud Messaging Service Worker
// =====================================================


// Firebase App
importScripts(
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);


// Firebase Messaging
importScripts(
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);



// =====================================================
// Firebase Configuration
// =====================================================

firebase.initializeApp({
  apiKey: "AIzaSyCvnlZRNpMwC3xAEh8KYgvMGEi1vQ0NZDk",
  authDomain: "myfirsttestappproject.firebaseapp.com",
  projectId: "myfirsttestappproject",
  storageBucket: "myfirsttestappproject.firebasestorage.app",
  messagingSenderId: "878802593378",
  appId: "1:878802593378:web:63956e9e5460bb027d133b"
});


// =====================================================
// Firebase Messaging
// =====================================================

const messaging =
    firebase.messaging();



// =====================================================
// Background Messages
// =====================================================

messaging.onBackgroundMessage(

    function(payload) {


        console.log(
            "[FCM SW] Background message:",
            payload
        );


        const notification =
            payload.notification || {};


        const data =
            payload.data || {};


        const title =

            notification.title ||

            data.title ||

            "إشعار جديد";


        const body =

            notification.body ||

            data.body ||

            "لديك رسالة جديدة";


        const icon =

            notification.icon ||

            data.icon ||

            "https://firebase.google.com/favicon.ico";


        const url =

            data.url ||

            "/";



        // ============================================
        // Show Notification
        // ============================================

        self.registration.showNotification(

            title,

            {

                body:
                    body,

                icon:
                    icon,

                badge:
                    icon,

                data:
                {
                    url:
                        url
                }

            }

        );

    }

);



// =====================================================
// Notification Click
// =====================================================

self.addEventListener(

    "notificationclick",

    function(event) {


        console.log(
            "[FCM SW] Notification clicked."
        );


        event.notification.close();


        const url =

            event.notification
                .data
                ?.url ||

            "/";



        event.waitUntil(


            clients.matchAll(

                {

                    type:
                        "window",

                    includeUncontrolled:
                        true

                }

            )


            .then(

                function(clientList) {


                    // =================================
                    // البحث عن الصفحة المفتوحة
                    // =================================

                    for (
                        const client
                        of clientList
                    ) {


                        if (

                            client.url
                                .startsWith(
                                    self.location.origin
                                )

                            &&

                            "focus"
                                in client

                        ) {


                            if (
                                "navigate"
                                in client
                            ) {

                                client.navigate(
                                    url
                                );

                            }


                            return client.focus();

                        }

                    }



                    // =================================
                    // فتح صفحة جديدة
                    // =================================

                    if (
                        clients.openWindow
                    ) {

                        return clients.openWindow(
                            url
                        );

                    }

                }

            )

        );

    }

);
