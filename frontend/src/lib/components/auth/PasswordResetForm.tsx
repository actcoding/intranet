"use client";

import { Button } from "@/lib/components/common/Button";
import { resetPassword } from '@/app/actions';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/router';
import { useCallback } from 'react'

const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    password_confirm: z.string().min(8, {
        message: "Confirm Password must be at least 8 characters long"
    })
}).refine(data => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"]
})

const PasswordResetForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            password_confirm: "",
        }
    })

    const router = useRouter()

    const handleSubmit = useCallback(
        async (data: z.infer<typeof formSchema>) => {
            const res = await resetPassword(data)
            if (res === undefined) {
                router.push("/");
            }
        },
        [router]
    )

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password_confirm"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Reset Password</Button>
            </form>
        </Form>
     );
}

export default PasswordResetForm;
