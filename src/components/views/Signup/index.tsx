"use client"
import Button from '@/components/shared/Button';
import { CartState } from '@/components/shared/Context';
import { callApiForRegesterUser, returnedDataType, typeOfContext } from '@/components/utils/ApiCalling';
import { useState } from 'react';

const Signup = () => {
    let { isLoading, setLoading }: typeOfContext = CartState();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [reenteredPassword, setReenteredPassword] = useState<string>('');

    async function backEndProccess() {
        const data: returnedDataType = await callApiForRegesterUser(fullName, email, password, setLoading)
        if (typeof window !== undefined) {
            localStorage.setItem("userCredentials", JSON.stringify(data.data[0]));
            window.location.href = "/chat"
        }
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!emailIsValid(email)) {
            alert('Please enter a valid email address.');
            return;
        };
        if (password !== reenteredPassword) {
            alert('Passwords do not match.');
            return;
        };
        backEndProccess();
    };

    const emailIsValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-8 rounded shadow space-y-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            className="inputField"
                            type="text"
                            id="fullName"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="inputField"
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="inputField"
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reenteredPassword">
                            Re-enter Password
                        </label>
                        <input
                            className="inputField"
                            type="password"
                            required
                            id="reenteredPassword"
                            value={reenteredPassword}
                            onChange={(e) => setReenteredPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        type="submit"
                    >
                        {isLoading ? "Submitting" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Signup

function callApiForRegesterUsers() {
    throw new Error('Function not implemented.');
}
