export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  coverUrl: string;
  bannerUrl?: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  banner: string;
  about: string;
  additionalPhotos: string[];
  music: Track[];
  role?: string;
}
