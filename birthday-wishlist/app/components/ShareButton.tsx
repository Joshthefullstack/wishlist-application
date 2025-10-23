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
    // Use id for reliability. If you want prettier slugs you can include them:
    // const slug = title ? title.replace(/\s+/g, "-").toLowerCase() : "";
    // return `${window.location.origin}/viewWishlists/${wishlistId}-${encodeURIComponent(slug)}`;
    // return `${window.location.origin}/viewWishlists/${encodeURIComponent(
    //   wishlistId
    // )}`;

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
      if (navigator.share) {
        // optional: open native share sheet on mobile
        await navigator.share({
          title: title ?? "Wishlist",
          text: "View my wishlist",
          url,
        });
        return;
      }
      // primary method
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard"); // replace with nicer UI if desired
    } catch (err) {
      // fallback: create temporary input, select, copy
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
        alert("Link copied to clipboard (fallback)");
      } catch {
        prompt("Copy this link", url); // last resort
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
