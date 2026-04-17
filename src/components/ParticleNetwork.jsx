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
              opacity: 0.6,
              color: "#4f46e5", /* Đậm đà Indigo 600 khi hover chuột */
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          /* Dải màu Cực Tinh Tế: Tím Chàm, Lơ, Tím Violet, Xanh Biển trong vắt */
          value: ["#4f46e5", "#06b6d4", "#8b5cf6", "#3b82f6"], 
        },
        links: {
          color: "#818cf8", /* Indigo 400 nhạt làm nền */
          distance: 150,
          enable: true,
          opacity: 0.3,
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
