import Link from "next/link"

export default function EditButton({ id }: { id: string }) {
    return (
        <Link href={`/profile/edit-listing/${id}`} className="bg-blue-400 py-1 px-2 rounded-md hover:brightness-90">Edit</Link>
    )
}