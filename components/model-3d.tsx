'use client';
import { createElement, forwardRef, useEffect, useState } from 'react';

export const MODEL_SRC = '/models/chenek-balam.glb';
export const MODEL_POSTER = '/models/chenek-balam-poster.webp';

let loader: Promise<unknown> | null = null;
function loadModelViewer() {
  if (!loader) loader = import('@google/model-viewer');
  return loader;
}

type Props = {
  className?: string;
  style?: React.CSSProperties;
  cameraOrbit?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  interactionPrompt?: boolean;
  alt?: string;
  onLoad?: () => void;
};

/**
 * Visor 3D del robot (modelo GLB con texturas) usando <model-viewer>.
 * Se carga sólo en el navegador y muestra una imagen mientras descarga el modelo.
 */
const Model3D = forwardRef<HTMLElement, Props>(function Model3D(
  { className, style, cameraOrbit = '35deg 72deg auto', autoRotate, cameraControls = true, interactionPrompt = false, alt = 'Modelo 3D del robot CHENEK BALAM', onLoad },
  ref,
) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    loadModelViewer().then(() => alive && setReady(true));
    return () => { alive = false; };
  }, []);

  if (!ready) {
    return (
      <div
        className={className}
        style={{ ...style, backgroundImage: `url(${MODEL_POSTER})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        aria-label={alt}
        role="img"
      />
    );
  }

  const attrs: Record<string, unknown> = {
    ref,
    src: MODEL_SRC,
    poster: MODEL_POSTER,
    alt,
    class: className,
    style: { ...style, '--poster-color': 'transparent' },
    'camera-orbit': cameraOrbit,
    'min-camera-orbit': 'auto 20deg auto',
    'max-camera-orbit': 'auto 100deg auto',
    'shadow-intensity': '1',
    'shadow-softness': '0.8',
    exposure: '1.05',
    'environment-image': 'neutral',
    'interpolation-decay': '120',
    'touch-action': 'pan-y',
    'disable-pan': '',
    loading: 'eager',
    'interaction-prompt': interactionPrompt ? 'auto' : 'none',
    onLoad,
  };
  if (cameraControls) attrs['camera-controls'] = '';
  if (autoRotate) {
    attrs['auto-rotate'] = '';
    attrs['auto-rotate-delay'] = '0';
    attrs['rotation-per-second'] = '18deg';
  }
  return createElement('model-viewer', attrs);
});

export default Model3D;
