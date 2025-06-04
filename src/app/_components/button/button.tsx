import { PropsWithChildren } from "react";

export default function Button({ children }: PropsWithChildren) {
    return (
        <button type='submit' className="bg-transparent hover:bg-[#136FA1]0 text-[#136FA1] font-semibold hover:text-white py-2 hover:cursor-pointer hover:bg-[#136FA1] px-4 border border-[#136FA1] hover:border-transparent rounded w-24 text-sm">{children}</button>
    )
}