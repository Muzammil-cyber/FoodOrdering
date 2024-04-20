import { Image } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import supabase from "./supabase";

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!path || path === fallback) return;
    if (path.startsWith("file:/")) {
      setImage(path);
      return;
    }

    (async () => {
      setImage("");
      const { data, error } = await supabase.storage
        .from("product-images")
        .download(path);

      if (error) {
        console.log("Error in RemoteImage", error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
