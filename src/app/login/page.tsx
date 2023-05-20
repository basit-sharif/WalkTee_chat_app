import ContextProvider from "@/components/shared/Context";
import Login from "@/components/views/Login";

function LogIn() {
    return (
        <ContextProvider>
            <Login />
        </ContextProvider>
    )
}

export default LogIn