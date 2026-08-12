import { createHash, randomUUID } from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "mk_visitor";

export function getVisitor(request: NextRequest) {
  return request.cookies.get(COOKIE_NAME)?.value || randomUUID();
}

export function setVisitorCookie(response: NextResponse, visitor: string) {
  response.cookies.set(COOKIE_NAME, visitor, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 365, path: "/" });
}

export function hashVisitor(value: string) {
  const salt = process.env.MAVI_KADRAJ_VISITOR_SALT;
  if (!salt) throw new Error("MAVI_KADRAJ_VISITOR_SALT is missing.");
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

