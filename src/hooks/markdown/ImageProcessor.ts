export type ImageUnit = {
  alt: string | null;
  url: string;
}

export type ImageProcessor = {
  process(file: File): Promise<ImageUnit>;
}
