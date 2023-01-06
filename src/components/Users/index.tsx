import { User } from "@prisma/client"

type Props = {
  users : User[]
}

export default function Users({ users }:Props){
  return (
    <div>
      <ul>
        {!!users && users.map(user => (
          <li key={user.id}>
            <p>@{user.username}: <span>{user.name}</span></p>
          </li>
        ))}
      </ul>
    </div>
  )
}