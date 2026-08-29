import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-[336px] flex-col gap-8 pt-16 pb-24">
      <Card className="w-full border border-transparent bg-transparent ring-0">
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Get in touch</h2>
          <p className="text-muted-foreground text-lg">
            Found a bug, have feedback, or just want to say hi? Reach out at{" "}
            <a
              href="mailto:hello@riddlegame.example"
              className="text-[#F5C371] underline underline-offset-4"
            >
              hello@riddlegame.example
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
