import ChatApp from "@/components/views/Chat"
import { userCredentialType } from "@/components/utils/LoginSignupTypes";
import API_BASE_PATH from "@/lib/configbasepath";

async function Chat() {
  return (
    <div>
      <ChatApp />
    </div>
  )
}

export default Chat