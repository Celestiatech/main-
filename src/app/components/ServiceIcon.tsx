
interface ServiceIconProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ServiceIcon({ src, alt, className = "" }: ServiceIconProps) {
  return (
    <div className={`serviceIcon ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

