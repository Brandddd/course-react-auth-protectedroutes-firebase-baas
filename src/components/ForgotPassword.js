import React from "react";

export function ForgotPassword() {
  return (
    <div className="w-full max-w-sm m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-base font-sans mb-2"
          >
            Recuperación de la cuenta
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremailregistered"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline_none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
}
