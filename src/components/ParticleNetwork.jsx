import { useEffect, useState, useMemo, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default memo(function ParticleNetwork() {
  const [init, setInit] = useState(false);

  // Khởi tạo engine tsparticles (bản slim siêu nhẹ)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab", // Đổi sang chế độ coi chuột là 1 Node trung tâm
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.8,
              color: "#6366f1", /* Indigo 500 */
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: "#cbd5e1", /* Slate 300 - Neutral */
        },
        links: {
          color: "#94a3b8", /* Slate 400 */
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1.5, // Tốc độ trôi
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 500, // Tăng thêm số lượng hạt ban đầu cực đông
          limit: 650, // Nới lỏng giới hạn tối đa để thoải mái click thêm
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 w-full h-full -z-20"
      />
    );
  }

  return null;
});
