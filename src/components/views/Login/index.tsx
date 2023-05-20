"use client"
import { CartState, newContext } from '@/components/shared/Context';
import { callApiForGettingUserData, typeOfContext } from '@/components/utils/ApiCalling';
import { useContext, useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let { isLoading, setLoading }: typeOfContext = CartState();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        callApiForGettingUserData(email, password, setLoading);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            required
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        type="submit"
                    >
                        {isLoading ? "Signing In" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
