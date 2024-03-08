"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user_avatar";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Hint } from "@/components/hint";

export const Participants = () => {
  const [toggle, setToggle] = useState(false);
  const [maxShownUsers, setMaxShownUsers] = useState(1);
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > maxShownUsers;

  useEffect(() => {
    toggle ? setMaxShownUsers(users.length) : setMaxShownUsers(1);
  }, [toggle, users.length]);

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (YOU)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {users.slice(0, maxShownUsers).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - maxShownUsers} more`}
            fallback={`+${users.length - maxShownUsers}`}
            onClick={() => setToggle((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        )}
        {toggle && (
          <Hint label="close">
            <div className="h-8 w-8 border-2 flex items-center justify-center rounded-full cursor-pointer">
              <ChevronLeft onClick={() => setToggle(false)} />
            </div>
          </Hint>
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};
