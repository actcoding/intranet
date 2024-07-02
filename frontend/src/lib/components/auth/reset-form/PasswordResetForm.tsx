"use client";

import { Button } from "@/lib/components/common/Button";
import { resetPassword } from "@/app/actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import ResetFormConfirmInput from "@/lib/components/auth/reset-form/components/ResetFormConfirmInput";
import ResetFormPasswordInput from "@/lib/components/auth/reset-form/components/ResetFormPasswordInput";
import ResetFormSubmitButton from "@/lib/components/auth/reset-form/components/ResetFormSubmitButton";

const formSchema = z
    .object({
        password: z.string().min(8, {
            message: "Password must be at least 8 characters long",
        }),
        password_confirmation: z.string().min(8, {
            message: "Confirm Password must be at least 8 characters long",
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });

const PasswordResetForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await resetPassword(data);
        console.log(res);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <ResetFormPasswordInput />
                <ResetFormConfirmInput />
                <ResetFormSubmitButton />
            </form>
        </Form>
    );
};

export default PasswordResetForm;
