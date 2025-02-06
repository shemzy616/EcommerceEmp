import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Redirect } from "wouter";
import { Store, Lock } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema),
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome to EShop</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form
                  form={loginForm}
                  onSubmit={(data) => loginMutation.mutate(data)}
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" {...loginForm.register("username")} />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...loginForm.register("password")}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form
                  form={registerForm}
                  onSubmit={(data) => registerMutation.mutate(data)}
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reg-username">Username</Label>
                      <Input
                        id="reg-username"
                        {...registerForm.register("username")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        {...registerForm.register("password")}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-primary-foreground">
          <div className="flex items-center gap-2 mb-8">
            <Store className="h-12 w-12" />
            <h1 className="text-4xl font-bold">EShop Platform</h1>
          </div>
          <p className="text-xl mb-4">
            Your one-stop destination for quality products and seamless shopping
            experience.
          </p>
          <div className="flex items-center gap-2 text-lg">
            <Lock className="h-5 w-5" />
            <span>Secure authentication & verified sellers</span>
          </div>
        </div>
      </div>
    </div>
  );
}