// components/ShareWishlistButton.tsx
"use client";
import React from "react";

type Props = {
  wishlistId: string;
  title?: string;
  icon?: React.ReactNode;
};

export default function ShareButton({ wishlistId, title, icon }: Props) {
  const buildUrl = () => {
    const slug = title
      ? title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
      : "";
    return `${window.location.origin}/viewWishlists/${encodeURIComponent(
      wishlistId
    )}-${encodeURIComponent(slug)}`;
  };

const copyToClipboard = async () => {
  const url = buildUrl();

  try {
    // Try to write directly to clipboard first
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");

    // (Optional) You can still offer share *after* successful copy
    if (navigator.share) {
      await navigator.share({
        title: title ?? "Wishlist",
        text: "View my wishlist",
        url,
      });
    }
  } catch (err) {
    // fallback: old-school method
    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      alert("Link copied to clipboard (fallback)");
    } catch {
      prompt("Copy this link", url);
    } finally {
      document.body.removeChild(input);
    }
  }
};


  return (
    <button onClick={copyToClipboard} className="btn">
      {icon && <span>{icon}</span>}
    </button>
  );
}
