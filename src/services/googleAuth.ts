const GOOGLE_CLIENT_ID = '316467644383-78ueu8svimuqvshpplpeg0vs3d5ro49r.apps.googleusercontent.com';

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export function getGoogleClientId(): string {
  return GOOGLE_CLIENT_ID;
}

export function parseJwt(token: string): GoogleUser | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
