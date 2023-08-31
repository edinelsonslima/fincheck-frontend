import { iconsMap } from "./icons-map";

interface CategoryIconProps<T extends keyof typeof iconsMap> {
  type: T;
  category?: keyof (typeof iconsMap)[T];
}

export function CategoryIcon<T extends keyof typeof iconsMap>({
  type,
  category,
}: CategoryIconProps<T>) {
  const Icon = iconsMap[type][category ?? "default"];
  return <Icon />;
}


