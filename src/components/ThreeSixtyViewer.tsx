import React, { useEffect, useRef, useState } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface ThreeSixtyViewerProps {
  imageUrls?: string[];
  activeAngleIdx?: number;
}

const ThreeSixtyViewer: React.FC<ThreeSixtyViewerProps> = ({ imageUrls = [], activeAngleIdx = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  
  // Ref to hold the control functions from inside the Three.js closure
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (controlsRef.current && typeof activeAngleIdx === 'number') {
      controlsRef.current.goToAngle(activeAngleIdx);
    }
  }, [activeAngleIdx]);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) return;

    let animationId: number;
    let renderer: any;
    let destroyed = false;

    const init = async () => {
      try {
        setLoading(true);
        const THREE = await import('three');
        if (destroyed || !containerRef.current) return;

        const container = containerRef.current;
        const w = container.clientWidth;
        const h = container.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505);

        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
        camera.position.set(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        // Load images via proxy gracefully
        const texturesRaw = await Promise.all(imageUrls.map(async (url) => {
          if (!url) return null;
          try {
            const res = await fetch(`/api/image-proxy?url=${encodeURIComponent(url)}`);
            if (!res.ok) return null;
            const blob = await res.blob();
            const dataUrl = await new Promise<string>(r => {
              const rd = new FileReader();
              rd.onloadend = () => r(rd.result as string);
              rd.readAsDataURL(blob);
            });
            if (destroyed) return null;
            return await new Promise<any>((ok) => {
              new THREE.TextureLoader().load(dataUrl, ok, undefined, () => ok(null));
            });
          } catch (e) {
            return null;
          }
        }));
        
        const textures = texturesRaw.filter(t => t !== null);
        if (destroyed || textures.length === 0) {
          setLoading(false);
          return;
        }

        textures.forEach(tex => {
          if(tex) {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
          }
        });

        let geo: any;
        let mat: any;
        let cylH = 0;
        let R = 100;
        
        let capGeo: any;
        let capMat: any;

        let roomGroup: any;
        let segments: any[] = [];

        const isBox = textures.length > 1;

        if (isBox) {
          // Use a smooth, perfectly round Cylinder with 4 segments instead of a Box
          // This eliminates the sharp 90-degree corners and hard 'cuts' where images meet.
          // We set cylH to 115 to maintain a spacious FOV and avoid seeing black caps.
          cylH = 115;
          const arc = Math.PI / 2;

          const texN = textures[0];
          const texE = textures[1] || textures[0];
          const texS = textures[2] || textures[0];
          const texW = textures[3] || textures[0];
          
          // Cylinder with scale(-1,1,1) maps counter-clockwise internally.
          // Order: North, West, South, East
          const quadTex = [texN, texW, texS, texE];

          roomGroup = new THREE.Group();

          quadTex.forEach((tex, i) => {
            const segmentGeo = new THREE.CylinderGeometry(R, R, cylH, 64, 1, true, i * arc, arc);
            segmentGeo.scale(-1, 1, 1);
            const segmentMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.FrontSide });
            const segment = new THREE.Mesh(segmentGeo, segmentMat);
            roomGroup.add(segment);
            segments.push(segment);
          });
          
          // Rotate group so the center of the North segment (texN) aligns perfectly with the starting camera (-Z axis)
          roomGroup.rotation.y = (3 * Math.PI) / 4;
          scene.add(roomGroup);

          // Caps for safety
          capGeo = new THREE.CircleGeometry(R, 64);
          capMat = new THREE.MeshBasicMaterial({ color: 0x050505, side: THREE.DoubleSide });
          const topCap = new THREE.Mesh(capGeo, capMat);
          topCap.position.y = cylH / 2;
          topCap.rotation.x = Math.PI / 2;
          scene.add(topCap);
          const botCap = new THREE.Mesh(capGeo.clone(), capMat);
          botCap.position.y = -cylH / 2;
          botCap.rotation.x = -Math.PI / 2;
          scene.add(botCap);
        } else {
          // Seamless Mirrored Cylinder for single images to prevent sharp corners and hard cuts
          const tex = textures[0];
          tex.wrapS = THREE.MirroredRepeatWrapping;
          tex.repeat.x = 2; // Ping-pong mirroring creates a 100% seamless 360 blend

          const imgAR = tex.image.width / tex.image.height;
          const arcLength = Math.PI * R; // 180 degrees per normal image to maintain scale
          cylH = arcLength / imgAR;

          geo = new THREE.CylinderGeometry(R, R, cylH, 64, 1, true, 0, Math.PI * 2);
          geo.scale(-1, 1, 1);

          mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.FrontSide });
          const cylinder = new THREE.Mesh(geo, mat);
          cylinder.rotation.y = Math.PI; // Align center to camera
          scene.add(cylinder);

          // Caps for safety
          capGeo = new THREE.CircleGeometry(R, 64);
          capMat = new THREE.MeshBasicMaterial({ color: 0x050505, side: THREE.DoubleSide });
          const topCap = new THREE.Mesh(capGeo, capMat);
          topCap.position.y = cylH / 2;
          topCap.rotation.x = Math.PI / 2;
          scene.add(topCap);
          const botCap = new THREE.Mesh(capGeo.clone(), capMat);
          botCap.position.y = -cylH / 2;
          botCap.rotation.x = -Math.PI / 2;
          scene.add(botCap);
        }

        setLoading(false);

        // -------- INTERACTION STATE --------
        // Start looking at -Z (center of image)
        let lon = -90, lat = 0, tLon = -90, tLat = 0;
        let fov = 0, tFov = 0;
        const MIN_FOV = 20;
        let drag = false, px = 0, py = 0, pinch = 0;
        let isFirstRender = true;
        
        // Continuous movement state for UI buttons
        let moveLeft = false, moveRight = false, moveUp = false, moveDown = false;
        let zoomIn = false, zoomOut = false;

        // Expose control functions to React
        controlsRef.current = {
          setLeft: (v: boolean) => { moveLeft = v; },
          setRight: (v: boolean) => { moveRight = v; },
          setUp: (v: boolean) => { moveUp = v; },
          setDown: (v: boolean) => { moveDown = v; },
          setZoomIn: (v: boolean) => { zoomIn = v; },
          setZoomOut: (v: boolean) => { zoomOut = v; },
          goToAngle: (idx: number) => {
            // North: -90, East: -180, South: -270, West: -360
            const target = -90 - (idx * 90);
            tLon = target;
          }
        };

        // -------- EVENT HANDLERS --------
        const onDown = (e: MouseEvent) => {
          drag = true; px = e.clientX; py = e.clientY;
          container.style.cursor = 'grabbing';
        };
        const onMove = (e: MouseEvent) => {
          if (!drag) return;
          const sens = (fov / 90) * 0.2; // Mouse sensitivity
          tLon += (px - e.clientX) * sens;
          tLat += (e.clientY - py) * sens;
          px = e.clientX; py = e.clientY;
        };
        const onUp = () => {
          drag = false; container.style.cursor = 'grab';
        };

        const onWheel = (e: WheelEvent) => {
          e.preventDefault();
          tFov += e.deltaY * 0.05;
        };

        const onTS = (e: TouchEvent) => {
          if (e.touches.length === 1) {
            drag = true; px = e.touches[0].clientX; py = e.touches[0].clientY;
          } else if (e.touches.length === 2) {
            drag = false;
            pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
          }
        };
        const onTM = (e: TouchEvent) => {
          e.preventDefault();
          if (e.touches.length === 1 && drag) {
            const sens = (fov / 90) * 0.35; // Increased sensitivity for touch
            tLon += (px - e.touches[0].clientX) * sens;
            tLat += (e.touches[0].clientY - py) * sens;
            px = e.touches[0].clientX; py = e.touches[0].clientY;
          } else if (e.touches.length === 2 && pinch > 0) {
            const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            tFov += (pinch - d) * 0.15; // Increased pinch sensitivity
            pinch = d;
          }
        };
        const onTE = (e: TouchEvent) => {
          if (e.touches.length < 2) pinch = 0;
          if (e.touches.length === 0) drag = false;
        };

        const onKey = (e: KeyboardEvent) => {
          switch (e.key) {
            case 'ArrowLeft':  tLon -= 5; break;
            case 'ArrowRight': tLon += 5; break;
            case 'ArrowUp':    tLat += 3; break;
            case 'ArrowDown':  tLat -= 3; break;
            case '+': case '=': tFov -= 5; break;
            case '-': case '_': tFov += 5; break;
          }
        };

        container.addEventListener('mousedown', onDown);
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseup', onUp);
        container.addEventListener('mouseleave', onUp);
        container.addEventListener('wheel', onWheel, { passive: false });
        container.addEventListener('touchstart', onTS, { passive: false });
        container.addEventListener('touchmove', onTM, { passive: false });
        container.addEventListener('touchend', onTE);
        window.addEventListener('keydown', onKey);
        container.style.cursor = 'grab';
        container.style.touchAction = 'none';

        const onResize = () => {
          if (!containerRef.current || destroyed) return;
          camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', onResize);

        // -------- ANIMATION LOOP --------
        const animate = () => {
          if (destroyed) return;
          animationId = requestAnimationFrame(animate);

          const aspect = camera.aspect;

          // Dynamically calculate max safe FOV to NEVER show black space
          const maxV_Fov = 2 * Math.atan(cylH / (2 * R));
          const maxH_Fov = Infinity; // Infinite panning horizontally
          const maxSafeFov = Math.min(maxV_Fov, maxH_Fov) * (180 / Math.PI);
          
          const MAX_FOV = maxSafeFov * 0.99; // Strictly clamp to never show black ceiling/floor

          // Initialize perfectly fitted to screen
          if (isFirstRender) {
             fov = tFov = MAX_FOV;
             isFirstRender = false;
          }

          tFov = Math.max(MIN_FOV, Math.min(MAX_FOV, tFov));

          // Calculate safe panning limits based on current FOV
          const currentV_FovRad = THREE.MathUtils.degToRad(fov);
          const vVisH = 2 * R * Math.tan(currentV_FovRad / 2);
          const pitchLimit = Math.max(0, THREE.MathUtils.radToDeg(Math.atan2((cylH - vVisH) / 2, R)) - 0.5);

          // Continuous movement from UI buttons
          if (moveLeft) tLon -= 1.5;
          if (moveRight) tLon += 1.5;
          if (moveUp) tLat += 1.0;
          if (moveDown) tLat -= 1.0;
          if (zoomIn) tFov -= 1.5;
          if (zoomOut) tFov += 1.5;

          tLat = Math.max(-pitchLimit, Math.min(pitchLimit, tLat));

          // Smooth interpolation
          lon += (tLon - lon) * 0.12;
          lat += (tLat - lat) * 0.12;
          fov += (tFov - fov) * 0.12;

          camera.fov = fov;
          camera.updateProjectionMatrix();

          // Spherical coordinates
          const phi = THREE.MathUtils.degToRad(90 - lat);
          const theta = THREE.MathUtils.degToRad(lon);
          camera.lookAt(
            Math.sin(phi) * Math.cos(theta) * R,
            Math.cos(phi) * R,
            Math.sin(phi) * Math.sin(theta) * R
          );
          renderer.render(scene, camera);
        };
        animate();

        // -------- CLEANUP --------
        return () => {
          destroyed = true;
          if (animationId) cancelAnimationFrame(animationId);
          container.removeEventListener('mousedown', onDown);
          container.removeEventListener('mousemove', onMove);
          cancelAnimationFrame(animationId);
          window.removeEventListener('keydown', onKey);
          window.removeEventListener('resize', onResize);
          if (containerRef.current) {
            containerRef.current.removeEventListener('mousedown', onDown);
            containerRef.current.removeEventListener('mousemove', onMove);
            containerRef.current.removeEventListener('mouseup', onUp);
            containerRef.current.removeEventListener('mouseleave', onUp);
            containerRef.current.removeEventListener('wheel', onWheel);
            containerRef.current.removeEventListener('touchstart', onTS);
            containerRef.current.removeEventListener('touchmove', onTM);
            containerRef.current.removeEventListener('touchend', onTE);
          }
          if (renderer) { renderer.dispose(); renderer.domElement?.parentNode?.removeChild(renderer.domElement); }
          textures.forEach(t => t?.dispose());
          segments.forEach(s => {
             if (s.geometry) s.geometry.dispose();
             if (s.material) s.material.dispose();
          });
          if (capGeo) capGeo.dispose();
          if (capMat) capMat.dispose();
        };
      } catch (err) {
        console.error("ThreeSixtyViewer error:", err);
        setLoading(false);
      }
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => {
      destroyed = true;
      if (cleanup) cleanup();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [imageUrls]);

  return (
    <div className="w-full h-full relative bg-[#050505] rounded-[3rem] overflow-hidden group">
      <div ref={containerRef} className="w-full h-full" style={{ width: '100%', height: '100%', outline: 'none', touchAction: 'none' }} tabIndex={0} />
      
      {/* On-screen Controls Overlay */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-40 opacity-70 hover:opacity-100 transition-opacity duration-300">
        
        {/* Small D-Pad Controls */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg touch-manipulation">
          <button 
            className="absolute top-0.5 left-1/2 -translate-x-1/2 p-1 md:p-1.5 text-white/70 hover:text-[#C5A059] transition-colors"
            onPointerDown={() => controlsRef.current?.setUp(true)}
            onPointerUp={() => controlsRef.current?.setUp(false)}
            onPointerLeave={() => controlsRef.current?.setUp(false)}
          >
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 p-1 md:p-1.5 text-white/70 hover:text-[#C5A059] transition-colors"
            onPointerDown={() => controlsRef.current?.setDown(true)}
            onPointerUp={() => controlsRef.current?.setDown(false)}
            onPointerLeave={() => controlsRef.current?.setDown(false)}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            className="absolute left-0.5 top-1/2 -translate-y-1/2 p-1 md:p-1.5 text-white/70 hover:text-[#C5A059] transition-colors"
            onPointerDown={() => controlsRef.current?.setLeft(true)}
            onPointerUp={() => controlsRef.current?.setLeft(false)}
            onPointerLeave={() => controlsRef.current?.setLeft(false)}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            className="absolute right-0.5 top-1/2 -translate-y-1/2 p-1 md:p-1.5 text-white/70 hover:text-[#C5A059] transition-colors"
            onPointerDown={() => controlsRef.current?.setRight(true)}
            onPointerUp={() => controlsRef.current?.setRight(false)}
            onPointerLeave={() => controlsRef.current?.setRight(false)}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          {/* Center decorative dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      <div className={`absolute inset-0 z-50 transition-all duration-1000 flex flex-col items-center justify-center bg-black ${!loading ? "opacity-0 pointer-events-none scale-105" : "opacity-100"}`}>
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-white/5 rounded-full" />
            <div className="absolute inset-0 w-20 h-20 border-t-2 border-[#C5A059] rounded-full animate-spin" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#C5A059] animate-pulse">Building 360° Room</p>
            <p className="text-[8px] text-white/20 uppercase tracking-widest">Mapping Textures...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeSixtyViewer
