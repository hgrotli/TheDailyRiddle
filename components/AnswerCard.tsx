import { Card, CardContent } from "@/components/ui/card";

type AnswerCardProps = {
  guess: string;
  locked?: boolean;
};

export default function AnswerCard({ guess, locked }: AnswerCardProps) {
  return (
    <Card className="w-full max-w-md bg-transparent ring-0">
      <CardContent className="flex items-center gap-2 text-lg tracking-widest text-[#F5C371]">
        <span className="shrink-0">You are a/an</span>
        <span className="flex h-8 flex-1 items-center overflow-hidden rounded bg-muted/50 px-2 whitespace-nowrap lowercase backdrop-blur-md">
          {guess}
          {!locked && (
            <span className="h-5 w-0.5 shrink-0 animate-[blink_1s_step-end_infinite] bg-[#F5C371]" />
          )}
        </span>
      </CardContent>
    </Card>
  );
}
