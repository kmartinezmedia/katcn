'use server';

import { cookies } from 'next/headers';

function createId() {
  return `${Date.now()}${Math.random().toString(36).slice(2)}`;
}

export async function getId() {
  const cookieValue = cookies().get('katcn-userId')?.value;
  if (cookieValue) {
    return cookieValue;
  }
}

export async function setId() {
  const id = createId();
  cookies().set('katcn-userId', id);
  return id;
}
