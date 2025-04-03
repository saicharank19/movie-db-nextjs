/* eslint-disable @next/next/no-img-element */
import Sign from "@/common-components/common-sign";
import logo from "@/images/logo.jpg";

function SignIn() {
  return (
    <div className="auth-page flex justify-center items-center w-screen h-screen">
      <div className="md:flex flex-col md:flex-row w-full justify-around rounded-lg p-8 text-grey">
        <img
          className="m-auto mb-3 md:m-0 rounded-2xl"
          width={"35%"}
          height={"35%"}
          src={logo.src}
          alt=""
        />
        <Sign from="signin" />
      </div>
    </div>
  );
}

export default SignIn;
