import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import useAuthStore from "../store/auth.store";

function GoogleLoginButton() {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const handleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);

    if (!result.success) {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        theme="filled_black"
        shape="pill"
        size="large"
        text="continue_with"
        width="330"
        onSuccess={handleSuccess}
        onError={() => {
          toast.error("Google login failed.");
        }}
      />
    </div>
  );
}

export default GoogleLoginButton;
