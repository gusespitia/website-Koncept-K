"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar el router
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/lib/schemas";
import { send } from "@/lib/email";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";


export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para mostrar la ventana
  const router = useRouter(); // Hook para redireccionar

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await send(values);
      setIsSubmitted(true); // Mostrar ventana de confirmación
      form.reset(); // Limpiar el formulario después del envío

      // Redirigir a la home después de 10 segundos
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  return (
    <section className="">
      {/* Formulario */}
      <Card className="w-full max-w-md mx-auto p-4 ">
        <CardHeader>
          <CardTitle className="text-center mb-4  text-3xl font-bold] text-gray-500">Contacteer ons</CardTitle>
          <CardDescription>
            Contacteer ons via onderstaand formulier en we bezorgen je zo snel mogelijk antwoord.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naam</FormLabel>
                      <FormControl>
                        <Input placeholder="Naam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Familienaam</FormLabel>
                      <FormControl>
                        <Input placeholder="Familienaam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Emailadres"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bericht</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Schrijf hier je bericht"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[var(--color-store)]">
                Verzenden
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Ventana de Confirmación */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Your message has been sent successfully. We will get back to you
              as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
     
    </section>
  );
}
