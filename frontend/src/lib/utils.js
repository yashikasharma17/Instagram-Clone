import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  //The cn() utility combines conditional class names using clsx and resolves conflicting Tailwind classes using tailwind-merge, making dynamic Tailwind styling cleaner and more predictable.


  return twMerge(clsx(inputs));
}

export const fileToDataUrl=(file)=>{
  return new Promise((resolve, reject) => {//because file reader is asynchronous
    const reader = new FileReader();//this reads the file from our computer and converts it 
    reader.onload = () => resolve(reader.result);//Runs AFTER file reading finishes.and contains 64 bit image 
    reader.onerror = reject;//runs when there is an errror in reading file
    reader.readAsDataURL(file);//Reads file as Base64 URL.
  });
}