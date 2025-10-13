"use client";
import Form from "./Form";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "../services/authService";



export default function LoginClient() {

      const router = useRouter();
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(false);


  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    setError(null); // reset error before each login attempt

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const user = await authService.login(email?.toString(), password?.toString());


      // make responsive

      if (!user._id) {
        setError("Login failed. Please try again.");
      } else {
        console.log("Login successful:", user);
        localStorage.setItem("userId", user._id)
        router.push("/wishlists"); //
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <label className="label mb-2">Email</label>
      <input
        type="email"
        name="email"
        className="input mb-3"
        placeholder="Email"
        required
      />

      <label className="label mb-2">Password</label>
      <input
        type="password"
        name="password"
        className="input"
        placeholder="Password"
        required
      />

      <Button title="Login" titleOnLoad="Logging In..." type="submit" loading={loading} className="btn btn-neutral mt-4" />
    </Form>
  );
}
