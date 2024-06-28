"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/lib/components/common/Form";
import { Input } from "@/lib/components/common/Input";
import { Label } from "@/lib/components/common/Label";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

interface LoginFormPasswordInputProps {}
const LoginFormPasswordInput = (props: LoginFormPasswordInputProps) => {
    const form = useFormContext();
    const t = useTranslations("Auth");
    return (
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <Label>{t("password")}</Label>
                    <FormControl>
                        <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export default LoginFormPasswordInput;
