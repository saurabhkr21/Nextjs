'use server'
type Users = {
    name: string;
    email: string;
    password: string;
};
const Users = [
    { name: 'Saurabh Kumar', email: 'saurabh7221@gmail.com', password: '12345' },
    { name: 'Aishwarya Verma', email: 'aishwaryaverma284@gmail.com', password: 'aish123' }
];

// Fix: Use correct type and logic for handleSubmitServer
export async function handleSubmitServer(obj: Users) {
    // Find user by email and password
    const user = Users.find(
        u => u.email === obj.email && u.password === obj.password
    );
    // Return user if found, else null
    return user || null;
}