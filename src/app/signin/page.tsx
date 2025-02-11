import Sign from "@/common-components/common-sign";

function SignIn() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="rounded-lg p-8 text-grey">
        <Sign from="signin" />
      </div>
    </div>
  );
}

export default SignIn;
