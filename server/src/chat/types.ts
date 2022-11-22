interface Channel {
    id: number;
    name: string;
    admin: User;
    isPublic: boolean; // public is seen in list, private is hidden
    password?: string;
}

interface User {
    id: number;
    name: string;
    channels: number[];
}