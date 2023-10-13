"use client";

import { useImageKeeperStore } from "@web/store";
import { Picture } from "@web/store/models/picture";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  createContext,
  useState,
} from "react";

type ChangeBooleanState = (value: boolean) => void;

interface ImageContextProps {
  picture: Picture;
  hovered: boolean;
  setHovered: ChangeBooleanState;
}

export const ImageContext = createContext<ImageContextProps>(
  {} as ImageContextProps
);

type ImageProviderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  picture: Picture;
  children: ReactNode;
};

export function ImageProvider({
  children,
  picture,
  ...rest
}: ImageProviderProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <ImageContext.Provider value={{ picture, hovered, setHovered }}>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...rest}
      >
        {children}
      </div>
    </ImageContext.Provider>
  );
}
