import Sign from "@/common-components/common-sign";
function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="rounded-lg p-8 text-grey">
        <Sign from="signup" />
      </div>
    </div>
  );
}

export default SignUp;
