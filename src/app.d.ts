/// <reference types="@sveltejs/kit" />

declare namespace App {
    interface Locals {
        userData?: import('$lib/global').UserData
    }

    interface Platform {}

    interface Session {
        loggedIn: boolean,
        userData: import('$lib/global').UserData
    }

    interface Stuff {}
}