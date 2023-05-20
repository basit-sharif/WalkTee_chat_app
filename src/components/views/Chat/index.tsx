"use client"
import ClosePur from '@/components/assets/images/ClosePur';
import SendIcon from '@/components/assets/images/SendIcon';
import { allChatsType, userCredentialType } from '@/components/utils/LoginSignupTypes';
import { FC, useEffect, useState } from 'react';
import Message from './Message';
import { callApiAndSendMessage, callApiToGetAllChat, fetchAllUsers } from '@/components/utils/ApiCalling';
import { useRouter } from 'next/router';

interface props {
    allChats: Array<allChatsType>,
    fetchAllUsers: Array<userCredentialType>
};

const ChatApp = () => {
    const [allChats, setAllChats] = useState([]);
    const [fetchAllUserss, setFetchAllUserss] = useState<any>([]);

    async function fether() {
        const apiAllChat = await callApiToGetAllChat();
        const fetchAllUsersActuall: Array<userCredentialType> = await fetchAllUsers();
        setAllChats(apiAllChat);
        setFetchAllUserss(fetchAllUsersActuall)
    }
    // console.log("fetcher called", allChats, fetchAllUserss)
    const [receiverWTID, setReceiverWTID] = useState<any>()
    const [message, setMessage] = useState<string>("")
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [localStorageDataState, setLocalStorageDataState] = useState<userCredentialType | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleNewMessage = () => {
        setShowNewMessage(!showNewMessage);
    };

    async function handleMessageToSend(e: any) {
        setLoading(true);
        if (!localStorageDataState) {
            alert("please login first")
            return " "
        }
        e.preventDefault();
        let messeageSendedResponse: boolean = await callApiAndSendMessage({
            message: message,
            senderid: Number(localStorageDataState?.uniqueid),
            receiverid: Number(receiverWTID)
        });
        if (messeageSendedResponse) {
            setShowNewMessage(false)
        } else {
            alert("Please try again")
        }
        setLoading(false);
    }
    useEffect(() => {
        fether();
        const localStorageData = typeof window !== undefined ? localStorage.getItem("userCredentials") : "";
        if (localStorageData) {
            const localStorageDataOrg: userCredentialType = JSON.parse(localStorageData)
            setLocalStorageDataState(localStorageDataOrg);
        }
    }, [])

    return (
        <div className="flex max-w-7xl mx-auto">
            <div className="w-full bg-white p-4">
                <div className="flex self-start justify-between items-center mb-4">
                    <h1 className="text-2xl text-gray-600 font-bold">Chat Area:</h1>
                    <button
                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 md:px-4 py-1 md:py-2 rounded "
                        onClick={handleNewMessage}
                    >
                        New Message
                    </button>
                </div>

                {/* New Message Pop-up */}
                {showNewMessage && (
                    <div className="absolute top-0 left-0 w-full h-full bg-purple-900 bg-opacity-25 flex justify-center items-center">
                        <form onSubmit={handleMessageToSend} className="space-y-4 bg-white py-3 md:py-8 px-7 md:px-16 rounded shadow-lg">
                            <div className='flex justify-between '>
                                <h2 className="text-2xl font-bold mb-4 text-gray-600 text-center ">New Message</h2>
                                <div onClick={handleNewMessage} className='cursor-pointer'>
                                    <ClosePur />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="receiver" className="text-lg mb-2 block">Receiver WT ID:</label>
                                <input
                                    type="number"
                                    id="receiver"
                                    required
                                    value={receiverWTID}
                                    onChange={(e) => setReceiverWTID(e.target.value)}
                                    className="inputField w-60 md:w-96 flex-grow"
                                />
                                <p className='text-xs text-red-400 max-w-[14rem] md:max-w-xs'>NOTE:This is unique WT ID of user available after making account on the top right corner</p>
                            </div>
                            <div>
                                <label htmlFor="message" className="text-lg mb-2 block">Message:</label>
                                <textarea
                                    id="message"
                                    className="inputField w-60 md:w-96"
                                    rows={4}
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                disabled={isLoading}
                                type='submit'
                                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
                            >
                                {isLoading ? "Sending" : "Send Message"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Chat data */}
                {localStorageDataState && (
                    <div>
                        {allChats && fetchAllUserss &&
                            allChats.map((item: allChatsType, index: number) => {
                                let alldataOfSingleUser: userCredentialType | undefined =
                                    fetchAllUserss.find((subItem: userCredentialType) => subItem.uniqueid === item.senderid);
                                let idOwner: boolean = localStorageDataState.uniqueid === item.senderid;
                                if (item.receiverid === localStorageDataState.uniqueid || item.senderid === localStorageDataState.uniqueid) {
                                    return (
                                        <Message alldataOfSingleUser={alldataOfSingleUser} key={index} name={item.senderid} message={item.message} id={item.senderid} isOwner={idOwner} />
                                    )
                                } else {
                                    return ""
                                }
                            }
                            )
                        }
                    </div>
                )}

                {/* <div className='fixed bottom-10 left-10 right-10 flex items-center justify-center gap-5'>
                    <input type='text' className='inputField rounded-full border-purple-600' />
                    <div className='w-10 h-10 rounded-full bg-purple-100 cursor-pointer flex items-center justify-center border'>
                        <SendIcon color="purple" size={24} />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ChatApp;
