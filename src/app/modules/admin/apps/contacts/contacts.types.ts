export interface Contact {
  id: string;
  avatar?: string | null;
  background?: string | null;
  name: string;
  emails?: {
    email: string;
    label: string;
  }[];
  phoneNumbers?: {
    country: string;
    phoneNumber: string;
    label: string;
  }[];
  position?: string;
  company?: string;
  birthday?: string | null;
  location?: string | null;
  notes?: string | null;
}

export interface Country {
  id: string;
  iso: string;
  name: string;
  code: string;
  flagImagePos: string;
}

export interface Tag {
  id?: string;
  title?: string;
}
