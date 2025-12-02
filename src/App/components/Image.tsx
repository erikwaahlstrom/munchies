const Image = ({
  alt,
  key,
  loading = "lazy",
  src,
  className,
}: {
  alt: string;
  key: string;
  loading: "lazy" | "eager";
  src: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <img
      alt={alt}
      key={key}
      loading={loading}
      src={src}
      className={className}
    />
  );
};

export default Image;
