"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

function Sign({ from }: { from: "signin" | "signup" }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [, setCookie] = useCookies(["user_id"]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!(email && password)) {
      console.log("empty inputs");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        from == "signup" ? "/api/user/register" : "/api/user/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        if (response.data.id) {
          setCookie("user_id", response.data.id);
        }
        if (from === "signup") {
          router.push("/signin");
        } else {
          router.push("/home");
        }
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }, [from, email, password, setCookie, router]);

  return (
    <div className="rounded-2xl common-sign-box">
      {loading && <div className="loader"></div>}
      <div style={{ opacity: loading ? "0.5" : "" }}>
        <h1 className="font-bold">
          {from == "signup" ? "Sign Up" : "Sign In"}
        </h1>
        <div className="user-box">
          <input onChange={(e) => setEmail(e.target.value)} />
          {email ? "" : <label>Email</label>}
        </div>
        <div className="user-box">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 m-2"
            type="password"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
                // Perform your desired action here
              }
            }}
          />
          {password ? "" : <label>Password</label>}
        </div>
        <button onClick={handleSubmit} className="w-80 m-2 sign-btn">
          {from == "signup" ? "SignUp" : "SignIn"}
        </button>
        {from == "signup" && (
          <p className="text-white">
            Already registered? , Please{" "}
            <Link href={"/signin"} style={{ textDecoration: "underline" }}>
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
export default Sign;
