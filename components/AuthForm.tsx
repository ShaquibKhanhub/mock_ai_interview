"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        toast.success("Signed in successfully!");
        console.log("sign-in", values);
        router.push("/");
      } else {
        toast.success("Account created successfully. Please sign in.");
        console.log("sign-up", values);
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
    console.log(values);
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:main-w-[566px]">
      <div className="flex flex-col  gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} width={38} height={32} alt={"logo"} />

          <h2 className="text-primary-100">Ai Interview</h2>
        </div>

        <h3 className="text-primary-100">
          Practice your interview skills with AI
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your full name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}

          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-user-primary ml-1 font-bold"
          >
            {" "}
            {isSignIn ? "Sign Up" : "Sign In"}{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
