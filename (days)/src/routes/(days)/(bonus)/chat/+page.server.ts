import { fail } from '@sveltejs/kit';
import { z } from 'zod'
import { superValidate, message } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

const schema = z.object({
	body: z.string().min(1),
    time: z.date(),
    author: z.string().min(1),
});

export const load = async () => {
    const form = await superValidate(zod(schema))

    return {
        form
    }
}

export const actions = {
    send: async ({ request }) => {
        const form = await superValidate(request, zod(schema))

        if (!form.valid) {
            return fail(400, {form})
        }
        
        form.data.body = ""
        return message(
                form,
                "Message Sent",
                { status: 418 }
            )
        
    }
}