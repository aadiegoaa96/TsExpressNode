// models/models.ts

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  postId: number;
  userId: number;
  title: string;
  body: string;
}

export interface TransformedUser {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  geolocation: string;
  companyName: string;
}

export interface TransformedPosts {
  postId: number;
  userId: number;
  title: string;
  body: string;
}