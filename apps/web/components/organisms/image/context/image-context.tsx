"use client";

import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  createContext,
  useState,
} from "react";

type ChangeBooleanState = (value: boolean) => void;

interface ImageContextProps {
  loading: boolean;
  hovered: boolean;
  setLoading: ChangeBooleanState;
  setHovered: ChangeBooleanState;
}

export const ImageContext = createContext<ImageContextProps>(
  {} as ImageContextProps
);

type ImageProviderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  loading?: boolean;
  children: ReactNode;
};

export function ImageProvider({
  children,
  loading,
  ...rest
}: ImageProviderProps) {
  const [isLoading, setLoading] = useState(loading ?? false);
  const [hovered, setHovered] = useState(false);

  return (
    <ImageContext.Provider
      value={{ loading: isLoading, hovered, setLoading, setHovered }}
    >
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
