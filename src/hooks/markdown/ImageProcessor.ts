export type ImageUnit = {
  alt: string | null;
  url: string;
}

export type ImageProcessor = (file: File) => Promise<ImageUnit>;
  