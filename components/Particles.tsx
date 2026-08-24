const PARTICLES = [
  { left: "5%", size: 2, duration: 26, delay: -4 },
  { left: "15%", size: 3, duration: 34, delay: -18 },
  { left: "25%", size: 2, duration: 22, delay: -9 },
  { left: "35%", size: 4, duration: 30, delay: -22 },
  { left: "45%", size: 2, duration: 38, delay: -2 },
  { left: "55%", size: 3, duration: 24, delay: -14 },
  { left: "65%", size: 2, duration: 32, delay: -26 },
  { left: "75%", size: 3, duration: 28, delay: -7 },
  { left: "85%", size: 2, duration: 36, delay: -20 },
  { left: "95%", size: 4, duration: 20, delay: -11 },
  { left: "10%", size: 2, duration: 40, delay: -32 },
  { left: "50%", size: 3, duration: 18, delay: -15 },
  { left: "90%", size: 2, duration: 39, delay: -24 },
  { left: "30%", size: 3, duration: 25, delay: -28 },
  { left: "70%", size: 2, duration: 29, delay: -5 },
];

export default function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] hidden overflow-hidden dark:block">
      {PARTICLES.map((particle, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-[#F5C371]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 6px 1px #F5C371",
            animation: `rise ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
