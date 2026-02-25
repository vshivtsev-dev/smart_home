import {revalidateTag} from "next/cache";

export function invalidateCacheTag(tag: string) {
  revalidateTag(tag, { expire: 0 });
}
