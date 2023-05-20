import ContextProvider from "@/components/shared/Context"
import Signup from "@/components/views/Signup"

const SignUp = () => {
    return (
        <ContextProvider>
            <Signup />
        </ContextProvider>
    )
}

export default SignUp