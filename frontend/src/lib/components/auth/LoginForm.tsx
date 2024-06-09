"use client";

import { handleLogin } from "@/app/actions";
import { Button } from "@/lib/components/common/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { Label } from "@/lib/components/common/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

interface LoginFormProps {}
const LoginForm = (props: LoginFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();

    const handleSubmit = useCallback(
        async (data: z.infer<typeof formSchema>) => {
            const res = await handleLogin(data);
            if (res === undefined) {
                router.push("/");
            }

            // Fehler
        },
        [router]
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Email</Label>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Password</Label>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
};
export default LoginForm;
