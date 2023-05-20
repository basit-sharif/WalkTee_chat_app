import { useContext } from "react";
import { CartState } from "../shared/Context";
import { messageSendDataType, userCredentialType } from "./LoginSignupTypes";
import API_BASE_PATH from "@/lib/configbasepath";

export interface typeOfContext {
    isLoading: boolean,
    setLoading: any
}

// sign up
export async function callApiForRegesterUser(fullName: string, email: string, password: string, setLoading: any) {
    setLoading(true);

    let res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            fullname: fullName,
            email: email,
            password: password,
        }),
    });
    setLoading(false);
    return res.json();
};


export interface returnedDataType {
    message: string,
    data: Array<userCredentialType>
};




// Login
function checkForValidUserCompairMailPass(email: string, password: string, usersData: Array<userCredentialType>) {
    const userDataToSetInLocalStorage = usersData.find((item: userCredentialType) => item.email === email && item.password === password)
    if (userDataToSetInLocalStorage) {
        if (window) {
            localStorage.setItem("userCredentials", JSON.stringify(userDataToSetInLocalStorage))
            return true;
        }
    }
    return false;
}
export async function fetchAllUsers() {
    const res = await fetch(`${API_BASE_PATH}/api/users`, {
        cache: "no-store",
        next: {
            revalidate: 1,
        }
    });
    return res.json();
}
export async function callApiForGettingUserData(email: string, password: string, setLoading: any) {
    setLoading(true);
    const usersData: Array<userCredentialType> = await fetchAllUsers();
    if (checkForValidUserCompairMailPass(email, password, usersData)) {
        window.location.href = "/chat"
    } else {
        alert("Invalid Email or Password")
    }
    setLoading(false);
};



console.log("bas : " ,API_BASE_PATH+"/api/messages");
// chat page api calling
export async function callApiToGetAllChat() {
    const res = await fetch(`${API_BASE_PATH}/api/messages`, {
        cache: "no-store",
    });
    return res.json()
};





// chat api calling for adding or sending message
export async function callApiAndSendMessage(data: messageSendDataType) {
    let res = await fetch("/api/messages", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        return false
    }
    return true;
}