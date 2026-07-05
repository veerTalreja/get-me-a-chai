"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SuccessPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [date, setDate] = useState("");

  const usernameParam = searchParams.get("username");
  const amountParam = searchParams.get("amount");
  const sessionId = searchParams.get("session_id");

  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Fetch the real session/payment details from Stripe
  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setData(res);
          }
        });
    }
  }, [sessionId]);

  // Countdown + redirect
  useEffect(() => {
    if (countdown <= 0) {
      const redirectUsername =
        session?.user?.username || session?.user?.name || usernameParam;
      if (redirectUsername) {
        router.push(`/${redirectUsername}`);
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, session, router, usernameParam]);

  // Format the current date/time
  useEffect(() => {
    const now = new Date();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const year = now.getFullYear();
    const day = now.getDate();
    const month = monthNames[now.getMonth()];
    const hours = now.getHours();
    const min = String(now.getMinutes()).padStart(2, "0");
    setDate(`${month} ${day}, ${year} | ${hours}:${min}`);
  }, []);

  // Work out the amount paid (in Rs) — prefer the verified Stripe amount,
  // fall back to the query param if the API call hasn't resolved yet.
  const paidAmount = (() => {
    if (data?.amount) {
      return (data.amount / 100).toFixed(0);
    }
    if (amountParam) {
      return (Number(amountParam) / 100).toFixed(0);
    }
    return null;
  })();

  const displayUsername = data?.username || usernameParam;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-amber-200 bg-white shadow-xl shadow-amber-900/10 overflow-hidden">
        {/* Top success panel */}
        <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-10 text-white">
          <div className="flex items-center justify-center size-16 rounded-full bg-white/20">
            <span className="text-4xl">✅</span>
          </div>

          <p className="text-sm font-medium uppercase tracking-wide text-emerald-100">
            Amount paid
          </p>

          {paidAmount ? (
            <p className="text-4xl font-bold tracking-tight">₹{paidAmount}</p>
          ) : (
            <p className="text-2xl font-semibold text-emerald-100">
              Loading...
            </p>
          )}

          <p className="mt-1 font-semibold text-emerald-50">
            Payment successful
          </p>

          {displayUsername && (
            <p className="text-sm text-emerald-100">
              to <span className="font-semibold">@{displayUsername}</span>
            </p>
          )}
        </div>

        {/* Bottom details panel */}
        <div className="flex flex-col gap-3 bg-white px-6 py-5">
          <div>
            <p className="text-xl font-bold text-slate-800">
              Get Me A Chai ☕
            </p>
            <span className="text-sm text-slate-400">{date}</span>
          </div>

          <div className="flex items-center justify-center rounded-lg bg-amber-50 border border-amber-200 px-3 py-3 text-center">
            <p className="text-sm font-medium text-amber-700">
              Redirecting in{" "}
              <span className="font-bold">{countdown}</span> second
              {countdown !== 1 ? "s" : ""}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}