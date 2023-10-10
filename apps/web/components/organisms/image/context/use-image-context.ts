import { useContext } from "react";
import { ImageContext } from "./image-context";

export default function useImageContext() {
  return useContext(ImageContext);
}
