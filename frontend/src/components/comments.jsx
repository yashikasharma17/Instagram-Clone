
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Comments({ comment }) {
  return (
    <div className="my-3">
      <div className="flex gap-3 items-center">
        <Avatar>
            <AvatarImage src={comment?.author?.profilepic}/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{comment?.author?.username}
            <span className="font-normal text-sm ml-1"> {comment?.comment}</span>
        </p>
      </div>
    </div>
  )
}
