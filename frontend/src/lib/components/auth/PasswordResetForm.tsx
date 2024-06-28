import { Button } from "@/lib/components/common/Button";
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

const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    confirmPassword: z.string().min(8, {
        message: "Confirm Password must be at least 8 characters long"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"]
})

const PasswordResetForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })

    const router = useRouter()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push('/')
    }

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
                    name="confirmPassword"
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
