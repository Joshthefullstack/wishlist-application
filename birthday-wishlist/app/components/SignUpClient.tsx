"use client";
import Form from "./Form";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpClient() {

     const router = useRouter();
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(false);

  const handleSignUp = async (formData: FormData) => {
    setLoading(true);
    setError(null); // reset error before each login attempt

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend returned an error (like 401 or 400)
        setError(data.message || "Login failed. Please try again.");
      } else {
        console.log("Sign Up successful:", data);
        router.push("/auth/login"); // ✅ redirect to dashboard
      }
    } catch (err) {
      console.error("Sign Up error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSignUp}>
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

      <Button
        title="Sign Up"
        titleOnLoad="Signing Up..."
        type="submit"
        loading={loading}
        className="btn btn-neutral mt-4"
      />
    </Form>
  );
}
