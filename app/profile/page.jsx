'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Components
import Profile from '@components/Profile'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post.id.toSting()}`, {
          method: 'DELETE'
        })

        const filteredPosts = myPosts.filter((p) => p._id !== post._id)

        setMyPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile 
      name='My'
      desc="Welcome to your personolized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile