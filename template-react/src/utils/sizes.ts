import { Size } from "@/types/size";

export type Scale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function getSizeByScale(size: Size, scale: Scale) {
  switch (size) {
    case "xs":
      switch (scale) {
        case 1:
          return "w-4 h-4";
        case 2:
          return "w-6 h-6";
        case 3:
          return "w-8 h-8";
        case 4:
          return "w-10 h-10";
        case 5:
          return "w-12 h-12";
        case 6:
          return "w-16 h-16";
        case 7:
          return "w-20 h-20";
        case 8:
          return "w-24 h-24";
        case 9:
          return "w-28 h-28";
        case 10:
          return "w-32 h-32";
      }
      return;
    case "sm":
      switch (scale) {
        case 1:
          return "w-6 h-6";
        case 2:
          return "w-8 h-8";
        case 3:
          return "w-10 h-10";
        case 4:
          return "w-12 h-12";
        case 5:
          return "w-16 h-16";
        case 6:
          return "w-20 h-20";
        case 7:
          return "w-24 h-24";
        case 8:
          return "w-28 h-28";
        case 9:
          return "w-32 h-32";
        case 10:
          return "w-36 h-36";
      }
      return;
    case "md":
      switch (scale) {
        case 1:
          return "w-8 h-8";
        case 2:
          return "w-10 h-10";
        case 3:
          return "w-12 h-12";
        case 4:
          return "w-16 h-16";
        case 5:
          return "w-20 h-20";
        case 6:
          return "w-24 h-24";
        case 7:
          return "w-28 h-28";
        case 8:
          return "w-32 h-32";
        case 9:
          return "w-36 h-36";
        case 10:
          return "w-40 h-40";
      }
      return;
    case "lg":
      switch (scale) {
        case 1:
          return "w-10 h-10";
        case 2:
          return "w-12 h-12";
        case 3:
          return "w-16 h-16";
        case 4:
          return "w-20 h-20";
        case 5:
          return "w-24 h-24";
        case 6:
          return "w-28 h-28";
        case 7:
          return "w-32 h-32";
        case 8:
          return "w-36 h-36";
        case 9:
          return "w-40 h-40";
        case 10:
          return "w-48 h-48";
      }
      return;
  }
}
