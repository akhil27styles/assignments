interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
    userId: number;
}

// User interface
interface User {
    id: number;
    username: string;
    password: string;
    name: string;
}

export { Todo, User };