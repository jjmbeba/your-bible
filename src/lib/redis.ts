import { Redis } from '@upstash/redis';
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(5, "86400 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });