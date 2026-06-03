// Allow importing 3D / image assets directly if ever needed.
declare module '*.glb'
declare module '*.png'

// Register the meshline elements added via `extend({ MeshLineGeometry, MeshLineMaterial })`
// so they are recognized as valid JSX intrinsic elements. Typed loosely because
// these custom three.js objects accept plain arrays (resolution/repeat) that don't
// match the stricter Vector2 signatures meshline ships.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineGeometry: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineMaterial: any
    }
  }
}

export {}
