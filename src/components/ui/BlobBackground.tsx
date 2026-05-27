import { BlobBackgroundProps } from "@/src/types";

export function BlobBackground({ variant = 'brand' }: BlobBackgroundProps) {
  if (variant === 'warm') {
    return (
      <>
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ backgroundColor: '#E5BEB5' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: '#EEE6CA' }}
        />
      </>
    );
  }

  return (
    <>
      <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 mb-20 w-[500px] h-[500px] rounded-full bg-accent-500/5 blur-3xl pointer-events-none" />
    </>
  );
}
