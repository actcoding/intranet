"use client";

import { handleLogin } from "@/app/actions";
import LoginFormEmailInput from "@/lib/components/auth/login-form/components/LoginFormEmailInput";
import LoginFormPasswordInput from "@/lib/components/auth/login-form/components/LoginFormPasswordInput";
import LoginFormSubmitButton from "@/lib/components/auth/login-form/components/LoginFormSubmitButton";
import { Alert, AlertDescription } from "@/lib/components/common/Alert";
import { Form } from "@/lib/components/common/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface LoginFormProps {}
const LoginForm = (props: LoginFormProps) => {
    const t = useTranslations("Auth");
    const formSchema = z.object({
        email: z.string().email({ message: t("error-email") }),
        password: z.string().min(1, {
            message: t("error-password-missing"),
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = useCallback(
        async (data: z.infer<typeof formSchema>) => {
            const res = await handleLogin(data);

            if (res !== undefined) {
                switch (res.status) {
                    case 401:
                        form.setError("root", { message: t("error-login") });
                        break;
                    default:
                        break;
                }
            }
        },
        [form, t]
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => handleSubmit(data))}
                className="space-y-4"
            >
                {form.formState.errors.root && (
                    <Alert variant={"destructive"}>
                        <AlertDescription>
                            {form.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                )}
                <LoginFormEmailInput />
                <LoginFormPasswordInput />
                <LoginFormSubmitButton />
            </form>
        </Form>
    );
};
export default LoginForm;
