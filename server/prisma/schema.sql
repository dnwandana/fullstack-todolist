CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  fullname VARCHAR(50) NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "public"."Todo" (
  id VARCHAR(10) PRIMARY KEY,
  todo VARCHAR(255) NOT NULL,
  isdone BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "userId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);