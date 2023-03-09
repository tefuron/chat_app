import { Auth } from '@supabase/auth-ui-react'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function Login() {
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    const session = useSession()

    supabaseClient.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN") {
            router.push("/");
        }  
    })

    if (!session)
        return (
            <div className='m-2'>
                <Auth
                    appearance={{ theme: ThemeSupa }}
                    supabaseClient={supabaseClient}
                    providers={['google', 'github']}
                    socialLayout="horizontal"
                />
            </div>
        )

    return (
        <div>
            <p>既にログインしています</p>
        </div>
    )
}
