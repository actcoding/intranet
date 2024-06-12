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
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

function Error({ error }: { error?: ApiError }) {
    if (!error) {
        return null;
    }

    switch (error.code) {
        case 401:
            return <p>Die E-Mail oder das Passwort ist falsch!</p>;

        default:
            return <p>{error.error}</p>;
    }
}

interface LoginFormProps {}
const LoginForm = (props: LoginFormProps) => {
    const [error, setError] = useState<ApiError>();

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

            setError(res);
        },
        [router]
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => handleSubmit(data))}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label>E-Mail Adresse</Label>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="example@mail.com"
                                />
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

                <div className="text-destructive text-sm">
                    <Error error={error} />
                </div>

                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
};
export default LoginForm;
