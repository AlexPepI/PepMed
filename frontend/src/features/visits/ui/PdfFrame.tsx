type Props = { src: string; height?: number; title?: string };

const PdfFrame = ({ src, height = 600, title = "PDF viewer" }: Props) => {
  if (!src) return null;
  return <iframe src={src} width="100%" height={`${height}px`} title={title} />;
};

export default PdfFrame;