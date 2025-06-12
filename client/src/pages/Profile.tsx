import { useAuth } from '../context/AuthContext'
import { getProfile } from '../api/auth'

const Profile = () => {
    const { token } = useAuth()

    const getUserProfile = async () => {
        try{
            const res = await getProfile(token!)
            console.log(res.data)
        } catch (err) {
            console.error('Auth failed', err)
        }
       
    }
  return (
    <div>
        <button onClick={getUserProfile}>
            Click
        </button>
    </div>
  )
}

export default Profile