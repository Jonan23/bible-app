/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
  }

  interface Locals {
    user: User | null;
    token: string | null;
  }

  interface PageData {
    user: User | null;
    theme: string | null;
  }
}
