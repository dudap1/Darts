
export class Place {
  id?: number;
  name: string;
  type?: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  imageUrl?: string;
  keywords?: string[];
  comments?: Comment[];
}

export class Comment {
 id?: number;
 placeId: number;
 username: string;
 content: string;
}
