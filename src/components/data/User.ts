 export interface User {
     id: string;
     name: string;
     role: "User" | "Admin" | "Moderator" | "UserVip";
     email: string;
     phone: string;
     status: "Active" | "Banned";
     profile: string;
 }
