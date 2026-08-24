export default function SideAds() {
  return (
    <>
      <div className="fixed top-[calc((100svh+3.5rem)/2)] left-[calc((100vw-912px)/4)] z-40 hidden h-[240px] w-[120px] -translate-y-1/2 items-center justify-center border border-border bg-background text-center text-sm text-muted-foreground lg:flex">
        Ad
        <br />
        120x240
      </div>
      <div className="fixed top-[calc((100svh+3.5rem)/2)] right-[calc((100vw-912px)/4)] z-40 hidden h-[240px] w-[120px] -translate-y-1/2 items-center justify-center border border-border bg-background text-center text-sm text-muted-foreground lg:flex">
        Ad
        <br />
        120x240
      </div>
    </>
  );
}
