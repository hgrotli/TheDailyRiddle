import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex w-full max-w-[336px] flex-col pt-16 pb-24">
      <Card className="w-full border border-transparent bg-transparent ring-0">
        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">
              Last updated: 2026
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Overview</h2>
            <p className="text-muted-foreground text-lg">
              TheDailyRiddle does not require an account, and we do not
              collect any personal information to let you play.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">What we collect</h2>
            <p className="text-muted-foreground text-lg">
              When you submit a guess, it is sent to our server to check
              whether it is correct. We do not store your guesses or link
              them to you in any way — we only keep an aggregate count of
              how many people have solved each riddle.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Cookies and local storage</h2>
            <p className="text-muted-foreground text-lg">
              We do not currently use cookies or browser storage for
              tracking.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Third-party services</h2>
            <p className="text-muted-foreground text-lg">
              The site is hosted on Vercel and stores riddle data in
              Supabase. Both providers may log standard technical
              information (such as IP address and request timing) for
              security and operational purposes, independent of us.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Changes to this policy</h2>
            <p className="text-muted-foreground text-lg">
              If we start using analytics, advertising, or accounts in the
              future, we will update this page to reflect what data is
              collected and why.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="text-muted-foreground text-lg">
              Questions about this policy? Reach out at{" "}
              <a
                href="mailto:hello@riddlegame.example"
                className="text-[#F5C371] underline underline-offset-4"
              >
                hello@riddlegame.example
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
