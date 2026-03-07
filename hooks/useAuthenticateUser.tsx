import { useRequestOtp } from '@/app/api/hooks/auth'
import { useGetProfile } from '@/app/api/hooks/user'
import { setActiveAuthMethod, toggleAuthModal } from '@/Redux/Slices/authSlice'
import { useAppDispatch } from '@/Redux/store'
import { toast } from 'sonner'


const useAuthenticateUser = () => {

    const { data: userProfile } = useGetProfile()
    const { mutate: handleSendOtp } = useRequestOtp()
    const dispatch = useAppDispatch()

    const authenticateUser = (action: string = "make a post") => {
        if (!userProfile) {
            toast.info(`Kindly login to ${action}.`)
            dispatch(toggleAuthModal())
            return false
        }

        if (!userProfile?.is_verified) {
            toast.info("kindly verify your email to continue.")

            try {
                handleSendOtp(undefined, {
                    onSuccess: () => {
                        dispatch(toggleAuthModal())
                        dispatch(setActiveAuthMethod("verifyEmail"))
                    },
                })
            } catch {
                return false
            }

            return false
        }

        return true
    }


    return {
        authenticateUser
    }
}

export default useAuthenticateUser