import { PhotoIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren } from "react";

//Root
function Skeleton() {

}

function Image() {
    return <div className=' w-full h-56 rounded-full bg-gray-500 flex justify-center items-center opacity-45 ' >
        <PhotoIcon className='size-20' />

    </div>
}


function CreateButton({ children }: PropsWithChildren) {
    return <button disabled={true} className='rounded-2xl bg-gray-500 text-gray-700 w-full h-12'>{children}</button>

}

function SmallBar() {
    return <div className='w-3/4 h-12 bg-gray-500 opacity-45 rounded-full' />
}


Skeleton.Image = Image;
Skeleton.CreateButton = CreateButton
Skeleton.SmallBar = SmallBar

export default Skeleton