"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

export default function AccessDeniedPage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <ShieldExclamationIcon className="h-16 w-16 text-red-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              You don't have the required permissions to access this page.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => router.back()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
