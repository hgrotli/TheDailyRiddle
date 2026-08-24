export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-2xl scroll-mt-14 flex-col justify-center gap-8 border border-dashed border-transparent p-8"
    >
      <div className="flex flex-col gap-2">
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
      </div>
    </section>
  );
}
