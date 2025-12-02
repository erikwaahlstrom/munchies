const Image = ({
  alt,
  height,
  key,
  loading = "lazy",
  src,
}: {
  alt: string;
  height: string;
  key: string;
  loading: "lazy" | "eager";
  src: string;
  placeholder: string;
}) => {
  return (
    <img
      alt={alt}
      height={height}
      key={key}
      loading={loading}
      src={src}
    />
  );
};

export default Image;
