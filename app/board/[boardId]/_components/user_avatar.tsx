import { Hint } from "@/components/hint";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
  onClick?: () => void;
  style?: {};
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
  onClick,
  style,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
      <Avatar
        className="h-8 w-8 border-2"
        style={{ borderColor, ...style }}
        onClick={onClick}
      >
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
