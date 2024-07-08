import { redirect } from "@sveltejs/kit"

export const GET = async ({ locals: { supabase }, url }) => {
    const { data } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: url.origin + '/auth/callback'
        },
    })

    if (data.url) {
        throw redirect(307, data.url) // use the redirect API for your server framework
    }

    redirect(307, '/auth/error')
}